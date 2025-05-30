from django.contrib import admin
from .models import (
    ProcedureCategory,
    ProcedureSubCategory,
    Procedure,
    DocumentCategory,
    Document
)

@admin.register(ProcedureCategory)
class ProcedureCategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'description', 'created_at', 'updated_at')
    search_fields = ('name', 'description')

@admin.register(ProcedureSubCategory)
class ProcedureSubCategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'description', 'created_at', 'updated_at')
    list_filter = ('category',)
    search_fields = ('name', 'description')

@admin.register(Procedure)
class ProcedureAdmin(admin.ModelAdmin):
    list_display = ('title', 'subcategory', 'created_at', 'updated_at')
    list_filter = ('subcategory', 'subcategory__category')
    search_fields = ('title', 'introduction', 'notes', 'required_documents')

@admin.register(DocumentCategory)
class DocumentCategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'description', 'created_at', 'updated_at')
    search_fields = ('name', 'description')

@admin.register(Document)
class DocumentAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'procedure', 'is_template', 'created_at', 'updated_at')
    list_filter = ('category', 'is_template')
    search_fields = ('title', 'description')
