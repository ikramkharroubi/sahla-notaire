#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys

# Add the project root directory to the Python path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

# Import and patch the compatibility functions
from django_utils import parse_header_parameters, parse_header, valid_boundary
import django.utils.http
import cgi

# Patch Django's http module
django.utils.http.parse_header_parameters = parse_header_parameters

# Patch the cgi module
cgi.parse_header = parse_header
cgi.valid_boundary = valid_boundary

def main():
    """Run administrative tasks."""
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'civicease.settings')
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    execute_from_command_line(sys.argv)

if __name__ == '__main__':
    main()
