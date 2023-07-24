import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://api.openbrewerydb.org/v1/breweries?";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.get("/", (req, res) => {
    res.render("index.ejs")
});

app.post("/",async (req, res) => {
    try {
        const API_URL = `https://api.openbrewerydb.org/v1/breweries?by_city=${req.body.city}&by_state=${req.body.state}&per_page=100`;
        const result = await axios.get(API_URL);
        res.render("index.ejs",
            result.data[Math.floor(result.data.length*Math.random())]
        );
    } catch(error) {
        res.render("index.ejs",{name: error.response});
    }
});

app.listen(port, () => {
    console.log(`Server is running pn port ${port}`)
});