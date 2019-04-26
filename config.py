# -*- coding: utf-8 -*-

DEBUG = True
SECRET_KEY = 'skey'

# Database settings:
SQLALCHEMY_DATABASE_URI = "postgresql://tceh:123@localhost/guestbook"
SQLALCHEMY_TRACK_MODIFICATIONS = False

WTF_CSRF_ENABLED = False
