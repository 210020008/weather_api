const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
})

app.post("/",function(req,res){
  const query = req.body.cityName ;
  const apiKey = "0f8927ddf8cc7e8f39d12f5f7e1192aa"; // Replace with your OpenWeatherMap API key
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=metric`;

  https.get(url, function(response) {
    response.on("data", function(data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const des = weatherData.weather[0].description;
      const ic = weatherData.weather[0].icon;
      const cityName = weatherData.name;

      console.log(temp);
      console.log(des);
      console.log(ic);
      console.log(cityName);

      res.write(`
        <h1>The temperature in ${cityName} is ${temp} degrees Celsius</h1>
        <br>
        <h2>Weather Description: ${des}</h2>
        <img src="https://openweathermap.org/img/wn/${ic}@2x.png">
      `);
      res.send();
    });
  });
})


app.listen(3000, function() {
  console.log("Server is running on port 3000");
});
