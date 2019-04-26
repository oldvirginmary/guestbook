# -*- coding: utf-8 -*-

from app import ma

# Scheme for jsonify responds
class ReviewSchema(ma.Schema):
    class Meta:
        fields = ('id', 'title', 'content', 'time')
