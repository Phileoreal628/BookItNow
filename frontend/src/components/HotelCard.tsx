import { AiFillStar } from "react-icons/ai";
import { Link } from "react-router-dom";

type hotelCard = {
    hotel: HotelType
}
const HotelCard = ({ hotel }: hotelCard) => {
    return (
        <div className="grid grid-cols-1 border border-slate-300 rounded-lg p-8 gap-8 xl:grid-cols-[2fr_3fr]">
            <div className="w-full h-[300px]">
                <img src={hotel.imageURIs[0]} className="w-full h-full object-center object-cover" />
            </div>
            <div className="grid grid-rows-[1fr_2fr_1fr]">
                <div>
                    <div className="flex items-center">
                        <span className="flex">
                            {Array.from({ length: hotel.rating }).map(() => (
                                <AiFillStar key={hotel._id} className="fill-yellow-400" />
                            ))}
                        </span>
                        <span className="ml-1 text-sm">{hotel.type}</span>
                    </div>
                    <h2 className="text-3xl font-bold cursor-pointer">{hotel.name}</h2>
                </div>
                <div className="line-clamp-4">
                    {hotel.description}
                </div>
                <div className="grid grid-cols-1 items-end whitespace-nowrap">
                    <div className="flex gap-1 items-center ">
                        {hotel.facilities.slice(0, 3).map(facility => (
                            <span className="bg-slate-300 p-2 rounded-lg font-bold text-xs whitespace-nowrap">{facility}</span>
                        ))}
                        <span className="text-sm">
                            {hotel.facilities.length > 3 &&
                                `+${hotel.facilities.length - 3} more`}
                        </span>
                    </div>

                </div>

                <div className="flex flex-col items-end gap-1 mt-2">
                    <span className="font-bold">INR {hotel.price}</span>
                    <Link
                        to={`/details/${hotel._id}`}
                        className="bg-blue-600 text-white h-full p-2 max-w-fit hover:bg-blue-600"
                    >
                        View More
                    </Link>
                </div>

            </div>

            <div>

            </div>
        </div>
    );
}

export default HotelCard;