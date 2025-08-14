import './style_task.css';
import Image from './cross.png'
import { Link, useLocation } from 'react-router-dom';
import { useRef, useContext } from 'react';
import { TaskContext } from '../../../../contexts/TaskContext.jsx';

export function TaskDescription(){

    const refInput = useRef();
    
    const { tasks, changeTask } = useContext(TaskContext);
    const { state } = useLocation();
    const task = state?.taskDate;

    const onTaskButtonClick = () => {
        changeTask(tasks.forEach((elem) => ((elem.id === task?.id) && (refInput.current.value !== "")) ? (elem.description = refInput.current.value) : (null)));
    }

    return(
        <div className="task">
            <div className='task__close'>
                <Link to="/"><img src={Image} alt="Закрытие страницы" /></Link>
            </div>
            <div className='task__number'>Задача №<u>{ task?.id }</u> из <b>{ task?.title }</b></div>
            <div className='task__name'>{ task?.name }</div>
            <div className='task__description'><u>Описание для задачи</u> - <i>{ task?.description }</i></div>
            <div className='task__phrase'>Для того, чтобы изменить описание задачи, напишите изменённый вариант в поле ниже и нажмите на кнопку для подтверждения</div>
            <textarea ref={ refInput } className='task__description-change' type='text' placeholder='Введите новое описание для задачи'></textarea>
            <Link to="/"><button className='task__button' onClick={ onTaskButtonClick }>Внести изменения</button></Link>
        </div>
    )
}