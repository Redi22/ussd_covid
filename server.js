const app = require("express")();
const bodyParser = require("body-parser");
const logger = require("morgan");
const axios = require("axios");
const port = process.env.PORT || 3030;
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("*", (req, res) => {
  res.send("welcome to covid-19 ussd demo");
});
let statEth, statWorld;
axios
  .get("https://coronavirus-scrapy.herokuapp.com/?country=Ethiopia")
  .then((response) => {
    console.log(response.data);
    statEth = response.data;
  });
axios
  .get("https://coronavirus-scrapy.herokuapp.com/total/")
  .then((response) => {
    console.log(response.data);
    statWorld = response.data;
  });

app.post("*", (req, res) => {
  let { sessionId, serviceCode, phoneNumber, text } = req.body;
  if (text == "") {
    console.log("object", statEth);
    let response = `CON Choose the information you want 
    1. Total Information
    2. Today's Information`;
    res.send(response);
  } else if (text == "1" || text == "2") {
    let response = `CON Choose the range of the news you would like to know:
    1. Ethiopia
    2. World
   `;
    res.send(response);
  } else if (text == "1*1" || text == "1*2" || text == "2*1" || text == "2*2") {
    let response = `CON Choose the type of information:
    1.Number of Cases
    2.Number of Deaths
    3.Number of Recoveries
    `;
    res.send(response);
  } else if (text == "1*1*1") {
    console.log("objectsds", statEth.body);
    let response = `END The total cases in Ethiopia ${statEth.total_case}
    `;
    res.send(response);
  } else if (text == "1*1*2") {
    console.log("objectsds", statEth);
    let response = `END The total deaths in Ethiopia ${statEth.total_death}
    `;
    res.send(response);
  } else if (text == "1*1*3") {
    console.log("objectsds", statEth);
    let response = `END The total recoveries in Ethiopia ${statEth.total_recovered}
    `;
    res.send(response);
  } else if (text == "2*1*1") {
    console.log("objectsds", statEth.body);
    let response = `END The new cases in Ethiopia today: ${statEth.new_case}
    `;
    res.send(response);
  } else if (text == "2*1*2") {
    console.log("objectsds", statEth);
    let response = `END The new deaths in Ethiopia today: ${statEth.new_death}
    `;
    res.send(response);
  } else if (text == "2*1*3") {
    console.log("objectsds", statEth);
    let response = `END The new recoveries in Ethiopia today: ${statEth.total_recovered}
    `;
    res.send(response);
  } else {
    res.status(400).send("Bad request!");
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
