from django.contrib import admin
from django.utils.html import format_html
from .models import ContentCategory, FAQ, HelpArticle, LegalContent

class ContentCategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'description')
    search_fields = ('name', 'description')

class FAQAdmin(admin.ModelAdmin):
    list_display = ('question', 'category', 'order', 'is_published')
    list_filter = ('category', 'is_published')
    search_fields = ('question', 'answer')
    list_editable = ('order', 'is_published')

class HelpArticleAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'slug', 'is_published', 'updated_at')
    list_filter = ('category', 'is_published')
    search_fields = ('title', 'content')
    prepopulated_fields = {'slug': ('title',)}

class LegalContentAdmin(admin.ModelAdmin):
    list_display = ('title', 'content_type', 'version', 'is_current', 'effective_date')
    list_filter = ('content_type', 'is_current')
    search_fields = ('title', 'content')
    list_editable = ('is_current',)

admin.site.register(ContentCategory, ContentCategoryAdmin)
admin.site.register(FAQ, FAQAdmin)
admin.site.register(HelpArticle, HelpArticleAdmin)
admin.site.register(LegalContent, LegalContentAdmin)
