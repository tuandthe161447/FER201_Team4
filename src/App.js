
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/header';
import Slide_hearder from './components/slide_header';
import Footer from './components/footer';
import Blog from './components/Blog';
import Category from './components/category';
import BlogDetail from './components/BlogDetail'

import PostManager from './components/PostManager';
import Create from './components/Create';
import EditPost from './components/EditPost';
import Usermanager from './components/Usermanager';
import UserDetail from './components/UserDetail';
import Test from './components/Test';


function App() {
  return (
    <div className='container-fluid' >
      {<Header />}
      <BrowserRouter>


        {/* <Slide_hearder/> */}
        <Routes>
          <Route path='/blog' element={<Blog />} />
          {/* <Route path='/blog/category/:cid' element={<Category />} /> */}
          <Route path='/usermanager' element={<Usermanager />} />
          <Route path='/postmanager' element={<PostManager />} />
          <Route path='/create' element={<Create />} />
          <Route path='/edit/:code' element={<EditPost />} />
          <Route path='/user/:code' element={<UserDetail />} />
          <Route path='/test/:code' element={<Test />} />
          <Route path='/blog/:code' element={<BlogDetail />} />
        </Routes>
        {<Footer />}
      </BrowserRouter>
    </div>
  );
}

export default App;
