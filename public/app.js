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

$(".link").on("click", function(event) {
	window.location = (this.href);
})

//Click to remove save
$(".remove-save").on("click", function(event) {
	console.log("remove save clicked");
	//Grab id associated with headline
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
$(".add-comment").on("click", function(event) {
	$(".prior-comments").empty();
	$(".save-comment").remove();
	// $("")
	//save id from the leave comment button
	var thisId = $(this).data("id");
	//Show add comment modal
	$("#comment-modal").modal("show");
 
	$.ajax({
		method: "GET",
		url:"/notes/" + thisId
	})
	//with that done, add comments to page
	.then(function(data) {
		console.log(data);
		// Title of article
		$("#comment-title").text("Leave a comment");
		//Button to submit, with id of article saved to it
		var submitNoteBtn = $("<button>");
		submitNoteBtn.addClass("save-comment").data("dismiss", "modal").text("ADD COMMENT");
		submitNoteBtn.attr("data-id", thisId);
		$(".modal-footer").prepend(submitNoteBtn);

		//Add heading to article commments section
		var commentHead = $("<h4>");
		commentHead.text("Prior Commments");
		//If at least one comment, show comments to user
		$("#prior-comments").append(commentHead);
		if (data.length > 0) {
			console.log(data);
			//Place the notes in the comment section
			for (var i =0; i < data.length; i++) {
				var commentDiv = $("<div>");
				commentDiv.addClass("comment-div");
				var commentNote = $("<p>");
				commentNote.text(data[i].body);
				$("#prior-comments").append(commentNote);
				$("#prior-comments").append(commentDiv);
				//Create delete button for comments
				var deleteComment = $("<button>");
				deleteComment.addClass(".delete-comment").text("Delete").attr("id", data[i]._id);
				commentDiv.append(deleteComment);
			}
		}else {
			var noComments = $("<h4>");
			noComments.text("No prior comments to show.");
			$("#prior-comments").append(noComments);
		}
	});
});

//Save comment button
$(document).on("click", ".save-comment", function(){
	console.log("CLICKED!");
	// event.preventDefault();
	//get headline id
	var thisId = $(this).attr("data-id");
	//if comment empty alert user
	if(!$("#comment-body").val()) {
		var commentErr = $("<p>");
		commentErr.text("You must enter a comment to submit.");
		$(".form").append(commentErr);
	}else {
		$.ajax({
			method:"POST", 
			url: "/notes",
			data: {
				body: $("#comment-body").val(), 
				headline: thisId
			}
		}).done(function(data) {
			//log response
			console.log(data);
			//empty values on submit
			$("#comment-body").val("");
			$("#comment-title").val("");
			$(".prior-comments").val("");
			$("#comment-modal").modal("hide");
			$(".comment-box").empty();
			$(".save-comment").remove();
			$("#comment-modal").modal("hide");
			window.location = "/saved"
		});;
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

