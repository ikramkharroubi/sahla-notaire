from django.utils.translation import gettext_lazy as _
from django.urls import reverse
from admin_tools.dashboard import modules, Dashboard, AppIndexDashboard

class CustomIndexDashboard(Dashboard):
    """
    Custom index dashboard for CivicEase.
    """
    def init_with_context(self, context):
        # User stats module
        self.children.append(modules.ModelList(
            _('User Management'),
            models=('users.models.*',),
        ))
        
        # Documents module
        self.children.append(modules.ModelList(
            _('Document Management'),
            models=('documents.models.*',),
        ))
        
        # Services module
        self.children.append(modules.ModelList(
            _('Service Management'),
            models=('services.models.*',),
        ))
        
        # Business module
        self.children.append(modules.ModelList(
            _('Business Management'),
            models=('business.models.*',),
        ))
        
        # Administration offices module
        self.children.append(modules.ModelList(
            _('Administration Offices'),
            models=('administration.models.*',),
        ))
        
        # Applications module
        self.children.append(modules.ModelList(
            _('Applications'),
            models=('applications.models.*',),
        ))
        
        # Content module
        self.children.append(modules.ModelList(
            _('Content Management'),
            models=('content.models.*',),
        ))
        
        # Recent actions module
        self.children.append(modules.RecentActions(_('Recent Actions'), 10))
