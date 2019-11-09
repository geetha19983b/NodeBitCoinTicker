const express = require("express");
const app=express();
const request=require("request");
const bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
  res.sendFile(__dirname + "/index.html");
});
app.post("/",function(req,res){
//  console.log(req.body.crypto);
var crypto = req.body.crypto;
var fiat = req.body.fiat;
// var baseURL="https://apiv2.bitcoinaverage.com/indices/global/ticker/";
// var finalURL=baseURL + crypto + fiat;
// var conver = crypto+fiat;
// request(finalURL,function(error,response,body){
//   var data = JSON.parse(body);
//   var price = data.last;
//   //console.log(price);
//
//   var currentDate = data.display_timestamp;
//   res.write("<p>The current date is " + currentDate + "</p>");
//   res.write("<h1>The current price of " + crypto + " is " + price + fiat + "</h1>");
//   res.send();
// });
var amount = req.body.amount;
var options = {
  url:"https://apiv2.bitcoinaverage.com/convert/global",
  method:"GET",
  qs:{
    from:crypto,
    to:fiat,
    amount:amount
  }
};

request(options,function(error,response,body){
  var data = JSON.parse(body);
  var price = data.price;
  var currentDate = data.time;
  res.write("<p> The current date is "+ currentDate +"</p>");
  res.write("<h1>" + amount + crypto  + " is currently worth " + price + fiat + "</h1>");
  res.send();
});

});
app.listen(3000,function() {
  console.log("Server is running on port 3000");

});
