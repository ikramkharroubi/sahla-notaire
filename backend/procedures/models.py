from django.db import models
from django.contrib.auth.models import User
from django.utils.text import slugify
import re

def arabic_slugify(text):
    # Replace Arabic characters with their English equivalents
    arabic_to_english = {
        'ا': 'a', 'ب': 'b', 'ت': 't', 'ث': 'th', 'ج': 'j', 'ح': 'h', 'خ': 'kh',
        'د': 'd', 'ذ': 'th', 'ر': 'r', 'ز': 'z', 'س': 's', 'ش': 'sh', 'ص': 's',
        'ض': 'd', 'ط': 't', 'ظ': 'z', 'ع': 'a', 'غ': 'gh', 'ف': 'f', 'ق': 'q',
        'ك': 'k', 'ل': 'l', 'م': 'm', 'ن': 'n', 'ه': 'h', 'و': 'w', 'ي': 'y',
        'ة': 'h', 'ى': 'a', 'ء': 'a', 'ئ': 'y', 'إ': 'i', 'أ': 'a', 'آ': 'a',
        ' ': '-'
    }
    
    # Convert Arabic text to English
    text = ''.join(arabic_to_english.get(c, c) for c in text)
    
    # Remove any non-alphanumeric characters
    text = re.sub(r'[^a-zA-Z0-9-]', '', text)
    
    # Convert to lowercase
    text = text.lower()
    
    # Remove multiple hyphens
    text = re.sub(r'-+', '-', text)
    
    # Remove leading and trailing hyphens
    text = text.strip('-')
    
    return text

class ProcedureCategory(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(max_length=100, unique=True, null=True, blank=True)
    description = models.TextField(blank=True)
    icon_name = models.CharField(max_length=50, default='user-round')  # Default icon
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = "Procedure Categories"

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = arabic_slugify(self.name)
        super().save(*args, **kwargs)

class ProcedureSubCategory(models.Model):
    category = models.ForeignKey(ProcedureCategory, on_delete=models.CASCADE, related_name='subcategories')
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = "Procedure Subcategories"

    def __str__(self):
        return f"{self.category.name} - {self.name}"

class Procedure(models.Model):
    subcategory = models.ForeignKey(ProcedureSubCategory, on_delete=models.CASCADE, related_name='procedures')
    title = models.CharField(max_length=200)
    introduction = models.TextField()
    notes = models.TextField(blank=True)
    required_documents = models.ManyToManyField('Document', related_name='procedures_required_in', blank=True)
    steps = models.JSONField()
    fees = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

class DocumentCategory(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = "Document Categories"

    def __str__(self):
        return self.name

class Document(models.Model):
    category = models.ForeignKey(DocumentCategory, on_delete=models.CASCADE, related_name='documents')
    procedure = models.ForeignKey(Procedure, on_delete=models.CASCADE, related_name='documents', null=True, blank=True)
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    file = models.FileField(upload_to='documents/')
    is_template = models.BooleanField(default=False)
    is_required = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
