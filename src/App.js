import './App.css';
import { Header } from './Components/Header/header.jsx';
import { Main } from './Components/Main/main.jsx';
import { Footer } from './Components/Footer/footer.jsx';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Main />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
