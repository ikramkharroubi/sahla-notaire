from django.shortcuts import render
from rest_framework import viewsets, permissions, status, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from .models import ContentCategory, FAQ, HelpArticle, LegalContent
from .serializers import (
    ContentCategorySerializer,
    FAQSerializer,
    HelpArticleSerializer,
    LegalContentSerializer
)

# Create your views here.

class ContentCategoryViewSet(viewsets.ModelViewSet):
    queryset = ContentCategory.objects.all()
    serializer_class = ContentCategorySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'description']
    
    @action(detail=True, methods=['get'])
    def faqs(self, request, pk=None):
        category = self.get_object()
        faqs = FAQ.objects.filter(category=category, is_published=True)
        serializer = FAQSerializer(faqs, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['get'])
    def help_articles(self, request, pk=None):
        category = self.get_object()
        articles = HelpArticle.objects.filter(category=category, is_published=True)
        serializer = HelpArticleSerializer(articles, many=True)
        return Response(serializer.data)

class FAQViewSet(viewsets.ModelViewSet):
    queryset = FAQ.objects.filter(is_published=True)
    serializer_class = FAQSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['category']
    search_fields = ['question', 'answer']
    
    def get_queryset(self):
        queryset = FAQ.objects.all()
        
        # If not admin/staff, show only published items
        if not self.request.user.is_authenticated or self.request.user.user_type not in ['admin', 'staff']:
            queryset = queryset.filter(is_published=True)
        
        return queryset

class HelpArticleViewSet(viewsets.ModelViewSet):
    queryset = HelpArticle.objects.filter(is_published=True)
    serializer_class = HelpArticleSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['category']
    search_fields = ['title', 'content']
    lookup_field = 'slug'
    
    def get_queryset(self):
        queryset = HelpArticle.objects.all()
        
        # If not admin/staff, show only published items
        if not self.request.user.is_authenticated or self.request.user.user_type not in ['admin', 'staff']:
            queryset = queryset.filter(is_published=True)
        
        return queryset

class LegalContentViewSet(viewsets.ModelViewSet):
    queryset = LegalContent.objects.filter(is_current=True)
    serializer_class = LegalContentSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    lookup_field = 'content_type'
    
    def get_queryset(self):
        content_type = self.request.query_params.get('content_type')
        version = self.request.query_params.get('version')
        
        queryset = LegalContent.objects.all()
        
        # Filter by content type
        if content_type:
            queryset = queryset.filter(content_type=content_type)
        
        # Filter by version or get current
        if version:
            queryset = queryset.filter(version=version)
        else:
            queryset = queryset.filter(is_current=True)
        
        return queryset
    
    @action(detail=False, methods=['get'])
    def privacy_policy(self, request):
        """Get current privacy policy"""
        policy = self.get_queryset().filter(content_type='privacy_policy').first()
        if not policy:
            return Response(
                {"detail": "Privacy policy not found."}, 
                status=status.HTTP_404_NOT_FOUND
            )
        
        serializer = self.get_serializer(policy)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def terms_of_service(self, request):
        """Get current terms of service"""
        terms = self.get_queryset().filter(content_type='terms_of_service').first()
        if not terms:
            return Response(
                {"detail": "Terms of service not found."}, 
                status=status.HTTP_404_NOT_FOUND
            )
        
        serializer = self.get_serializer(terms)
        return Response(serializer.data)
