const express = require('express');
const mustacheExpress = require('mustache-express');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
// const http = require('http').Server(express);
var bodyParser = require('body-parser');
// const socketio = require('socket.io')(http);

const db_name = "ecommerce";

var mongoDb;

// var socketObject;

MongoClient.connect('mongodb://localhost:27017', function (err, client) {
    if (err) {
        console.log("Could not connect to the DB");
    } else {
        console.log("Connected");
        mongoDb = client.db(db_name);
    }
});

const app = express();

app.use(express.static(__dirname + "/public")); 

app.use(bodyParser.urlencoded({extended: true}));

app.engine("html", mustacheExpress());

app.set("view engine", "html");

app.set("views", __dirname + "/views");

app.set("layout", "layout/layout");

//NAVIGATION
//home page 
app.get("/", (req, res) => {
        res.render("home.html")
});

//shop page 
app.get("/shop", (req, res) => {
    res.render("shop.html");
});

//loginSeller
app.get("/loginSeller", (req, res) => {
    res.render("loginSeller.html");
});

//sell product
app.get("/sellProduct", (req, res) => {
    res.render("sellProduct.html");
});

//add product to db 
app.post("/sellproductpost", (req, res) => {
    mongoDb.collection("items").save(req.body, (err, result) => {
        if (err)
        {
            console.log(err);
        }else{

        console.log("Saved");
        res.redirect('/');
        }
      });
});

//contact
app.get("/contact", (req, res) => {
    res.render("contact.html");
});

//about
app.get("/about", (req, res) => {
    res.render("about.html");
});

//ACCOUNTS
//login
app.get("/login", (req, res) => {
     res.render("login.html");
 })

//createAccount
app.get("/createAccount", (req, res) => {
    res.render("createAccount.html");
})


//CART BUTTON
//view cart
app.get("/viewCart", (req, res) => {
    res.render("viewCart.html");
})

//checkout sign form
app.get("/checkoutSignForm", (req, res) => {
    res.render("checkoutSignForm.html");
})

//checkout bill form
app.get("/checkout-bill", (req, res) => {
    res.render("checkoutBill.html");
})

app.listen(3000);

