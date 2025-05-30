from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db.models import Q
import logging
from urllib.parse import unquote
from .models import (
    ProcedureCategory,
    ProcedureSubCategory,
    Procedure,
    DocumentCategory,
    Document
)
from .serializers import (
    ProcedureCategorySerializer,
    ProcedureSubCategorySerializer,
    ProcedureSerializer,
    DocumentCategorySerializer,
    DocumentSerializer
)

logger = logging.getLogger(__name__)

# Create your views here.

@api_view(['GET'])
def get_top_categories(request):
    categories = ProcedureCategory.objects.all()[:5]
    serializer = ProcedureCategorySerializer(categories, many=True)
    return Response(serializer.data)

class ProcedureCategoryViewSet(viewsets.ModelViewSet):
    serializer_class = ProcedureCategorySerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        queryset = ProcedureCategory.objects.all()
        name = self.request.query_params.get('name', None)
        
        # Log all categories in the database
        all_categories = list(queryset.values_list('name', flat=True))
        logger.info(f"All categories in database: {all_categories}")
        
        if name is not None:
            # Decode the URL-encoded name
            decoded_name = unquote(name)
            logger.info(f"Searching for category with name: {decoded_name}")
            
            # Try exact match first
            queryset = queryset.filter(name=decoded_name)
            if queryset.exists():
                logger.info(f"Found exact match for category: {decoded_name}")
            else:
                # If no results, try contains
                logger.info(f"No exact match found, trying contains search")
                queryset = ProcedureCategory.objects.filter(name__icontains=decoded_name)
                if queryset.exists():
                    logger.info(f"Found partial match for category: {decoded_name}")
                else:
                    logger.info(f"No matches found for category: {decoded_name}")
        
        # Log the final queryset
        result_categories = list(queryset.values_list('name', flat=True))
        logger.info(f"Final queryset categories: {result_categories}")
        
        return queryset

class ProcedureSubCategoryViewSet(viewsets.ModelViewSet):
    queryset = ProcedureSubCategory.objects.all()
    serializer_class = ProcedureSubCategorySerializer
    permission_classes = [AllowAny]

class ProcedureViewSet(viewsets.ModelViewSet):
    queryset = Procedure.objects.all()
    serializer_class = ProcedureSerializer
    permission_classes = [AllowAny]

class DocumentCategoryViewSet(viewsets.ModelViewSet):
    serializer_class = DocumentCategorySerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        queryset = DocumentCategory.objects.all()
        name = self.request.query_params.get('name', None)
        
        if name:
            # Decode the URL-encoded name
            decoded_name = unquote(name)
            queryset = queryset.filter(name=decoded_name)
        
        # Prefetch related documents to optimize the query
        return queryset.prefetch_related('documents')

class DocumentViewSet(viewsets.ModelViewSet):
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer
    permission_classes = [AllowAny]
