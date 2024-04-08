import { useFormContext } from "react-hook-form";
import { hotelType } from "../../config/hotelConfig";

const HotelTypeSection = () => {

    const { register, watch, formState: { errors } } = useFormContext<HotelFormData>();

    const watchType = watch("type");

    const chipClass = "cursor-pointer text-sm rounded-full px-3 py-3 font-semibold ";
    return (
        <div className="flex flex-col">
            <h1 className="font-bold mb-3 mt-3 text-2xl"> Type</h1>
            <div className="grid grid-cols-5 gap-2">
                {hotelType.map(type => (
                    <label key={type} className={watchType === type ? chipClass + "bg-blue-500 text-white" : chipClass + "bg-gray-200"}>
                        <input key={type} type="radio" value={type} {...register("type", { required: "This field is required" })} className="hidden" />
                        <span>{type}</span>
                    </label>
                ))}
            </div>
            {errors.type && (
                <span className="text-red-600">{errors.type.message}</span>
            )}
        </div>
    )
}

export default HotelTypeSection;