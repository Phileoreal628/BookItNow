import { useFormContext } from "react-hook-form";

const HotelDetails = () => {
    const { register, formState: { errors } } = useFormContext<HotelFormData>();
    return (
        <>
            <div className="flex flex-col gap-4">
                <h1 className="font-bold mb-3 text-3xl">Add Hotel</h1>
                <label className="text-sm font-bold text-gray-600 flex-1"> Name
                    <input
                        type="text"
                        className="w-full py-1 px-1 border rounded"
                        {...register("name", { required: "This field is required" })}>
                    </input>
                    {errors.name && (
                        <span className="text-red-600">{errors.name.message}</span>
                    )}
                </label>
                <div className="flex gap-4">
                    <label className="text-sm font-bold text-gray-600 flex-1"> City
                        <input
                            type="text"
                            className="w-full py-1 px-1 border rounded"
                            {...register("city", { required: "This field is required" })}>
                        </input>
                        {errors.city && (
                            <span className="text-red-600">{errors.city.message}</span>
                        )}
                    </label>
                    <label className="text-sm font-bold text-gray-600 flex-1"> Country
                        <input
                            type="text"
                            className="w-full py-1 px-1 border rounded"
                            {...register("country", { required: "This field is required" })}>
                        </input>
                        {errors.country && (
                            <span className="text-red-600">{errors.country.message}</span>
                        )}
                    </label>
                </div>
                <label className="text-sm font-bold text-gray-600 flex-1"> Description
                    <textarea
                        rows={6}
                        className="w-full py-1 px-1 border rounded"
                        {...register("description", { required: "This field is required" })}>
                    </textarea>
                    {errors.description && (
                        <span className="text-red-600">{errors.description.message}</span>
                    )}
                </label>
                <label className="text-sm font-bold text-gray-600 max-w-[50%]"> Price
                    <input
                        type="number"
                        min={1}
                        className="w-full py-1 px-1 border rounded"
                        {...register("price", { required: "This field is required" })}>
                    </input>
                    {errors.price && (
                        <span className="text-red-600">{errors.price.message}</span>
                    )}
                </label>
                <label className="text-sm font-bold text-gray-600 max-w-[50%]"> Rating
                    <select
                        className="w-full py-1 px-1 border rounded"
                        {...register("rating", { required: "This field is required" })}
                    >
                        <option value="" className="text-sm font-bold">
                            Select  Rating
                        </option>
                        {[1, 2, 3, 4, 5].map((n) => (
                            <option key={n} value={n}>{n}</option>
                        ))}
                    </select>
                    {errors.rating && (
                        <span className="text-red-600">{errors.rating.message}</span>
                    )}
                </label>
            </div>
        </>
    )
}
export default HotelDetails;