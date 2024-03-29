const router = require("express").Router();
const Post = require('../models/Post');

//CREATE POST
router.post("/", async(req, res) => {
    const newPost = new Post(req.body);
    try{
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch(err){
        res.status(500).json(err);
    }
});

//UPDATE POST
router.put("/:id", async(req, res) => {
    try{
        const post = await Post.findById(req.params.id);
        if(post.username === req.body.username){
            try{
                const updatedPost = await Post.findByIdAndUpdate(req.params.id, {
                    $set: req.body,
                }, { new:true });
                res.status(200).json(updatedPost);
            } catch(err){
                res.status(500).json(err);
            }
        } else {
            res.status(401).json("You can only update your own post.")
        }
    }catch(err){
        res.status(500).json(err);
    }
});

//ADD A COMMENT
router.put("/:id/addComment", async(req, res)=>{
    try{
        const post = await Post.findById(req.params.id);
        await post.updateOne({ $push:{ postComments: req.body } });
        res.status(200).json(post)
    }catch(err){
        res.status(500).json(err);
    }
});

//UPDATE A COMMENT
router.put("/:id/updateComment", async(req, res)=>{
    try{
        const post = await Post.findById(req.params.id);
        await post.updateOne({ $set:{ postComments: req.body } });
        res.status(200).json(post)
    }catch(err){
        res.status(500).json(err);
    }
});

//LIKE OR DISLIKE A POST
router.put("/:id/like", async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id);
        if(!post.postLikes.map(
            (subscriber)=>subscriber.subscriberCommentEmail).join().includes(req.body.subscriberCommentEmail)){
            await post.updateOne({ $push:{ postLikes: req.body } });
            res.status(200).json("You liked the post! :)")
        } else {
            await post.updateOne({ $pull:{ postLikes: req.body } });
            res.status(200).json("You disliked the post.")
        }
    } catch(err) {
        res.status(500).json(err);
    } 
});

//DELETE POST
router.delete("/:id", async(req, res) => {
    try{
        const post = await Post.findById(req.params.id);
        if(post.username === req.body.username){
            try{
                await post.delete();
                res.status(200).json("Post has been deleted.")
            } catch(err){
                res.status(500).json(err);
            }
        } else {
            res.status(401).json("You can only delete your own post.")
        }
    }catch(err){
        res.status(500).json(err);
    }
});

//GET POST
router.get("/:id", async(req,res)=> {
    try{
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch(err){
        res.status(500).json(err);
    }
});

//GET ALL POSTS
router.get("/", async(req,res)=> {

    const username = req.query.user;
    const loc = req.query.cat;
    const state = req.query.state;

    try{
        let posts;
        if(username){
            posts = await Post.find({
                username,
            });
        } else if(loc){
            posts = await Post.find({
                loc,
            });
        } else if(state){
            posts = await Post.find({
                state,
            });
        } else {
            posts = await Post.find();
        }
        res.status(200).json(posts);
    } catch(err){
        res.status(500).json(err);
    }
});

module.exports = router;