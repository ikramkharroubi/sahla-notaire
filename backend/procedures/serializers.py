from rest_framework import serializers
from .models import Procedure, ServiceCategory
from documents.models import Document

class DocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = ['id', 'title', 'description', 'file']

# Define ProcedureListSerializer here to avoid circular import
class ProcedureListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Procedure
        fields = ['id', 'title', 'description', 'is_online']

class SubcategorySerializer(serializers.ModelSerializer):
    procedures = ProcedureListSerializer(many=True, read_only=True)
    
    class Meta:
        model = ServiceCategory
        fields = ['id', 'name', 'description', 'icon', 'procedures']

class ServiceCategorySerializer(serializers.ModelSerializer):
    subcategories = SubcategorySerializer(many=True, read_only=True)
    procedures = ProcedureListSerializer(many=True, read_only=True)
    
    class Meta:
        model = ServiceCategory
        fields = ['id', 'name', 'description', 'parent', 'icon', 'subcategories', 'procedures']

class ProcedureSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    
    class Meta:
        model = Procedure
        fields = [
            'id', 'title', 'description', 'category', 'category_name', 
            'introduction', 'steps', 'required_documents', 'fees', 
            'processing_time', 'notes', 'downloads', 'is_online', 
            'created_at', 'updated_at'
        ]

class ProcedureDetailSerializer(ProcedureSerializer):
    required_documents = DocumentSerializer(many=True, read_only=True)
    
    class Meta(ProcedureSerializer.Meta):
        pass  # All fields are already included in the parent serializer
