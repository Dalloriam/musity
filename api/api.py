from flask import Flask
from flask_mongoengine import MongoEngine
from flask_mongoengine.wtf import model_form
import json
from json import JSONEncoder
db = MongoEngine()

app = Flask(__name__)
app.config['MONGODB_SETTINGS'] = {
    'db': 'musity',
    'host': 'ds139979.mlab.com',
    'port': 39979,
    'username':'mxkhsbfewijdfepokdf',
    'password':'ckjdnskfeijwnfewoijfbewofi'
}
db.init_app(app)
#connect('musity', host='ds139979.mlab.com', port=39979, username='mxkhsbfewijdfepokdf', password='ckjdnskfeijwnfewoijfbewofi')
  

class Track(db.Document):
    spotify_id = db.StringField(required=True)

class Location(db.Document):
    title = db.StringField(max_length=200, required=False)
    address = db.StringField(required=False)
    artists = db.StringField()
    picture = db.StringField(required=False)
    point = db.PointField(required=True)
    tracks = db.ListField(db.ReferenceField(Track), required=False)


@app.route("/api/seed")
def seed():
    Location.drop_collection()
    with open('monuments.json') as data_monuments:    
        monuments = json.load(data_monuments)
    with open('murals.json') as data_murals:
        murals = json.load(data_murals)
    for monument in monuments:
        if monument["AdresseCivique"] is None:
            monument["AdresseCivique"] = ""
        arts = ""
        arts = ', '.join([str(artist['Prenom']) + " " + str(artist["Nom"]) for artist in  monument['Artistes']])
        loct = Location(title=monument["Titre"], tracks=[], address=monument["AdresseCivique"], point = [float(monument["CoordonneeLongitude"]),
        float(monument["CoordonneeLatitude"])], artists= arts)
        loct.save()
    for mural in murals:
        art = mural["properties"]["artiste"].replace(" et ", ",")
        loct = Location(title="", tracks=[], address=mural["properties"]["adresse"], point=[float(mural["properties"]["longitude"]),
            float(mural["properties"]["latitude"])], artists=art, picture=mural["properties"]["image"])
        loct.save()
    return "WP"

@app.route("/api/locations")
def locations():
    lst = []
    for loct in Location.objects:
        dct = {}
        dct["id"] = str(loct.id)
        dct["title"] = loct.title
        dct["address"] = loct.address
        dct["artists"] = loct.artists
        dct["picture"] = loct.picture
        dct["position"] = {"lng": loct.point["coordinates"][0], "lat": loct.point["coordinates"][1]}
        dct["tracks"] = loct.tracks
        lst.append(dct)
    return json.dumps(lst)

@app.route("/api/tracks/<float:longi>/<float:lat>")
def locatetracks(longi, lat):
    near = Location.objects(point__near=[longi, lat], point__max_distance=1)
    if str(near) == []:
        return None,404
    return near[0].tracks

@app.after_request
def apply_caching(response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Methods"] = "POST, GET, OPTIONS, PUT, DELETE"
    response.headers["Access-Control-Allow-Headers"] = "Actions, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization"
    return response

if __name__ == "__main__":
    app.run()