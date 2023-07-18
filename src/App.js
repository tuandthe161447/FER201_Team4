
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/header';
import Slide_hearder from './components/slide_header';
import Footer from './components/footer';
import Login from './components/login';
import Sign_up from './components/sign_up';
import Blog from './components/Blog';
import Category from './components/category';
import Home from './components/home';
import PostManager from './components/PostManager';
import Create from './components/Create';
import EditPost from './components/EditPost';
import Usermanager from './components/Usermanager';
import UserDetail from './components/UserDetail';
// import PostDetail from './components/post/post_detail';


function App() {
  return (
    <>
      <Header />
      <BrowserRouter>

        <Routes>

          <Route path='/blog' element={<Blog />} />
          <Route path='/' element={<Home />} />
          <Route path='/usermanager' element={<Usermanager />} />
          <Route path='/postmanager' element={<PostManager />} />
          <Route path='/create' element={<Create />} />
          {/* <Route path='/post/detail/:pid' element={<PostDetail />} /> */}
          <Route path='/edit/:code' element={<EditPost />} />
          <Route path='/user/:code' element={<UserDetail />} />
          <Route path='/login' element={<Login />} />
          <Route path='/Sign_up' element={<Sign_up />} />

        </Routes>
      </BrowserRouter>
      <div className='' style={{ marginTop: '100px' }}><Footer /></div>

    </>
  );
}

export default App;
