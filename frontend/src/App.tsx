import { Signin } from './pages/Signin';
import { Signup } from './pages/Signup';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Dashboard } from './pages/dashboard';
import { Share } from './pages/Share';

import Landing2 from './pages/Landing2';
import { Landing } from './pages/Landing';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing2 />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/brain/:shareLink" element={<Share />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
