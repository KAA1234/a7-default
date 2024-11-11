// Models for the Collecatable Collection

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
const collectableschema = mongoose.Schema({
	item:    { type: String, required: true },
	quantity:     { type: Number, required: true },
	description: { type: String, required: true },
    date: { type: Date, default: Date.now(), required: true }
});

// Compile the model from the schema 
// by defining the collection name "collectables".
const collectables = mongoose.model('collectables', collectableschema);


// CREATE model *****************************************
const createCollecatable = async (item, quantity, description) => {
    const Collecatable = new collectables({ 
        item: item, 
        quantity: quantity, 
        description: description 
    });
    return Collecatable.save();
}


// RETRIEVE model *****************************************
// Retrieve all documents and return a promise.
const retrievecollectables = async () => {
    const query = collectables.find();
    return query.exec();
}

// RETRIEVE by ID
const retrieveCollecatableByID = async (_id) => {
    const query = collectables.findById({_id: _id});
    return query.exec();
}

// DELETE model based on _id  *****************************************
const deleteCollecatableById = async (_id) => {
    const result = await collectables.deleteOne({_id: _id});
    return result.deletedCount;
};


// UPDATE model *****************************************************
const updateCollecatable = async (_id, item, quantity, description) => {
    const result = await collectables.replaceOne({_id: _id }, {
        item: item,
        quantity: quantity,
        description: description
    });
    return { 
        _id: _id, 
        item: item,
        quantity: quantity,
        description: description 
    }
}

// EXPORT the variables for use in the controller file.
export { createCollecatable, retrievecollectables, retrieveCollecatableByID, updateCollecatable, deleteCollecatableById }