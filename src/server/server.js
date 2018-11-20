import express from "express";
var request = require('request');
import bodyParser from "body-parser";
var paypal = require("paypal-rest-sdk");

const app = express();

app.use(express.static("dist"));
var http = require("http").Server(app);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

paypal.configure({
  mode: "sandbox", //it should be either sandbox or live
  client_id: "YOUR_CLIENT_ID_HERE", // please provide your client id here
  client_secret: "YOUR_CLIENT_SECRET_HERE" // provide your client secret here
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

var CLIENT =
  "AYzsIaPpuGoCt87W8Fgi4PupJjOyMotq47xxQ-RginxtpBbXGhGK6cIxS1lMm7AC5k6_YHOFWaDnIevu";
var SECRET =
  "EItoh9xzcnppXdc9Bu0-kxB3LmcnEH-6K70mA8Ak_V9Y31ZB2aXZGIYJYnCe_UqfvuUquiCYqF2k7qoq";
var PAYPAL_API = "https://api.sandbox.paypal.com";
express()
  // Set up the payment:
  // 1. Set up a URL to handle requests from the PayPal button
  .post("/api/create-payment/", function(req, res) {
    // 2. Call /v1/payments/payment to set up the payment
    request.post(
      PAYPAL_API + "/v1/payments/payment",
      {
        auth: {
          user: CLIENT,
          pass: SECRET
        },
        body: {
          intent: "sale",
          payer: {
            payment_method: "paypal"
          },
          transactions: [
            {
              amount: {
                total: "5.99",
                currency: "USD"
              }
            }
          ],
          redirect_urls: {
            return_url: "https://www.mysite.com",
            cancel_url: "https://www.mysite.com"
          }
        },
        json: true
      },
      function(err, response) {
        if (err) {
          console.error(err);
          return res.sendStatus(500);
        }
        // 3. Return the payment ID to the client
        res.json({
          id: response.body.id
        });
      }
    );
  })
  // Execute the payment:
  // 1. Set up a URL to handle requests from the PayPal button.
  .post("/api/execute-payment/", function(req, res) {
    // 2. Get the payment ID and the payer ID from the request body.
    var paymentID = req.body.paymentID;
    var payerID = req.body.payerID;
    // 3. Call /v1/payments/payment/PAY-XXX/execute to finalize the payment.
    request.post(
      PAYPAL_API + "/v1/payments/payment/" + paymentID + "/execute",
      {
        auth: {
          user: CLIENT,
          pass: SECRET
        },
        body: {
          payer_id: payerID,
          transactions: [
            {
              amount: {
                total: "10.99",
                currency: "USD"
              }
            }
          ]
        },
        json: true
      },
      function(err, response) {
        if (err) {
          console.error(err);
          return res.sendStatus(500);
        }
        // 4. Return a success response to the client
        res.json({
          status: "success"
        });
      }
    );
  })
  .listen(9000, function() {
    console.log("Server listening at http://localhost:9000/");
  });
// Run `node ./server.js` in your terminal

module.exports = app;
