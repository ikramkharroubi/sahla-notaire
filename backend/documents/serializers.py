from rest_framework import serializers
from .models import Category, Document, DocumentVersion, DocumentMetadata, DocumentApplication, DocumentStatus

class CategorySerializer(serializers.ModelSerializer):
    parent_name = serializers.CharField(source='parent.name', read_only=True, allow_null=True)
    
    class Meta:
        model = Category
        fields = ['id', 'name', 'description', 'parent', 'parent_name', 
                 'icon', 'is_procedure_category', 'is_document_category', 'order']

class DocumentVersionSerializer(serializers.ModelSerializer):
    class Meta:
        model = DocumentVersion
        fields = ['id', 'version_number', 'file', 'is_active', 'created_at']

class DocumentMetadataSerializer(serializers.ModelSerializer):
    class Meta:
        model = DocumentMetadata
        fields = ['average_rating', 'total_reviews', 'times_applied']

class DocumentSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    
    class Meta:
        model = Document
        fields = ['id', 'title', 'description', 'category', 'category_name', 
                 'file', 'is_template', 'created_at', 'updated_at']

class DocumentDetailSerializer(DocumentSerializer):
    versions = DocumentVersionSerializer(many=True, read_only=True)
    
    class Meta(DocumentSerializer.Meta):
        fields = DocumentSerializer.Meta.fields + ['versions']

class DocumentStatusSerializer(serializers.ModelSerializer):
    created_by_name = serializers.CharField(source='created_by.get_full_name', read_only=True)
    
    class Meta:
        model = DocumentStatus
        fields = ['id', 'status', 'created_at', 'notes', 'created_by', 'created_by_name']
        read_only_fields = ['created_by']

class DocumentApplicationSerializer(serializers.ModelSerializer):
    document_title = serializers.CharField(source='document.title', read_only=True)
    status_updates = DocumentStatusSerializer(many=True, read_only=True)
    
    class Meta:
        model = DocumentApplication
        fields = ['id', 'document', 'document_title', 'application_date', 
                 'status', 'notes', 'status_updates']
        read_only_fields = ['application_date']
