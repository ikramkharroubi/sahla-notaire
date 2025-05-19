from django.contrib import admin
from .models import Category, Document

class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'parent', 'is_procedure_category', 'is_document_category', 'order')
    list_filter = ('is_procedure_category', 'is_document_category', 'parent')
    search_fields = ('name', 'description')
    list_editable = ('order', 'is_procedure_category', 'is_document_category')

class DocumentAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'is_template', 'updated_at')
    list_filter = ('category', 'is_template', 'updated_at')
    search_fields = ('title', 'description')

admin.site.register(Category, CategoryAdmin)
admin.site.register(Document, DocumentAdmin)
