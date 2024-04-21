import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import SignOut from "./SignOut";

const Header = () => {
    const { isLoggedIn } = useAppContext();
    return (
        <div className=" bg-blue-900 py-6 ">
            <div className="flex justify-between  container mx-auto">
                <span className="text-white text-3xl font-bold tracking-tight">
                    <Link to="/"> BookItNow</Link>
                </span>
                {isLoggedIn ? <span className="flex space-x-2">
                    <Link to="/my-bookings" className="flex items-center bg-white  p-2 text-blue-700 hover:bg-gray-100 hover:text-blue-500"> My Bookings </Link>
                    <Link to="/my-hotels" className="flex items-center bg-white  p-2 text-blue-700 hover:bg-gray-100 hover:text-blue-500"> My Hotels </Link>
                    <SignOut />
                </span> :
                    <span className="flex space-x-2">
                        <Link to="/sign-in" className="bg-white p-2 text-blue-700 hover:bg-gray-100 hover:text-blue-500"> Sign in </Link>
                    </span>}
            </div>
        </div>
    )
}

export default Header;