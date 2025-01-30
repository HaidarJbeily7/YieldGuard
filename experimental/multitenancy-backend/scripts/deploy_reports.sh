#!/bin/bash

# Exit on error
set -e

echo "Deploying Reports Module..."

# Run migrations
python manage.py makemigrations reports
python manage.py migrate reports

# Collect static files
python manage.py collectstatic --noinput

# Clear cache
python manage.py clear_cache

# Restart Gunicorn
sudo systemctl restart gunicorn

echo "Reports Module deployed successfully!" 