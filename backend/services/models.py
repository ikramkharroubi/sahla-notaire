from django.db import models
from django.conf import settings

class ServiceCategory(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    parent = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True, related_name='subcategories')
    icon = models.ImageField(upload_to='service_icons/', blank=True, null=True)
    
    def __str__(self):
        return self.name

class Service(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    category = models.ForeignKey(ServiceCategory, on_delete=models.CASCADE, related_name='services')
    processing_time = models.CharField(max_length=50, help_text="e.g., '3-5 business days'")
    eligibility_criteria = models.TextField()
    is_online = models.BooleanField(default=True, help_text="Whether this service can be applied for online")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.title

class ServiceRequirement(models.Model):
    service = models.ForeignKey(Service, on_delete=models.CASCADE, related_name='requirements')
    name = models.CharField(max_length=255)
    description = models.TextField()
    is_mandatory = models.BooleanField(default=True)
    
    def __str__(self):
        return f"{self.name} for {self.service.title}"

class ServiceFee(models.Model):
    service = models.ForeignKey(Service, on_delete=models.CASCADE, related_name='fees')
    name = models.CharField(max_length=255)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField(blank=True)
    
    def __str__(self):
        return f"{self.name} - {self.amount} MAD"

class ServiceRating(models.Model):
    service = models.ForeignKey(Service, on_delete=models.CASCADE, related_name='ratings')
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    rating = models.IntegerField(choices=[(i, i) for i in range(1, 6)])  # 1-5 rating
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ('service', 'user')
    
    def __str__(self):
        return f"{self.user.email}'s rating for {self.service.title}"

class ServiceReview(models.Model):
    service = models.ForeignKey(Service, on_delete=models.CASCADE, related_name='reviews')
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    rating = models.OneToOneField(ServiceRating, on_delete=models.CASCADE, related_name='review', null=True, blank=True)
    review_text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.user.email}'s review for {self.service.title}"
