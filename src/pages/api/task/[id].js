import Task from '@/models/task'
import dbConnect from '@/utils/dbConnect'

export default async (req,res) => {
const {method} = req;
const {id} = req.query;

// connect to database
await dbConnect();

// UPDATE task
if (method === 'PUT') {
    try {
        const result = await Task.findByIdAndUpdate(id,{$set:req.body},{new:true});
        res.status(200).json({data:result, message: 'Task updated successfully'});
    }catch (err) {
        res.status(500).json({message: "Internal Server Error"});
        console.log(err);
    }
}

// DELETE tasks
if (method === 'DELETE') {
    try {
       await Task.findByIdAndDelete(id);
       res.status(200).json({message: 'Task deleted successfully'});
    }catch (err) {
        res.status(500).json({message: "Internal Server Error"});
        console.log(err);
}
}
}
