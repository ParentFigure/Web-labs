// src/pages/Home.js
import React from 'react';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import HomeContent from '../components/HomeContent';
import ProductPreview from '../components/ProductPreview';
import Footer from '../components/Footer';

const Home = () => (
    <div>
        <Header />
        <Navigation />
        <HomeContent />
        <section>
            <ProductPreview />
            <ProductPreview />
            <ProductPreview />
        </section>
        <Footer />
    </div>
);

export default Home;
