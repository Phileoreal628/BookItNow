import { useMutation, useQuery } from "react-query";
import * as apiClient from "../apiClients";
import HotelFormHandler from "../components/HotelForm/HotelFormHandler";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import { useAppContext } from "../contexts/AppContext";


const EditHotel = () => {

    const { hotelId } = useParams();
    const { showToast } = useAppContext();

    const { mutate, isLoading } = useMutation(apiClient.updateHotelById, {
        onSuccess: () => {
            showToast({ message: "Success", type: "SUCCESS" });
        },
        onError: () => {
            showToast({ message: "Error Occured", type: "ERROR" });
        }
    });
    const saveHotel = (hotelData: FormData) => {
        mutate(hotelData);
    }
    const { data: hotel, isFetching } = useQuery("getHotelByID", () => apiClient.getHotelById(hotelId || ''), {
        refetchOnWindowFocus: false,
        enabled: !!hotelId
    });
    if (isFetching || isLoading) {
        return <Loader />
    }

    return (
        <>
            <HotelFormHandler OnSaveHotel={saveHotel} hotel={hotel} isLoading={isLoading} />
        </>
    );

}
export default EditHotel;