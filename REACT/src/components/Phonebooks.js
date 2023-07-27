import React, { useEffect, useState, useRef } from "react";
import Header from "./Header";
import ContactCard from "./ContactCard";
import axios from "axios";

export default function Phonebooks() {
    const [data, setData] = useState([]);
    const [sortOrder, setSortOrder] = useState("asc");
    const [currentPage, setCurrentPage] = useState(1);
    const totalPagesRef = useRef(1);
    const isLoadingRef = useRef(false);

    const fetchData = async (page, sortOrder) => {
        try {
            const response = await axios.get("http://localhost:3001/api/phonebooks", {
                params: { sort: sortOrder, page },
            });
            if (response.data.phonebooks) {
                setData((prevData) => [...prevData, ...response.data.phonebooks]);
                totalPagesRef.current = response.data.pages;
                isLoadingRef.current = false;
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData(currentPage, sortOrder);
    }, [currentPage, sortOrder]);

    const handleAddContact = async (name, phone) => {
        try {
            // Send a POST request to the server to create the new contact
            const response = await axios.post("http://localhost:3001/api/phonebooks", {
                name: name,
                phone: phone,
            });

            // Get the newly created contact data from the server response
            const newContact = response.data;

            // Update the data state with the new contact
            setData((prevData) => [...prevData, newContact]);
        } catch (error) {
            console.error("Error creating contact:", error);
        }
    };

    const handleSearch = async (keyword) => {
        try {
            // Fetch data from the server based on the search keyword and current sortOrder
            const response = await axios.get("http://localhost:3001/api/phonebooks", {
                params: { sort: sortOrder, keyword: keyword },
            });

            if (response.data.phonebooks) {
                setData(response.data.phonebooks);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleScroll = () => {
        if (
            window.innerHeight + window.scrollY >=
            document.documentElement.scrollHeight - 200
        ) {
            // Load more data if available and not already loading
            if (currentPage < totalPagesRef.current && !isLoadingRef.current) {
                isLoadingRef.current = true;
                setCurrentPage((prevPage) => prevPage + 1);
            }
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div className="container">
            {/* Pass the handleAddContact function as a prop */}
            <header>
                <Header
                    handleAddContact={handleAddContact}
                    sortOrder={sortOrder}
                    setSortOrder={setSortOrder}
                    handleSearch={handleSearch}
                />
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
                <div style={{ height: "250px" }}></div>
            </main>
        </div>
    );
}
