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
            res.status(400).json({ Error: 'Your request was bad, item not added. Please fix the request and retry.' });
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
                res.status(404).json({ Error: 'The resource you reqested was not found.' });
            }         
         })
        .catch(error => {
            console.log(error);
            res.status(400).json({ Error: 'Your request was bad, item not found. Please fix the request and retry.' });
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
            res.status(404).json({ Error: 'The resource you reqested was not found.' });
        }         
     })
    .catch(error => {
        console.log(error);
        res.status(400).json({ Error: 'Your request was bad, id not found. Please fix the request and retry.' });
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
        res.status(400).json({ Error: 'Your request was bad, item not updated. Please fix the request and retry..' });
    });
});


// DELETE Controller ******************************
app.delete('/collectables/:_id', (req, res) => {
    collectables.deleteCollecatableById(req.params._id)
        .then(deletedCount => {
            if (deletedCount === 1) {
                console.log(`Based on its ID, ${deletedCount} Collecatable was deleted.`);
                res.status(200).send({ Success: 'Success, quantity updated.' });
            } else {
                res.status(404).json({ Error: 'The resource you reqested was not found.' });
            }
        })
        .catch(error => {
            console.error(error);
            res.send({ Error: 'Your request was bad, quantity is unchanged. Please fix the request and retry.' });
        });
});


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});