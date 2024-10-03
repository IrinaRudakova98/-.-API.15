import React from "react";
import { Task } from "../Types/Task";

interface TaskItemProps{
    task: Task;
    onDeleteTask: (id: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({task, onDeleteTask}) =>(
    <li>
        <strong>{task.task_name}</strong> - Статус: {task.status}
        <button  
      title='Удалить задачу'
      onClick={() => onDeleteTask(task.id)}> &#x2717;</button>
    </li>
);
export default TaskItem;