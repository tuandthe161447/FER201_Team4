
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/header';
import Slide_hearder from './components/slide_header';
import Footer from './components/footer';
import Posts from './components/posts';
import PostManager from './components/PostManager';
import Create from './components/Create';
import EditPost from './components/EditPost';
import Usermanager from './components/Usermanager';
import UserDetail from './components/UserDetail';


function App() {
  return (
    <div className='container-fluid' >
      <BrowserRouter>
      {<Header/>}
      {/* <Slide_hearder/> */}
      <Routes>
        <Route path='/usermanager' element={<Usermanager/>}/>
        <Route path='/postmanager' element={<PostManager/>}/>
        <Route path='/create' element={<Create/>}/>
        <Route path='/edit/:code' element={<EditPost/>}/>
        <Route path='/user/:code' element={<UserDetail/>}/>
      </Routes>
      {<Footer/>}
      </BrowserRouter>

    </div>
  );
}

export default App;
