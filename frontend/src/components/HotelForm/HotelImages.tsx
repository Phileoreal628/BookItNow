import { useFormContext } from "react-hook-form";

const HotelImages = () => {
    const { register, formState: { errors } } = useFormContext<HotelFormData>();
    return (
        <div className="flex flex-col gap-2">
            <h1 className="font-bold mb-1 mt-3 text-2xl"> Images</h1>
            <input type="file" multiple accept="image/*" className="w-full font-normal text-gray-700"
                {...register("images", {
                    validate: (imageFiles) => {
                        const totalLength = imageFiles.length;

                        if (totalLength <= 0 || totalLength > 6)
                            return "Total number of images should be 1 -6"
                        return true;
                    }
                })} />
            {
                errors.images && (
                    <span className="text-red-600 text-sm">{errors.images.message}</span>
                )
            }
        </div>
    )
}

export default HotelImages;