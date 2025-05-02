import './style_menu.css';

export function DropMenu() {
  return (
    <div className='headermenu'>
      <div className='headermenu__symbol'>
        
      </div>
      <div className='dropmenu'>
        <ul className='dropmenu__ul'>
          <li className='dropmenu__li'>Profile</li>
          <li className='dropmenu__li'>Log Out</li>
        </ul>
      </div>
    </div>
    
  );
}