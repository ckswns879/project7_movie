import './App.css';
import Boxoffice from './boxoffice/Boxoffice'
import BoxMv from './boxoffice/BoxMv';
import {Routes,Route} from 'react-router-dom';

function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<Boxoffice/>}/>
      <Route path='/mv' element={<BoxMv/>}/>
    </Routes>
    </>
  );
}

export default App;
