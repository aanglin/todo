import { Task } from "@/models/task";
import { dbConnect } from "@/utils/dbConnect";

export default async (req, res) => {
  const { method } = req;
  const { id } = req.query;

  try {
    await dbConnect();
  } catch (error) {
    console.error("Error connecting to database:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
    return;
  }

  switch (method) {
    case "PUT":
      try {
        const result = await Task.findByIdAndUpdate(
          id,
          { $set: req.body },
          { new: true }
        );
        res
          .status(200)
          .json({ data: result, message: "Task updated successfully" });
      } catch (err) {
        res.status(500).json({ message: "Internal Server Error" });
        console.error(err);
      }
      break;

    case "DELETE":
      try {
        await Task.findByIdAndDelete(id);
        res.status(200).json({ message: "Task deleted successfully" });
      } catch (err) {
        res.status(500).json({ message: "Internal Server Error" });
        console.error(err);
      }
      break;

    default:
      res.setHeader("Allow", ["PUT", "DELETE"]);
      res.status(405).json({ message: `Method ${method} Not Allowed` });
  }
};



// import Task from '@/models/task'
// import dbConnect from '@/utils/dbConnect'

// export default async (req,res) => {
// const {method} = req;
// const {id} = req.query;

// // connect to database
// await dbConnect();

// // UPDATE task
// if (method === 'PUT') {
//     try {
//         const result = await Task.findByIdAndUpdate(id,{$set:req.body},{new:true});
//         res.status(200).json({data:result, message: 'Task updated successfully'});
//     }catch (err) {
//         res.status(500).json({message: "Internal Server Error"});
//         console.log(err);
//     }
// }

// // DELETE tasks
// if (method === 'DELETE') {
//     try {
//        await Task.findByIdAndDelete(id);
//        res.status(200).json({message: 'Task deleted successfully'});
//     }catch (err) {
//         res.status(500).json({message: "Internal Server Error"});
//         console.log(err);
// }
// }
// }
