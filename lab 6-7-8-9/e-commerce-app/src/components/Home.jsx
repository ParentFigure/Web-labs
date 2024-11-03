import React from 'react';
import Header from './Header';
import Footer from './Footer';
import './styles/App.css'; // Import your styles

const Home = () => {
    return (
        <div>
            <Header />
            <main>
                <h1>Welcome to Our E-commerce Store</h1>
                <p>Discover our exclusive products!</p>
                {/* Add more content here based on wireframe */}
            </main>
            <Footer />
        </div>
    );
};

export default Home;
