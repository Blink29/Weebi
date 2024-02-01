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
    try {
      const { sortBy, sortOrder, limit } = req.query;
  
      const query = animeListCollection.find({})
        .sort({ [sortBy]: sortOrder === 'desc' ? -1 : 1 }) // -1 for descending, 1 for ascending
        .limit(parseInt(limit, 10));
  
      const allAnime = await query.toArray();
      res.status(200).json(allAnime);
    } catch (error) {
      console.error('Error fetching anime list:', error);
      res.status(500).send('Internal Server Error');
    }
  });

db.once('open', async() => {
    console.log('MongoDB database connection established successfully!');
    app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
})