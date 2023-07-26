export default function Header() {
    return(
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
            <button className="add">
                <i className="fa-solid fa-user-plus"></i>
            </button>
        </div>
    </div>
    )
}