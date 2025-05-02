import './style_header.css';
import '../fonts.css';
import { useState } from 'react';
import userImage from './images/user.svg';
import arrowDown from './images/arrow_down.svg';
import arrowUp from './images/arrow_up.svg';
import { DropMenu } from './Components/DropMenu/dropmenu.jsx';

export function Header() {
  const title = "Awesome Kanban Board";
  const [open, setState] = useState(false);

  const buttonClick = () => {
    setState(!open);
  }
  
  return (
    <section className="header">
      <p className='header__title'>{ title }</p>
      <button className='header__button' onClick={ buttonClick }>
        <div className='button__img'>
          <img className='button__img-user' src={ userImage } alt="Картинка пользователя" />
        </div>
        <div className='button__symbol'>
          {
            open === false ?
              (<img className='button__symbol-arrow' src={ arrowDown } alt="Стрелка вниз" />)
            :
              (<img className='button__symbol-arrow' src={ arrowUp } alt="Стрелка вверх" />)
          }
        </div>
      </button>
      {open === true && <DropMenu />}
    </section>
  );
}