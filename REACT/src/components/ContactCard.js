import React, { useState } from 'react';
import axios from 'axios';

export default function ContactCard({ id, name, phone, avatar }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState(name);
    const [editedPhone, setEditedPhone] = useState(phone);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = async (event) => {
        event.preventDefault(); // Prevent the default form submission behavior

        try {
            // Perform API call to update the contact data
            await axios.put(`http://localhost:3001/api/phonebooks/${id}`, {
                name: editedName,
                phone: editedPhone,
            });

            // Update the local state with the edited values and exit edit mode
            setEditedName(editedName);
            setEditedPhone(editedPhone);
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating contact:', error);
            // Handle the error, show an error message, or implement proper error handling
        }
    };

    return (
        <li className="card">
            <div className="image">
                <img
                    src={avatar ? `http://localhost:3001/images/${avatar}` : '/user.png'}
                    className="img-fluid"
                    width="90px"
                    alt="User"
                />
            </div>
            <div className="info">
                {isEditing ? (
                    // Show input fields during edit mode
                    <form onSubmit={handleSaveClick}>
                        <input
                            type="text"
                            value={editedName}
                            onChange={(e) => setEditedName(e.target.value)}
                        />
                        <br />
                        <input
                            type="text"
                            value={editedPhone}
                            onChange={(e) => setEditedPhone(e.target.value)}
                        />
                        <br />
                    </form>
                ) : (
                    // Show contact details in non-edit mode
                    <>
                        <span className="name">{editedName}</span>
                        <br />
                        <span className="phone">{editedPhone}</span>
                        <br />
                    </>
                )}
                <br />
                <div className="btn-pd">
                    {isEditing ? (
                        <>
                            <button type="submit" className="btn" onClick={handleSaveClick}>
                                <i className="fa-solid fa-floppy-disk"></i>
                            </button>
                        </>
                    ) : (
                        <>
                            <button className="btn" onClick={handleEditClick}>
                                <i className="fa-solid fa-pen-to-square"></i>
                            </button>
                            <button className="btn">
                                <i className="fa-solid fa-trash-can"></i>
                            </button>
                        </>
                    )}
                </div>
            </div>
        </li>
    );
}
