import React from "react";
import Button from "./Button";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { incrementQuantity, decrementQuantity } from "../redux/itemSlice";

const Cart = () => {
    const items = useSelector((state) => state.card.items);
    const dispatch = useDispatch()

    const totalAmount = items.reduce((total, item) => total + item.price * item.quantity, 0);

    const handleIncrement = ( id, type, power ) => {
        dispatch(incrementQuantity({ id, type, power }))
    };
    const handleDecrement = ( id, type, power ) => {
        dispatch(decrementQuantity({ id, type, power }))
    };

    return (<div>
            <h1 className="title-shopping-cart">Shopping Cart</h1>
        <div>
            {items.map((album) => (
                <div className="item-container" key={`${album._id}-${album.type}-${album.power}`}>
                    <img className="item-img" src={album.img}/>
                    <h2 className="item-title">{album.title}</h2>
                    <div className="item-element">
                        <div className="selected-item">
                            <p>Type of disc: {album.type}</p>
                            <p>Bonuses: {album.power}</p>
                        </div>
                        <div>
                            <Button className="btn-minus" text="-" onClick={() => handleDecrement(album._id, album.type, album.power)}/>
                            <span>{album.quantity}</span>
                            <Button className="btn-plus" text="+" onClick={() => handleIncrement(album._id,  album.type, album.power)}/>
                        </div>
                        <p className="item-price">{album.price * album.quantity} грн</p>
                    </div>
                </div>
            ))}
        </div>
        <div>
        <p className="txt-cart">Total amount: {totalAmount}</p>
        </div>
        <div className="buttons">
            <Link className="link" to="/catalog">
                <Button className="back-btn" text="Back to Catalog"/>
            </Link>
            <Button className="add-btn" text="Continue"/>
        </div>
    </div>)
}

export default Cart;