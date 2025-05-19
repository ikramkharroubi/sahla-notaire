from django.db import models

# Create your models here.

class ContentCategory(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    
    def __str__(self):
        return self.name

class FAQ(models.Model):
    question = models.CharField(max_length=255)
    answer = models.TextField()
    category = models.ForeignKey(ContentCategory, on_delete=models.CASCADE, related_name='faqs')
    order = models.PositiveIntegerField(default=0)
    is_published = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['order', 'created_at']
    
    def __str__(self):
        return self.question

class HelpArticle(models.Model):
    title = models.CharField(max_length=255)
    content = models.TextField()
    category = models.ForeignKey(ContentCategory, on_delete=models.CASCADE, related_name='help_articles')
    slug = models.SlugField(unique=True)
    is_published = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.title

class LegalContent(models.Model):
    title = models.CharField(max_length=255)
    content = models.TextField()
    TYPE_CHOICES = (
        ('privacy_policy', 'Privacy Policy'),
        ('terms_of_service', 'Terms of Service'),
        ('disclaimer', 'Disclaimer'),
        ('cookie_policy', 'Cookie Policy'),
    )
    content_type = models.CharField(max_length=20, choices=TYPE_CHOICES, unique=True)
    version = models.CharField(max_length=20)
    is_current = models.BooleanField(default=True)
    effective_date = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.title} - v{self.version}"
