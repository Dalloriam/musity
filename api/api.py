from flask import Flask, request
from flask_mongoengine import MongoEngine
import json


db = MongoEngine()

app = Flask(__name__)
app.config['MONGODB_SETTINGS'] = {
    'db': 'musity',
    'host': 'ds139979.mlab.com',
    'port': 39979,
    'username': 'mxkhsbfewijdfepokdf',
    'password': 'ckjdnskfeijwnfewoijfbewofi'
}
db.init_app(app)
# connect('musity', host='ds139979.mlab.com', port=39979, username='mxkhsbfewijdfepokdf', password='ckjdnskfeijwnfewoijfbewofi')


class Track(db.Document):
    spotify_id = db.StringField(required=True)
    spotify_uri = db.StringField(required=True)

    def serialize(self):
        return {
            'spotify_id': self.spotify_id,
            'spotify_uri': self.spotify_uri
        }


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
        arts = ', '.join([str(artist['Prenom']) + " " + str(artist["Nom"]) for artist in monument['Artistes']])
        loct = Location(title=monument["Titre"], tracks=[], address=monument["AdresseCivique"], point=[float(monument["CoordonneeLongitude"]),
                                                                                                       float(monument["CoordonneeLatitude"])], artists=arts)
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
        dct["tracks"] = [ob.serialize() for ob in loct.tracks]
        lst.append(dct)
    return json.dumps(lst)


@app.route("/api/tracks/<longi>/<lat>")
def locatetracks(longi, lat):
    longi = float(longi)
    lat = float(lat)
    near = Location.objects(point__near=[longi, lat])

    if len(near) == 0:
        return json.dumps({}), 404

    x = near[0]
    dct = {}
    dct["id"] = str(x.id)
    dct["title"] = x.title
    dct["address"] = x.address
    dct["artists"] = x.artists
    dct["picture"] = x.picture
    dct["position"] = {"lng": x.point["coordinates"][0], "lat": x.point["coordinates"][1]}

    dct["tracks"] = [ob.serialize() for ob in x.tracks]
    return json.dumps(dct)


@app.route("/api/locations/<locationid>/tracks", methods=['POST'])
def addTracks(locationid):
    loct = Location.objects(id=locationid)
    if loct is None:
        return json.dumps({}), 404
    x = loct[0]
    track = request.get_json()
    trackObj = Track(spotify_id=track["spotify_id"], spotify_uri=track["spotify_uri"])
    if trackObj not in x.tracks:
        trackObj.save()
        x.tracks.append(trackObj)
        x.save()
    return json.dumps({})


@app.route("/api/locations/<locationid>/tracks/<trackid>", methods=['DELETE'])
def deleteTracks(locationid, trackid):
    loct = Location.objects(id=locationid)
    if loct[0].tracks is None:
        return json.dumps({}), 404
    x = loct[0]
    for track in x.tracks:
        if track["spotify_id"] == trackid:
            x.tracks.remove(track)
            x.save()
            return json.dumps({}), 200
    return json.dumps({}), 404


@app.after_request
def apply_caching(response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Methods"] = "POST, GET, OPTIONS, PUT, DELETE"
    response.headers["Access-Control-Allow-Headers"] = "Actions, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization"
    return response


if __name__ == "__main__":
    app.run()
