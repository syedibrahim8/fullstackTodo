import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    isComplete:{
        type:Boolean,
        default:false,
        required:true
    }
})

const todoModel = mongoose.model("todos",todoSchema)
export default todoModel;