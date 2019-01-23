const express = require('express');
const mustacheExpress = require('mustache-express');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
// const http = require('http').Server(express);
var bodyParser = require('body-parser');
// const socketio = require('socket.io')(http);

const db_name = "ecommerce_project";

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
    mongoDb.collection('items').find().toArray(function(err, data) {
        res.render("home.html", { product: data });
    });
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

//checkout sign form
app.get("/checkoutSignForm", (req, res) => {
    res.render("checkoutSignForm.html");
})

//checkout bill form
app.get("/checkout-bill", (req, res) => {
    res.render("checkoutBill.html");
})

// /viewing of product if quick view clicked
app.get("/:id", (req, res) => {
    const id = req.params.id;
    mongoDb.collection('items').findOne({ _id: new ObjectID(id)}, (err, data) => {
        res.render("view-product.html", { product: data });
    });
})

//create cart
app.post("/addToCart", (req, res) => {
    mongoDb.collection("ecommerce_cart").save(req.body, (err, result) => {
        if (err)
        {
            console.log(err);
        }else{
            console.log("Saved to cart");
            res.redirect('home.html');
        }
    });
});

//viewing of cart
app.get("/view-cart", (req, res) => {
    mongoDb.collection('ecommerce_cart').find().toArray(function(err, data) {
        res.render("home.html", { carts: data });
    });
});


app.listen(3000);

