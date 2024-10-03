import React from "react";
import { Task } from "../Types/Task";
import TaskItem from "./TaskItem";

interface TaskListProps{
    tasks: Task[];
    onDeleteTask: (id: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({tasks, onDeleteTask}) =>(
    <ul>
        {tasks.map(task => (
            <TaskItem key = {task.id} task={task} onDeleteTask={onDeleteTask} />
        ))}
    </ul>
);
export default TaskList;