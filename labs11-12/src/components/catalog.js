import React, { useState, useEffect } from "react";
import Albums from "./albums";
import Button from "./Button";
import useFetchAlbums from "../FetchAlbum";

const Catalog = () => {
    const [visibleCount, setVisibleCount] = useState(4);
    const { albums, loading, error } = useFetchAlbums();

    const viewMore = () => {
        setVisibleCount(visibleCount + 4);
    }

    const hideCards = () => {
        setVisibleCount(4);
    };

    if (loading) {
        return <p className="load">Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div>
            <Albums data={albums.slice(0, visibleCount)} /> 
            {visibleCount < albums.length && (
                <Button text="View more" className="view-btn" onClick={viewMore}/>
            )}
            {visibleCount >= albums.length && (
                <Button text="Hide cards" className="view-btn" onClick={hideCards} />
            )}
        </div>
    );
};

export default Catalog;