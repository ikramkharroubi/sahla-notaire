from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes, renderer_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer

@api_view(['GET'])
@permission_classes([AllowAny])
@renderer_classes([JSONRenderer, BrowsableAPIRenderer])
def api_root(request, format=None):
    """
    CivicEase API root - provides links to all available endpoints
    """
    try:
        data = {
            'admin': reverse('admin:index', request=request, format=format),
            'auth': {
                'login': reverse('token_obtain_pair', request=request, format=format),
                'refresh': reverse('token_refresh', request=request, format=format),
            },
            'documents': reverse('document-list', request=request, format=format),
            'procedures': reverse('procedure-list', request=request, format=format),
            'categories': reverse('service-category-list', request=request, format=format),
            'content': reverse('helparticle-list', request=request, format=format),
        }
        
        # If format is None or HTML, return Response for browsable API
        if not format or format.lower() == 'html':
            return Response(data)
        
        # Otherwise return JsonResponse
        return JsonResponse(data)
    except Exception as e:
        # Fallback to simple JSON response if anything fails
        return JsonResponse({
            'error': 'An error occurred while generating the API root.',
            'detail': str(e)
        })
