from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class ServiceCategory(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    parent = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True, related_name='subcategories')
    icon = models.ImageField(upload_to='service_icons/', blank=True, null=True)
    
    def __str__(self):
        return self.name

class Procedure(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    category = models.ForeignKey(ServiceCategory, on_delete=models.CASCADE, related_name='procedures')
    
    # Introduction
    introduction = models.TextField(blank=True)
    
    # Steps as JSON field
    steps = models.JSONField(default=list, blank=True, help_text="List of steps with title, description, and order")
    
    # Documents
    required_documents = models.ManyToManyField('documents.Document', blank=True)
    
    # Fees and processing time
    fees = models.CharField(max_length=100, blank=True, null=True)
    processing_time = models.CharField(max_length=100, blank=True, null=True, help_text="Approximate processing time")
    
    # Notes
    notes = models.TextField(blank=True)
    
    # Downloads
    downloads = models.JSONField(default=list, blank=True, help_text="List of downloadable resources with title and URL")
    
    # Other fields
    is_online = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.title

