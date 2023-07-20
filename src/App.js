
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/header';
import Slide_hearder from './components/slide_header';
import Footer from './components/footer';
import Login from './components/login';
import Sign_up from './components/sign_up';
import Blog from './components/Blog';
import Home from './components/home';
import PostManager from './components/PostManager';
import Create from './components/Create';
import EditPost from './components/EditPost';
import Usermanager from './components/Usermanager';
import UserDetail from './components/UserDetail';
import BlogDetail from './components/blog/Blog_detail';
import Posts from './components/post/post';
import PostDetail from './components/post/post_detail';
import APostManager from './components/APostManager';
import AddPost from './components/Addpost';
import EditAPost from './components/EditAPost';


function App() {
  return (
    <>
      <Header />
      <BrowserRouter>

        <Routes>
          <Route path='/post' element={<Posts />} />
          <Route path='/blog' element={<Blog />} />
          <Route path='/' element={<Home />} />
          <Route path='/usermanager' element={<Usermanager />} />
          <Route path='/postmanager' element={<PostManager />} />
          <Route path='/create' element={<Create />} />
          <Route path='/post/detail/:bid' element={<PostDetail />} />
          <Route path='/blog/detail/:bid' element={<BlogDetail />} />
          <Route path='/edit/:code' element={<EditPost />} />
          <Route path='/user/:code' element={<UserDetail />} />
          <Route path='/login' element={<Login />} />
          <Route path='/Sign_up' element={<Sign_up />} />
          <Route path='/aPostManager' element={<APostManager/>} />
          <Route path='/aPostManager/add' element={<AddPost/>} />
          <Route path='/aPostManager/editPost/:code' element={<EditAPost/>} />
          
        </Routes>
      </BrowserRouter>
      <div className='' style={{ marginTop: '100px' }}><Footer /></div>

    </>
  );
}

export default App;