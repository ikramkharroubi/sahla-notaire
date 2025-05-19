from django.shortcuts import render
from rest_framework import viewsets, permissions, status, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django_filters.rest_framework import DjangoFilterBackend
from .models import Category, Document, DocumentVersion, DocumentApplication, DocumentStatus
from .serializers import (
    CategorySerializer, 
    DocumentSerializer, 
    DocumentDetailSerializer,
    DocumentVersionSerializer, 
    DocumentApplicationSerializer,
    DocumentStatusSerializer
)

# Create your views here.

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'description']
    
    @action(detail=True, methods=['get'])
    def documents(self, request, pk=None):
        category = self.get_object()
        documents = Document.objects.filter(category=category)
        serializer = DocumentSerializer(documents, many=True)
        return Response(serializer.data)

class DocumentViewSet(viewsets.ModelViewSet):
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['category', 'is_template']
    search_fields = ['title', 'description']
    
    def get_serializer_class(self):
        if self.action == 'retrieve':
            return DocumentDetailSerializer
        return DocumentSerializer
    
    @action(detail=True, methods=['post'])
    def apply(self, request, pk=None):
        document = self.get_object()
        user = request.user
        
        # Create a document application
        application = DocumentApplication.objects.create(
            document=document,
            user=user
        )
        
        # Create initial status
        DocumentStatus.objects.create(
            application=application,
            status='pending',
            notes='Application submitted',
            created_by=user
        )
        
        serializer = DocumentApplicationSerializer(application)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class DocumentApplicationViewSet(viewsets.ModelViewSet):
    serializer_class = DocumentApplicationSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        if user.user_type in ['admin', 'staff']:
            return DocumentApplication.objects.all()
        return DocumentApplication.objects.filter(user=user)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
    
    @action(detail=True, methods=['post'])
    def update_status(self, request, pk=None):
        application = self.get_object()
        status_data = request.data
        
        # Only staff and admin can update status
        if request.user.user_type not in ['admin', 'staff']:
            return Response(
                {"detail": "You do not have permission to perform this action."}, 
                status=status.HTTP_403_FORBIDDEN
            )
        
        serializer = DocumentStatusSerializer(data=status_data)
        if serializer.is_valid():
            # Save the new status
            serializer.save(
                application=application,
                created_by=request.user
            )
            
            # Update the application status
            application.status = status_data.get('status')
            application.save()
            
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
