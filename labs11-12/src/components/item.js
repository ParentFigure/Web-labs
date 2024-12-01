import React, { useState } from "react";
import { Link, useParams } from 'react-router-dom';
import Button from "./Button";
import { Select } from 'antd';
import useFetchAlbums from "../FetchAlbum";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItem } from "../redux/itemSlice";

function Item() {
    const { id } = useParams();
    const { albums, loading, error} = useFetchAlbums();
    const [selectedType, setSelectedType] = useState("Тип приводу");
    const [selectedPower, setSelectedPower] = useState("Потужність");
    const [count, setCount] = useState(1);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const album = albums.find(item => String(item._id) === id);

    const handleChangeType = (value) => {
        setSelectedType(value);
    }
    const handleChangePower = (value) => {
        setSelectedPower(value);
    }

    const handleViewMoreClick = (id) => {
        navigate(`/albums/${id}`);
    };

    if (loading) {
        return <div className="load">Loading...</div>;
    }
    if (error) {
        return <p>Error: {error}</p>;
    }

    const handleAdd = () => {
        if ( album ) {
            dispatch(addItem({ ...album, type: selectedType, power: selectedPower, quantity: count}));
        }
    }

    return(<div>
        <div className="item-decriptions">
            <img className="item-img" src={album.img}/>
            <div>
                <h2>{album.title}</h2>
                <p className="item-description">{album.description}</p>
                <div className="item-selects">
                    <div className="item-select">
                        <label className="label" htmlFor="select">Type of record</label>
                        <Select id="select" className="select" value={selectedType} onChange={handleChangeType} onCountChange={setCount}>
                            <Select.Option value="disc">disc</Select.Option>
                            <Select.Option value="cassette">cassette</Select.Option>
                            <Select.Option value="vinyl record">vinyl record</Select.Option>
                        </Select>
                    </div>
                    <div className="item-select">
                        <label className="label" htmlFor="select">Bonuses</label>
                        <Select className="select" value={selectedPower} onChange={handleChangePower} onCountChange={setCount}>
                            <Select.Option value="Current discount">Current discount</Select.Option>
                            <Select.Option value="Personal bonus">Personal bonus</Select.Option>
                            <Select.Option value="Surprise box">Surprise box</Select.Option>
                        </Select>
                    </div>
                </div>
            </div>
        </div>
        <div className="item-nav">
            <p className="item-price">Price: {`${album.price} грн`}</p>
            <div>
                <Link className="link" to="/catalog">
                    <Button className="back-btn"  text="Go back" />
                </Link>
                <Link className="link" to="/cart">
                    <Button className="add-btn" text="Add to cart" onClick={handleAdd}/>
                </Link>
            </div>
        </div>
    </div>)
}

export default Item;