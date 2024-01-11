from flask import Flask, jsonify
from flask_pymongo import PyMongo
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.config["MONGO_URI"] = "mongodb+srv://purukumar2905:puru2905@cluster0.qasxs3n.mongodb.net/anime_list?retryWrites=true&w=majority"
mongo = PyMongo(app)

@app.route('/api/anime_list', methods=['GET'])
def get_anime_list():
    anime_list = list(mongo.db.anime_list.find({}, {'_id': 0}))
    print("Anime List:", anime_list)
    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:5173')
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    response = jsonify({"anime_list": anime_list})

    return response

if __name__ == '__main__':
    app.run(debug=True)
