// Simple functions for tracker.  More complicated
// functions are structured within Backbone

(function($) {
    'use strict';
     $(document).ready(function () {

        // User has chosen their mood by clicking select
        $('.btn-mood-select').click(function () {
            $.ajax({
                type:"POST",
                url:"/tracker",
                // replace with actual mood when available
                data:{ mood: Math.round(Math.random() * 10)}
            }).done(function (mood) {
                    $('.mood-feedback').html('You have rated your mood a ' + mood);
                });
        });

        // User is tagging mood
        $('.btn-tag').click(function () {
            $.ajax({
                type:"POST",
                url:"/tracker",
                // replace with actual mood when available
                data:{tagText: $('#feelings').val()}
            }).done(function (tagFeedback) {
                    $('.tag-feedback').html(tagFeedback);
                });
        });

    });
}(jQuery));
