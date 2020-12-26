require('dotenv').config(); // allows us to use .env (enviornment verables)
const ejs = require("ejs");
const stripe = require('stripe')(process.env.SECRET_KEY);
const express = require("express");


const app = express();
const port = 3000 || process.env.PORT;
app.use(express.static("public"));
app.set('view engine', 'ejs');


app.route("/")
	.get(function(req, res) {
		res.render("checkout");
	});


  app.listen(port, function() {
  	console.log(`Server started on port ${port}`);
  });
