var gradeOneUrl = 'https://kanjiapi.dev/v1/kanji/grade-1';

$(document).ready(function() {
    
    $('#btn1').on('click', function() {
        // alert( "ready!" );
        $.get(gradeOneUrl, function(responseData) {
            alert('Success');

            // Append each value under Ul
            $.each(responseData, function(index, value) {
                $('#displayList').append(value);
            })

            // Change button text
            $('#btn1').html('Showing Grade 1...')
            $('#btn1').css({'background-color': 'green', 'color': 'white'})
        })
        .fail(function() {
            alert("Error occurred.");
        });

    })


});