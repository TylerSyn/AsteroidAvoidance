//initial values for database
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const session = require("express-session");

const app = express();
const port = process.env.port||3000;

//Create public folder as static
app.use(express.static(path.join(__dirname,"public")));

//Set up middleware to parse json requests
app.use(bodyParser.json());
app.use(express.urlencoded({extended:true}));

//MongoDB connection setup
const mongoURI = "mongodb://localhost:27017/AsteroidScores";
mongoose.connect(mongoURI);

const db = mongoose.connection;

const ScoreSchema = new mongoose.Schema({
    name:String,
    score:String
});

const Score = mongoose.model("Score", ScoreSchema, "HighScores");

db.on("error", console.error.bind(console, "MongoDB connection error"));
db.once("open", ()=>{
    console.log("Connected to MongoDB Database");
});

app.get("/",(req,res)=>{
    res.sendFile("index.html");
});

app.post("/AddScore",async (req,res)=>{
try{
    scoreToAdd = 2;
    Name = "Tyler";
    const newScore = new Score(Name,scoreToAdd) ;
    const saveScore = await newScore.save();
    res.redirect("/");

}catch(error){
    res.status(501).json({error:"Failed to add new high score."});
}
});


app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
});