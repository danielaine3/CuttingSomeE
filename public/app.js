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
		location.reload();
	});
});


//Click to save headlines
$(".save-it").on("click", function(event) {
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
		location.reload();
	});
});

//Click to view Saved E!
$("#save").on("click", function(event) {
	location.href=("/saved");
});

//Click to return to homepage
$("#home").on("click", function(event) {
	location.href=("/");
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

