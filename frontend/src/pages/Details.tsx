import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../apiClients";
import { AiFillStar } from "react-icons/ai";
import GuestInfo from "../components/GuestForm/GuestInfo";

const Details = () => {
    const { id } = useParams();

    const { data: hotelData } = useQuery("hotelDetails", () => apiClient.getHotel(id as string), {
        enabled: !!id
    }
    );

    if (!hotelData) {
        return (<></>);
    }
    return (
        <div className="space-y-5">
            <div>
                <span className="flex">
                    {Array.from({ length: hotelData?.rating }).map(() => (
                        <AiFillStar key={hotelData._id} className="fill-yellow-400" />
                    ))}
                </span>
                <h1 className="text-3xl font-bold">{hotelData.name}</h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {hotelData.imageURIs.map(image => (
                    <div className="h-[150px]">
                        <img src={image} alt={hotelData.name} className="w-full rounded-md h-full object-cover object-center" />
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                {hotelData.facilities.map(facility => (
                    <div className="border rounded-sm border-slate-300 p-2">{facility}</div>
                ))}

            </div>
            <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr]">
                <div className="whitespace-pre-line">{hotelData.description}</div>
                <div className="h-fit"><GuestInfo hotelId={hotelData._id} pricePerNight={hotelData.price} /></div>
            </div>
        </div>
    )
}

export default Details;