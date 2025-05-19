from django.shortcuts import render
from rest_framework import viewsets, permissions, status, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from .models import BusinessType, Business, BusinessLicense, TaxRegistration, ComplianceCheck
from .serializers import (
    BusinessTypeSerializer,
    BusinessSerializer,
    BusinessDetailSerializer,
    BusinessLicenseSerializer,
    TaxRegistrationSerializer,
    ComplianceCheckSerializer
)

# Create your views here.

class BusinessTypeViewSet(viewsets.ModelViewSet):
    queryset = BusinessType.objects.all()
    serializer_class = BusinessTypeSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'description']

class BusinessViewSet(viewsets.ModelViewSet):
    serializer_class = BusinessSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['business_type', 'is_active', 'is_verified']
    search_fields = ['name', 'registration_number', 'city']
    
    def get_queryset(self):
        user = self.request.user
        # Admin and staff can see all businesses
        if user.user_type in ['admin', 'staff']:
            return Business.objects.all()
        # Regular users can see only their own businesses
        return Business.objects.filter(owner=user)
    
    def get_serializer_class(self):
        if self.action == 'retrieve':
            return BusinessDetailSerializer
        return BusinessSerializer
    
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
    
    @action(detail=True, methods=['post'])
    def verify(self, request, pk=None):
        business = self.get_object()
        
        # Only staff or admin can verify a business
        if request.user.user_type not in ['admin', 'staff']:
            return Response(
                {"detail": "You do not have permission to perform this action."}, 
                status=status.HTTP_403_FORBIDDEN
            )
        
        business.is_verified = True
        business.save()
        
        serializer = self.get_serializer(business)
        return Response(serializer.data)

class BusinessLicenseViewSet(viewsets.ModelViewSet):
    serializer_class = BusinessLicenseSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        # Admin and staff can see all licenses
        if user.user_type in ['admin', 'staff']:
            return BusinessLicense.objects.all()
        # Regular users can only see licenses for their businesses
        return BusinessLicense.objects.filter(business__owner=user)
    
    def perform_create(self, serializer):
        business_id = self.request.data.get('business')
        business = Business.objects.get(pk=business_id)
        
        # Check if user owns the business or is staff/admin
        if business.owner != self.request.user and self.request.user.user_type not in ['admin', 'staff']:
            raise permissions.PermissionDenied("You do not own this business")
        
        serializer.save()

class TaxRegistrationViewSet(viewsets.ModelViewSet):
    serializer_class = TaxRegistrationSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        # Admin and staff can see all tax registrations
        if user.user_type in ['admin', 'staff']:
            return TaxRegistration.objects.all()
        # Regular users can only see tax registrations for their businesses
        return TaxRegistration.objects.filter(business__owner=user)
    
    def perform_create(self, serializer):
        business_id = self.request.data.get('business')
        business = Business.objects.get(pk=business_id)
        
        # Check if user owns the business or is staff/admin
        if business.owner != self.request.user and self.request.user.user_type not in ['admin', 'staff']:
            raise permissions.PermissionDenied("You do not own this business")
        
        serializer.save()

class ComplianceCheckViewSet(viewsets.ModelViewSet):
    serializer_class = ComplianceCheckSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['business', 'status']
    
    def get_queryset(self):
        user = self.request.user
        # Admin and staff can see all compliance checks
        if user.user_type in ['admin', 'staff']:
            return ComplianceCheck.objects.all()
        # Regular users can only see compliance checks for their businesses
        return ComplianceCheck.objects.filter(business__owner=user)
    
    def perform_create(self, serializer):
        serializer.save(checked_by=self.request.user if self.request.user.user_type in ['admin', 'staff'] else None)
