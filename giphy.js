//key = 8pemrvuSKupdseSNZfCRtR9FHqP7G66T

var topics = ["Zebra", "Giraffe", "Elephant", "Horse", "Lion", "Cow", "Pig", "Dog", "Deer", "Cat", "Tiger"];
displayAnimal()

function displayAnimal() {

var animal = "horse" //$(this).attr("data-name");

var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=8pemrvuSKupdseSNZfCRtR9FHqP7G66T&q=" 
+ animal + "&limit=10&offset=0&rating=PG&lang=en"

$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {

    for (var i = 0; i < response.data.length; i++){

    var gif = response.data[i].images.preview_gif.url; 

    
    var img = $('<img />', { 
        id: 'Myid',
        src: gif,
        alt: 'MyAlt'
      });
      img.appendTo($('#gif-row-1'));
    }

    //$("#gif-row-1").append(gif);

    console.log(response);

  })

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
renderButtons() 

}