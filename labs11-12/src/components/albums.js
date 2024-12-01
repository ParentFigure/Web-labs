import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "./Button";
import useFetchAlbums from "../FetchAlbum";

const Albums = ({data, limit }) => {
    const { albums, loading, error } = useFetchAlbums(); 
    const navigate = useNavigate();
    const location = useLocation();

    const albumData = data || albums

    const handleViewMoreClick = (id) => {
        navigate(`/albums/${id}`);
    };

    const displayedData = limit ? albumData.slice(0, limit) : albumData;


    if (error) {
        return <p>Error: {error}</p>;
    }

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
                                <Button className="view-more-btn" text="View more" onClick={() => handleViewMoreClick(album._id)}/>
                            </>
                        )}
                    </li>
                ))
            ) : (
                <p className="txt-no-found"></p>
            )}
        </ul>
    );
};

export default Albums;