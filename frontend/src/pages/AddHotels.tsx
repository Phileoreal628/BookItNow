import { useMutation } from "react-query";
import HotelFormHandler from "../components/HotelForm/HotelFormHandler";
import { useAppContext } from "../contexts/AppContext";
import * as apiClient from "../apiClients";

const AddHotel = () => {
    const { showToast } = useAppContext();

    const { mutate, isLoading } = useMutation(apiClient.addHotel, {
        onSuccess: () => {
            showToast({ message: "Successfully Added Hotel", type: "SUCCESS" });
        },
        onError: () => {
            showToast({ message: "Error in adding the hotel", type: "ERROR" });
        }
    });

    const saveHotel = (hotelData: FormData) => {
        mutate(hotelData);
    }
    return (<div>
        <HotelFormHandler OnSaveHotel={saveHotel} isLoading={isLoading} />
    </div>)
}

export default AddHotel;