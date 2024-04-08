import { FormProvider, useForm } from "react-hook-form"
import HotelDetails from "./HotelDetails";
import HotelTypeSection from "./HotelTypeSection";
import HotelFacilities from "./HotelFacilities";
import HotelGuest from "./HotelGuest";
import HotelImages from "./HotelImages";

type HotelFormProps = {
    OnSaveHotel: (hotelData: FormData) => void;
    isLoading: boolean
}
const HotelFormHandler = ({ OnSaveHotel, isLoading }: HotelFormProps) => {
    const formMethods = useForm<HotelFormData>();

    const { handleSubmit } = formMethods;

    const onSubmit = handleSubmit((formDataFromuser: HotelFormData) => {
        const formData = new FormData();
        formData.append("name", formDataFromuser.name);
        formData.append("city", formDataFromuser.city);
        formData.append("country", formDataFromuser.country);
        formData.append("description", formDataFromuser.description);
        formData.append("price", formDataFromuser.price.toString());
        formData.append("rating", formDataFromuser.rating.toString());
        formData.append("adultMemberCount", formDataFromuser.adultMemberCount.toString());
        formData.append("childrenCount", formDataFromuser.childrenCount.toString());
        formData.append("type", formDataFromuser.type);

        formDataFromuser.facilities.forEach((facility, index) => {
            formData.append(`facilities[${index}]`, facility);
        });

        Array.from(formDataFromuser.images).forEach(image => {
            formData.append(`images`, image);
        })
        OnSaveHotel(formData);
    })

    return (
        <FormProvider {...formMethods}>
            <form className="flex flex-col gap-10" onSubmit={onSubmit}>
                <HotelDetails />
                <HotelFacilities />
                <HotelTypeSection />
                <HotelGuest />
                <HotelImages />
                <span className="flex justify-end">
                    <button type="submit" disabled={isLoading} className="bg-blue-800 hover:bg-blue-600 text-white p-2 disabled:bg-gray-300 font-bold">
                        {isLoading ? "Saving" : "Save"}
                    </button>
                </span>
            </form>
        </FormProvider>
    )
}

export default HotelFormHandler;