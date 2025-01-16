import React, { useState } from "react";
import { FaUser, FaSignOutAlt, FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import "./firstLevel.css";

const items = [
    { id: 1, name: "Organic Apples", price: 0.5, sustainable: true },
    { id: 2, name: "Fair Trade Coffee", price: 1.0, sustainable: true },
    { id: 3, name: "Instant Noodles", price: 1.0, sustainable: false },
    { id: 4, name: "Reusable Bag", price: 1.0, sustainable: true },
    { id: 5, name: "Wild Rice", price: 4.5, sustainable: true },
    { id: 6, name: "White Bread", price: 1.5, sustainable: false },
    { id: 7, name: "Beef", price: 2.0, sustainable: false },
    { id: 8, name: "Organic Energy Bar", price: 1.5, sustainable: true },
    { id: 9, name: "French Fries", price: 3.0, sustainable: false },
    { id: 10, name: "Potato chips", price: 2.5, sustainable: false },
    { id: 11, name: "Oats", price: 1.5, sustainable: true },
    { id: 12, name: "Cheese", price: 2.5, sustainable: false },
    { id: 13, name: "Fish", price: 2.5, sustainable: false },
    { id: 14, name: "Beans", price: 5.5, sustainable: true },
    { id: 15, name: "Moringa", price: 3.5, sustainable: true },
    { id: 16, name: "Bottled Water", price: 1.5, sustainable: false },
];

function ShoppingListChallenge() {
    const navigate = useNavigate();
    const [cart, setCart] = useState([]);
    const [budget, setBudget] = useState(20);
    const [itemQuantity, setQuantity] = useState(0);

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        navigate('/');
    };

    const goToProfile = () => {
        navigate('/profile');
    };

    const goBack = () => {
        navigate(-1);
    };

    const addItemToCart = (item) => {
        let itemQuantity = 0;

        if (item.sustainable === true) {
            const newBudget = budget - item.price;

            if (newBudget >= 0) {
                itemQuantity += 1;

                const freeItem = {
                    ...item,
                    name: `${item.name} (Free)`,
                    isFree: true,
                };

                setCart([...cart, item, freeItem]);
                setBudget(newBudget);
                setQuantity(itemQuantity);
            } else {
                alert("You can't afford this item!");
            }
        } else {
            const newBudget = budget - item.price;
            if (newBudget >= 0) {
                itemQuantity += 1;
                setCart([...cart, item]);
                setBudget(newBudget);
                setQuantity(itemQuantity);
            } else {
                alert("You can't afford this item!");
            }
        }
    };

    const isLevelComplete = items
        .filter(item => item.sustainable)
        .every(sustainableItem =>
            cart.some(cartItem => cartItem.id === sustainableItem.id)
        );

    // if (isLevelComplete === true) {
    //     alert("Congratulations! You have successfully completed the challenge.");
    // } else {
    //     alert("You have chosen unsustainable items. Please try again.");
    // }
    // console.log(isLevelComplete);

    // const handleClick = () => {
    //     navigate('/freshProduce');
    // };

    return (
        <div className="app-container">
            <div className="top-nav">
                <button onClick={goBack} className="back-button">
                    <FaArrowLeft /> Back
                </button>
                <div className="nav-buttons-right">
                    <button onClick={goToProfile} className="nav-button">
                        <FaUser /> Profile
                    </button>
                    <button onClick={handleLogout} className="logout-button">
                        <FaSignOutAlt /> Logout
                    </button>
                </div>
            </div>
            <div className='horizontal-line'></div>
            <div className="budget">
                <h1>Shopping List Challenge</h1>
                <h2>Purchase sustainable items with the given budget</h2>
                <h2>The budget should cover all sustainable items in the list</h2>
                <h2>Budget: {budget.toFixed(2)} tokens</h2>
            </div>

            {/* <div className="item-grid">
                <div className="item-card">
                    <h3>Fresh Produce</h3>
                    <button type="button" onClick={handleClick}>
                        Click Me
                    </button>
                </div>
            </div> */}

            <div className="item-grid">
                {items.map((item) => (
                    <div key={item.id} className="item-card">
                        <h3>{item.name}</h3>
                        <p>Price: {item.price} token</p>
                        {item.sustainable && <span className="tag">Sustainable</span>}
                        <button
                            onClick={() => addItemToCart(item)}
                            disabled={cart.some((cartItem) => cartItem.id === item.id)}
                        >
                            {cart.some((cartItem) => cartItem.id === item.id)
                                ? "Added"
                                : "Add to Cart"}
                        </button>
                    </div>
                ))}
            </div>

            <div className="cart">
                <h2>Cart</h2>
                <div className="cart-items">
                    <ul>
                        {cart.map((item, index) => (
                            <li key={index}>{item.name} ({item.price} tokens)</li>
                        ))}
                    </ul>
                </div>

                {isLevelComplete && <h2 className="success">Level Complete! 🎉</h2>}
            </div>
            <div className='horizontal-lines'></div>
            <div className="footer">
                <p>Sustainability Awareness Gaming App</p>
                <p>University of Johannesburg</p>
                <p>2024</p>
            </div>
        </div>
    );
}

export default ShoppingListChallenge;
