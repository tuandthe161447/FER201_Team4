
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/header';
import Slide_hearder from './components/slide_header';
import Footer from './components/footer';
import Posts from './components/posts';
import Category from './components/category';

import PostManager from './components/PostManager';
import Create from './components/Create';
import EditPost from './components/EditPost';
import Usermanager from './components/Usermanager';
import UserDetail from './components/UserDetail';
import Test from './components/Test';


function App() {
  return (
    <div className='container-fluid' >
          {<Header/>}
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Posts/>}/>
        <Route path='post/category/:cid' element={<Category/>}/>

      {/* <Slide_hearder/> */}
      <Routes>
        <Route path='/usermanager' element={<Usermanager/>}/>
        <Route path='/postmanager' element={<PostManager/>}/>
        <Route path='/create' element={<Create/>}/>
        <Route path='/edit/:code' element={<EditPost/>}/>
        <Route path='/user/:code' element={<UserDetail/>}/>
        <Route path='/test/:code' element={<Test/>}/>

      </Routes>
      {<Footer/>}
      </BrowserRouter>
    </div>
  );
}

export default App;
