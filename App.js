var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var database = 'mongodb://localhost/Books-Directory';
var Book = require('./Book.model');
var PORT = 8000;

// Connecting to the database
mongoose.connect(database);

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended : true
}));

// Displaying index.html
app.get('/books', function(req, res){

    res.sendFile( __dirname + "/" + "index.html" );  
});

// Post Data
app.post('/books', function(req, res){

    var newBook = new Book ({
    
        BookTitle: req.body.BookTitle,
        BookAuthor: req.body.BookAuthor,
    });

    newBook.save(function(err, result){

        if(err){
            res.send('Error Occured');
        } else { 
            res.send('New Book Added');
            console.log(result);
        };
    });
});

// Get Data 
app.get('/books/data', function(req, res){

    Book.find(function(err, result){

        if(err){
            res.send('Error Occured')
        } else {
            res.send(result);
        }
    });
});

// Displaying Update.html
app.get('/books/update', function(req, res){

    res.sendFile( __dirname + "/" + "update.html" );  
});

// Updating Data
app.put('/books/update', function(req, res){

    Book.findByIdAndUpdate(req.body.BookTitleToUpdate, req.body.NewBookTitle, function(err, result){

        if(err){
            console.log(err);
        } else {
            console.log(result);
            res.send('Book Updated');
        }
    });
});

// Deleting Data
app.delete('/:id', function(req, res){

    Book.remove(req.params.id, function(err, result){
        
        if(err){
            console.log(err);
        } else {
            console.log('Deleted');
            res.send('Book Deleted');
        }
    });
});

var server = app.listen(PORT, function(){

    console.log('Server listening on Port :', PORT);
});