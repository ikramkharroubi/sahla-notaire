from django.core.management.base import BaseCommand
from procedures.models import DocumentCategory

class Command(BaseCommand):
    help = 'Populates the database with document categories'

    def handle(self, *args, **kwargs):
        self.stdout.write('Creating document categories...')

        categories = [
            'Autorisations',
            'Résiliation de Contrat',
            'Contrats',
            'Demandes mariage',
            'Demandes banques',
            'Demandes impôts',
            'Plaintes',
            'Construire',
            'Services divers',
            'Renonciations',
            'Déclarations',
            'Eau et électricité',
            'État civil',
            'Engagements',
            'Résiliation dette',
            'Location locaux',
            'Demande/plainte',
            'Renonciation véhicules',
            'Renonciation plaintes',
            'Accidents route',
            'Assurance auto',
            'Assurance nationale',
            'Assurance moto',
            'Assurance Allianz',
            'Assurance santé',
            'Assurance médicale'
        ]

        for category_name in categories:
            category, created = DocumentCategory.objects.get_or_create(
                name=category_name,
                defaults={'description': f'Documents and administrative procedures for {category_name}'}
            )
            if created:
                self.stdout.write(self.style.SUCCESS(f'Created category: {category_name}'))
            else:
                self.stdout.write(self.style.WARNING(f'Category already exists: {category_name}'))

        self.stdout.write(self.style.SUCCESS('Successfully populated document categories')) 