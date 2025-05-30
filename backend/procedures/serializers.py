from rest_framework import serializers
from .models import (
    ProcedureCategory,
    ProcedureSubCategory,
    Procedure,
    DocumentCategory,
    Document
)

class DocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = '__all__'

class DocumentCategorySerializer(serializers.ModelSerializer):
    documents = DocumentSerializer(many=True, read_only=True)

    class Meta:
        model = DocumentCategory
        fields = '__all__'

class ProcedureSerializer(serializers.ModelSerializer):
    documents = DocumentSerializer(many=True, read_only=True)

    class Meta:
        model = Procedure
        fields = '__all__'

class ProcedureSubCategorySerializer(serializers.ModelSerializer):
    procedures = ProcedureSerializer(many=True, read_only=True)

    class Meta:
        model = ProcedureSubCategory
        fields = '__all__'

class ProcedureCategorySerializer(serializers.ModelSerializer):
    subcategories = ProcedureSubCategorySerializer(many=True, read_only=True)

    class Meta:
        model = ProcedureCategory
        fields = '__all__' 