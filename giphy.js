//key = 8pemrvuSKupdseSNZfCRtR9FHqP7G66T

var topics = ["Zebra", "Giraffe", "Elephant", "Horse", "Lion", "Cow", "Pig", "Dog", "Deer", "Cat", "Tiger"];


function displayAnimal() {

  var animal = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=8pemrvuSKupdseSNZfCRtR9FHqP7G66T&q="
    + animal + "&limit=10&offset=0&rating=PG&lang=en"

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {


    for (var i = 0; i < response.data.length; i++) {

      var still = response.data[i].images.fixed_height_still.url;

      var gif = response.data[i].images.fixed_height.url;

      var ratingDiv = $("<div id='rating'>");

      var rating = (response.data[i].rating);

      var gifsDiv = $("<div id='gifs'>");

      var p = $("<p>").text("Rating: " + rating);

      var img = $('<img />');
      img.addClass("gif");
      img.attr("src", still);
      img.attr("data-still", still);
      img.attr("data-animate", gif);
      img.attr("data-state", "still");

      $(gifsDiv).append(img);

      // gifsDiv.prepend(p);


      $("#gif-row-1").append(gifsDiv);


      //img.appendTo($('#gif-row-1'));

      /*$(gifsDiv).append(img);
      $(ratingDiv).append(rating);
      $(gifsDiv).append(ratingDiv);
      $("#gif-row-1").append(gifsDiv);*/


    }


    $(".gif").on("click", function () {
      // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
      var state = $(this).attr("data-state");
      // If the clicked image's state is still, update its src attribute to what its data-animate value is.
      // Then, set the image's data-state to animate
      // Else set src to the data-still value
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });

    console.log(response);
    console.log(rating);
  })
  $("#gif-row-1").empty();
}


//End GEt

function renderButtons() {

  // Deleting the movies prior to adding new movies
  // (this is necessary otherwise you will have repeat buttons)
  $("#buttons").empty();

  // Looping through the array of movies
  for (var i = 0; i < topics.length; i++) {

    // Then dynamicaly generating buttons for each movie in the array
    // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
    var a = $("<button>");
    // Adding a class of movie-btn to our button
    a.addClass("animal-btn");
    // Adding a data-attribute
    a.attr("data-name", topics[i]);
    // Providing the initial button text
    a.text(topics[i]);
    // Adding the button to the buttons-view div
    $("#buttons").append(a);


  }

}
$("#add-animal").on("click", function (event) {
  event.preventDefault();
  // This line grabs the input from the textbox
  var newAnimal = $("#animal-input").val().trim();

  // Adding movie from the textbox to our array
  topics.push(newAnimal);

  renderButtons();
});

$(document).on("click", ".animal-btn", displayAnimal);

// Calling renderButtons which handles the processing of our movie array
renderButtons();

