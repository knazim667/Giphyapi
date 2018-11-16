
var animals = ["Cat","Dog", "Bird", "Tiger", "Lion", "Elephant", "Pig", "Horse", "Goat", "Bear"];


//$("#animal-view").on("click", function(event){
    $(document).on('click', '.btn-animal', function() {
        var animal = $(this).attr('data-name')
   
    console.log(animal);
  
    
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=Y5MNOyYYTBkGUZZvgCze54053mci3V8t&limit=10";

    console.log(queryURL);
    
    $.ajax({
        
        url: queryURL,
        method: "GET"
    }).then(function(response){
     
        $('#gifs-appear-here').empty();
        var result = response.data;
        
        if (result == ''){
            alert('There isnt a gif for this Selected Button');
        }
       for (var i= 0; i < result.length; i++) {
           
           if(result[i].rating !== "r" && result[i].rating !== "pg-13"){
               
               var gifDiv = $("<div class='col-md-4'>");
               
               
               var rating = result[i].rating;
               
               var p = $("<p>").text("Rating: " + rating);
               
               var animalImage = $("<img id='gif'>  <br>");
             
               
               animalImage.attr("src", result[i].images.fixed_height_still.url);
               animalImage.attr("data-still", result[i].images.fixed_height_still.url);
               animalImage.attr("data-animate", result[i].images.fixed_height.url);
               animalImage.attr("data-state", "still");
               animalImage.attr("alt", "animal Image");
               animalImage.addClass("image");
           
               gifDiv.append(p);
               gifDiv.append(animalImage);
               
               $("#gifs-appear-here").prepend(gifDiv)
               /*$("#gif").on('click' , function(){
                   $(this).attr('src', src.replace(result[i].images.fixed_height.url));
               });*/
               
                
            
               
               
           }
       }
        
    });
    
});

$(document).on('click', '.image', function() {
    var state = $(this).attr('data-state');
  if( state == 'still'){
      $(this).attr('src', $(this).data('animate'));
      $(this).attr('data-state', 'animate');
  }
  else {
      $(this).attr('src', $(this).data('still'));
      $(this).attr('data-state', 'still');
  }
   });            
            



function renderButtons(){
    
    $("#animal-view").empty();
    
    for(var i = 0; i < animals.length; i++) {
    
    var a = $("<button>");
    a.addClass("btn btn-info btn-animal");
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

