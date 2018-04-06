//Click to scrape articles
$("#scrape").on("click", function(event) {
	//Before scrape, GET all articles currently in db
	$.ajax({
		method:"GET",
		url:"/all"
	})
	//with that done
	.then(function(data) {
		//log response
		console.log(data);


		$.ajax({
			method:"GET", 
			url:"/scrape"
		})
		//with that done
		.then(function(data) {
			console.log(data);
			//after scrape, GET all again 
			$.ajax({
				method:"GET",
				url:"/all"
			})
			.then(function(data) {
				console.log(data);
				//If using modal/alert
			})
		})
		$("#articles").append(data);
	});
});


//Click to save headlines
$("#save").on("click", function(event) {
	//Grab id associated with article
	var thisId = $(this).attr("data-id");
	//Add message that save was successful

	//update saved value to true
	$.ajax({
		method:"PUT",
		url:"/saveheadline/" + thisId
	})
	//with that done
	.then(function(data) {
		//log response
		console.log(data);
		//event on close of message
	});
});

//Click to remove save
$(".remove-save").on("click", function(event) {
	console.log("remove save clicked");
	//Grabe id associated with headline
	var thisId = $(this).attr("data-id");
	//Add message that save was removed or to confirm remove
	$.ajax({
		method:"PUT",
		url:"/unsaveheadline/" + thisId
	})
	//with that done
	.then(function(data) {
		//log response
		console.log(data);
		//reload page to get updated list of headlines
		location.reload();
	});
});

//Click to delete 
$(".delete").on("click", function(event) {
	console.log("delete clicked");
	var thisId = $(this).data("id");
	//confirm or success message
	$.ajax("/headlines/" + id, {
		type: "DELETE"
	}).then(
		function() {
			console.log(id + " deleted.");
			//reload page to get updated list of headlines
			location.reload();
		}
	);
});

//Add note
$(".add-note").on("click", function(event) {
	//save id from the leave comment button
	var thisId = $(this).data("id");
	$.ajax({
		method: "GET",
		url:"/notes/" + thisId
	})
	//with that done, add comment to page
	.then(function(data) {
		console.log(data);
		//Title of article
		$("#note-title").text("Leave a comment");
		//Button to submit, with id of article saved to it
		var submitNoteBtn = $("<button data-id =" + thisId);
		submitNoteBtn.data("modal").text("Add comment.");
		$(".note-footer").append(submitNoteBtn);

		//Add heading to article commments section
		var commentHead = $("<h4>");
		commentHead.text("Prior Commments");
		//If at least one comment, show comments to user
		$("#comments").append(commentHead);
		if (data.length) {
			console.log(data);
			//Place the notes in the comment section
			for (var i =0; i < data.length; i++) {
				var commentDiv = $("<div>");
				var commentNote = $("<p>");
				commentNote.text(data[i].body);
				commentDiv.append(commentNote);
				$("#comments").append(commentDiv);
				//Create delete button for comments
				var deleteComment = $("<button>");
				deleteComment.text(Delete). attr("id", data[i]._id);
				commentDiv.append(deleteComment);
			}
		}else {
			var noComments = $("<h4>");
			noCommments.text("No comments have been posted yet.")
		}
	});
});

//Save comment button
$("#save-comment").on ("click", function(event) {
	//get headline id
	var thisId = $(this).attr("data-id");
	//if comment empty alert user
	if(!$("#commentbody").val()) {
		var commentErr = $("<p>");
		commentErr.text("You must enter a comment to submit.");
		$(".form-group").append(commmentErr);
	}else {
		$.ajax({
			method:"POST", 
			url: "/notes",
			data: {
				body: $("#commentbody").val(), 
				headline: thisId
			}
		}).done(function(data) {
			//log response
			console.log(data);
			//empty values on submit
			// $("#commentbody").val("");
			// $("#comments").empty();
			// $

		});
	}
});

//Delete Comment
$(".delete-comment").on("click", function(event) {
	event.preventDefault();
	console.log("delete comment button clicked!");
	var id = $(this).attr("id");
	console.log(id);
	//Add confirm delete

	$.ajax("/notes/" + id, {
		type:"DELETE", 
	}).then(
		function() {
			console.log("deleted comment", id);
			//reload page to get updated list of saved comments
			locaiton.reload();
		}
	);
});











// $(document).on("click", "#scrape", function() {
// 	console.log("scrapping");
// 	$.get("api/scrape").then(function(res) {
// 		console.log(res);
// 		window.location.reload()
// 	})
// });

// $(document).on("click", "#save", function() {
// 	console.log("saving");
// });

// $(document).on("click", "headline", function() {
// 	$(this).addClass('active').siblings().removeClass('active');

// 	var thisId = $(this).attr('data-id');
// 	console.log(thisId);

