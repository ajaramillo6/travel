const router = require("express").Router();
const Subscriber = require('../models/Subscriber');

//CREATE SUBSCRIBER
router.post("/", async(req, res) => {
    const newSubscriber = new Subscriber(req.body);
    try{
        const savedSubscriber = await newSubscriber.save();
        res.status(200).json(savedSubscriber);
    } catch(err){
        res.status(500).json(err);
    }
});

//GET SUBSCRIBER
router.get("/:id", async(req,res)=> {
    try{
        const subscriber = await Subscriber.findById(req.params.id);
        res.status(200).json(subscriber);
    } catch(err){
        res.status(500).json(err);
    }
});

//GET ALL SUBSCRIBERS
router.get("/", async(req,res)=> {
    try{
        const subscribers = await Subscriber.find();
        res.status(200).json(subscribers);
    } catch(err){
        res.status(500).json(err);
    }
});

module.exports = router;