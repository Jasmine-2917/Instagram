const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
// uuidv4();
const methodOverride = require("method-override");

app.use(methodOverride('_method'));

app.use(express.urlencoded({extended : true}));

app.set("view engine","ejs");

app.set("views",path.join(__dirname,"/views"));

app.use(express.static(path.join(__dirname,"public")));

let post = [
    {
        id : uuidv4(),
        username : "meenu",
        profile_pic : "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8d29tYW4lMjBwcm9maWxlfGVufDB8fDB8fHww",
        post_pic : "https://pbs.twimg.com/media/EgSPHupXsAISlBW.jpg",
        content : "Feeling Cute ;)"
    },
    {
        id : uuidv4(),
        username : "kamal",
        profile_pic : "https://ashisheditz.com/wp-content/uploads/2024/02/alone-profile-picture-sad-dp-boy.jpg",
        post_pic : "https://favim.com/pd/p/orig/2019/03/11/korean-boy-fashion-cute-Favim.com-6965343.jpg",
        content : "Swaggg......"
    },
    {
        id : uuidv4(),
        username : "george",
        profile_pic : "https://play-lh.googleusercontent.com/C9CAt9tZr8SSi4zKCxhQc9v4I6AOTqRmnLchsu1wVDQL0gsQ3fmbCVgQmOVM1zPru8UH",
        post_pic : "https://i.pinimg.com/736x/32/0f/3e/320f3ec297b9d62fda6f65876920c580.jpg",
        content : "Aesthetic look"
    }
]


app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
});

app.get("/instagram",(req,res)=>{
    res.render("index.ejs",{post});
})

app.get("/instagram/:username",(req,res)=>{
    let {username} = req.params;
    res.render("index.ejs",{username});
})


