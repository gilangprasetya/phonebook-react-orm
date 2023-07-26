import Header from "./Header";
import ContactCard from "./ContactCard";
import { useEffect, useState } from "react";
import axios from 'axios';

export default function Phonebooks() {

    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/api/phonebooks').then((response) => {
            if (response.data.phonebooks) {
                setData(response.data.phonebooks);
            }
        });
    }, []);

    return (
        <div className="container">
            <header>
                <Header />
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
                        />
                    ))}
                </ul>
            </main>
        </div>
    );
};