import React from 'react';
import PrimaryButton from './PrimaryButton';

const Catalog = ({ items }) => {
    return (
        <div>
            <h2>Catalog</h2>
            <div className="catalog-grid">
                {items.map(item => (
                    <div key={item.id} className="catalog-item">
                        <h3>{item.name}</h3>
                        <p>{item.description}</p>
                        <PrimaryButton label="View More" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Catalog;
