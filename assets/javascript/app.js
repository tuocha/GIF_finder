var buttonArr = ["rat", "bull", "tiger", "rabbit", "dragon", "snake", "horse", "sheep", "monkey", "chicken", "dog", "pig"];

function buttonRender() {
    $("#button-container").empty();

    for (var i = 0; i < buttonArr.length; i++) {
        var b = $("<button>")
        b.text(buttonArr[i]);

        b.addClass("animalButton")
        b.attr("data-name", buttonArr[i])

        $("#button-container").append(b)
    }
}

$(document).on("click", ".animalButton", function () {
    var queryurl = "https://api.giphy.com/v1/gifs/search?"
    var APIkey = "api_key=J43PlJGClyJVinP4UOzWW0U2Dhq18ExH"
    var limit = "&limit=10"
    var language = "&lang=en"
    var searchTerm = "&q=" + $(this).attr("data-name")
    $("#images").empty();

    $.ajax({
        url: queryurl + APIkey + searchTerm + limit + language,
        method: "GET"
    }).then(function (response) {
        console.log(response)

        for (var i = 0; i < response.data.length; i++) {
            var imageURL = response.data[i].images.fixed_height.url;
            var animalHolder = $("<div>");
            var p = $("<p>").text("rating: " + response.data[i].rating)

            var animalGIF = $("<img>")

            console.log(imageURL)
            animalGIF.attr("src", imageURL)
            animalGIF.attr("data-state", "still")
            animalGIF.attr("data-animate", imageURL)
            animalGIF.attr("data-still", response.data[i].images.fixed_height_still.url)
            animalGIF.addClass("animalGIF")

            $(animalHolder).append(p)
            $(animalHolder).append(animalGIF)
            $("#images").append(animalHolder)
        }
    })
})

$(document).on("click", ".animalGIF", function () {

    var state = $(this).attr("data-animate")
    console.log(state)
    if (state !== "still") {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
    else {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    }



})

$("#add-button").on("click", function (event) {
    event.preventDefault();

    var input = $("#GIF-input").val().trim();
    buttonArr.push(input)

    buttonRender();
})

buttonRender();