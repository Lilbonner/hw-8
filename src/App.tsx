import './App.css'
import Navbar from "./Container/Navbar/Navbar.tsx";
import {Route, Routes} from "react-router-dom";
import Edit from "./Container/Edit.tsx";
import Quotes from "./Container/Quotes.tsx";

function NewQuotes() {
    return null;
}

function Category() {
    return null;
}

function App() {

  return (
    <div>
        <Navbar/>
        <div>
            <Routes>
                <Route path="/" element={<Quotes/>}/>
                <Route path="/NewQuotes" element={<NewQuotes />} />
                <Route path="/category/:categoryId" element={<Category/>}/>
                <Route path="/:id/EditQuote" element={<Edit/>} />
            </Routes>
        </div>
    </div>
  )
}

export default App
