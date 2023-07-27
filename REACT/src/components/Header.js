import { useState } from "react";

export default function Header({ handleAddContact }) {
    const [showPopup, setShowPopup] = useState(false);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");

    const handleAddButtonClick = () => {
        setShowPopup(true);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setShowPopup(false);
        handleAddContact(name, phone);
        setName("");
        setPhone("");
        window.location.reload();
    };

    const handleCancelButtonClick = () => {
        setShowPopup(false);
        setName("");
        setPhone("");
    };

    return (
        <div className="top-bar">
            <div className="item">
                <button className="filter">
                    <i className="fa-solid fa-arrow-up-z-a"></i>
                </button>
            </div>
            <div className="item search-form">
                <i className="fas fa-solid fa-magnifying-glass"></i>
                <input type="text" id="search" className="search" />
            </div>
            <div className="item">
                <button
                    className="add"
                    onClick={handleAddButtonClick}
                    onMouseOver={(e) => (e.target.style.cursor = 'pointer')}
                    onMouseOut={(e) => (e.target.style.cursor = 'auto')}>
                    <i className="fa-solid fa-user-plus"></i>
                </button>
            </div>

            {/* Popup menu */}
            {showPopup && (
                <div className="popup">
                    <form onSubmit={handleFormSubmit}>
                        <input
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                        <div className="button-add">
                            <button type="submit">Save</button>
                            <button type="button" onClick={handleCancelButtonClick}>
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}
