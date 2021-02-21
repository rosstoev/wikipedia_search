$(document).ready(function () {
    $('.button-random').click(function (e) {
        e.preventDefault();
       open('https://en.wikipedia.org/wiki/Special:Random');
    });
    $(".main-search").autocomplete({
        source: function(request, response) {
            console.log(request);
            $.ajax({
                type: "GET",
                url: "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + request.term + "&format=json&callback?",
                dataType: "jsonp",
                success: function(data) {
                    response(data[1]);
                },
            });
        },
        select: function(event, ui) {
            $(".main-search").val(ui.item.value);
            $(".main-form").submit();
        }
    });
    $(".main-search").keypress(function(e){
        if (!e) e = window.event;
        if (e.keyCode == "13"){
            $(".main-search").autocomplete("close");
            $(".main-form").submit();
            return false;
        }
    });
    $(".main-form").submit(function(event) {
        event.preventDefault();
    });

    $('.button-search').click(function (e) {
        e.preventDefault();
        var userSearch = $('.main-search').val();

        $.ajax({
            url: "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + userSearch + "&format=json&callback?",
            dataType: 'jsonp',
            success: function (data) {
                $('.main-temp-result').html('');
                for (var i = 0; i < data[1].length; i++ ){
                    var title = data[1][i];
                    var content = data[2][i];
                    $('.main-temp-result').append('<div class="result"><a target="_blank" href="https://en.wikipedia.org/wiki/' + title + '">' +
                        '<h2>'+ title + '</h2></a>'
                    + '<p>'+ content + '</p></div>');
                }
            }
        });
    });
});