import React from 'react';
import SDGGame from './SDGGame';

const AlphabetWheelFour = () => {
    const categories = ["University", "Learning Tools", "Innovations"];

    return <SDGGame sdgId={4} categories={categories} />;
};

export default AlphabetWheelFour;
