import { ShowCase } from "../Model/ShowCaseDatas.js";

export const AddShowCase = (req,res) =>{

    try{
    const {id:bid} = req.params;

    const data = ShowCase.find();
    if(data.length < 5)
    {
        let m = 0;
        for(let i = 0; i < data.length; i++)
            m = Math.max(m,data[i].id);

        const newShowCase = new ShowCase({
            _id:m+1,
            id: m+1,
            Bid:bid
        });
        newShowCase.save().then(() => res.status(200).json({message: "Showcase added successfully"}))
    }
    else
    {
        res.status(400).json({error: "Maximum 5 showcases can be added"})
    }
    }
    catch(e)
    {
        res.status(500).json({error: "Internal Server Error"});
        console.log("Error at Add Showcase", e.message);
    }
}

export const RemoveShowCase = (req, res) =>{
    try{
        const {id} = req.params;
        const datas = ShowCase.find();
        let aa = 1;
        for(let i = 0;i<datas.length;i++)
        {
            if(datas[i].Bid === id)
            {
                ShowCase.findByIdAndDelete(datas[i]._id).then(() => res.status(200).json({message: "Showcase removed successfully"}));
                aa = 0;
            }
            if(aa === 0)
            {
                datas[i].id -= 1;
                ShowCase.findByIdAndUpdate(datas[i]._id, datas[i]);
            }
        }
    }
    catch(e)
    {
        res.status(500).json({error: "Internal Server Error"});
        console.log("Error at Remove Showcase", e.message);
    }
}

export const getAllShowCase = (req, res) =>{
    try{
    ShowCase.find().then((data) => res.status(200).json(data));
    }
    catch(e)
    {
        res.status(500).json({error: "Internal Server Error"});
        console.log("Error at GetAllShowcase", e.message);
    }
}
