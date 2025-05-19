from rest_framework import serializers
from .models import BusinessType, Business, BusinessLicense, TaxRegistration, ComplianceCheck

class BusinessTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = BusinessType
        fields = ['id', 'name', 'description']

class BusinessLicenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = BusinessLicense
        fields = ['id', 'license_type', 'license_number', 'issue_date', 
                 'expiry_date', 'document', 'is_active', 'notes']

class TaxRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaxRegistration
        fields = ['id', 'tax_id', 'registration_date', 'document', 
                 'is_active', 'notes']

class ComplianceCheckSerializer(serializers.ModelSerializer):
    checked_by_name = serializers.CharField(source='checked_by.get_full_name', read_only=True)
    
    class Meta:
        model = ComplianceCheck
        fields = ['id', 'name', 'description', 'checked_by', 'checked_by_name',
                 'status', 'check_date', 'next_check_date', 'notes']
        read_only_fields = ['checked_by']

class BusinessSerializer(serializers.ModelSerializer):
    business_type_name = serializers.CharField(source='business_type.name', read_only=True)
    owner_name = serializers.CharField(source='owner.get_full_name', read_only=True)
    
    class Meta:
        model = Business
        fields = ['id', 'name', 'business_type', 'business_type_name',
                 'registration_number', 'owner', 'owner_name', 'description',
                 'founding_date', 'email', 'phone', 'website',
                 'address_line1', 'address_line2', 'city', 'state_province',
                 'postal_code', 'is_active', 'is_verified', 'created_at', 
                 'updated_at']
        read_only_fields = ['is_verified', 'registration_number', 
                           'created_at', 'updated_at']

class BusinessDetailSerializer(BusinessSerializer):
    licenses = BusinessLicenseSerializer(many=True, read_only=True)
    tax_registration = TaxRegistrationSerializer(read_only=True)
    compliance_checks = ComplianceCheckSerializer(many=True, read_only=True)
    
    class Meta(BusinessSerializer.Meta):
        fields = BusinessSerializer.Meta.fields + ['licenses', 'tax_registration', 'compliance_checks']
