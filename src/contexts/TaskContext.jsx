import { createContext, useState } from 'react';

export const TaskContext = createContext({
    tasks: [],
    addTask: () => {},
    changeTask: () => {}
});

export function TaskProvider({ children }) {
    const [tasks, setTasks] = useState([]);

    const addTask = (title, taskName) => {
        setTasks(prevTasks => [
            ...prevTasks,
            { 
                title: title, 
                id: Date.now(), 
                name: taskName, 
                description: "описание для задачи не задано"
            }
        ]);
    };

    const changeTask = () => {
        setTasks(prevTasks => [...prevTasks]);
    };

    return (
        <TaskContext.Provider value={{ tasks, addTask, changeTask }}>
            {children}
        </TaskContext.Provider>
    );
}