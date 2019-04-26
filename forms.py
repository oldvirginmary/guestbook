# -*- coding: utf-8 -*-

from wtforms_alchemy import ModelForm

from models import Review


class ReviewForm(ModelForm):
    class Meta:
        model = Review
