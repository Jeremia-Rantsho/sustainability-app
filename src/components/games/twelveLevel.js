import React from 'react';
import SDGGame from './SDGGame';

const AlphabetWheelTwelve = () => {
    const categories = ["Sustainability Terms", "Eco-Friendly Products", "Waste Management"];

    return <SDGGame sdgId={12} categories={categories} />;
};

export default AlphabetWheelTwelve;
