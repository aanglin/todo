import Task from '@/models/task'
import dbConnect from '@/utils/dbConnect'

export default async (req,res) => {
const {method} = req;

// connect to database
await dbConnect();

// create task
if (method === 'POST') {
    try {
        const newTask = await new Task(req.body).save();
        res.status(201).json({data:newTask, message: "Task created successfully"})
    }catch (err) {
        res.status(500).json({message: "Internal Server Error"});
        console.log(err);
    }
}

// Get all tasks
if (method === 'GET') {
    try {
        const tasks = await Task.find();
        res.status(200).json({data:tasks});
    }catch (err) {
        res.status(500).json({message: "Internal Server Error"});
        console.log(err);
}
}
}
