/********************************************************************************
*  WEB322 – Assignment 03
* 
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
* 
*  https://www.senecacollege.ca/about/policies/academic-integrity-policy.html
* 
*  Name: FAROUK ALHASSAN Student ID: 133081224 Date: 03/18/2024
*
********************************************************************************/



const express = require('express');
const legoData = require("./modules/legoSets");
const app = express();
const path = require('path');

//port number
const HTTP_PORT = process.env.HTTP_PORT || 8080;


app.use(express.static(path.join(__dirname, "public")));


app.get('/',(req, res)=>{
    res.sendFile(path.join(__dirname, "views", "home.html"));

});


app.get('/about',(req, res)=>{
    res.sendFile(path.join(__dirname, 'views', 'about.html'));

});


app.get("/lego/sets/", (req, res) => {
    const theme = req.query.theme; 
    if (theme)
    {
        legoData.initialize().then(() => {
            legoData.getSetsByTheme(theme).then((sets)=> {
                res.send(sets); 
            });
        });
    }
    else 
    {
        legoData.initialize().then(() => {
            legoData.getAllSets().then((sets)=> {
                res.send(sets); 
            });
        }); 
    }
}); 

app.get("/lego/sets/:set_num", (req, res) => {

  legoData.initialize().then(() => {
      legoData.getSetByNum(req.params.set_num).then((sets=> {
          res.send(sets); 
      }))
      .catch((err) => {
          res.send(err); 
      }); 
  }); 
}); 

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

//SERVER 
console.log(`Server running on port ${HTTP_PORT}`);
app.listen(HTTP_PORT, ()=>{
});

