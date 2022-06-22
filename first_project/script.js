import express from 'express'
import fetch from "node-fetch";
import mongoose from 'mongoose';
import ContactUsers from './models/contact.js';
import path from 'path';
import bodyParser from 'body-parser';

const __dirname = path.resolve();
const app = express()
const port = 3000;
let urlencodedBodyParser = bodyParser.urlencoded({extended: true});

async function getData() {
    const response = await fetch('https://fakestoreapi.com/products');
    return response.json();
} 
const data = await getData('https://fakestoreapi.com/products');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.set("view engine", "ejs")
app.get('/', async(req, res) => {
    res.render("index", {products: data})
})

app.get('/toate_produsele', (req, res) => {
    res.render("toate_produsele", {
        products: data
    })
})

app.get('/contact', async(req, res) => {
    const contact = await ContactUsers.find({});
    res.render("contact", {
        title: "Contact",
        contact: contact
    })
}, urlencodedBodyParser);

app.post('/contact', urlencodedBodyParser, async(req, res) => {
    const newContact = new ContactUsers({name: req.body.fname, prenume: req.body.lname, email: req.body.email, subject_message: req.body.smessage, message: req.body.message})
    await newContact.save()
    res.render("contact", {
        title: "Your message has been sent",
        contact: newContact
    })
}
)

app.get("/:id", async(req, res) => {
    const id = +req.params.id;
    const product = data.find(p => p.id === id);
    if (!product) {
        return res.send("Product not found");
      }
    res.render("id", {
        title: "Product",
        product: product,
        id: req.params.id
    });
})

app.listen(port, async() => {
    try {
        await mongoose.connect("**********" +
                "ue&w=majority");
        console.log("Connected to MongoDB")
    } catch (err) {
        console.log('Error connecting to MongoDB', err) 
    }
    console.log(`Example app listening on port ${port}`)
})