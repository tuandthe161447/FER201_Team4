
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/header';
import Slide_hearder from './components/slide_header';
import Footer from './components/footer';
import Posts from './components/posts';

function App() {
  return (
    <div className='container-fluid' >
      <BrowserRouter>
      {/* <Header/> */}
      {/* <Slide_hearder/> */}
      <Routes>
        <Route path='/posts' element={<Posts/>}/>
      </Routes>
      {/* <Footer/> */}
      </BrowserRouter>

    </div>
  );
}

export default App;
