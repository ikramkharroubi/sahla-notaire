from django.contrib import admin
from django.utils.html import format_html
from django.urls import reverse
from django.contrib.auth.admin import UserAdmin
from .models import User, UserProfile, Address, Verification

# Change admin site title, header, and index title
admin.site.site_title = "CivicEase Admin"
admin.site.site_header = "CivicEase Administration"
admin.site.index_title = "Administration Dashboard"

class UserProfileInline(admin.StackedInline):
    model = UserProfile
    can_delete = False
    verbose_name_plural = 'Profile'

class AddressInline(admin.TabularInline):
    model = Address
    extra = 0

class CustomUserAdmin(UserAdmin):
    list_display = ('email', 'username', 'first_name', 'last_name', 'user_type', 'is_verified', 'is_staff')
    list_filter = ('user_type', 'is_verified', 'is_staff', 'date_joined')
    search_fields = ('email', 'username', 'first_name', 'last_name')
    ordering = ('-date_joined',)
    
    fieldsets = (
        (None, {'fields': ('email', 'username', 'password')}),
        ('Personal info', {'fields': ('first_name', 'last_name')}),
        ('Permissions', {'fields': ('user_type', 'is_verified', 'is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )
    
    inlines = [UserProfileInline, AddressInline]

class VerificationAdmin(admin.ModelAdmin):
    list_display = ('user', 'type', 'created_at', 'expires_at', 'is_used')
    list_filter = ('type', 'is_used')
    search_fields = ('user__email', 'user__username')

admin.site.register(User, CustomUserAdmin)
admin.site.register(Verification, VerificationAdmin)
