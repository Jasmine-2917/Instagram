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

let posts = [
    {
        id : uuidv4(),
        username : "meenu",
        profile_pic : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEmdqYIBPVwBtH06yccB0qVI3lI4g8azNPmsRrwqMHwQ&s",
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

app.get("/instagram",(req,res)=>{   //rendering a base file which has all the structure
    res.render("index.ejs",{posts});
})

app.get("/instagram/new",(req,res)=>{ //opening a form to get the details of the new post
    res.render("new.ejs");
})

app.post("/instagram",(req,res)=>{ //adding the new post to the main page
    let {username,content,post_pic,profile_pic} = req.body;
    let id = uuidv4();
    posts.push({id,username,content,post_pic,profile_pic}); 
    res.redirect("/instagram");
})

app.delete("/instagram/:id",(req,res)=>{   //delete any post
    let {id} = req.params;
    posts = posts.filter((p)=> id !== p.id);
    res.redirect("/instagram");

})

app.get("/instagram/:id/edit",(req,res)=>{  //edit post using form
    let {id} = req.params;
    let post = posts.find((p)=> id === p.id)
    res.render("edit.ejs",{post});
})

app.patch("/instagram/:id",(req,res)=>{   //updating the post
    let {id} = req.params;
    let newContent = req.body.content;
    let post = posts.find((p)=> id === p.id);
    post.content = newContent;
    console.log(post);
    res.redirect("/instagram");
})



