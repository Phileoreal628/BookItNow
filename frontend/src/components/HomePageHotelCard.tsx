import { Link } from "react-router-dom";

type CardProps = {
    hotel: HotelType;
}
const HomePageHotelCard = ({ hotel }: CardProps) => {
    return (
        <Link to={`/details/${hotel._id}`} className="relative cursor-pointer overflow-hidden rounded-md">
            <div className="h-[300px]">
                <img src={hotel.imageURIs[0]} className="w-full h-full object-center object-cover" />
            </div>
            <div className="absolute bottom-0 p-4 bg-black bg-opacity-50 w-full rounded-b-md">
                <span className="text-white font-bold tracking-tight text-3xl">
                    {hotel.name}
                </span>
            </div>
        </Link>
    )
}
export default HomePageHotelCard;