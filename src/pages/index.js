import { useState } from 'react'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import Banner from '../../public/assets/Banner.jpg'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState({task: ""});
  return (
  <div id='container' >
    <div id='background-container' className='relative'>
      <div className='absolute inset-0 bg-black/60 z-10'></div>
      <Image src={Banner} className='object-cover h-[100vh]' /> 
      </div>
      <div
       id='form-container'
        className='absolute flex flex-col justify-center items-center w-full max-w-md top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20'>
        <h1 className='text-white text-5xl p-8'>ToDo List</h1>
        <div className='bg-transparent shadow-blue-400 shadow-2xl p-9 rounded-xl w-full text-2xl'>
        <div className='md:p-3'>
          <form>
            <input 
            type="text"
            className='w-3/4 bg-transparent border border-r-0 border-blue-400 p-1 focus:outline-none'
            placeholder='Task to do!'
            value={task.task}
             />
             <button
             type='submit'
             className='p-1 pr-2 border border-l-0 border-blue-400 '
             >
              {task._id ? "Update":"Add"}
              </button>
          </form>
        </div>
        <div>
          {Array.from(task).map((task) => (
            <div key={task._id}>
              <input
               type="checkbox"
               checked={task.completed}
                />
                <p className={task.completed}>
                  {task.task}
                </p>
                <button>&#9998</button>
                <button>&#10006</button>
            </div>
          ))}
          {tasks.length === 0 && <h2 className='flex justify-center items-center'>No Tasks</h2>}
        </div>
        </div>
      </div>
  </div>
  )
}
