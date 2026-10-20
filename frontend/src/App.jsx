import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ChatWidget from './components/ChatWidget';

function App() {
    const [openChat, setOpenChat] = useState(false);

    return (
        <Router>
            <Navbar />

            <div className="min-h-screen bg-dark flex flex-col justify-between selection:bg-primary selection:text-dark">
                <Routes>
                    <Route
                        path="/"
                        element={<Home onOpenChat={() => setOpenChat(true)} />}
                    />
                </Routes>
            </div>

            <Footer />

            <ChatWidget
                openChat={openChat}
                onChatOpened={() => setOpenChat(false)}
            />
        </Router>
    );
}

export default App;



