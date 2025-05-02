import './style_footer.css';
import '../fonts.css';
import { useState, useEffect } from 'react';


export function Footer() {
  
  const name = "Popov Konstantin";
  const year = new Date().getFullYear();

  const [countBacklogTasks, setCount] = useState();
  const [countFinishedTasks, setCountF] = useState();

  let l = localStorage.length;

  useEffect((l) => {
    let countBacklog = 0;
    let countFinished = 0;
    for (let i = 0; i < localStorage.length; i++) {
      const value = localStorage.getItem(localStorage.key(i));
      const parsedValue = JSON.parse(value);
      if (parsedValue.title === 'backlog') {
        countBacklog++;
      } else{
        if (parsedValue.title === 'finished') {
        countFinished++;
        }
      } 
    }
    setCount(countBacklog);
    setCountF(countFinished);
  }, [l]);
  

  return (
    <section className="footer">
      <div className='footer__active'>Active tasks: {countBacklogTasks}</div>
      <div className='footer__finished'>Finished tasks: {countFinishedTasks}</div>
      <div className='footer__by'>Kanban board by {name}, {year}</div>
    </section>
  );
}