import React from 'react';
import SDGGame from './SDGGame';

const AlphabetWheelEight = () => {
    const categories = ["Jobs", "Economic Terms", "Industries"];

    return <SDGGame sdgId={8} categories={categories} />;
};

export default AlphabetWheelEight;
