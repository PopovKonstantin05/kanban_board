import './style_card.css';
import { useState, useRef, useEffect } from 'react';

export function Card({ title }) {
    const refAdd = useRef(null);
    const refSubmit = useRef(null);
    const refInput = useRef(null);
    const refSelect = useRef(null);

    const [bool, setBool] = useState(true);
    //Переключатель состояния для кнопки
    const [open, setState] = useState(false);
    //Задачи в Backlog
    const [backlogTasks, setBacklogTasks] = useState();
    //Задачи в Ready
    const [readyTasks, setReadyTasks] = useState();
    //Селектор в Ready
    const [readySelectedTasks, setReadySelectedTasks] = useState();

    //Отображение данных только при первом рендере
    useEffect(() => {
        let backlogUpdatedTasks = [];
        let readyUpdatedTasks = [];
        let readySelected = [];

        for(let i=0; i<localStorage.length; i++){
            const parsedValue = JSON.parse(localStorage.getItem(localStorage.key(i)));
            if(parsedValue.title === 'backlog'){
                backlogUpdatedTasks.push(<div className='card__task' id={parsedValue.id}>{parsedValue.name}</div>);
                readySelected.push(<option id={parsedValue.id}>{parsedValue.name}</option>);
            }
            if(parsedValue.title === 'ready'){
                readyUpdatedTasks.push(<div className='card__task' id={parsedValue.id}>{parsedValue.name}</div>);
            }
        }

        setBacklogTasks(backlogUpdatedTasks.sort((a, b) => a.props.id - b.props.id))
        setReadyTasks(readyUpdatedTasks.sort((a, b) => a.props.id - b.props.id))
        setReadySelectedTasks(readySelected.sort((a, b) => a.props.id - b.props.id))
    }, [bool])

    //Кнопка +Add Card
    const buttonAddClick = () => {
        setBool(!bool)
        setState(!open);
        open === false ? ((refAdd.current.style.display = 'none') && (refSubmit.current.style.display = 'block')) : ((refAdd.current.style.display = 'block') && (refSubmit.current.style.display = 'none'))
        title === 'Backlog' ? (refInput.current.style.display = 'block') : (refInput.current.style.display = 'none')
        title === 'Ready' ? (refSelect.current.style.display = 'block') : (refSelect.current.style.display = 'none')
    }

    //Кнопка Submit
    const buttonSubmitClick = () => {
        setState(!open);
        if(refInput.current.value !== '' && title === 'Backlog'){
            refAdd.current.style.display = 'block';
            refInput.current.style.display = 'none';
            refSubmit.current.style.display = 'none';

            let newTasks = [];
            let newSelected = [];

            localStorage.setItem(localStorage.length+1, JSON.stringify({title: 'backlog', id: localStorage.length+1, name: refInput.current.value, description: 'This task has no description'}));
            
            for(let i=0; i<localStorage.length; i++){
                const parsedValue = JSON.parse(localStorage.getItem(localStorage.key(i)));
                if(parsedValue.title === 'backlog'){
                    newTasks.push(<div className='card__task' id={parsedValue.id}>{parsedValue.name}</div>);
                    newSelected.push(<option id={parsedValue.id}>{parsedValue.name}</option>);
                }
            }
            
            setBacklogTasks(newTasks.sort((a, b) => a.props.id - b.props.id))
            setReadySelectedTasks(newSelected.sort((a, b) => a.props.id - b.props.id))
            refInput.current.value = '';
        }

        if(title === 'Ready'){
            refSelect.current.style.display = 'none';
            refSubmit.current.style.display = 'none';
            refAdd.current.style.display = 'block';

            let newTasks = [];
            let newTasks2 = [];
            let newReadySelected = [];

            //const optionsAfterSelected = Array.from(refSelect.current.options).slice(refSelect.current.selectedIndex + 1);
            for(let i=0; i<localStorage.length; i++){
                const parsedValue = JSON.parse(localStorage.getItem(localStorage.key(i)));
                if(refSelect.current.selectedIndex + 1 === parsedValue.id){
                    localStorage.setItem(parsedValue.id, JSON.stringify({title: 'ready', id: parsedValue.id, name: refSelect.current.value, description: 'This task has no description'}));
                }
            }


            for(let i=0; i<localStorage.length; i++){
                const parsedValue = JSON.parse(localStorage.getItem(localStorage.key(i)));
                if(parsedValue.title === 'ready'){
                    newTasks.push(<div className='card__task' id={parsedValue.id}>{parsedValue.name}</div>);
                }
                if(parsedValue.title === 'backlog'){
                    newTasks2.push(<div className='card__task' id={parsedValue.id}>{parsedValue.name}</div>);
                    newReadySelected.push(<option id={parsedValue.id}>{parsedValue.name}</option>);
                }
            }

            setReadyTasks(newTasks.sort((a, b) => a.props.id - b.props.id))
            setBacklogTasks(newTasks2.sort((a, b) => a.props.id - b.props.id))
            setReadySelectedTasks(newReadySelected.sort((a, b) => a.props.id - b.props.id))
        }
    }

    return (
        <div className='card'>
            <div className='card__title'>{ title }</div>
            { title === 'Backlog' ? (backlogTasks) : (title === 'Ready' ? (readyTasks) : (null))}
            <select ref={refSelect} className='card__select'>
                { readySelectedTasks }
            </select>
            <textarea ref={refInput} className='card__input' type='text' placeholder='Введите название задачи'></textarea>
            <button ref={refAdd} className='button__add' onClick={ buttonAddClick }>+ Add card</button>
            <button ref={refSubmit} className='button__submit' onClick={ buttonSubmitClick }>Submit</button>
        </div>
    );
}