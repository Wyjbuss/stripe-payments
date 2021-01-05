require('dotenv').config(); // allows us to use .env (enviornment verables)
const ejs = require("ejs");
const stripe = require('stripe')(process.env.SECRET_KEY);
const express = require("express");
const bodyParser = require("body-parser");


const app = express();
const port = 3000 || process.env.PORT;
app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
	extended: true
}));

const DOMAIN = "http://localhost:3000";

app.route("/")
	.get(function(req, res) {
		res.render("checkout");
	});

app.post('/create-checkout-session', async (req, res) => {

	const session = await stripe.checkout.sessions.create({
		payment_method_types: ['card'],
		line_items: [{
			price_data: {
				currency: 'usd',
				product_data: {
					name: 'Stubborn Attachments',
					images: ['https://i.imgur.com/EHyR2nP.png'],
				},
				unit_amount: 2000,
			},
			quantity: 1,
		}, ],
		mode: 'payment',
		success_url: `${DOMAIN}/success`,
		cancel_url: `${DOMAIN}/cancel`,
	});

	res.json({
		id: session.id
	});
});

app.get('/success', (req, res) => {
	res.render('success.ejs')
});
app.get('/cancel', (req, res) => {
	res.render('cancel.ejs')
});

app.listen(port, function() {
	console.log(`Server started on port ${port}`);
});
