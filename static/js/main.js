'use strict';


(function (window, document, $) {
    // Formatting publication time
    function niceDateTime(rawTime) {
        var dateAndTime = rawTime.split('T');
        var date = dateAndTime[0].split('-').reverse().join('/');
        var time = dateAndTime[dateAndTime.length - 1].split('+')[0].split(':').splice(0, 2).join(':');
        return date + ' ' + time;
    }

    // Request to loading page
    function getReviews() {
        var results = $('.reviews');
        // Request to database
        var request = $.ajax({
            url: 'http://127.0.0.1:5000/review',
            crossDomain: true,
            method: 'GET',
            dataType: 'json'
        })
        // If a positive response came
        request.done(function(data, textStatus, jqXHR) {
            // Display blog using response data
            for (var i = 0; i < data.length; i++) {
                var review = $('<div>').addClass('review col-sm-5 col-md-3 card card-body');
                var title = $('<h3>').addClass('title card-title').text(data[i].title);
                var content = $('<p>').addClass('content card-text').text(data[i].content);
                var time = $('<p>').addClass('time card-text');
                time.append($('<span>').addClass('text-muted').text(niceDateTime(data[i].time)));

                review.append(title);
                review.append(content);
                review.append(time)

                results.append(review);
            }

            // Add input form as a reviw block using Bootstrap 4
            // Block
            var review = $('<div>').attr('id', 'review-form');
            results.append(review);
            $('#review-form').addClass('review col-sm-5 col-md-3 card card-body');
            // Title
            var inputTitle = $('<input>').attr('id', 'input-title');
            review.append(inputTitle);
            $('#input-title').addClass('card-title form-control');
            $('#input-title').attr('type', 'text').attr('name', 'title');
            // Text area
            var inputContent = $('<textarea>').attr('id', 'input-content');
            review.append(inputContent);
            $('#input-content').addClass('card-text form-control');
            $('#input-content').attr('name', 'content').attr('rows', '2');
            // Button
            var button = $('<button>').attr('id', 'send-btn');
            review.append(button);
            $('#send-btn').addClass('btn').text('send');

            // Append to template
            results.append(review);
        })
        // If a negative response came
        request.fail(function(jqXHR, textStatus, errorThrown) {
            alert('Server error!');
        })
    }

    // Request to posting review
    function postReview() {
        var titleField = $('#input-title').val()
        var contentField = $('#input-content').val()
        // Send form of user to server
        var request = $.ajax({
            url: 'http://127.0.0.1:5000/review',
            crossDomain: true,
            method: 'POST',
            dataType: 'json',
            data: {
                title: titleField,
                content: contentField
            },
        })
        // If a positive response came
        request.done(function(data, textStatus, jqXHR) {
            var results = $('.reviews');

            // Delete form
            var reviewForm = $('#review-form')
            $('#input-title').val('');
            $('#input-content').val('');
            reviewForm.remove()

            // Make new post
            var review = $('<div>').addClass('review col-sm-5 col-md-3 card card-body');
            var title = $('<h3>').addClass('title card-title').text(titleField);
            var content = $('<p>').addClass('content card-text').text(contentField);
            var time = $('<p>').addClass('time card-text');
            time.append($('<span>').addClass('text-muted').text('now'));

            // Add all
            review.append(title);
            review.append(content);
            review.append(time);
            results.append(review);
            results.append(reviewForm);
        })
        // If a negative response came
        request.fail(function(jqXHR, textStatus, errorThrown) {
            alert('Incorrect form!');
        })
    }

    // If the site is fully loaded
    $(document).ready(function() {
        getReviews();
        $('.reviews').on('click', '#send-btn', function() {
            postReview();
        })
    })
})(window, document, jQuery);
