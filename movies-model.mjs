// Models for the Movie Collection

// Import dependencies.
import mongoose from 'mongoose';
import 'dotenv/config';

// Connect based on the .env file parameters.
mongoose.connect(
    process.env.MONGODB_CONNECT_STRING,
    { useNewUrlParser: true }
);
const db = mongoose.connection;

// Confirm that the database has connected and print a message in the console.
db.once("open", (err) => {
    if(err){
        res.status(500).json({ Error: 'Unique and specific error message.' });
    } else  {
        console.log('Success: Unique and specific success message.');
    }
});

// SCHEMA: Define the collection's schema.
const movieSchema = mongoose.Schema({
	title:    { type: String, required: true },
	year:     { type: Number, required: true },
	language: { type: String, required: true }
});

// Compile the model from the schema 
// by defining the collection name "movies".
const movies = mongoose.model('Movies', movieSchema);


// CREATE model *****************************************
const createMovie = async (title, year, language) => {
    const movie = new movies({ 
        title: title, 
        year: year, 
        language: language 
    });
    return movie.save();
}


// RETRIEVE model *****************************************
// Retrieve all documents and return a promise.
const retrieveMovies = async () => {
    const query = movies.find();
    return query.exec();
}

// RETRIEVE by ID
const retrieveMovieByID = async (_id) => {
    const query = movies.findById({_id: _id});
    return query.exec();
}

// DELETE model based on _id  *****************************************
const deleteMovieById = async (_id) => {
    const result = await movies.deleteOne({_id: _id});
    return result.deletedCount;
};


// UPDATE model *****************************************************
const updateMovie = async (_id, title, year, language) => {
    const result = await movies.replaceOne({_id: _id }, {
        title: title,
        year: year,
        language: language
    });
    return { 
        _id: _id, 
        title: title,
        year: year,
        language: language 
    }
}

// EXPORT the variables for use in the controller file.
export { createMovie, retrieveMovies, retrieveMovieByID, updateMovie, deleteMovieById }