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
app.get('/', function(req, res){

    res.sendFile( __dirname + "/" + "index.html" );  
});

// Post Data
app.post('/', function(req, res){

    var newBook = new Book ({
    
        BookTitle: req.body.BookTitle,
        BookAuthor: req.body.BookAuthor,
    });

    newBook.save(function(err, result){

        if(err){
            res.send('Error Occured');
        } else { 
            console.log(result);
        };
    });
});

// Get Data 
app.get('/data', function(req, res){

    Book.find(function(err, result){

        if(err){
            res.send('Error Occured')
        } else {
            res.send(result);
        }
    });
});

// Displaying Update.html
app.get('/update', function(req, res){

    res.sendFile( __dirname + "/" + "update.html" );  
});

// Updating Data
app.put('/data/update/:id', function(req, res){

    // var BookTitleToUpdate = req.params.BookTitleUpdate;
    // var NewBookTitle = req.params.UpdatedBookTitle;

    Book.findByIdAndUpdate(req.params.id, req.body, function(err, result){
        console.log(result);
    });
});

// Deleting Data
app.delete('', function(req, res){

    Book.remove(req.params.id, function(err, result){
        
        if(err){
            console.log(err);
        } else {
            console.log('Deleted');
            res.json({message: "Book with id " + req.params.id + " removed."});
        }
    });
});

var server = app.listen(PORT, function(){

    console.log('Server listening on Port :', PORT);
});