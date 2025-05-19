from django.shortcuts import render
from rest_framework import viewsets, permissions, status, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from .models import ServiceCategory, Service, ServiceRequirement, ServiceFee, ServiceRating, ServiceReview
from .serializers import (
    ServiceCategorySerializer, 
    ServiceSerializer, 
    ServiceDetailSerializer,
    ServiceRequirementSerializer, 
    ServiceFeeSerializer,
    ServiceRatingSerializer,
    ServiceReviewSerializer
)

# Create your views here.

class ServiceCategoryViewSet(viewsets.ModelViewSet):
    queryset = ServiceCategory.objects.all()
    serializer_class = ServiceCategorySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'description']
    
    @action(detail=True, methods=['get'])
    def services(self, request, pk=None):
        category = self.get_object()
        services = Service.objects.filter(category=category)
        serializer = ServiceSerializer(services, many=True)
        return Response(serializer.data)

class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['category', 'is_online']
    search_fields = ['title', 'description']
    
    def get_serializer_class(self):
        if self.action == 'retrieve':
            return ServiceDetailSerializer
        return ServiceSerializer
    
    @action(detail=True, methods=['post'])
    def rate(self, request, pk=None):
        service = self.get_object()
        user = request.user
        
        # Get rating data
        rating_data = request.data
        
        # Check if user has already rated this service
        try:
            rating = ServiceRating.objects.get(service=service, user=user)
            serializer = ServiceRatingSerializer(rating, data=rating_data)
        except ServiceRating.DoesNotExist:
            serializer = ServiceRatingSerializer(data=rating_data)
        
        if serializer.is_valid():
            serializer.save(service=service, user=user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=True, methods=['post'])
    def review(self, request, pk=None):
        service = self.get_object()
        user = request.user
        
        # Get review data
        review_data = request.data
        
        # Check if user has already reviewed this service
        try:
            review = ServiceReview.objects.get(service=service, user=user)
            serializer = ServiceReviewSerializer(review, data=review_data)
        except ServiceReview.DoesNotExist:
            # Check if user has rated the service
            try:
                rating = ServiceRating.objects.get(service=service, user=user)
            except ServiceRating.DoesNotExist:
                # If no rating exists, create one
                rating_data = {'rating': review_data.get('rating', 3)}
                rating_serializer = ServiceRatingSerializer(data=rating_data)
                if rating_serializer.is_valid():
                    rating = rating_serializer.save(service=service, user=user)
                else:
                    return Response(rating_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
            serializer = ServiceReviewSerializer(data=review_data)
        
        if serializer.is_valid():
            serializer.save(service=service, user=user, rating=rating)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
