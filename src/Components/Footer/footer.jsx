import './style_footer.css';
import '../fonts.css';
import { useState, useEffect, useContext } from 'react';
import { TaskContext } from '../../contexts/TaskContext.jsx';

export function Footer() {
  
  const { tasks } = useContext(TaskContext);
  const name = "Popov Konstantin";
  const year = new Date().getFullYear();

  const [active, setActive] = useState(0);
  const [finished, setFinished] = useState(0);

  useEffect(() => {
    let act = 0;
    let fin = 0;

    tasks.forEach((elem) => { elem.title !== 'Finished' ? (act++) : (fin++)})

    setActive(act);
    setFinished(fin);
  }, [tasks]);
  

  return (
    <section className="footer">
      <div className='footer__active'>Active tasks: {active}</div>
      <div className='footer__finished'>Finished tasks: {finished}</div>
      <div className='footer__by'>Kanban board by {name}, {year}</div>
    </section>
  );
}