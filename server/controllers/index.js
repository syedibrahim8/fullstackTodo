import express from "express";
import todoModel from "../models/todo.js";
const router = express.Router();

router.get("/getall",async(req,res)=>{
    try {
        const todos = await todoModel.find();
        res.status(200).json(todos)
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:error})
    }
})

router.get("/getby/:id",async(req,res)=>{
    try {
        let id = req.params.id
        const todo = await todoModel.findOne({_id:id})
        res.status(200).json(todo)
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:error})
    }
})

router.post("/add",async(req,res)=>{
    try {
        let { title } = req.body;
        let finalObject = {
            title,
        }
        await todoModel.create(finalObject);
        res.status(201).json({ msg: "Todo Added Created" })
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:error})
    }
})

router.put("/update/:id",async(req,res)=>{
    try {
        let id = req.params.id;
        let data = req.body;
        await todoModel.findByIdAndUpdate(id,data,{new:true})
        res.status(200).json({msg:"updated successfully"})
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:error})
    }
})

router.delete("/delete/:id",async(req,res)=>{
    try {
        let id = req.params.id;
        await todoModel.deleteOne({_id:id})
        res.status(200).json({msg:"deleted successfully"})
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:error})
    }
})


export default router;