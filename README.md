# Django Powered Photo Editor

photo-editing
[![Coverage Status](https://coveralls.io/repos/github/andela-snwuguru/photo-editing/badge.svg?branch=master)](https://coveralls.io/github/andela-snwuguru/photo-editing?branch=master)  [![Build Status](https://travis-ci.org/andela-snwuguru/photo-editing.svg?branch=master)](https://travis-ci.org/andela-snwuguru/photo-editing)

Image speaks louder than voice. Photo editor gives you the opportunity to express your creativity and share it with the world.

### Technology used

- Django - Easy and faster way to build better web applications.
- Djangorestframework - Django REST framework is a powerful and flexible toolkit for building Web APIs in Django powered apps.
- React JS - A JavaScript library for building user interfaces
- Bootstrap - A powerful mobile first front-end framework for faster and easier web development.

### Features
Photo editor provides you with several image manipulation options

- Enhance image brightness, contrast, color and sharpness
- Apply filters such as blur, contour, edge enhancement, emboss etc.
- Transform tools such as flip and rotate
- Effects such as colorize, posterize, quantize and more

### How to use

To install and run this application locally, you need to have python installed on your machine.

#### Installation

To install the build locally

- `` $ git clone https://github.com/andela-snwuguru/photo-editing.git ``
- `` $ cd photo-editing ``
- `` $ pip install -r requirements.txt ``

#### Set Up your environment key

#### photo-editing/app/app/develop.py

Develop.py file is required to get the database configuration. See content below
```
import os, sys
BASE_DIR = os.path.dirname(os.path.dirname(__file__))
SECRET_KEY = 'your secret key here'
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'testdb.sqlite3') if 'test' in sys.argv else os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}
DEBUG = True

 ```

#### photo-editing/.env.py
.env.py file is also required to configure secured information. See content below.

```
SECRET_KEY = "your-secret-code"
SOCIAL_AUTH_GOOGLE_OAUTH2_KEY = 'oauth2 key from google'
SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET = 'oauth2 secret from google'
SOCIAL_AUTH_FACEBOOK_KEY = 'app id'
SOCIAL_AUTH_FACEBOOK_SECRET = 'app secret'
SOCIAL_AUTH_TWITTER_KEY = 'customer key'
SOCIAL_AUTH_TWITTER_SECRET = 'customer secret'

```

#### Run your build

`` $ python app/manage.py makemigrations ``
`` $ python app/manage.py migrate ``
`` $ python app/manage.py runserver ``

#### Running the test

`` $ cd app && python manage.py test ``

### How to Contribute

This is an open source project, feel free to fork the repo, add functionality to the project and raise a pull request.