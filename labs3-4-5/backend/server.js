const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Create Express app
const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// MongoDB Atlas connection
const uri = 'mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to MongoDB Atlas");
    })
    .catch(err => {
        console.error("Connection error", err);
    });

// Define your model (for example)
const ClipSchema = new mongoose.Schema({
    artist: String,
    song: String,
    length: Number,
    views: Number,
});

const Clip = mongoose.model('Clip', ClipSchema);

// CRUD operations
// Create
app.post('/clips', (req, res) => {
    const clip = new Clip(req.body);
    clip.save()
        .then(() => res.status(201).send(clip))
        .catch(err => res.status(400).send(err));
});

// Read
app.get('/clips', (req, res) => {
    Clip.find()
        .then(clips => res.status(200).send(clips))
        .catch(err => res.status(500).send(err));
});

// Update
app.put('/clips/:id', (req, res) => {
    Clip.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(clip => res.status(200).send(clip))
        .catch(err => res.status(400).send(err));
});

// Delete
app.delete('/clips/:id', (req, res) => {
    Clip.findByIdAndDelete(req.params.id)
        .then(() => res.status(204).send())
        .catch(err => res.status(500).send(err));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
