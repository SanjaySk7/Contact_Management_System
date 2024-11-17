import './App.css';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import ViewContact from './pages/ViewContact';
import AddContact from './pages/AddContact';
import { AppBar, Toolbar, Button, Box } from '@mui/material';

function Navigation() {
  const navigate = useNavigate();

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Box className="navbar">
          <Button
            className="navbar-button"
            onClick={() => navigate('/')}
          >
            View Contact
          </Button>
          <Button
            className="navbar-button"
            onClick={() => navigate('/add')}
          >
            Add Contact
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

function App() {
  return (
    <div>
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<ViewContact />} />
          <Route path="/add" element={<AddContact />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
