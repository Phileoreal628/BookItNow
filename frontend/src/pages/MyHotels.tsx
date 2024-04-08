import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import * as apiClient from "../apiClients";
import { BsBuilding, BsMap } from "react-icons/bs";
import { BiHotel, BiMoney, BiStar } from "react-icons/bi";

const MyHotels = () => {

    const { data: hotels } = useQuery("getMyHotels", apiClient.getMyHotels, {
        refetchOnWindowFocus: false,
        onError: () => {
            console.log("error");
        }
    });
    if (!hotels || !hotels.length) {
        return (
            <div className="text-xl font-bold">No Hotels Found !</div>
        )
    }
    return (
        <div className="flex flex-col">
            <div className="flex justify-between">
                <h1 className="text-3xl font-bold">My Hotels</h1>
                <Link className="bg-blue-700 hover:bg-blue-500 font-bold p-2 text-white " to="/add-hotel">Add Hotel</Link>
            </div>
            <div className="flex flex-col gap-6">
                {hotels.map(hotel => (
                    <div className="flex flex-col rounded-lg p-6 gap-4 justify-between border border-slate-300">
                        <h2 className="text-xl">{hotel.name}</h2>
                        <div className="whitespace-pre-line">{hotel.description}</div>
                        <div className="flex gap-2 flex-wrap ">
                            <div className="flex flex-1 text-sm  items-center p-2 border border-slate-400 rounded-sm max-w-[50%]">
                                <BsMap className="mr-1" />
                                {hotel.city} , {hotel.country}
                            </div>
                            <div className="flex flex-1  text-sm  items-center p-2 border border-slate-400 rounded-sm max-w-[50%]">
                                <BsBuilding className="mr-1" />
                                {hotel.type}
                            </div>
                            <div className="flex flex-1 text-sm items-center p-2 border border-slate-400 rounded-sm max-w-[50%]">
                                <BiMoney className="mr-1" />
                                {hotel.price}
                            </div>
                            <div className="flex flex-1 text-sm items-center border p-2 border-slate-400 rounded-sm max-w-[50%]">
                                <BiHotel className="mr-1" />
                                {hotel.adultMemberCount} Adults , {hotel.childrenCount} Children
                            </div>
                            <div className="flex text-sm flex-1 items-center border p-2 border-slate-400 rounded-sm max-w-[50%]">
                                <BiStar className="mr-1" />
                                {hotel.rating}
                            </div>
                        </div>
                        <span className="flex justify-end">
                            <Link className="bg-blue-700 text-white p-2 font-bold hover:bg-blue-500" to={`/edit-hotel/${hotel._id}`}>View Hotel</Link>
                        </span>
                    </div>
                ))}
            </div>
        </div>)
}

export default MyHotels;