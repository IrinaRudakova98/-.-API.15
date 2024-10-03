import React, { useState, useEffect} from "react";
import { Task } from "./Types/Task";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";

const App: React.FC = () =>{
    const [tasks, setTasks] = useState<Task[]>([]);
    useEffect(()=> {
      const fetchTasks= async () =>{
        try {
          const response = await fetch('https://6835d0cf4cd4b94b.mokky.dev/ToDo');
          if (!response.ok){
            throw new Error ('Network response not ok')
          }
          const data: Task[] = await response.json();
          setTasks(data);
        }
        catch (error){
          console.log("Ошибка", error);
        }
      }
      fetchTasks();
    }, []);

  const handleAddTask = async (newTask: Task) => {
    try {
      const response = await fetch('https://6835d0cf4cd4b94b.mokky.dev/ToDo',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
    });

    if (!response.ok) {
      throw new Error('Ошибка при добавлении задачи');
    }

    const addedTask: Task = await response.json();
    setTasks(prevTasks => [...prevTasks, addedTask]);  
    } catch (error) {
      console.error('Ошибка при добавлении задачи:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
        const response = await fetch(`https://6835d0cf4cd4b94b.mokky.dev/ToDo/${id}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) {
            throw new Error('Ошибка при удалении задачи');
        }
      
        // Обновляем состояние, удаляя задачу из списка
        setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
        console.error('Ошибка при удалении задачи:', error);
    }
      
};

  return(
    <div>
      <h1>Список задач</h1>
      <TaskList tasks={tasks} onDeleteTask={handleDelete}></TaskList>
      <TaskForm onAddTask={handleAddTask}></TaskForm>
    </div>
  )
}

export default App;
