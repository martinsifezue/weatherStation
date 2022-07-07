require("dotenv").config();
const express = require ("express");
const https = require ("https");

const app = express();



app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html")
})

app.post("/", function(req, res){

let query = req.body.cityname;
let units = "metric";






const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appID=" + process.env.MY_API_KEY + "&units=" + units;

https.get(url, function(response){

response.on("data", function(data){


let fullweatherdata = JSON.parse(data);

console.log(fullweatherdata.cod);

if(fullweatherdata.cod === 200){

  let temp = fullweatherdata.main.temp
  let desc = fullweatherdata.weather[0].description
  let icon = fullweatherdata.weather[0].icon
  let imgUrl = "https://openweathermap.org/img/wn/"+ icon + "@2x.png"
  let city = fullweatherdata.name





res.write(`

  <!DOCTYPE html>
  <html lang="en" dir="ltr">
    <head>
      <meta charset="utf-8">
      <title>Weather Station</title>

      <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Crimson+Text&family=Old+Standard+TT:wght@700&display=swap"
  rel="stylesheet"

      <!-- CSS only -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css"
  rel="stylesheet" integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor"
   crossorigin="anonymous">
   <link rel="stylesheet" href="/css/styles.css">


       <!-- JavaScript Bundle with Popper -->
   <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-pprn3073KE6tl6bjs2QrFaJGz5/SUsLqktiwsUTF55Jfv3qYSDhgCecCxMW52nD2"
    crossorigin="anonymous"></script>
    </head>
    <body>

  <section id="title">
    <div class="container">
    <div class="row">
      <div class=" col-lg-6">
        <h1>Welcome to my Weather Station</h1>
      </div>
      <div class="col-lg-6">
        <img class="title-img" src="/images/weather.svg" alt="">

      </div>
    </div>
    </div>
  </section>


  <section id="input">
  <div class="container">
    <div class="row">
      <div class="col-lg-6">
        <main class="form-signin w-100 m-auto">
          <form action="/" method="post">

            <h2 class="h3 mb-3 fw-normal">Check Weather Conditions</h2>

            <div >
              <input type="text" class="form-control"  name=cityname placeholder= ${query} >

            </div>



            <button class="btn btn-lg" type="submit">Check</button>

          </form>
        </main>
      </div>
      <div class="col-lg-6 results">
        <div class="">
  <h3>${city}</h3>
  <img src="${imgUrl}" class="results-img" alt="Weather Icon">
  <p class="temp"><em>${temp} °C</em></p>
  <p>${desc}</p>





        </div>
      </div>
    </div>
  </div>


  </section>









    </body>
  </html>




  `)


} else{



res.write(`



  <!DOCTYPE html>
  <html lang="en" dir="ltr">
    <head>
      <meta charset="utf-8">
      <title>Weather Station</title>

      <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Crimson+Text&family=Old+Standard+TT:wght@700&display=swap"
  rel="stylesheet"

      <!-- CSS only -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css"
  rel="stylesheet" integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor"
   crossorigin="anonymous">
   <link rel="stylesheet" href="/css/styles.css">


       <!-- JavaScript Bundle with Popper -->
   <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-pprn3073KE6tl6bjs2QrFaJGz5/SUsLqktiwsUTF55Jfv3qYSDhgCecCxMW52nD2"
    crossorigin="anonymous"></script>
    </head>
    <body>

  <section id="title">
    <div class="container">
    <div class="row">
      <div class=" col-lg-6">
        <h1>Welcome to my Weather Station</h1>
      </div>
      <div class="col-lg-6">
        <img class="title-img" src="/images/weather.svg" alt="">

      </div>
    </div>
    </div>
  </section>


  <section id="input">
  <div class="container">
    <div class="row">
      <div class="col-lg-6">
        <main class="form-signin w-100 m-auto">
          <form action="/" method="post">

            <h2 class="h3 mb-3 fw-normal">Check Weather Conditions</h2>

            <div >
              <input type="text" class="form-control"  name=cityname placeholder= ${query}>

            </div>



            <button class="btn btn-lg" type="submit">Check</button>

          </form>
        </main>
      </div>
      <div class="col-lg-6 results">
        <div class="">
  <h2>City not found</h2>
  <img src="./images/404.jpg" class="error-img" alt="ERROR">

  <p>Please Check the City you entered again</p>





        </div>
      </div>
    </div>
  </div>


  </section>









    </body>
  </html>





  `)




}































res.send();
})




})










})











app.listen(3000,function(){

  console.log("Server up and running")
})