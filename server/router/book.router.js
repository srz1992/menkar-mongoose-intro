const express = require('express');
const router = express.Router();

// require in our mongoose model
const Book = require("../modules/models/book.schema")

router.get('/', (req, res)=>{
    Book.find()
    .then((data) => {
        //we got stuff back from the database (no error)
        console.log(`got stuff back from mongo: ${data}`);
        res.send(data)
    }) 
    .catch((error) => {
        console.log(`error from mongo: ${error}`);
        res.sendStatus(500); // status for bad stuff happened
    })

})

router.post('/', (req, res) => {
    let bookData = req.body;
    console.log(`got the book data from request: ${bookData}`);
    //create a new instance of our model
    let newBook = new Book(bookData);
    console.log('newBook is', newBook);
    //send the new book model to the database
    newBook.save()
    .then(()=> {
 //good servers always respond
 res.sendStatus(201);
    })
    .catch((error) =>{
        console.log('Error adding book:', error);
        sendStatus(500);
    });
   
});

router.delete('/', (req, res)=>{
    //delete doesn't use data, so we're gonna use params instead
    // data is req.body
    // params is req.query
    let bookID = req.query._id;
    console.log(`id for request is ${bookID}`);
    Book.findByIdAndRemove(req.query._id)
    .then(()=>{
        // good servers always respond. Say OK
        console.log('removed book:' );
        
        res.sendStatus(200);
    })
    .catch((error) =>{
       //bad stuff happened, but good servers still respond
        console.log('Error removing book: ', error);
        res.sendStatus(500);
    })
});

module.exports = router;