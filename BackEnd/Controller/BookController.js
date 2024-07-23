import express from "express";
import {BookData} from "../Model/BookDatas.js"

export const GetAllBooks = async(req,res) =>
{
    try{
        const data = await BookData.find();
        res.status(200).json(data);
    }
    catch(error)
    {
        res.status(500).json({error:"Internal Server Error"});
        console.log("Error at GetAll Books",error.message);
    }
}

export const GetBookById = async(req,res) =>
{
    try{
        const data = await BookData.findById(req.params.id);
        res.status(200).json(data);
    }
    catch(error)
    {
        res.status(500).json({error:"Internal Server Error"});
        console.log("Error at Get Book By Id",error.message);
    }
}

export const GetReccomendedBooks = async(req,res) =>
{
    try{
        const Genre = req.body;
        const Genres = Object.keys(Genre).filter(genre => Genre[genre])
        const Books = await BookData.find();
        const data = Books.filter(Book =>{
            let poi = 0;
            for(const gen of Genres)
                if(gen && Book.genre[gen])
                    poi += 5;
            const NB = {
                ...Book.toObject(),
                poi
            }
            return NB;
        })
        data.sort((a,b)=>a.poi - b.poi);
        res.status(200).json(data);
    }
    catch(error)
    {
        res.status(500).json({error:"Internal Server Error"});
        console.log("Error at Get Rec Book",error.message);
    }
}

export const UpdateBookData = async(req,res) =>{
    try{
        const BO = new BookData(req.body);
        await BookData.findByIdAndUpdate(req.params.id,BO);
        // await BO.save();
        res.status(200).json({message:"Book Updated SuccessFully"});
    }
    catch(error)
    {
        res.status(500).json({error:"Internal Server Error"});
        console.log("Error at Update Book",error.message);
    }
}

export const NewBook = async(req,res) =>{
    try{
        const Book = new BookData({
            ...req.body,
            _id:req.body.id
        })
        await Book.save();
        res.status(200).json({message:"Book Inserted SuccessFully"});
    }
    catch(error)
    {
        res.status(500).json({error:"Internal Server Error"});
        console.log("Error at Insert New Book",error.message);
    }
}

export const DeleteBook = async(req,res) =>{
    try{
        await BookData.deleteOne(req.params.id);
        res.status(200).json({message:"Book Deleted SuccessFully"});
    }
    catch(error)
    {
        res.status(500).json({error:"Internal Server Error"});
        console.log("Error at Delete Book",error.message);
    }
}

export const DeleteRevBook = async(req,res) =>{
    try{
        const Book = await BookData.find({id:req.params.id});
        res.status(200).json({message:"Book Review Deleted SuccessFully"});
    }
    catch(error)
    {
        res.status(500).json({error:"Internal Server Error"});
        console.log("Error at Delete Review From Book",error.message);
    }
}

export const UpdateRevInBook = async(req,res) =>{
    try{
        const {id} = req.params;
        const {Brev} = req.body;
        const Book = await BookData.findById(id);
        if(!Book){
            return res.status(404).json({error:"Book Not Found"});
        }
        const index = Book.reviews?.findIndex((review) => review.id === Brev.id);
        if(!index)
        {
            return res.status(404).json({error:"Review Not Found"});
        }
        Book.reviews[index]=Brev;
        await Book.save();
        return res.status(200).json({message:"Review Updated SuccessFully!"});
    }
    catch(error){
        res.status(500).json({error:"Internal Server Error"});
        console.log("Error at Update Review in BookDatas",error.message);
    }
}



