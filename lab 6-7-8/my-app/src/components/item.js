import React from "react";
import { Link, useParams } from 'react-router-dom';
import albums from "./album_data";
import Button from "./Button";
import { Select } from 'antd';

function Item() {
    const { id } = useParams();
    const album = albums.find(item => item.id === parseInt(id));

    return(<div>
        <div className="item-decriptions">
            <img className="item-img" src={album.img} alt=""/>
            <div>
                <h2>{album.title}</h2>
                <p className="item-description">{album.description}</p>
                <div className="item-selects">
                    <div className="item-select">
                        <label className="label" htmlFor="select">Quantity</label>
                        <input className="nav-input" type="text" />
                    </div>
                    <div className="item-select">
                        <label className="label" htmlFor="select">Bonuses</label>
                        <Select className="select" value="select">
                            <Select.Option>today's discount</Select.Option>
                            <Select.Option>personal bonus</Select.Option>
                        </Select>
                    </div>
                </div>
            </div>
        </div>
        <div className="item-nav">
            <p className="item-price">Price: {`${album.price} грн`}</p>
            <div>
                <Link className="link" to="/catalog">
                    <Button className="back-btn"  text="Go back"/>
                </Link>
                <Button className="add-btn" text="Add to cart"/>
            </div>
        </div>
    </div>)
}

export default Item;