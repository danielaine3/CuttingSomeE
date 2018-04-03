// var path = require("path");
// module.exports = function(app) {

// 	app.get("/", function(req,res) {
// 		res.sendFile(path.join(__dirname, "../../views/home.html"));
// 	});
// 	app.get("/headlines", function(req,res) {
// 		res.sendFile(path.join(__dirname, "../public/survey.html"));
// 	});
// 	app.get("/notes", function(req,res) {
// 		res.sendFile(path.join(__dirname, "../public/survey.html"));
// 	});	
// 	app.get("*", function(req,res) {
// 		res.sendFile(path.join(__dirname, "../public/home.html"));
// 	});
// };