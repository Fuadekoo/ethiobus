const router = require('express').Router();
const authMiddleware = require('../middlewares/authMiddleware');
const BusModel = require('../models/BusModel');

//  note in this bellow post and get method authMiddleware is used for auth user(only admin)
//add bus
router.post('/add-bus',authMiddleware,async(req,res)=>{
    try {
        //check if bus already exist
        const existingBus = await BusModel.findOne({number:req.body.number});
        if(existingBus){
            return res.status(200).send({
                success:false,
                message:"bus already exist"
            });
        }

        // create new bus 
        const NewBus = new BusModel(req.body);
        // save bus
        const savedBus = await NewBus.save();
        // send success response
        res.status(200).send({
            success:true,
            message:"bus added successfully",
            bus:savedBus,
        });
    } catch (error) {
        // send error response
        res.status(500).send({
            success:false,
            message:error.message,
        });
    }
});

// get all buses
// note in this bellow post and get method authMiddleware is used for auth user(only admin)
router.post("/get-buses",authMiddleware,async(req,res)=>{
    try {
        //Fetch all buses
        const buses = await BusModel.find();
        //Send success response
        res.status(200).send({
            success:true,
            message:"buses fetched successfully",
            buses:buses,
        });
    } catch (error) {
        //send error response
        res.status(500).send({
            success:false,
            message:error.message,
        });
    }
});

// Update the bus
// note in this bellow put method authMiddleware is used for auth user(only admin)
router.put("/update-bus/:id", authMiddleware, async(req, res) => {
    try {
        //Find the bus and update it
        const bus = await BusModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        //Send success response
        res.status(200).send({
            success: true,
            message: "bus updated successfully",
            bus: bus,
        });
    } catch (error) {
        //send error response
        res.status(500).send({
            success: false,
            message: error.message,
        });
    }
});

// Delete the bus
// note in this bellow delete method authMiddleware is used for auth user(only admin)
router.delete("/delete-bus/:id", authMiddleware, async(req, res) => {
    try {
        //Find the bus and delete it
        const bus = await BusModel.findByIdAndDelete(req.params.id);
        //Send success response
        res.status(200).send({
            success: true,
            message: "bus deleted successfully",
            bus: bus,
        });
    } catch (error) {
        //send error response
        res.status(500).send({
            success: false,
            message: error.message,
        });
    }
});

// get bus by id
// note in this bellow post and get method authMiddleware is used for auth user(only
router.post("/get-bus-by-id/",authMiddleware,async(req,res)=>{
    try {
        //Fetch all buses
        const bus = await BusModel.findById(req.body._id);
        //Send success response
        res.status(200).send({
            success:true,
            message:"bus fetched successfully",
            bus:bus,
        });
    } catch (error) {
        //send error response
        res.status(500).send({
            success:false,
            message:error.message,
        });
    }
});
module.exports = router;
