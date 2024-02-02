const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    busId:{
        type:mongoose.Schema.ObjectId,
        ref:"Bus",
        required:true,
    },
    userId:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true,
    },
    seats:{
        type:Array,
        required:true,
    },
    transactionId:{
        type:String,
        required:true,
    },
    
}
,{
    timestamps:true
});

module.exports = mongoose.model('Booking',bookingSchema);