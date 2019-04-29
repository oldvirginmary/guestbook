# -*- coding: utf-8 -*-

from app import db
from datetime import datetime

# Database table
class Review(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.String(255), nullable=False)
    content = db.Column(db.String(3000), nullable=False)
    time = db.Column(db.DateTime, default=datetime.utcnow)
