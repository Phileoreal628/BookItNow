import { Link } from "react-router-dom";

const Header = () => {
    return (
        <div className=" bg-blue-900 py-6 ">
            <div className="flex justify-between items-center container mx-auto">
                <span className="text-white text-3xl font-bold tracking-tight">
                    <Link to="/"> BookItNow</Link>
                </span>
                <span className="text-2xl font-bold">
                    <Link to="/sign-in" className="bg-white p-2 text-blue-700 hover:bg-gray-100 hover:text-blue-500"> Sign in </Link>
                </span>
            </div>
        </div>
    )
}

export default Header;