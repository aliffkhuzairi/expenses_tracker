import { Routes, Route } from 'react-router';
import Header from './Header';
import Home from './Home';
import Summary from './Summary';
import Budget from './Budget';

function App() {
  return (
    <>
      <Header title='Expenses Tracker' />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/summary' element={<Summary />} />
        <Route path='/budget' element={<Budget />} />
      </Routes>
    </>
  )
}

export default App;