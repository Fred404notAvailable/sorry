import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GlobalLayout from './components/layout/GlobalLayout';
import Home from './pages/Home';
import Reasons from './pages/Reasons';
import Promises from './pages/Promises';
import Forgive from './pages/Forgive';
import Journey from './pages/Journey';
import Letter from './pages/Letter';
import LoadingScreen from './components/ui/LoadingScreen';

function App() {
  return (
    <>
      <LoadingScreen />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<GlobalLayout />}>
            <Route index element={<Home />} />
            <Route path="reasons" element={<Reasons />} />
            <Route path="promises" element={<Promises />} />
            <Route path="forgive" element={<Forgive />} />
            <Route path="journey" element={<Journey />} />
            <Route path="letter" element={<Letter />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
