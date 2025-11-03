import { Routes, Route } from 'react-router-dom';
import AppShell from './components/AppShell';
import HomePage from './pages/HomePage';

function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </AppShell>
  );
}

export default App;
