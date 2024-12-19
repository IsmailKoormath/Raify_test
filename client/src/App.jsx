import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppointmentBooking from './Pages/AppointmentBooking';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<AppointmentBooking />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
