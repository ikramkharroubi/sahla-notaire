from django.core.management.base import BaseCommand
from procedures.models import (
    ProcedureCategory,
    ProcedureSubCategory,
    Procedure,
    DocumentCategory,
    Document
)
from django.core.files import File
import os
from django.conf import settings

class Command(BaseCommand):
    help = 'Populates the database with dummy data'

    def handle(self, *args, **kwargs):
        self.stdout.write('Creating dummy data...')

        # Create Procedure Categories
        categories = [
            {
                'name': 'Citizenship & Identity',
                'description': 'Procedures related to citizenship, national ID, and personal identification'
            },
            {
                'name': 'Education',
                'description': 'Procedures related to schools, universities, and educational institutions'
            },
            {
                'name': 'Healthcare',
                'description': 'Procedures related to hospitals, clinics, and medical services'
            }
        ]

        created_categories = []
        for cat_data in categories:
            category, created = ProcedureCategory.objects.get_or_create(
                name=cat_data['name'],
                defaults={'description': cat_data['description']}
            )
            created_categories.append(category)
            self.stdout.write(f'Created category: {category.name}')

        # Create Subcategories
        subcategories = [
            {
                'name': 'National ID',
                'description': 'Procedures for obtaining or renewing national ID',
                'category': created_categories[0]
            },
            {
                'name': 'Passport',
                'description': 'Procedures for passport application and renewal',
                'category': created_categories[0]
            },
            {
                'name': 'School Registration',
                'description': 'Procedures for registering in schools',
                'category': created_categories[1]
            },
            {
                'name': 'University Admission',
                'description': 'Procedures for university admission',
                'category': created_categories[1]
            },
            {
                'name': 'Health Insurance',
                'description': 'Procedures for health insurance registration',
                'category': created_categories[2]
            },
            {
                'name': 'Medical Certificates',
                'description': 'Procedures for obtaining medical certificates',
                'category': created_categories[2]
            }
        ]

        created_subcategories = []
        for subcat_data in subcategories:
            subcategory, created = ProcedureSubCategory.objects.get_or_create(
                name=subcat_data['name'],
                category=subcat_data['category'],
                defaults={'description': subcat_data['description']}
            )
            created_subcategories.append(subcategory)
            self.stdout.write(f'Created subcategory: {subcategory.name}')

        # Create Procedures
        procedures = [
            {
                'title': 'New National ID Application',
                'introduction': 'Process for obtaining a new national ID card',
                'notes': 'Make sure to bring all required documents',
                'required_documents': '1. Birth Certificate\n2. Proof of Residence\n3. Passport Photos',
                'steps': [
                    {'step': 1, 'description': 'Fill out the application form'},
                    {'step': 2, 'description': 'Submit required documents'},
                    {'step': 3, 'description': 'Pay the application fee'},
                    {'step': 4, 'description': 'Wait for processing'},
                    {'step': 5, 'description': 'Collect your ID card'}
                ],
                'fees': '50 USD',
                'subcategory': created_subcategories[0]
            },
            {
                'title': 'Passport Renewal',
                'introduction': 'Process for renewing an expired passport',
                'notes': 'Start the process at least 3 months before expiration',
                'required_documents': '1. Current Passport\n2. National ID\n3. Passport Photos',
                'steps': [
                    {'step': 1, 'description': 'Complete the renewal form'},
                    {'step': 2, 'description': 'Submit current passport'},
                    {'step': 3, 'description': 'Pay renewal fee'},
                    {'step': 4, 'description': 'Wait for processing'},
                    {'step': 5, 'description': 'Collect new passport'}
                ],
                'fees': '100 USD',
                'subcategory': created_subcategories[1]
            },
            {
                'title': 'School Registration for New Students',
                'introduction': 'Process for registering new students in public schools',
                'notes': 'Registration period is typically in June',
                'required_documents': '1. Birth Certificate\n2. Previous School Records\n3. Vaccination Records',
                'steps': [
                    {'step': 1, 'description': 'Visit the school office'},
                    {'step': 2, 'description': 'Complete registration form'},
                    {'step': 3, 'description': 'Submit required documents'},
                    {'step': 4, 'description': 'Pay registration fee'},
                    {'step': 5, 'description': 'Receive school ID and schedule'}
                ],
                'fees': '25 USD',
                'subcategory': created_subcategories[2]
            }
        ]

        for proc_data in procedures:
            procedure, created = Procedure.objects.get_or_create(
                title=proc_data['title'],
                subcategory=proc_data['subcategory'],
                defaults={
                    'introduction': proc_data['introduction'],
                    'notes': proc_data['notes'],
                    'required_documents': proc_data['required_documents'],
                    'steps': proc_data['steps'],
                    'fees': proc_data['fees']
                }
            )
            self.stdout.write(f'Created procedure: {procedure.title}')

        # Create Document Categories
        doc_categories = [
            {
                'name': 'Application Forms',
                'description': 'Standard application forms for various procedures'
            },
            {
                'name': 'Certificates',
                'description': 'Various types of certificates and official documents'
            },
            {
                'name': 'Templates',
                'description': 'Template documents for common procedures'
            }
        ]

        created_doc_categories = []
        for doc_cat_data in doc_categories:
            doc_category, created = DocumentCategory.objects.get_or_create(
                name=doc_cat_data['name'],
                defaults={'description': doc_cat_data['description']}
            )
            created_doc_categories.append(doc_category)
            self.stdout.write(f'Created document category: {doc_category.name}')

        # Create Documents
        documents = [
            {
                'title': 'National ID Application Form',
                'description': 'Standard form for applying for a new national ID',
                'category': created_doc_categories[0],
                'is_template': True
            },
            {
                'title': 'Passport Renewal Form',
                'description': 'Form for renewing an expired passport',
                'category': created_doc_categories[0],
                'is_template': True
            },
            {
                'title': 'School Registration Form',
                'description': 'Form for registering new students',
                'category': created_doc_categories[0],
                'is_template': True
            }
        ]

        for doc_data in documents:
            document, created = Document.objects.get_or_create(
                title=doc_data['title'],
                category=doc_data['category'],
                defaults={
                    'description': doc_data['description'],
                    'is_template': doc_data['is_template']
                }
            )
            self.stdout.write(f'Created document: {document.title}')

        self.stdout.write(self.style.SUCCESS('Successfully populated database with dummy data')) 