import './style_card.css';
import { TaskDescription } from './task_description.jsx';
import { useRef, useContext } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { TaskContext } from '../../../../contexts/TaskContext.jsx';

export function Card({ title }) {

    const { tasks, addTask, changeTask } = useContext(TaskContext);

    const refAdd = useRef(); //Добавление новой задачи
    const refInput = useRef(); //Поле ввода новой задачи
    const refSubmit = useRef(); //Внесение задачи в карточку
    const refSelect = useRef(); //Выпадающий список

    const optionReady = tasks.filter(task => task.title === "Backlog").map(task => <option id={ task.id }>{ task.name }</option>);
    const optionInProgress = tasks.filter(task => task.title === "Ready").map(task => <option id={ task.id }>{ task.name }</option>);
    const optionFinished = tasks.filter(task => task.title === "In Progress").map(task => <option id={ task.id }>{ task.name }</option>);

    const filteredTasks = tasks
        .filter(task => task.title === title)
        .sort((a, b) => a.id - b.id)
        .map(task => (
            <Link to={`/task/${task.id}`} state={{ taskDate: task, from: title }} className='card__link'>
                <div className='card__task'>{ task.name }</div>
            </Link>
    ));

    const onButtonAddClick = () => {
        refAdd.current.style.display = 'none'
        refSubmit.current.style.display = 'block'
        if(title === 'Backlog'){
            refInput.current.style.display = 'block'
        } else {
            refSelect.current.style.display = 'block'
        }
    }
    const onButtonSubmitClick = () => {
        if(title === 'Backlog' && refInput.current.value !== ""){
            addTask(title, refInput.current.value);
            refInput.current.style.display = 'none';
            refInput.current.value = ""
            refAdd.current.style.display = 'block';
            refSubmit.current.style.display = 'none';
        } else if(refSelect.current.textContent !== ""){
            changeTask(tasks.forEach((elem) => elem.id.toString() === refSelect.current.options[refSelect.current.selectedIndex].id ? ((elem.title = title) && (elem.id = Date.now())) : (null)));
            refSelect.current.style.display = 'none';
            refSubmit.current.style.display = 'none';
            refAdd.current.style.display = 'block';
        }
    }

    return(
        <div>
            <div className='card'>
                <div className='card__title'>{ title }</div>
                <div className='card__task-length'>Количество задач - { filteredTasks.length }</div>
                { filteredTasks }
                <textarea ref={refInput} className='card__input' type='text' placeholder='Введите новую задачу'></textarea>
                <select ref={refSelect} className='card__select'>{ title === "Ready" ? (optionReady) : (title === "In Progress" ? (optionInProgress) : (title === "Finished" ? (optionFinished) : (null))) }</select>
                <button ref={refSubmit} className='button__submit' onClick={onButtonSubmitClick}>Назначить задачу</button>
                <button ref={refAdd} className='button__add' onClick={onButtonAddClick}>Добавить задачу</button>
            </div>
            <Routes>
                <Route path="/" element={null} />
                <Route path="/task/:taskId/*" element={<TaskDescription />} />
            </Routes>
        </div>
    );
}