from django.db import models
from django.conf import settings

# Create your models here.

class BusinessType(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    
    def __str__(self):
        return self.name

class Business(models.Model):
    name = models.CharField(max_length=255)
    business_type = models.ForeignKey(BusinessType, on_delete=models.CASCADE, related_name='businesses')
    registration_number = models.CharField(max_length=50, unique=True, blank=True, null=True)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='owned_businesses')
    description = models.TextField(blank=True)
    founding_date = models.DateField(blank=True, null=True)
    email = models.EmailField(blank=True, null=True)
    phone = models.CharField(max_length=20, blank=True, null=True)
    website = models.URLField(blank=True, null=True)
    address_line1 = models.CharField(max_length=255)
    address_line2 = models.CharField(max_length=255, blank=True, null=True)
    city = models.CharField(max_length=100)
    state_province = models.CharField(max_length=100)
    postal_code = models.CharField(max_length=20)
    is_active = models.BooleanField(default=True)
    is_verified = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.name

class BusinessLicense(models.Model):
    business = models.ForeignKey(Business, on_delete=models.CASCADE, related_name='licenses')
    license_type = models.CharField(max_length=100)
    license_number = models.CharField(max_length=50, unique=True)
    issue_date = models.DateField()
    expiry_date = models.DateField()
    document = models.FileField(upload_to='business_licenses/', blank=True, null=True)
    is_active = models.BooleanField(default=True)
    notes = models.TextField(blank=True)
    
    def __str__(self):
        return f"{self.business.name} - {self.license_type}"

class TaxRegistration(models.Model):
    business = models.OneToOneField(Business, on_delete=models.CASCADE, related_name='tax_registration')
    tax_id = models.CharField(max_length=50, unique=True)
    registration_date = models.DateField()
    document = models.FileField(upload_to='tax_registrations/', blank=True, null=True)
    is_active = models.BooleanField(default=True)
    notes = models.TextField(blank=True)
    
    def __str__(self):
        return f"Tax registration for {self.business.name}"

class ComplianceCheck(models.Model):
    business = models.ForeignKey(Business, on_delete=models.CASCADE, related_name='compliance_checks')
    name = models.CharField(max_length=255)
    description = models.TextField()
    checked_by = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        on_delete=models.SET_NULL, 
        null=True,
        related_name='conducted_compliance_checks'
    )
    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('in_progress', 'In Progress'),
        ('passed', 'Passed'),
        ('failed', 'Failed'),
        ('na', 'Not Applicable'),
    )
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    check_date = models.DateField(blank=True, null=True)
    next_check_date = models.DateField(blank=True, null=True)
    notes = models.TextField(blank=True)
    
    def __str__(self):
        return f"{self.name} for {self.business.name}"
