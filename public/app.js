//Grab the headlines as a json
$.getJSON("/headlines", function(data) {
	//For each one
	for (var i = 0; i < data.length; i++) {
		//Display the informaiton on the page
		$("#articles").append("<p data-id='" + data[i]._id + "'>" 
			+ data[i].title + "<br />" + data[i].link + "</p>");
	}
});

//Whenever someone clicks a p tag
$(document).on("click", "p", function() {
	//save the id from the p tag
	var thisId = $(this).attr("data-id");

	//Make an AJAX call for the article
	$.ajax({
		method:"GET", 
		url: "/headlines/" + thisId	})

	//With that done, add the note information to the page
	.then(function(data) {
		console.log(data);
		//The title of the headline
		$("#notes").append("<h2>" + data.title + "</h2>");
		//An input to enter a new title
		$("notes").append("<input id= 'titleinput' name='title' >");
		//A textarea to add a new note body
		$("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
		//A button gto submit a new note, with the id of the headline saved
		$("#notes").append("<button data-id='" + data._id + "' id=' savenote'>Save Note</button>");

		//If there's a note in the article
		if (date.note) {
			//Place the title of the note in the title input
			$("titleinput").val(data.note.title);
			//Place the body of the note in the body textarea
			$("#bodyinput").val(data.note.body);
		}
	});
});

//When you click on the savenote button
$(document).on('click', "#savenote", function() {
	//Grab the id associated with the article form the submit button
	var thisId = $(this).attr("data-id");

	//Run a POST request to change the note, using what's enetered in the inputs
	$.ajax({
		method:"POST",
		url:"/headlines/" + thisId,
		data: {
			//value taken from title input
			title: $("#titleinput").val(),
			//Value taken from note textarea
			body: $("#bodyinput").val()
		}
	})
	//With that done
	.then(function(data) {
		//log the response
		console.log(data);
		//Empty the notes section
		$("#notes").empty();
	});

	//Also, remove the values entered in the input and textarea for note entry
	$("#titleinput").val("");
	$("#bodyinput").val("");
});