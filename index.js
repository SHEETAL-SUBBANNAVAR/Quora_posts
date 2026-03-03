const express = require("express");
const app = express();
const port =8080;
const path =require("path")
const { v4: uuidv4}=require("uuid");
const methodOverride = require("method-override");
app.use(methodOverride("_method"));

app.use(express.urlencoded({extended:true}));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"))

app.use(express.static(path.join(__dirname ,"public")))
let posts = [
    {
        id:uuidv4(),
        username:"shamsubbu",
        content : " i love coding"
    },{
        id:uuidv4(),
        username:"raju",
        content : " i got my first internship "
    },{
        id:uuidv4(),
        username:"shivani",
        content : "coding is very interset when you try to  under stand the code "
    },
];
app.get("/posts",(req,res)=>{ 
    res.render("index.ejs",{posts});
});

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
});
app.post("/posts",(req,res)=>{
    let id = uuidv4();
    let {username,content} = req.body;
    posts.push({id,username ,content});
    res.redirect("/posts");
});
app.get("/posts/:id",(req,res)=>{    
    const {id} = req.params;
    const post = posts.find((p)=> p.id === id);
    res.render("show.ejs",{post});
});


app.patch("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let newcontent = req.body.content;
    let post = posts.find((p)=>id===p.id)
    post.content=newcontent
    res.redirect("/posts/");
    
});
app.get("/posts/:id/edit",(req,res)=>{
    let {id} = req.params;
    let post = posts.find((p)=> p.id === id)
    res.render("edit.ejs",{post});
    
});
app.delete("/posts/:id",(req,res)=>{
    let {id} = req.params;
    posts = posts.filter((p)=> p.id != id)
    res.redirect("/posts/");
});


app.listen(port,()=>{
    console.log(`the server is runing now at port ${port}`)
});