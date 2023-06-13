from setuptools import setup, find_packages

setup(
    name='task-service',
    version='1.0',
    description='Task service for SKA',
    author='Amani Ben Hassine',
    author_email='amani.benhassine@esprit.tn',
    packages=find_packages(),
    install_requires=[
        'django',
        'djangorestframework',
        'django-cors-headers',
        'py-eureka-client',
        'psycopg2',
    ],
)
