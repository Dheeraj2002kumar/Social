import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css'
import ShowPosts from './component/ShowPosts';
import AddPost from './component/AddPost';

function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path="/add-post" element={<AddPost/>}/>
        <Route path="/posts" element={<ShowPosts/>}/>
      </Routes>
    </Router>
    </>
  )
}

export default App