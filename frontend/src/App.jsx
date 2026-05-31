import { Routes, Route } from 'react-router';
import Header from './Header';
import Home from './Home';
import Summary from './Summary';

function App() {
  return (
    <>
      <Header title='Expenses Tracker' />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/summary' element={<Summary />} />
      </Routes>
    </>
  )
}

export default App;