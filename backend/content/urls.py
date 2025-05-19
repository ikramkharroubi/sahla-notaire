from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    ContentCategoryViewSet,
    FAQViewSet,
    HelpArticleViewSet,
    LegalContentViewSet
)

router = DefaultRouter()
router.register(r'categories', ContentCategoryViewSet)
router.register(r'faqs', FAQViewSet)
router.register(r'help', HelpArticleViewSet)
router.register(r'legal', LegalContentViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
