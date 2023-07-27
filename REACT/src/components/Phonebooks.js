import Header from "./Header";
import ContactCard from "./ContactCard";
import { useEffect, useState } from "react";
import axios from 'axios';

export default function Phonebooks() {

    const [data, setData] = useState([]);

    const [sortOrder, setSortOrder] = useState("asc");

    const fetchData = async (sortOrder) => { // Receive sortOrder as an argument
        try {
            const response = await axios.get("http://localhost:3001/api/phonebooks", {
                params: { sort: sortOrder },
            });
            if (response.data.phonebooks) {
                setData(response.data.phonebooks);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData(sortOrder);
    }, [sortOrder]);

    const handleAddContact = async (name, phone) => {
        try {
            // Send a POST request to the server to create the new contact
            const response = await axios.post('http://localhost:3001/api/phonebooks', {
                name: name,
                phone: phone
            });

            // Get the newly created contact data from the server response
            const newContact = response.data;

            // Update the data state with the new contact
            setData((prevData) => [...prevData, newContact]);
        } catch (error) {
            console.error("Error creating contact:", error);
        }
    };

    return (
        <div className="container">
            {/* Pass the handleAddContact function as a prop */}
            <header>
                <Header handleAddContact={handleAddContact} sortOrder={sortOrder} setSortOrder={setSortOrder} />
            </header>
            <main className="mt-3">
                <ul>
                    {data.map((contact) => (
                        <ContactCard
                            key={contact.id}
                            id={contact.id}
                            name={contact.name}
                            phone={contact.phone}
                            avatar={contact.avatar}
                            data={data}
                            setData={setData}
                        />
                    ))}
                </ul>
            </main>
        </div>
    );
};