import React, { useState } from "react";
import Navigation from "./navigation";
import Filter from "./filter";
import Footer from "./footer";
import Albums from "./albums";
import albums from "./album_data";

function CatalogPage() {
    const [filteredData, setFilteredData] = useState(albums.slice(0, 4));

    const handleSearch = (searchTerm) => {
        const filtered = albums.filter(album =>
            album.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredData(filtered);
    };
    const handleSort = (sortCriteria) => {
        let sortedAlbums = [...filteredData];
        if (sortCriteria === "Name") {
            sortedAlbums.sort((a, b) => a.title.localeCompare(b.title));
        } else if (sortCriteria === "Price") {
            sortedAlbums.sort((a, b) => a.price - b.price);
        } else if (sortCriteria === "Power") {
            sortedAlbums.sort((a, b) => (a.power || 0) - (b.power || 0));
        }
        setFilteredData(sortedAlbums);
    };
    return(<div>
        <Navigation onSearch={handleSearch}/>
        <Filter onSort={handleSort} />
        <Albums data={filteredData.slice(0, 4)} />
        <Footer />
    </div>)
}

export default CatalogPage;