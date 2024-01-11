const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 9000;

const uri = "mongodb+srv://purukumar2905:puru2905@cluster0.qasxs3n.mongodb.net/anime_list?retryWrites=true&w=majority"

const connectDb = async () => {
    await mongoose.connect(uri, {
    });
}
connectDb();

app.use(cors());
app.use(express.json());

const db = mongoose.connection;

const animeListCollection = db.collection('anime_list');

app.get('/api/anime_list', async (req, res) => {
    const allAnime = await animeListCollection.find({}).toArray();
    res.status(200).json(allAnime);
});

db.once('open', async() => {
    console.log('MongoDB database connection established successfully!');
    app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
})
