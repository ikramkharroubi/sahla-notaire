from django.contrib import admin
from .models import ServiceCategory, Procedure

@admin.register(ServiceCategory)
class ServiceCategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'parent')
    search_fields = ('name',)

@admin.register(Procedure)
class ProcedureAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'is_online')
    list_filter = ('category', 'is_online')
    search_fields = ('title', 'description')
    filter_horizontal = ('required_documents',)
