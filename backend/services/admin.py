from django.contrib import admin
from .models import ServiceCategory, Service, ServiceRequirement, ServiceFee, ServiceRating, ServiceReview

class ServiceRequirementInline(admin.TabularInline):
    model = ServiceRequirement
    extra = 0

class ServiceFeeInline(admin.TabularInline):
    model = ServiceFee
    extra = 0

class ServiceRatingInline(admin.TabularInline):
    model = ServiceRating
    extra = 0
    readonly_fields = ('user', 'rating', 'created_at')

class ServiceReviewInline(admin.TabularInline):
    model = ServiceReview
    extra = 0
    readonly_fields = ('user', 'rating', 'review_text', 'created_at')

class ServiceCategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'parent', 'description')
    search_fields = ('name', 'description')
    list_filter = ('parent',)

class ServiceAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'processing_time', 'is_online', 'updated_at')
    list_filter = ('category', 'is_online', 'updated_at')
    search_fields = ('title', 'description')
    inlines = [ServiceRequirementInline, ServiceFeeInline, ServiceRatingInline, ServiceReviewInline]

admin.site.register(ServiceCategory, ServiceCategoryAdmin)
admin.site.register(Service, ServiceAdmin)
