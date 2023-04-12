import { useState } from 'react'
import axios from 'axios'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import Banner from '../../public/assets/Banner.jpg'

const url = "http://localhost:3000/api/task";

const inter = Inter({ subsets: ['latin'] })

export default function Home(props) {
  console.log(props)
  const [tasks, setTasks] = useState(props.tasks);
  const [task, setTask] = useState({task: ''});

  const handleChange = ({currentTarget: input}) => {
    input.value === ""
    ? setTask({task: ""})
    : setTask((prev)=> ({...prev, task: input.value}))
  }

  const editTask = (id) => {
    const currentTask = tasks.filter((task) => task.id === id);
    setTask(currentTask[0]);
  }

  const addTask = async (e) => {
    e.preventDefault();
    try {
      if (task._id){
        const {data} = await axios.put(url + "/" + task._id,{task: task.task});
        const originalTasks = [...tasks];
        const index = originalTasks.findIndex((t) => t.id === task._id);
        originalTasks[index] = data.data;
        setTasks(originalTasks);
        setTask({task: ""});
      }else {
        const {data} = await axios.post(url,task);
        setTasks((prev) => [...prev, data.data]);
        setTask({task: ""});
      }
    }catch (err) {
     console.error(err);
    }
  }

  const updateTask = async (id) => {
    try {
      const originalTasks = [...tasks];
        const index = originalTasks.findIndex((t) => t.id === task._id);
        const {data} = await axios.put(url + "/" + id,{completed: !originalTasks[index].completed});
        originalTasks[index] = data.data;
        setTasks(originalTasks);
    }catch (err) {
      console.log(err);
    }
  }

  const deleteTask = async (id) => {
  try {
    const {data} = await axios.delete(url + "/" + id);
    setTasks((prev) => prev.filter((task) => task._id !== id));
  }catch (err) {
    console.log(err);
  }
  }
  return (
  <div id='container' >
    <div id='background-container' className='relative'>
      <div className='absolute inset-0 bg-black/60 z-10'></div>
      <Image src={Banner} className='object-cover h-[100vh]' alt='/' /> 
      </div>
      <div
       id='form-container'
        className='absolute flex flex-col justify-center items-center w-full max-w-md top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20'>
        <h1 className='text-white text-5xl p-8'>ToDo List</h1>
        <div className=' bg-transparent border-blue-400 border-2 shadow-blue-400 shadow-2xl p-9 rounded-xl  text-2xl'>
        <div className='md:p-3'>
          <form
          onSubmit={addTask}
          >
            <input 
            type="text"
            className='w-3/4 bg-transparent border border-r-0 border-blue-400 p-1 focus:outline-none'
            placeholder='Task to do!'
            onChange={handleChange}
            value={task.task}
             />
             <button
             type='submit'
             className='p-1 pr-2 border border-l-0 border-blue-400 '
             >
              {tasks._id ? "Update":"Add"}
              </button>
          </form>
        </div>
        <div>
          {tasks.map((task) => (
            <div
             key={task._id}
             className='flex items-center p-2 '
             >
              <input
               type="checkbox"
               checked={task.completed}
               onChange={() => updateTask(task._id)}
                />
                <p className={
                  task.completed?
                  'px-2 pr-[10rem] grow line-through' : 'px-2 pr-[10rem] grow'}>
                  {task.task}
                </p>
                <button className='pr-2' onClick={() => editTask(task._id)}>&#9998;</button>
                <button className='pb-1 pl-1' onClick={() => deleteTask(task._id)}>&times;</button>
            </div>
          ))}
          {tasks.length === 0 && <h2 className='flex justify-center items-center'>No Tasks</h2>}
        </div>
        </div>
      </div>
  </div>
  )
}

export const getServerSideProps = async () => {
  const {data} = await axios.get(url);
  return {
    props: {
      tasks: data.data
    }
  };
}
