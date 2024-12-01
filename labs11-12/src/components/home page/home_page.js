import React from "react";
import imgAlbum from "../../img/album2.jpg";

const HomePage = () => {
    return (
        <main className="home">
            <img className="home-img" src={imgAlbum}/>
            <div className="home-description">
                <h1 className="title">FEAR OF THE DARK</h1>
                <p className="description">The most popular album we have at the moment. Buy two and get 30% discount on each!
                Enjoy with your friends together the heavy metal gonden era!</p>
            </div>
        </main>
    )
}

export default HomePage;