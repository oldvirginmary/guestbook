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
                var title = $('<h3>').text(data[i].title);
                var content = $('<p>').text(data[i].content);

                results.append(title);
                results.append(content);
            }
        })

        request.fail(function(jqXHR, textStatus, errorThrown) {
            console.log('request fail');
        })
    }

    function postReview() {
        var request = $.ajax({
            url: 'http://127.0.0.1:5000/review',
            crossDomain: true,
            method: 'POST',
            dataType: 'json',
            data: $('#review-form').serialize()
        })

        request.done(function(data, textStatus, jqXHR) {
            alert('done!');
        })

        request.fail(function(jqXHR, textStatus, errorThrown) {
            alert('fail!');
        })
    }



    $(document).ready(function() {
        getReviews();

        $('#send').click(function() {
            postReview();
        })
    })
})(window, document, jQuery);
