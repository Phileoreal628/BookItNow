import { useFormContext } from "react-hook-form";
import { hotelFacilities } from "../../config/hotelConfig";

const HotelFacilities = () => {
    const { register, formState: { errors } } = useFormContext<HotelFormData>();
    return (
        <div className="flex flex-col gap-2">
            <h1 className="font-bold mb-1 mt-3 text-2xl"> Facilities</h1>
            <div className="grid grid-cols-5">
                {hotelFacilities.map(facility => (
                    <label key={facility} className="text-sm flex gap-1 text-gray-800" >
                        <input key={facility} type="checkbox" value={facility} {...register("facilities", {
                            validate: (facilities) => {
                                if (facilities && facilities.length <= 0)
                                    return "Required at least one facility";
                                return true;
                            }
                        })} />
                        <span>{facility}</span>
                    </label>
                ))}
            </div>
            {errors.facilities && (
                <span className="text-red-600">{errors.facilities.message}</span>
            )}
        </div>
    )
}

export default HotelFacilities;