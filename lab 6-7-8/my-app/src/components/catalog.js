import React, { useState } from "react";
import Albums from "./albums";
import Button from "./Button";
import albums from "./album_data";

const Catalog = () => {
    const [visibleCount, setVisibleCount] = useState(4);

    const viewMore = () => {
        setVisibleCount(visibleCount + 4);
    }
    const hideCards = () => {
        setVisibleCount(4);
    };

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