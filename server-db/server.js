const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOption = {
    origin:"http://localhost:8088"
};

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", (req,res) => {
    res.json({message : "Welcome to EventManager App."})
});

require("./app/routes/event.routes")(app);

//******************************************** */
const db = require("./app/models");
db.mongoose
.connect(db.url, {
    useNewUrlParser : true,
    useUnifiedTopology : true
})
.then( () => {
    console.log("Connected to the database.");
})
.catch( err => {
    console.log("Unable to connect to the database", err);
    process.exit();
});
//******************************************** */


const PORT = 3001;
app.listen(PORT, () => {
    console.log('Server is running on PORT '+PORT);
});

