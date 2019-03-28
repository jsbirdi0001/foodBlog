var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    methodOverride = require("method-override"),
    mongoose = require("mongoose");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(methodOverride("_method"));

mongoose.connect("mongodb://localhost/blog_app");

var blogSchema = new mongoose.Schema({
    name: String,
    img: String,
    description: String,
    date: {type: Date, default: Date.now()}
})

var Blog = mongoose.model("Blog", blogSchema);

/* Blog.create({
    name: "Birthday",
    img: "https://images.unsplash.com/photo-1509782642997-4befdc4b21c9?ixlib=rb-0.3.5&s=1128237690d3dd622f3d563ba9703d67&auto=format&fit=crop&w=750&q=80",
    description: "Happy Birthday to you"
}, function(err, res){
    if(err){
        console.log(err);
    } else{
        console.log(res);
    }
})
*/

app.get("/",function(req,res){
    res.redirect("/blog");
})

app.get("/blog",function(req,res){
    Blog.find({},function(err, blog){
        if(err){
            console.log(err);
        } else{
            res.render("index",{blog:blog})
        }
    })
})
app.post("/blog",function(req,res){
    Blog.create(req.body.blog,function(err,all){
        if(err){
            console.log(err);
        } else {
            res.redirect("/blog");
        }
    })
})
app.get("/blog/new",function(req,res){
    res.render("new");
})

app.get("/blog/:id",function(req,res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            console.log(err);
        } else{
            res.render("show",{blog: foundBlog});
        }
    })
})

app.get("/blog/:id/edit",function(req,res){
    Blog.findById(req.params.id, function(err, found){
        if(err){
            res.redirect("/blog");
        } else {
            res.render("edit",{post:found});
        }
    })
})
app.put("/blog/:id",function(req,res){
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, found){
        if (err){
            res.redirect("/blog");
        } else{
            res.redirect("/blog");
        }
    })
})
app.delete("/blog/:id", function(req,res){
    Blog.findByIdAndRemove(req.params.id, function(err, found){
        if(err){
            res.redirect("/blog");
        } else{
            res.redirect("/blog");
        }
    })
})

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Blog app has been Started");
})