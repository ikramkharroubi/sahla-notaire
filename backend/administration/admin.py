from django.contrib import admin
from .models import OfficeCategory, AdministrationOffice, OfficeHours, OfficeService, Appointment

class OfficeHoursInline(admin.TabularInline):
    model = OfficeHours
    extra = 0

class OfficeServiceInline(admin.TabularInline):
    model = OfficeService
    extra = 0

class OfficeCategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'description')
    search_fields = ('name', 'description')

class AdministrationOfficeAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'city', 'phone', 'is_active')
    list_filter = ('category', 'city', 'is_active')
    search_fields = ('name', 'description', 'address_line1', 'city')
    inlines = [OfficeHoursInline, OfficeServiceInline]

class AppointmentAdmin(admin.ModelAdmin):
    list_display = ('user', 'office', 'service', 'appointment_date', 'appointment_time', 'status')
    list_filter = ('status', 'appointment_date', 'office')
    search_fields = ('user__email', 'office__name', 'service__title')
    date_hierarchy = 'appointment_date'

admin.site.register(OfficeCategory, OfficeCategoryAdmin)
admin.site.register(AdministrationOffice, AdministrationOfficeAdmin)
admin.site.register(Appointment, AppointmentAdmin)
