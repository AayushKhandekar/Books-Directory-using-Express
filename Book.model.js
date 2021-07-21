var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BookSchema = new Schema ({

    BookTitle: String,
    BookAuthor: String,
});

module.exports = mongoose.model('Book', BookSchema);