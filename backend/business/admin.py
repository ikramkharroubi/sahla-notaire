from django.contrib import admin
from .models import BusinessType, Business, BusinessLicense, TaxRegistration, ComplianceCheck

class BusinessLicenseInline(admin.TabularInline):
    model = BusinessLicense
    extra = 0

class TaxRegistrationInline(admin.StackedInline):
    model = TaxRegistration
    can_delete = False

class ComplianceCheckInline(admin.TabularInline):
    model = ComplianceCheck
    extra = 0

class BusinessTypeAdmin(admin.ModelAdmin):
    list_display = ('name', 'description')
    search_fields = ('name', 'description')

class BusinessAdmin(admin.ModelAdmin):
    list_display = ('name', 'business_type', 'owner', 'city', 'is_active', 'is_verified', 'created_at')
    list_filter = ('business_type', 'is_active', 'is_verified', 'city')
    search_fields = ('name', 'registration_number', 'owner__email', 'description')
    inlines = [BusinessLicenseInline, TaxRegistrationInline, ComplianceCheckInline]
    date_hierarchy = 'created_at'

admin.site.register(BusinessType, BusinessTypeAdmin)
admin.site.register(Business, BusinessAdmin)
