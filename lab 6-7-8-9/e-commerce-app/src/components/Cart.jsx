import React from 'react';

const Cart = ({ match }) => {
    const { id } = match.params;
    // Use id to fetch the item details from your state or API

    return (
        <div>
            <h2>Cart Details</h2>
            {/* Display the item details here */}
        </div>
    );
};

export default Cart;
