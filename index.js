const express = require("express");
const Datastore = require("nedb");
const fetch = require("node-fetch");
const app = express();

require("dotenv").config();

app.listen(3000, () => console.log("listening at 3000"));
app.use(express.static("public"));
app.use(express.json({ limit: "1mb" }));

const database = new Datastore("database.db");
database.loadDatabase();

app.post("/api", (request, response) => {
  const data = request.body;
  console.log(data);
  const timestamp = Date.now();
  data.timestamp = timestamp;

  database.insert(data);
  response.json(data);
});

app.get("/api", (request, response) => {
  database.find({}, (err, data) => {
    if (err) {
      response.end();
      return;
    }
    response.json(data);
  });
});

app.get("/weather/:latlon", async (request, response) => {
  console.log(request.params);
  const latlon = request.params.latlon.split(",");
  console.log(latlon);
  const lat = latlon[0];
  const lon = latlon[1];
  console.log(lat, lon);
  const api_key = process.env.API_KEY;
  const weather_url = `http://weerlive.nl/api/json-data-10min.php?key=${api_key}&locatie=${lat},${lon}`;
  const weather_repsonse = await fetch(weather_url);
  const weather_data = await weather_repsonse.json();

  const aq_url = `https://api.openaq.org/v1/latest?coordinates=${lat},${lon}`;
  const aq_repsonse = await fetch(aq_url);
  const aq_data = await aq_repsonse.json();

  const data = {
    weather: weather_data,
    air_quality: aq_data
  };

  response.json(data);
});
