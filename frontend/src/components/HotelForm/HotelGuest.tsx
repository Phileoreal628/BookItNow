import { useFormContext } from "react-hook-form";

const HotelGuest = () => {
    const { register, formState: { errors } } = useFormContext<HotelFormData>();
    return (
        <div className="flex flex-col mt-3">
            <h1 className="font-bold mb-3 text-2xl">Guest Information</h1>
            <div className="grid grid-cols-2 p-6 gap-5 bg-gray-200">
                < label className="text-sm font-bold text-gray-600" > Adults
                    < input
                        type="number"
                        min={1}
                        className="w-full py-1 px-1 border rounded"
                        {...register("adultMemberCount", { required: "This field is required" })}>
                    </input >
                    {
                        errors.adultMemberCount && (
                            <span className="text-red-600">{errors.adultMemberCount.message}</span>
                        )
                    }
                </label >
                < label className="text-sm font-bold text-gray-600 " > Children
                    < input
                        type="number"
                        min={0}
                        className="w-full py-1 px-1 border rounded"
                        {...register("childrenCount", { required: "This field is required" })}>
                    </input >
                    {
                        errors.childrenCount && (
                            <span className="text-red-600">{errors.childrenCount.message}</span>
                        )
                    }
                </label >
            </div>
        </div >
    );
}

export default HotelGuest;