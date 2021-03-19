import './App.css';
import Firstpage from './Components/Firstpage';
import UploadImage from './Components/UploadImage';
import {BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Firstpage></Firstpage>
      {/* <UploadImage></UploadImage> */}

      {/* <Router>
        <Navbar />
      </Router> */}
    </div>
  );
}

export default App;
