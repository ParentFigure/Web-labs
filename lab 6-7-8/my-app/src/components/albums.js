import React from "react";
import { Link, useLocation } from "react-router-dom";
import Button from "./Button";
import albums from "./album_data";

const Albums = ({ data=albums, limit }) => {
    const location = useLocation();
    const displayedData = limit ? data.slice(0, limit) : data;

    return (
        <ul className="items-container">
            {displayedData.length > 0 ? (
                displayedData.map((album) => (
                    <li className="album-container" key={album.id}>
                        <img className="album-img" src={album.img} alt={album.title} />
                        <h1 className="title-album">{album.title}</h1>
                        <p className="description-album">{album.description}</p>
                        {location.pathname === '/catalog' && (
                            <>
                                <div className="price">
                                    <p className="txt-price">Price: </p>
                                    <p className="price-album">{`${album.price} грн`}</p>
                                </div>
                                <Link className="link" to={`/item-page/${album.id}`}>
                                    <Button className="view-more-btn" text="View more" />
                                </Link>
                            </>
                        )}
                    </li>
                ))
            ) : (
                <p className="txt-no-found">No albums found</p>
            )}
        </ul>
    );
};

export default Albums;