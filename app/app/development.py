import os, sys
BASE_DIR = os.path.dirname(os.path.dirname(__file__))

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'testdb.sqlite3') if 'test' in sys.argv else os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}

DEBUG = True
