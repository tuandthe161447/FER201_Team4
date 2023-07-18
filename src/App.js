
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
import PostDetail from './components/post/post_detail';


function App() {
  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path='/posts' element={<Posts/>} />
          <Route path='/' element={<Home />} />
          <Route path='/usermanager' element={<Usermanager />} />
          <Route path='/postmanager' element={<PostManager />} />
          <Route path='/create' element={<Create />} />
          <Route path='/post/detail/:pid' element={<PostDetail />} />
          <Route path='/edit/:code' element={<EditPost />} />
          <Route path='/user/:code' element={<UserDetail />} />
        </Routes>
      </BrowserRouter>
      <div className='' style={{marginTop: '100px'}}><Footer /></div>
      
    </>
  );
}

export default App;
