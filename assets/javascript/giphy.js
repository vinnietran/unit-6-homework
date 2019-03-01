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
      var rating = (response.data[i].rating);
      var ratingDiv = $("<div>");
      ratingDiv.addClass("rating");

      var p = $("<p>").text("Rating: " + rating);

      var img = $('<img />');
      img.addClass("gif");
      img.attr("src", still);
      img.attr("data-still", still);
      img.attr("data-animate", gif);
      img.attr("data-state", "still");

      ratingDiv.append(p);
      ratingDiv.append(img);

      $("#gif-row-1").prepend(ratingDiv);
    }

    //on click function that swaps the attributes to start and stop the gif movement 
    $(".gif").on("click", function () {
      var state = $(this).attr("data-state");

      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });
  })

  //emptying out the gifs each time a new button is clicked
  $("#gif-row-1").empty();
}
//End Get

//Function to display buttons on page load based on the array
function renderButtons() {

  $("#buttons").empty();

  // Looping through the array of topics
  for (var i = 0; i < topics.length; i++) {

    var gifButton = $("<button>");
    gifButton.addClass("animal-btn");
    gifButton.addClass("btn btn-primary")
    gifButton.attr("data-name", topics[i]);
    gifButton.text(topics[i]);
    $("#buttons").append(gifButton);
  }
}

//on click function that adds user input to a new button and displays it on page
$("#add-animal").on("click", function (event) {
  event.preventDefault();

  var newAnimal = $("#animal-input").val().trim();
  if (newAnimal == "") {
    return false; // no blanks
  }
  topics.push(newAnimal);

  renderButtons();
});

//any time a button is clicked the displayAnimal function will be called 
$(document).on("click", ".animal-btn", displayAnimal);
renderButtons();

