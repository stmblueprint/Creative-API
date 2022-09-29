
const fs = require("fs/promises");
const express = require("express");
const cors = require("cors");
const _ = require("lodash");
const { v4: uuid } = require("uuid"); // generate a unique id

//setup api server

const app = express();

app.use(express.json());

app.use(cors());

// get route // request and response coming back
app.get("/twodimensional", (req, res) =>{

    const tops = ["Black", "White", "Orange"];
    const jeans = ["Black", "White", "Navy", "Pink"];
    const shoes = ["White", "Grey", "Yellow"];
    const person = {firstName:"John", lastName:"Doe", age:46};



    res.json ({
        top: _.sample(tops),
        jeans: _.sample(jeans),
        shoes: _.sample(shoes),
        persons: _.sample(person.firstName)

    });
//   res.send("This is working!");

});

// get comments by id
// make this func async so we can use away below
app.get("/comments/:id", async (req, res) => {
    const id = req.params.id;
    let content;

    try{
        content = await fs.readFile(`data/comments/${id}.txt`, "utf-8");
    } catch (err){
         return res.sendStatus(404); // if id do not exist, send a response

    }
    res.json({
        content: content
    });
});


// make this function async so we can use await below
app.post("/comments", async (req, res) =>{
    
    const id = uuid();
    const content = req.body.content;
    
    //check if user actually provided content
    if(!content) {
        return res.sendStatus(400); // return so the code below, continues to run
    }

    // making a new directory on the file system
    // post information will be stored in this text file
    await fs.mkdir("data/comments", {recursive: true});

    // content received from the API client
    await fs.writeFile(`data/comments/${id}.txt`, content);


  



    console.log(content);
    res.status(201).json({
        id: id



    }); // 201 means successfully created


});





app.listen(3000, () => console.log("API Server is running...."));

