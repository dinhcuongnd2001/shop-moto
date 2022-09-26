import './App.css';
import {Route, Routes} from 'react-router-dom'
import AuthProvider ,{AuthContext} from './context/AuthProvider'
import DataProvider from './context/DataProvider';
import PrePage from './components/PrePage';
import Home from './components/Home'
function App() {
  return (
    <div className="App">
      <AuthProvider>
        <DataProvider>
          <Routes>
            <Route path='' element = {<PrePage/>} />
            <Route path='/home' element = {<Home/>} />
          </Routes>
        </DataProvider>
      </AuthProvider>
    </div>  
  );
}

export default App;
