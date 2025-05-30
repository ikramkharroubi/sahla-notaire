from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    ProcedureCategoryViewSet,
    ProcedureSubCategoryViewSet,
    ProcedureViewSet,
    DocumentCategoryViewSet,
    DocumentViewSet,
    get_top_categories
)

router = DefaultRouter()
router.register(r'procedures/categories', ProcedureCategoryViewSet, basename='procedure-category')
router.register(r'procedures/subcategories', ProcedureSubCategoryViewSet, basename='procedure-subcategory')
router.register(r'procedures', ProcedureViewSet, basename='procedure')
router.register(r'document-categories', DocumentCategoryViewSet, basename='document-category')
router.register(r'documents', DocumentViewSet, basename='document')

urlpatterns = [
    path('', include(router.urls)),
    path('top-categories/', get_top_categories, name='top-categories'),
] 