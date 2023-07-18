
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/header';
import Slide_hearder from './components/slide_header';
import Footer from './components/footer';
import Login from './components/login';
import Sign_up from './components/sign_up';

function App() {
  return (
    <div className='container-fluid' >
      <BrowserRouter>
      <Header/>
      {/* <Slide_hearder/> */}
      <Routes>
        <Route path='/login' element={<Login/>} />
        <Route path='/sign_up' element={<Sign_up/>} />
      </Routes>
      <Footer/>
      </BrowserRouter>

    </div>
  );
}

export default App;
