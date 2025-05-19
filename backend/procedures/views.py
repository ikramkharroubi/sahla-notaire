from django.shortcuts import render
from rest_framework import viewsets, permissions, status, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from .models import Procedure, ServiceCategory
from .serializers import (
    ProcedureSerializer, 
    ProcedureDetailSerializer, 
    ServiceCategorySerializer
)

# Create your views here.

class ServiceCategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ServiceCategory.objects.all()
    serializer_class = ServiceCategorySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
    def get_queryset(self):
        # By default, return only top-level categories (no parent)
        queryset = ServiceCategory.objects.all()
        if self.action == 'list':
            return queryset.filter(parent=None)
        return queryset
    
    @action(detail=False)
    def all(self, request):
        """Return all categories including subcategories"""
        queryset = ServiceCategory.objects.all()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
    
    @action(detail=True)
    def subcategories(self, request, pk=None):
        """Return subcategories for a specific category"""
        category = self.get_object()
        subcategories = category.subcategories.all()
        serializer = self.get_serializer(subcategories, many=True)
        return Response(serializer.data)

class ProcedureViewSet(viewsets.ModelViewSet):
    queryset = Procedure.objects.all()
    serializer_class = ProcedureSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['category', 'is_online']
    search_fields = ['title', 'description']
    
    def get_serializer_class(self):
        if self.action == 'retrieve':
            return ProcedureDetailSerializer
        return ProcedureSerializer
