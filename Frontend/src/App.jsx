import React, { useState } from 'react';

const initialTasks = [
  { id: 1, title: 'Buy groceries', descripition : "milk egg ",completed: false ,expand : false },
  { id: 2, title: 'Read a book',descripition : "milk egg ", completed: true , expand : false},
];

export default function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [newTask, setNewTask] = useState('');
  const [newTaskd, setNewTaskd] = useState('');
  const [lastid, setlastid] = useState(3);
  const addTask = () => {
    if (newTask.trim() === '') return;
    const task = {
      id: lastid+1,
      title: newTask,
      descripition: newTaskd,
      completed: false,
      expand: false
    };
    setTasks([...tasks, task]);
    setNewTask('');
    setlastid((last)=>last+1);
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };
  const toggleexpand = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, expand: !task.expand } : task
    ));
  };
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="grid md:grid-cols-2 md:grid-rows-[fixed_auto] grid-row-3 mt-2 items-center justify-center md:p-4 p-1">
      <h1 className="text-2xl font-bold mb-4 col-span-full text-center">📋 Task Manager</h1>
      <div className="flex flex-col items-center  gap-2 md:w-3/4 w-full md:p-6">
        <h1 className='text-2xl font-bold mb-4 col-span-full'>List</h1>
        <div className='flex-col justify-center md:w-1/2 w-full items-center md:h-[70vh] hide-scrollbar bg-white overflow-y-auto'>
        <ul className="space-y-2">
          {tasks.map(task => (
            <li
              key={task.id}
              className="flex flex-col justify-between items-center border rounded p-3 bg-gray-50"
            >
              <div className='flex flex-col items-center '>
              <span
                className={` flex-1 ${task.completed ? 'line-through text-gray-400' : ''}`}
              >
                {task.title} 
              </span>
              <span
                className={` flex-1 ${task.completed ? 'line-through text-gray-400' : ''}`}
              >
                {task.expand ? task.descripition: ""}   
              </span>
              </div>
              <div className='flex '>
              <button
                onClick={() => toggleComplete(task.id)}
                className="ml-4"
              >
                {task.completed ?  '✅' : '◻️'}
              </button>
                <button
                onClick={() => toggleexpand(task.id)}
                className="ml-4 text-black-500 hover:text-black-700"
              >
                {task.expand ? <p className='text-blue-500'>show less</p> : <p className='text-blue-500'>show more</p>}
              </button>
              <button
                onClick={() => deleteTask(task.id)}
                className="ml-4 text-red-500 hover:text-red-700"
              >
                ❌
              </button>
              </div>
            </li>
          ))}
        </ul>
        </div>
      </div>
      <div className="flex self-start">
        <div className='flex h-1/2 place-self-start flex-col gap-2 md:w-3/4 w-full md:p-6 p-2' >
        <h1 className='text-2xl font-bold mb-4 col-span-full'>Add Task</h1>
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className=" md:w-1/2 w-full border rounded px-3 py-2"
            placeholder="Add new task title"
          />
        <textarea
          value={newTaskd}
          onChange={(e) => setNewTaskd(e.target.value)}
          placeholder="Add new task description"
          className='md:w-3/4 w-full h-[20vh] border rounded px-3 py-2'
        />
        <button onClick={addTask} className=" md:w-1/4 w-1/2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Add
        </button>
        </div>
      </div>
    </div>
  );
}
