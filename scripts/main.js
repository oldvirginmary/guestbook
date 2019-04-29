'use strict';

(function (window, document, $) {
    function getReviews() {
        var results = $('.reviews');

        var request = $.ajax({
            url: 'http://127.0.0.1:5000/review',
            crossDomain: true,
            method: 'GET',
            dataType: 'json'
        })

        request.done(function(data, textStatus, jqXHR) {
            for (var i = 0; i < data.length; i++) {
                var review = $('<div>').addClass('review col-3 card card-body');
                var title = $('<h3>').addClass('title card-title').text(data[i].title);
                var content = $('<p>').addClass('content card-text').text(data[i].content);
                var time = $('<p>').addClass('time card-text');
                time.append($('<span>').addClass('text-muted').text(data[i].time));

                review.append(title);
                review.append(content);
                review.append(time)

                results.append(review);
            }

            // Add input form as a review
            var review = $('<div>').attr('id', 'review-form');
            results.append(review);
            $('#review-form').addClass('review col-3 card card-body');

            var inputTitle = $('<input>').attr('id', 'input-title');
            review.append(inputTitle);
            $('#input-title').addClass('card-title form-control');
            $('#input-title').attr('type', 'text').attr('name', 'title');

            var inputContent = $('<textarea>').attr('id', 'input-content');
            review.append(inputContent);
            $('#input-content').addClass('card-text form-control');
            $('#input-content').attr('name', 'content').attr('rows', '2');

            var button = $('<button>').attr('id', 'send-btn');
            review.append(button);
            $('#send-btn').addClass('btn').text('send');

            results.append(review);
            //
        })

        request.fail(function(jqXHR, textStatus, errorThrown) {
            console.log('request fail');
        })
    }

    function postReview() {
        var titleField = $('#input-title').val()
        var contentField = $('#input-content').val()

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

        request.done(function(data, textStatus, jqXHR) {
            var results = $('.reviews');

            var review = $('<div>').addClass('review row card card-body');
            var title = $('<h3>').addClass('title card-title').text(titleField);
            var content = $('<p>').addClass('content card-text').text(contentField);
            var time = $('<p>').addClass('time card-text');
            time.append($('<span>').addClass('text-muted').text('now'));

            review.append(title);
            review.append(content);
            review.append(time);
            results.append(review);

            $('#input-title').val('');
            $('#input-content').val('');

            alert('done!');
        })

        request.fail(function(jqXHR, textStatus, errorThrown) {
            alert('fail!');
        })
    }



    $(document).ready(function() {
        getReviews();
        // $('#send-btn').click(function() {
        //     console.log('post')
        //     postReview();
        // })
        $('.reviews').on('click', '#send-btn', function() {
            postReview();
        })
    })
})(window, document, jQuery);
