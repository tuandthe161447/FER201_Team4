
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/header';
import Slide_hearder from './components/slide_header';
import Footer from './components/footer';
import Posts from './components/posts';
import Category from './components/category';
import Home from './components/home';
import { Row } from 'react-bootstrap';
import PostManager from './components/PostManager';
import Create from './components/Create';
import EditPost from './components/EditPost';
import Usermanager from './components/Usermanager';
import UserDetail from './components/UserDetail';


function App() {
  return (
    <>
      <Header />
      <BrowserRouter>
      <Routes>
        <Route path='/usermanager' element={<Usermanager/>}/>
        <Route path='/postmanager' element={<PostManager/>}/>
        <Route path='/create' element={<Create/>}/>
        <Route path='/edit/:code' element={<EditPost/>}/>
        <Route path='/user/:code' element={<UserDetail/>}/>
      </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
