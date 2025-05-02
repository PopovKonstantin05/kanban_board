import './style_main.css';
import { Card } from './Components/Card/card.jsx';

export function Main() {

  return (
    <section className="main">
      <div className="main__backlog">
        <Card title="Backlog" />
      </div>
      <div className="main__ready">
        <Card title="Ready" />
      </div>
      <div className="main__inprogress">
        <Card title="In Progress" />
      </div>
      <div className="main__finished">
        <Card title="Finished" />
      </div>
    </section>
  );
}
