const router = require('express').Router();
const Booking = require('../models/bookingsModel');
const Bus = require('../models/BusModel');
const authMiddleware = require('../middlewares/authMiddleware');

//book the bus seats
router.post('/book-seat',authMiddleware,async(req,res)=>{
    try {
        // this is the code to book the seats of the bus
        const newBooking = new Booking({
            ...req.body,
            //the tansaction id and user id is gate from back end,bus and seats is gate from front end
            transactionId:"1234567890",
            userId:req.body.userId,
        });
        // this is the code to save the seats of the bus
        await newBooking.save();

        //the bellow code is to update the seats booked that means the one seats is booked only once
        const bus = await Bus.findById(req.body.busId);
        bus.seatsBooked = [...bus.seatsBooked,...req.body.seats];
        await bus.save();
        res.status(200).json({
            success:true,
            message:"Seats Booked Successfully",
            data:newBooking,
        });
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"booking failed",
            data:error,
        });
    }
});

module.exports = router;