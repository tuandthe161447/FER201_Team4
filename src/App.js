
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/header';
import Slide_hearder from './components/slide_header';
import Footer from './components/footer';
import Posts from './components/posts';
import Category from './components/category';
import Home from './components/home';
import { Row } from 'react-bootstrap';

function App() {
  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/posts' element={<Posts />} />
          <Route path='post/category/:cid' element={<Category />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
