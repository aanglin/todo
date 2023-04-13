import Task from '../../../models/tasks'
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
    const userId = req.query.userId;
    try {
        const tasks = await Task.find({userId});
        res.status(200).json({data:tasks});
    }catch (err) {
        res.status(500).json({message: "Internal Server Error"});
        console.log(err);
}
}
}



// import { Task } from "../../../models/tasks";
// import { dbConnect } from "@/utils/dbConnect";

// export default async (req, res) => {
//   const { method } = req;

//   try {
//     await dbConnect();
//   } catch (error) {
//     console.error("Error connecting to database:", error.message);
//     res.status(500).json({ message: "Internal Server Error" });
//     return;
//   }

//   switch (method) {
//     case "POST":
//       try {
//         const newTask = await new Task(req.body).save();
//         res
//           .status(201)
//           .json({ data: newTask, message: "Task created successfully" });
//       } catch (err) {
//         res.status(500).json({ message: "Internal Server Error" });
//         console.error(err);
//       }
//       break;

//     case "GET":
//       try {
//         const tasks = await Task.find();
//         res.status(200).json({ data: tasks });
//       } catch (err) {
//         res.status(500).json({ message: "Internal Server Error" });
//         console.error(err);
//       }
//       break;

//     default:
//       res.setHeader("Allow", ["GET", "POST"]);
//       res.status(405).json({ message: `Method ${method} Not Allowed` });
//   }
// };



