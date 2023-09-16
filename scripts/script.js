// API
var baseUrl = 'https://kanjiapi.dev/v1/kanji/grade-';

// Lazy Loading
const itemsPerPage = 10; // Number of items to load at a time
let currentPage = 1; // Current page of items

// Btns
function onClickShowGradeBtn() {
    // OnClick Any Show Grade button
    $('button').on('click', function() {
        reset();

        $('#loadingAnimation').show();
        $('#reset').show();

         // Get the ID of the clicked button
        var selectedId = $(this).attr('id');
        var gradeNo = selectedId.charAt(selectedId.length - 1);
        console.log(selectedId);
        var dynamicUrl = baseUrl + gradeNo;
        
        $.get(dynamicUrl, function(responseData) {
            // Append each value under Ul
            $.each(responseData, function(index, value) {
                $('#displayList').append('<div class="displayItems">' + value + '</div>');
            })

            $('#'+selectedId).addClass('btn-active');

            $('#loadingAnimation').hide();
        })
        .fail(function() {
            alert("Error occurred.");
            $('#loadingAnimation').hide();
        });
    })
}
function onClickReset() {
    $('#reset').on('click', function() {
        reset();
    })
}
function reset() {
    // 1. Hide reset word
    $('#reset').hide();

    // 2. Reset list
    $('#displayList').empty();

    // 3. Change back all Show Grade btn
    $('button').removeClass('btn-active');
}

// Lazy Loading
function loadItems() {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const itemsToDisplay = items.slice(startIndex, endIndex);

    const itemContainer = $('#item-container');

    $.each(itemsToDisplay, function(index, item) {
        const itemElement = $('<div>').text(item);
        itemContainer.append(itemElement);
    });

    currentPage++;

    if (currentPage * itemsPerPage >= items.length) {
        // All items have been loaded
        $('#loadingAnimation').hide();
    }
}
function checkScroll() {
    const itemContainer = $('#item-container');
    const loader = $('#loadingAnimation');

    if (
        itemContainer &&
        loader &&
        $(window).scrollTop() + $(window).height() >= itemContainer.height() + itemContainer.offset().top
    ) {
        // User has scrolled to the bottom
        loader.show();
        loadItems();
    }
}




$(document).ready(function() {
    // Btns
    onClickShowGradeBtn();
    onClickReset();

     // Initial load
     loadItems();

     // Add scroll event listener to trigger lazy loading
     $(window).on('scroll', checkScroll);
});