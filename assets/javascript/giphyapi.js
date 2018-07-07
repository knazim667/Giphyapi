
var animals = ["Cat","Dog", "Bird", "Tiger", "Lion", "Elephant", "Pig", "Horse", "Goat", "Bear"];


$("#animal-view").on("click", function(){
    
 
    var animal = $(this).attr("data-animal");
    
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10";

    
    
    $.ajax({
        
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log(response);
        
        var result = response.data;
        console.log(result);
        
       for (var i= 0; i < result.length; i++) {
           
           if(result[i].rating !== "r" && result[i].rating !== "pg-13"){
               
               var gifDiv = $("<div class='col-md-4'>");
               console.log(gifDiv);
               
               var rating = result[i].rating;
               
               var p = $("<p>").text("Rating: " + rating);
               
               var animalImage = $("<img>  <br>");
             
               
               animalImage.attr("src", result[i].images.fixed_height.url);
               animalImage.attr("alt", "animal Image");
               var staticSrc = result[i].images.fixed_height_still.url;
               console.log(animalImage);
               
               gifDiv.append(p);
               gifDiv.append(animalImage);
               
               $("#gifs-appear-here").prepend(gifDiv)
           }
       }
        
    });
        
});




function renderButtons(){
    
    $("#animal-view").empty();
    
    for(var i = 0; i < animals.length; i++) {
    
    var a = $("<button>");
    a.addClass("btn btn-info");
    a.attr("data-name", animals[i]);
    a.text(animals[i]);
    $("#animal-view").append(a);
    
 }
}

$("#add-animal").on("click", function(event){
    
    event.preventDefault();
    
    var animal = $("#animal-input").val().trim();
    animals.push(animal);
    
    renderButtons();
});

renderButtons();

