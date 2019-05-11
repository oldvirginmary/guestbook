# -*- coding: utf-8 -*-

from schemes.schemes import ReviewSchema

# Initialize scheme
reviews_schema = ReviewSchema(many=True, strict=True)
