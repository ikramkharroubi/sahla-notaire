from rest_framework import serializers
from .models import OfficeCategory, AdministrationOffice, OfficeHours, OfficeService, Appointment

class OfficeCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = OfficeCategory
        fields = ['id', 'name', 'description']

class OfficeHoursSerializer(serializers.ModelSerializer):
    day_name = serializers.CharField(source='get_day_display', read_only=True)
    
    class Meta:
        model = OfficeHours
        fields = ['id', 'day', 'day_name', 'opening_time', 'closing_time', 'is_closed']

class OfficeServiceSerializer(serializers.ModelSerializer):
    service_name = serializers.CharField(source='service.title', read_only=True)
    
    class Meta:
        model = OfficeService
        fields = ['id', 'service', 'service_name', 'is_available']

class AdministrationOfficeSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    
    class Meta:
        model = AdministrationOffice
        fields = ['id', 'name', 'category', 'category_name', 'description',
                 'address_line1', 'address_line2', 'city', 'state_province',
                 'postal_code', 'latitude', 'longitude', 'phone', 'email',
                 'website', 'is_active']

class AdministrationOfficeDetailSerializer(AdministrationOfficeSerializer):
    office_hours = OfficeHoursSerializer(many=True, read_only=True)
    services = OfficeServiceSerializer(many=True, read_only=True)
    
    class Meta(AdministrationOfficeSerializer.Meta):
        fields = AdministrationOfficeSerializer.Meta.fields + ['office_hours', 'services']

class AppointmentSerializer(serializers.ModelSerializer):
    office_name = serializers.CharField(source='office.name', read_only=True)
    service_name = serializers.CharField(source='service.title', read_only=True)
    user_name = serializers.CharField(source='user.get_full_name', read_only=True)
    
    class Meta:
        model = Appointment
        fields = ['id', 'office', 'office_name', 'service', 'service_name',
                 'user', 'user_name', 'appointment_date', 'appointment_time',
                 'status', 'notes', 'created_at']
        read_only_fields = ['user', 'created_at']
