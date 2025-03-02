import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// import './App.css'
import ShowPosts from './component/ShowPosts';
import AddPost from './component/AddPost';
import Login from './component/Login';
import Home from './component/Home';

function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='home' element={<Home />} />
        <Route path="/add-post" element={<AddPost/>}/>
        <Route path="/posts" element={<ShowPosts/>}/>
      </Routes>
    </Router>
    </>
  )
}

export default App