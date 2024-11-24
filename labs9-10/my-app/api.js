const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const AlbumSchema = new mongoose.Schema({
    img: String,
    title: String,
    description: String,
    price: Number,
    power: Number
});

const Album = mongoose.model('Album', AlbumSchema, 'Album');

// const URL = 'mongodb+srv://maria:pass123@cluster0.k0zpj.mongodb.net/Album?retryWrites=true&w=majority&appName=Cluster0';
const URL = 'mongodb+srv://marmat:123@backenddb.99u4y.mongodb.net/Album?retryWrites=true&w=majority&appName=BackendDB';

mongoose
    .connect(URL)
    .then(() => console.log('Connect to MongoDB'))
    .catch((err) => console.log(`DB connection error: ${err}`));

app.get('/albums', async (req, res) => {
    try {
        const albums = await Album.find();
        res.json(albums);
    } catch (error) {
        res.status(500).json({ message: 'Помилка завантаження даних' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Listening port ${PORT}`)
});