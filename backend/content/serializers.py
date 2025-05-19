from rest_framework import serializers
from .models import ContentCategory, FAQ, HelpArticle, LegalContent

class ContentCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ContentCategory
        fields = ['id', 'name', 'description']

class FAQSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    
    class Meta:
        model = FAQ
        fields = ['id', 'question', 'answer', 'category', 'category_name', 
                 'order', 'is_published', 'created_at', 'updated_at']
        read_only_fields = ['created_at', 'updated_at']

class HelpArticleSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    
    class Meta:
        model = HelpArticle
        fields = ['id', 'title', 'content', 'category', 'category_name', 
                 'slug', 'is_published', 'created_at', 'updated_at']
        read_only_fields = ['created_at', 'updated_at']

class LegalContentSerializer(serializers.ModelSerializer):
    class Meta:
        model = LegalContent
        fields = ['id', 'title', 'content', 'content_type', 'version', 
                 'is_current', 'effective_date', 'created_at', 'updated_at']
        read_only_fields = ['created_at', 'updated_at']
