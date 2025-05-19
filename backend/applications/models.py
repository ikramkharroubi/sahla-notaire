from django.db import models
from django.conf import settings
from services.models import Service

class Application(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='applications')
    service = models.ForeignKey(Service, on_delete=models.CASCADE, related_name='applications')
    reference_number = models.CharField(max_length=50, unique=True)
    submission_date = models.DateTimeField(auto_now_add=True)
    STATUS_CHOICES = (
        ('draft', 'Draft'),
        ('submitted', 'Submitted'),
        ('under_review', 'Under Review'),
        ('pending_documents', 'Pending Documents'),
        ('pending_payment', 'Pending Payment'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    )
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='draft')
    notes = models.TextField(blank=True)
    is_urgent = models.BooleanField(default=False)
    
    def __str__(self):
        return f"{self.reference_number} - {self.user.email}"
    
    def save(self, *args, **kwargs):
        # Generate a reference number if not provided
        if not self.reference_number:
            import random
            import string
            import datetime
            
            # Format: APP-YYYYMMDD-XXXXX (where X is random alphanumeric)
            date_str = datetime.date.today().strftime('%Y%m%d')
            random_str = ''.join(random.choices(string.ascii_uppercase + string.digits, k=5))
            self.reference_number = f"APP-{date_str}-{random_str}"
        
        super().save(*args, **kwargs)

class ApplicationStatus(models.Model):
    application = models.ForeignKey(Application, on_delete=models.CASCADE, related_name='status_history')
    status = models.CharField(max_length=20, choices=Application.STATUS_CHOICES)
    notes = models.TextField(blank=True)
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        on_delete=models.SET_NULL, 
        null=True,
        related_name='application_status_updates'
    )
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.application.reference_number} - {self.status}"

class RequiredDocument(models.Model):
    application = models.ForeignKey(Application, on_delete=models.CASCADE, related_name='required_documents')
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    is_mandatory = models.BooleanField(default=True)
    document = models.FileField(upload_to='application_documents/', blank=True, null=True)
    is_submitted = models.BooleanField(default=False)
    is_verified = models.BooleanField(default=False)
    submitted_at = models.DateTimeField(blank=True, null=True)
    verified_at = models.DateTimeField(blank=True, null=True)
    verified_by = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        on_delete=models.SET_NULL, 
        null=True,
        related_name='verified_documents'
    )
    
    def __str__(self):
        return f"{self.name} for {self.application.reference_number}"

class PaymentTransaction(models.Model):
    application = models.ForeignKey(Application, on_delete=models.CASCADE, related_name='payments')
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.CharField(max_length=255)
    transaction_id = models.CharField(max_length=100, blank=True, null=True)
    PAYMENT_METHOD_CHOICES = (
        ('credit_card', 'Credit Card'),
        ('bank_transfer', 'Bank Transfer'),
        ('cash', 'Cash'),
        ('mobile_payment', 'Mobile Payment'),
    )
    payment_method = models.CharField(max_length=20, choices=PAYMENT_METHOD_CHOICES)
    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('completed', 'Completed'),
        ('failed', 'Failed'),
        ('refunded', 'Refunded'),
    )
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
    completed_at = models.DateTimeField(blank=True, null=True)
    
    def __str__(self):
        return f"Payment for {self.application.reference_number}"

class Notification(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='notifications')
    title = models.CharField(max_length=255)
    message = models.TextField()
    TYPE_CHOICES = (
        ('application_status', 'Application Status'),
        ('document_request', 'Document Request'),
        ('payment_reminder', 'Payment Reminder'),
        ('general', 'General'),
    )
    notification_type = models.CharField(max_length=20, choices=TYPE_CHOICES, default='general')
    application = models.ForeignKey(
        Application, 
        on_delete=models.CASCADE, 
        related_name='notifications',
        null=True,
        blank=True
    )
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.title} for {self.user.email}"
