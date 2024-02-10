import {NavLink} from "react-router-dom";

const Navbar = () => {
    return (
        <div className="flex bg-gray-500 h-16 text-white">
            <h2 className="text-2xl mt-4 ml-36 font-bold">Quotes Central</h2>
            <div className="flex text-end ml-64">
                <NavLink className="text-1xl ml-96 mt-5" to="/" >Quotes </NavLink>
                <NavLink className="text-1xl ml-16 mt-5" to="/NewQuote" >New quotes</NavLink>
            </div>
        </div>
    );
};

export default Navbar;