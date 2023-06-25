
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/header';
import Slide_hearder from './components/slide_header';
import Footer from './components/footer';

function App() {
  return (
    <div className='container-fluid' >
      <BrowserRouter>
      <Header/>
      <Slide_hearder/>
      <Footer/>
      </BrowserRouter>

    </div>
  );
}

export default App;
