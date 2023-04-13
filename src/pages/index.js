import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import Banner from "../../public/assets/Banner.jpg";
import { getUserId } from "../utils/utils"; // Import the getUserId function

const url = "/api/task";

export default function Home() {
  const [tasks, setTasks] = useState(null);
  const [task, setTask] = useState({ task: "" });
  const [editingTaskId, setEditingTaskId] = useState(null);

  const userId = getUserId(); // Get the userId

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(url,{ params: { userId } });
      setTasks(data.data);
    };
    fetchData();
  }, [userId]);

  const handleChange = ({ target: { value } }) => {
    setTask({ task: value });
  };

  const editTask = (id) => {
    const currentTask = tasks.find((task) => task._id === id);
    setEditingTaskId(id);
    setTask(currentTask);
  };

  const addTask = async (e) => {
    e.preventDefault();
    try {
      if (editingTaskId) {
        // update existing task
        const { data } = await axios.put(`${url}/${editingTaskId}`, {
          task: task.task,
        });
        const originalTasks = [...tasks];
        const index = originalTasks.findIndex((t) => t._id === editingTaskId);
        originalTasks[index] = data.data;
        setTasks(originalTasks);
        setEditingTaskId(null);
        setTask({ task: "" });
      } else {
        // add new task
        const { data } = await axios.post(url,{ ...task, userId });
        setTasks((prev) => [...prev, data.data]);
        setTask({ task: "" });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const toggleCompletion = async (id) => {
    try {
      const originalTasks = [...tasks];
      const index = originalTasks.findIndex((t) => t._id === id);
      const { data } = await axios.put(`${url}/${id}`, {
        completed: !originalTasks[index].completed,
      });
      originalTasks[index] = data.data;
      setTasks(originalTasks);
    } catch (err) {
      console.error(err);
    }
  };
  
  const updateTask = (id, updatedTask) => {
    const originalTasks = [...tasks];
    const index = originalTasks.findIndex((t) => t._id === id);
    originalTasks[index] = updatedTask;
    setTasks(originalTasks);
  };
  

  const deleteTask = async (id) => {
    try {
      const { data } = await axios.delete(url + "/" + id);
      setTasks((prev) => prev.filter((task) => task._id !== id));
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div id="container">
      <div id="background-container" className="relative">
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <Image src={Banner} className="object-cover h-[100vh]" alt="/" />
      </div>
      <div
        id="form-container"
        className="absolute flex flex-col justify-center items-center w-full max-w-sm md:max-w-3xl top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
      >
        <h1 className="text-white text-5xl p-8">ToDo List</h1>
        <div className="w-fit p-5 bg-transparent border-blue-400 border-2 shadow-blue-400 shadow-2xl pt-5 rounded-xl text-xl">
          <div className="md:p-3">
            <form onSubmit={addTask}>
              <input
                type="text"
                className="w-3/4 bg-transparent border border-r-0 border-blue-400 p-1 focus:outline-none"
                placeholder="Task to do!"
                onChange={handleChange}
                value={task.task}
              />
              <button
                type="submit"
                className="p-1 pr-2 border border-l-0 border-blue-400 appearance-none focus:outline-none"
              >
                {editingTaskId ? "Fix" : "Add"}
              </button>
            </form>
          </div>
          <div>
      {tasks ? (
        tasks.length > 0 ? (
          tasks.map((task) => (
            //... JSX for rendering individual tasks
            <div key={task._id} className="flex items-center p-2 ">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleCompletion(task._id)}
              />
              <p
                className={
                  task.completed
                    ? "px-2 pr-[10rem] grow line-through"
                    : "px-2 pr-[10rem] grow"
                }
              >
                {task.task}
              </p>
              <button className="pr-2" onClick={() => editTask(task._id)}>
                &#9998;
              </button>
              <button
                className="pb-1 pl-1"
                onClick={() => deleteTask(task._id)}
              >
                &times;
              </button>
            </div>
          ))
        ) : (
          <h2 className="flex justify-center items-center">No Tasks</h2>
        )
      ) : (
        <h2>No tasks</h2>
      )}
    </div>
        </div>
      </div>
    </div>
  );
}


