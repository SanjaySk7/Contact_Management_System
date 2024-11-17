const mongoose=require("mongoose");

const DataSchema=new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
    },
    lastName:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    phoneNumber:{
        type: Number,
        required: true,
        unique: true,
    },
    company:{
        type: String,
        required: true,
    },
    jobTitle:{
        type: String,
        required: true,
    }
})

const DataModel=mongoose.model("DataModel",DataSchema);

module.exports=DataModel;