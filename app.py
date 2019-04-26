# -*- coding: utf-8 -*-

from flask import Flask, request, render_template, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow

import config
import json

from crossdomain import crossdomain
from schemes.initialize import *


# Init app
app = Flask(__name__, template_folder='templates')
app.config.from_object(config)
# Init db
db = SQLAlchemy(app)
# Init ma
ma = Marshmallow(app)


# # Show all reviews
# @app.route('/')
# def index():
#     return render_template('index.html')

# Get all reviews
@app.route('/review', methods=['GET'])
@crossdomain('*')
def get_reviews():
    from models import Review

    reviews = Review.query.order_by(Review.time).all()
    result = reviews_schema.dump(reviews)

    return jsonify(result.data)

# Create new review
@app.route('/review', methods=['POST'])
@crossdomain('*')
def create_comment():
    from models import Review
    from forms import ReviewForm

    form = ReviewForm(request.form)

    if form.validate():
        review = Review(**form.data)
        db.session.add(review)
        db.session.commit()

        reviews = Review.query.order_by(Review.time).all()
        result = reviews_schema.dump(reviews)
        return jsonify(result.data)
    else:
        result = {'status': 'error'}
        result.status_code = 500
        return jsonify(result)

# Run server
if __name__ == '__main__':
    from models import *

    db.create_all()

    app.run()
