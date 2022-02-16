import os, sys
BASE_DIR = os.path.dirname(os.path.dirname(__file__))
import dj_database_url

if 'test' in sys.argv:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': os.path.join(BASE_DIR, 'testdb.sqlite3'),
        }
    }
    SECRET_KEY = "test-secret"
    DEBUG = True
else:
    DATABASES = {
        'default': dj_database_url.config()
    }
    DEBUG = True
