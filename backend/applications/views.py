from django.shortcuts import render
from rest_framework import viewsets, permissions, status, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from django.utils import timezone
from django_filters.rest_framework import DjangoFilterBackend
from .models import Application, ApplicationStatus, RequiredDocument, PaymentTransaction, Notification
from .serializers import (
    ApplicationSerializer,
    ApplicationDetailSerializer,
    ApplicationStatusSerializer,
    RequiredDocumentSerializer,
    PaymentTransactionSerializer,
    NotificationSerializer
)

# Create your views here.

class ApplicationViewSet(viewsets.ModelViewSet):
    serializer_class = ApplicationSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['service', 'status', 'is_urgent']
    search_fields = ['reference_number', 'notes']
    
    def get_queryset(self):
        user = self.request.user
        # Admin and staff can see all applications
        if user.user_type in ['admin', 'staff']:
            return Application.objects.all()
        # Regular users can only see their own applications
        return Application.objects.filter(user=user)
    
    def get_serializer_class(self):
        if self.action == 'retrieve':
            return ApplicationDetailSerializer
        return ApplicationSerializer
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
    
    @action(detail=True, methods=['post'])
    def submit(self, request, pk=None):
        application = self.get_object()
        
        # Check if the application is in draft status
        if application.status != 'draft':
            return Response(
                {"detail": "Only draft applications can be submitted."}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Update application status to submitted
        application.status = 'submitted'
        application.save()
        
        # Create status update
        ApplicationStatus.objects.create(
            application=application,
            status='submitted',
            notes='Application submitted by user',
            created_by=request.user
        )
        
        # Create notification
        Notification.objects.create(
            user=application.user,
            title='Application Submitted',
            message=f'Your application {application.reference_number} has been successfully submitted.',
            notification_type='application_status',
            application=application
        )
        
        serializer = self.get_serializer(application)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'])
    def update_status(self, request, pk=None):
        application = self.get_object()
        
        # Only staff and admin can update application status
        if request.user.user_type not in ['admin', 'staff']:
            return Response(
                {"detail": "You do not have permission to perform this action."}, 
                status=status.HTTP_403_FORBIDDEN
            )
        
        # Get status data
        status_data = request.data
        new_status = status_data.get('status')
        notes = status_data.get('notes', '')
        
        # Update application status
        application.status = new_status
        application.save()
        
        # Create status update
        ApplicationStatus.objects.create(
            application=application,
            status=new_status,
            notes=notes,
            created_by=request.user
        )
        
        # Create notification for the user
        Notification.objects.create(
            user=application.user,
            title='Application Status Updated',
            message=f'Your application {application.reference_number} status has been updated to {new_status}.',
            notification_type='application_status',
            application=application
        )
        
        serializer = self.get_serializer(application)
        return Response(serializer.data)

class RequiredDocumentViewSet(viewsets.ModelViewSet):
    serializer_class = RequiredDocumentSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['application', 'is_submitted', 'is_verified', 'is_mandatory']
    
    def get_queryset(self):
        user = self.request.user
        # Admin and staff can see all documents
        if user.user_type in ['admin', 'staff']:
            return RequiredDocument.objects.all()
        # Regular users can only see documents for their applications
        return RequiredDocument.objects.filter(application__user=user)
    
    @action(detail=True, methods=['post'])
    def upload(self, request, pk=None):
        document = self.get_object()
        
        # Check if the user owns the application
        if document.application.user != request.user and request.user.user_type not in ['admin', 'staff']:
            return Response(
                {"detail": "You do not have permission to upload this document."}, 
                status=status.HTTP_403_FORBIDDEN
            )
        
        # Get document file from request
        document_file = request.data.get('document')
        if not document_file:
            return Response(
                {"detail": "No document file provided."}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Update document
        document.document = document_file
        document.is_submitted = True
        document.submitted_at = timezone.now()
        document.save()
        
        serializer = self.get_serializer(document)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'])
    def verify(self, request, pk=None):
        document = self.get_object()
        
        # Only staff and admin can verify documents
        if request.user.user_type not in ['admin', 'staff']:
            return Response(
                {"detail": "You do not have permission to verify documents."}, 
                status=status.HTTP_403_FORBIDDEN
            )
        
        # Verify document
        document.is_verified = True
        document.verified_at = timezone.now()
        document.verified_by = request.user
        document.save()
        
        serializer = self.get_serializer(document)
        return Response(serializer.data)

class PaymentTransactionViewSet(viewsets.ModelViewSet):
    serializer_class = PaymentTransactionSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['application', 'payment_method', 'status']
    
    def get_queryset(self):
        user = self.request.user
        # Admin and staff can see all payments
        if user.user_type in ['admin', 'staff']:
            return PaymentTransaction.objects.all()
        # Regular users can only see payments for their applications
        return PaymentTransaction.objects.filter(application__user=user)
    
    @action(detail=True, methods=['post'])
    def complete(self, request, pk=None):
        payment = self.get_object()
        
        # Only staff and admin can mark payments as completed
        if request.user.user_type not in ['admin', 'staff']:
            return Response(
                {"detail": "You do not have permission to complete payments."}, 
                status=status.HTTP_403_FORBIDDEN
            )
        
        # Update payment status
        payment.status = 'completed'
        payment.completed_at = timezone.now()
        payment.save()
        
        # Create notification for the user
        Notification.objects.create(
            user=payment.application.user,
            title='Payment Completed',
            message=f'Your payment for application {payment.application.reference_number} has been completed.',
            notification_type='payment_reminder',
            application=payment.application
        )
        
        serializer = self.get_serializer(payment)
        return Response(serializer.data)

class NotificationViewSet(viewsets.ModelViewSet):
    serializer_class = NotificationSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['is_read', 'notification_type']
    
    def get_queryset(self):
        return Notification.objects.filter(user=self.request.user)
    
    @action(detail=True, methods=['post'])
    def mark_as_read(self, request, pk=None):
        notification = self.get_object()
        notification.is_read = True
        notification.save()
        
        serializer = self.get_serializer(notification)
        return Response(serializer.data)
    
    @action(detail=False, methods=['post'])
    def mark_all_as_read(self, request):
        notifications = self.get_queryset().filter(is_read=False)
        notifications.update(is_read=True)
        
        return Response({'status': 'success'})
