import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import SignOut from "./SignOut";

const Header = () => {
    const { isLoggedIn } = useAppContext();
    return (
        <div className=" bg-blue-900 py-6 ">
            <div className="flex justify-between items-center container mx-auto">
                <span className="text-white text-3xl font-bold tracking-tight">
                    <Link to="/"> BookItNow</Link>
                </span>
                {isLoggedIn ? <span className="text-2xl font-bold">
                    <Link to="/my-booking" className="bg-white m-2 p-2 text-blue-700 hover:bg-gray-100 hover:text-blue-500"> My Bookings </Link>
                    <SignOut />
                </span> :
                    <span className="text-2xl font-bold">
                        <Link to="/sign-in" className="bg-white p-2 text-blue-700 hover:bg-gray-100 hover:text-blue-500"> Sign in </Link>
                    </span>}
            </div>
        </div>
    )
}

export default Header;