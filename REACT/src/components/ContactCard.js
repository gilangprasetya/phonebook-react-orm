import axios from "axios"

export default function ContactCard({ name, phone }) {


    return (
        <li className="card">
            <div className="image">
                <img src="user.png" className="img-fluid" width="90px" alt="User" />
            </div>
            <div className="info">
                <span className="name">{name}</span>
                <br />
                <span className="phone">{phone}</span>
                <br />
                <div className="btn-pd">
                    <button className="btn">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button className="btn">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                </div>
            </div>
        </li>
    )
}