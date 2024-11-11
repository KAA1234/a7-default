// Controllers for the Collecatable Collection

import 'dotenv/config';
import express from 'express';
import * as collectables from './collectables-model.mjs';
import cors from 'cors';


const PORT = process.env.PORT;
const app = express();
app.use(cors());
app.use(express.json());  // REST needs JSON MIME type.


// CREATE controller ******************************************
app.post ('/collectables', (req,res) => { 
    collectables.createCollecatable(
        req.body.item, 
        req.body.quantity, 
        req.body.description
        )
        .then(Collecatable => {
            console.log(`"${Collecatable.item}" was added to the collection.`);
            res.status(201).json(Collecatable);
        })
        .catch(error => {
            console.log(error);
            res.status(400).json({ Error: 'Unique and specific error message.' });
        });
});


// RETRIEVE controller ****************************************************
app.get('/collectables', (req, res) => {
    collectables.retrievecollectables()
        .then(collectables => { 
            if (collectables !== null) {
                console.log(`All collectables were retrieved from the collection.`);
                res.json(collectables);
            } else {
                res.status(404).json({ Error: 'Unique and specific error message.' });
            }         
         })
        .catch(error => {
            console.log(error);
            res.status(400).json({ Error: 'Unique and specific error message.' });
        });
});


// RETRIEVE by ID controller
app.get('/collectables/:_id', (req, res) => {
    collectables.retrieveCollecatableByID(req.params._id)
    .then(Collecatable => { 
        if (Collecatable !== null) {
            console.log(`"${Collecatable.item}" was retrieved, based on its ID.`);
            res.json(Collecatable);
        } else {
            res.status(404).json({ Error: 'Unique and specific error message.' });
        }         
     })
    .catch(error => {
        console.log(error);
        res.status(400).json({ Error: 'Unique and specific error message.' });
    });

});


// UPDATE controller ************************************
app.put('/collectables/:_id', (req, res) => {
    collectables.updateCollecatable(
        req.params._id, 
        req.body.item, 
        req.body.quantity, 
        req.body.description
    )
    .then(Collecatable => {
        console.log(`"${Collecatable.item}" was updated.`);
        res.json(Collecatable);
    })
    .catch(error => {
        console.log(error);
        res.status(400).json({ Error: 'Unique and specific error message.' });
    });
});


// DELETE Controller ******************************
app.delete('/collectables/:_id', (req, res) => {
    collectables.deleteCollecatableById(req.params._id)
        .then(deletedCount => {
            if (deletedCount === 1) {
                console.log(`Based on its ID, ${deletedCount} Collecatable was deleted.`);
                res.status(200).send({ Success: 'Unique and specific success message.' });
            } else {
                res.status(404).json({ Error: 'Unique and specific error message.' });
            }
        })
        .catch(error => {
            console.error(error);
            res.send({ Error: 'Unique and specific error message.' });
        });
});


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});