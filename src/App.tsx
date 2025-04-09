import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import { Home, About, Projects, Contact } from './pages';
import Navbar from './components/NavBar'

const App = () => {
    return (
        <main className = "bg-slate-300/20">
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/portfolio1" element={<Home />} />
                    <Route path="/portfolio1/about" element={<About />} />
                    <Route path="/portfolio1/projects" element={<Projects />} />
                    <Route path="/portfolio1/contact" element={<Contact />} />
                </Routes>
            </Router>
        </main>
    )
}

export default App
