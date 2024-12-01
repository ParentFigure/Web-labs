import React from "react";
import Navigation from "../navigation/navigation";
import Catalog from "./catalog";
import Footer from "../footer/footer";
import HomePage from "./home_page";

function Home() {
    return(<div>
        <Navigation />
        <HomePage />
        <Catalog />
        <Footer />
    </div>)
}

export default Home;