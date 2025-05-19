from django.db import models
from django.conf import settings

# Create your models here.

class Category(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    parent = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True, related_name='subcategories')
    icon = models.ImageField(upload_to='category_icons/', blank=True, null=True)
    is_procedure_category = models.BooleanField(default=True, help_text="Whether this category is used for procedures")
    is_document_category = models.BooleanField(default=True, help_text="Whether this category is used for documents")
    order = models.PositiveIntegerField(default=0)
    
    class Meta:
        verbose_name_plural = "Categories"
        ordering = ['order', 'name']
    
    def __str__(self):
        return self.name

class Document(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='documents', 
                               limit_choices_to={'is_document_category': True})
    file = models.FileField(upload_to='documents/', blank=True, null=True, 
                          help_text="The document template or form that users can download")
    is_template = models.BooleanField(default=True, help_text="Whether this is a template document for users to download")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.title

class DocumentVersion(models.Model):
    document = models.ForeignKey(Document, on_delete=models.CASCADE, related_name='versions')
    version_number = models.CharField(max_length=20)
    file = models.FileField(upload_to='document_templates/')
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.document.title} - v{self.version_number}"

class DocumentMetadata(models.Model):
    document = models.OneToOneField(Document, on_delete=models.CASCADE, related_name='metadata')
    average_rating = models.DecimalField(max_digits=3, decimal_places=2, default=0.00)
    total_reviews = models.PositiveIntegerField(default=0)
    times_applied = models.PositiveIntegerField(default=0)
    
    def __str__(self):
        return f"Metadata for {self.document.title}"

class DocumentApplication(models.Model):
    document = models.ForeignKey(Document, on_delete=models.CASCADE, related_name='applications')
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='document_applications')
    application_date = models.DateTimeField(auto_now_add=True)
    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('under_review', 'Under Review'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
        ('completed', 'Completed'),
    )
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    notes = models.TextField(blank=True)
    
    def __str__(self):
        return f"{self.user.email}'s application for {self.document.title}"

class DocumentStatus(models.Model):
    application = models.ForeignKey(DocumentApplication, on_delete=models.CASCADE, related_name='status_updates')
    status = models.CharField(max_length=20, choices=DocumentApplication.STATUS_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)
    notes = models.TextField(blank=True)
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        on_delete=models.SET_NULL, 
        null=True, 
        related_name='document_status_updates'
    )
    
    def __str__(self):
        return f"{self.application.document.title} - {self.status}"
