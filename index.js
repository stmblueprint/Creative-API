
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
app.get("/two-dimensional", (req, res) =>{

    const twoDimensional = [
        "Draw your favorite anime character",
        "Draw a chicken head on a human body",

    ];

res.json ({ 
      
    ids: _.sample(twoDimensional),
    
});

//   res.send("This is working!");

});

app.get("/three-dimensional", (req, res) =>{


    res.json ( [{ 
          
        // ids: _.sample(idea.id),
        id: "1", 
        type:"3D", 
        prompt:"Create a spinning logo"
       
        },
    
        {
            id: "2", 
            type:"3D", 
            prompt:"Create a rainbow sphere"
        }
        
        
    
    ]);
    
      res.send("This is working!");
    
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





app.listen(3004, () => console.log("API Server is running...."));

