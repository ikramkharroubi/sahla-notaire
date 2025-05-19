from django.shortcuts import render
from rest_framework import viewsets, permissions, status, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Q
from django_filters.rest_framework import DjangoFilterBackend
from .models import OfficeCategory, AdministrationOffice, OfficeHours, OfficeService, Appointment
from .serializers import (
    OfficeCategorySerializer,
    AdministrationOfficeSerializer,
    AdministrationOfficeDetailSerializer,
    OfficeHoursSerializer,
    OfficeServiceSerializer,
    AppointmentSerializer
)

# Create your views here.

class OfficeCategoryViewSet(viewsets.ModelViewSet):
    queryset = OfficeCategory.objects.all()
    serializer_class = OfficeCategorySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'description']

class AdministrationOfficeViewSet(viewsets.ModelViewSet):
    queryset = AdministrationOffice.objects.all()
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['category', 'city', 'is_active']
    search_fields = ['name', 'description', 'city', 'address_line1']
    
    def get_serializer_class(self):
        if self.action == 'retrieve':
            return AdministrationOfficeDetailSerializer
        return AdministrationOfficeSerializer
    
    @action(detail=True, methods=['get'])
    def hours(self, request, pk=None):
        office = self.get_object()
        hours = office.office_hours.all()
        serializer = OfficeHoursSerializer(hours, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['get'])
    def services(self, request, pk=None):
        office = self.get_object()
        services = office.services.all()
        serializer = OfficeServiceSerializer(services, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def search(self, request):
        """Search offices by location and service"""
        city = request.query_params.get('city')
        service_id = request.query_params.get('service')
        
        queryset = self.get_queryset()
        
        if city:
            queryset = queryset.filter(city__icontains=city)
        
        if service_id:
            queryset = queryset.filter(services__service_id=service_id, services__is_available=True)
        
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

class OfficeHoursViewSet(viewsets.ModelViewSet):
    serializer_class = OfficeHoursSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        office_id = self.request.query_params.get('office')
        if office_id:
            return OfficeHours.objects.filter(office_id=office_id)
        return OfficeHours.objects.all()

class OfficeServiceViewSet(viewsets.ModelViewSet):
    serializer_class = OfficeServiceSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['office', 'service', 'is_available']
    
    def get_queryset(self):
        office_id = self.request.query_params.get('office')
        service_id = self.request.query_params.get('service')
        
        queryset = OfficeService.objects.all()
        
        if office_id:
            queryset = queryset.filter(office_id=office_id)
        
        if service_id:
            queryset = queryset.filter(service_id=service_id)
        
        return queryset

class AppointmentViewSet(viewsets.ModelViewSet):
    serializer_class = AppointmentSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['office', 'service', 'appointment_date', 'status']
    
    def get_queryset(self):
        user = self.request.user
        # Admin and staff can see all appointments
        if user.user_type in ['admin', 'staff']:
            return Appointment.objects.all()
        # Regular users can only see their own appointments
        return Appointment.objects.filter(user=user)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
    
    @action(detail=True, methods=['post'])
    def cancel(self, request, pk=None):
        appointment = self.get_object()
        
        # Only the appointment owner or staff/admin can cancel
        if appointment.user != request.user and request.user.user_type not in ['admin', 'staff']:
            return Response(
                {"detail": "You do not have permission to cancel this appointment."}, 
                status=status.HTTP_403_FORBIDDEN
            )
        
        appointment.status = 'cancelled'
        appointment.save()
        
        serializer = self.get_serializer(appointment)
        return Response(serializer.data)
