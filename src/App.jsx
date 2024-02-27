import Home from "./routes/Home"
import Budget from "./routes/Budget"
import Reminders from "./routes/Reminders"
import Profitability from "./routes/Profitability"
import Nav from "./components/componentsGlobals/Nav"
import { BrowserRouter, Routes, Route } from "react-router-dom"

function App() {

  return (
    <BrowserRouter>
    <Nav/>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/presupuesto" element={<Budget />} />
        <Route exact path="/recordatorios" element={<Reminders />} />
        <Route exact path="/rentabilidad" element={<Profitability />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
