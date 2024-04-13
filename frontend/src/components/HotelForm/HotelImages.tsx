import React from "react";
import { useFormContext } from "react-hook-form";

const HotelImages = () => {
    const { register, formState: { errors }, watch, setValue } = useFormContext<HotelFormData>();
    const exsitingImages = watch('imageURIs');

    const handleDelete = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, URI: string) => {
        event.preventDefault();
        setValue("imageURIs", exsitingImages.filter(image => URI !== image));
    }


    return (
        <div className="flex flex-col gap-2">
            <h1 className="font-bold mb-1 mt-3 text-2xl"> Images</h1>
            <div className="border rounded p-4 flex flex-col gap-4">
                {exsitingImages &&
                    <div className="grid grid-cols-6 gap-5">
                        {exsitingImages.map(image => (
                            <div key={image} className="relative group">
                                <img src={image} className="min-h-full object-cover" />
                                <button
                                    onClick={(event) => { handleDelete(event, image) }}
                                    className="absolute text-white inset-0 flex items-center justify-center bg-black opacity-0 bg-opacity-50 group-hover:opacity-100"
                                >
                                    Delete</button>
                            </div>
                        ))}
                    </div>}
                <input type="file" multiple accept="image/*" className="w-full font-normal text-gray-700"
                    {...register("imageFiles", {
                        validate: (imageFiles) => {
                            const totalLength = imageFiles.length + (exsitingImages?.length || 0);

                            if (totalLength <= 0 || totalLength > 6)
                                return "Total number of images should be 1 -6"
                            return true;
                        }
                    })} />
                {
                    errors.imageFiles && (
                        <span className="text-red-600 text-sm">{errors.imageFiles.message}</span>
                    )
                }
            </div>
        </div>
    )
}

export default HotelImages;