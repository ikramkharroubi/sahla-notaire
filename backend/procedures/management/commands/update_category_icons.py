from django.core.management.base import BaseCommand
from procedures.models import ProcedureCategory

class Command(BaseCommand):
    help = 'Updates category icons'

    def handle(self, *args, **kwargs):
        # Map of category names to icon names
        icon_mapping = {
            'Citizenship & Identity': 'user-round',
            'Education': 'graduation-cap',
            'Healthcare': 'stethoscope',
            'Business': 'briefcase',
            'Housing': 'home',
            'Transportation': 'car',
            'Legal': 'scale',
            'Finance': 'wallet',
            'Environment': 'globe',
            'Waste Management': 'trash-2',
        }

        for category in ProcedureCategory.objects.all():
            if category.name in icon_mapping:
                category.icon_name = icon_mapping[category.name]
                category.save()
                self.stdout.write(f'Updated icon for category: {category.name}')
            else:
                self.stdout.write(f'No icon mapping found for category: {category.name}') 