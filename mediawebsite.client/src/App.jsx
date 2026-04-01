import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Home from "./components/pages/Home"
import Messages from "./components/pages/Messages"
import Connections from "./components/pages/Connections"
import Settings from "./components/pages/Settings"

function App() {
    return (
        <BrowserRouter>
            <div className="site-wrapper d-flex flex-column min-vh-100">

                <Navbar />

                <main className="page-content flex-grow-1">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/messages" element={<Messages />} />
                        <Route path="/connections" element={<Connections />} />
                        <Route path="/settings" element={<Settings />} />
                    </Routes>
                </main>

                <Footer />

            </div>
        </BrowserRouter>
    )
}

export default App