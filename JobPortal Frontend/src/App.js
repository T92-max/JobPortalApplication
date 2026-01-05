import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import AllPosts from './components/AllPosts';
import Create from './components/Create';
import Edit from './components/Edit';
import Contacts from './components/Contacts';
import jobRecommendations from './components/jobRecommendtions';
import CandidateMatch from './components/CandidateMatch';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/allposts" element={<AllPosts />} />
        <Route path="/create" element={<Create />} />
        <Route path="/edit/:postId" element={<Edit />} />
        <Route path="/contacts" element={<Contacts />} />
        
        {/* AI Features */}
        <Route path="/recommendations" element={<jobRecommendations />} />
        <Route path="/match/:jobId" element={<CandidateMatch />} />
      </Routes>
    </div>
  );
}

export default App;