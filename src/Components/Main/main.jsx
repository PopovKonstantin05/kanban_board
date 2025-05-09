import './style_main.css';
import { Card } from './Components/Card/card.jsx';

export function Main() {

  return (
    <section className="main">
      <div className="main__card">
        <Card title="Backlog" />
      </div>
      <div className="main__card">
        <Card title="Ready" />
      </div>
      <div className="main__card">
        <Card title="In Progress" />
      </div>
      <div className="main__card">
        <Card title="Finished" />
      </div>
    </section>
  );
}
