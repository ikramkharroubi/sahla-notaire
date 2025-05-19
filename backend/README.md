# CivicEase Backend

A comprehensive Django backend for CivicEase, a platform designed to simplify administrative and government services for citizens and businesses in Morocco.

## Features

- User authentication with JWT tokens
- Document management system
- Service categories management
- Business registration and licensing
- Administration office locator
- Application processing system
- Content management (FAQs, Help Articles)

## Installation

1. Clone the repository
   ```
   git clone <repository-url>
   cd civicease-backend
   ```

2. Create a virtual environment
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies
   ```
   pip install -r requirements.txt
   ```

4. Apply migrations
   ```
   python manage.py migrate
   ```

5. Create a superuser
   ```
   python manage.py createsuperuser
   ```

6. Run the development server
   ```
   python manage.py runserver
   ```

## API Documentation

- Swagger UI: `/swagger/`
- ReDoc: `/redoc/`

## Project Structure

The project is organized into the following Django apps:

- `users`: User authentication and profiles
- `documents`: Document management
- `services`: Service categories
- `business`: Business registration and compliance
- `administration`: Government offices and appointments
- `applications`: Application processing
- `content`: FAQs and help articles

## License

Proprietary - All rights reserved