// 	$.ajax({
// 		method:"GET",
// 		url:"/headlines/" + thisId
// 	})
// 	// With that done, add the note information to the page
// 	.then(function(data) {
// 		console.log(data);
// 		//An input to enter a new title
// 		$("#notes").append("<input id= 'titleinput' name='title' >");
// 		//A textarea to add a new note body
// 		$("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
// 		//A button gto submit a new note, with the id of the headline saved
// 		$("#notes").append("<button data-id='" + data._id + "' id=' savenote'>Save Note</button>");

// 		//If there's a not ein the article
// 		if (data.note) {
// 			//Place the title of the note in the title input
// 			$("#titleinput").val(data.note.title);
// 			//Place the body of the note in the body textarea
// 			#("bodyinput").val(data.note.body);
// 		}
// 	});
// });



// //When you click on the savenotebutton
// $(document).on("click", "#savenote", function() {
// 	//Grab id associated with the article from the submit button
// 	var thisId = $(this).atter("data-id");

// 	//Run a POST request to change the note using what's entered in the inputs
// 	$.ajax({
// 		method:"POST",
// 		url:"/headlines/" + thisId,
// 		data: {
// 			//Value taken from title input
// 			title:$("#titleinput").val(),
// 			//Value taken from note textarea
// 			body: $("bodyinput").val()
// 		}
// 	})
// 	//With that done
// 	.then(function(data) {
// 		//Log response
// 		console.log(data);
// 		//empty the notes section
// 		$("#notes").empty();
// 	});

// 	//Also remove values entered in inputs and textarea
// 	$("#titleinput").val("");
// 	$("#bodyinput").val("");

// });

// $(document).on("click", "#saved", function(req, res) {
// 	res.redirect("saved");
// })

// 	$.getJSON("/", function(data) {
// 		//For each one
// 		for (var i = 0; i < data.length; i++) {
// 			//Display the information on the page
// 			$("#saved").append("<div></p><p><img src='" + data[i].pic + 
// 				"<p class='title'>" + data[i].title + 
// 				"</p><p class='link'>www.eonline.com" + data[i].link + 
// 				"</p><button class='add-note'>Save Article</button><br/><br/>");
// 		}
// 	});

// //Whenever someone clicks the scrape button
// $(document).on("click", "#scrape", function() {
// 	$.getJSON("/scrape", function(data) {
// 		//For each one
// 		for (var i = 1; i < data.length; i++) {
// 			//Display the information on the page
// 			// $("#articles").prepend("<p><img src='" 
// 			// 	+ data[i].pic + "'></p><p class='title'>" 
// 			// 	+ data[i].title + "</p><a class='link' href='" + data[i].link + "'><p>www.eonline.com" 
// 			// 	+ data[i].link + "</p></a><button class='save-it'>Save Article</button><br/><br/>");
// 			console.log("scraping")

// 		}
// 	});
// });

	// //Make an AJAX call for the article
	// $.ajax({
	// 	method:"GET", 
	// 	url: "/headlines/"})

	// //With that done, add the note information to the page
	// .then(function(data) {
	// 	console.log(data);
	// 	//The title of the headline
	// 	$("#notes").append("<h2>" + data.title + "</h2>");
	// 	//An input to enter a new title
	// 	$("notes").append("<input id= 'titleinput' name='title' >");
	// 	//A textarea to add a new note body
	// 	$("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
	// 	//A button gto submit a new note, with the id of the headline saved
	// 	$("#notes").append("<button data-id='" + data._id + "' id=' savenote'>Save Note</button>");

	// 	// //If there's a note in the article
	// 	// if (date.note) {
	// 	// 	//Place the title of the note in the title input
	// 	// 	$("titleinput").val(data.note.title);
	// 	// 	//Place the body of the note in the body textarea
	// 	// 	$("#bodyinput").val(data.note.body);
	// 	// }
	// });
// });

//When you click on the savenote button
// $(document).on('click', "#saved", function() {
// 	//Grab the id associated with the article form the submit button
// 	var thisId = $(this).attr("data-id");

// 	//Run a POST request to change the note, using what's enetered in the inputs
// 	$.ajax({
// 		method:"POST",
// 		url:"/headlines/" + thisId,
// 		data: {
// 			//value taken from title input
// 			title: $("#titleinput").val(),
// 			//Value taken from note textarea
// 			body: $("#bodyinput").val()
// 		}
// 	})
// 	//With that done
// 	.then(function(data) {
// 		//log the response
// 		console.log(data);
// 		//Empty the notes section
// 		$("#notes").empty();
// 	});

// 	//Also, remove the values entered in the input and textarea for note entry
// 	$("#titleinput").val("");
// 	$("#bodyinput").val("");
// });


// //Grab the headlines as a json
// $(document).on("click", body, function() {
// 	console.log("document CLICKED");
// });


// $(document).on("click", "#scrape", function() {
// 	console.log("scraper CLICKED");

// 	$.get("api/scrape").then(function(res) {
// 		console.log(res);
// 		window.location.reload();
// 	})
// });

// $(document).on("click", "#saved", function() {
// 	console.log("saved CLICKED")
// });
