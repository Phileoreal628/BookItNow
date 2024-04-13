import DatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
import { useSearchContext } from "../../contexts/SearchContext";
import { useAppContext } from "../../contexts/AppContext";
import { useLocation, useNavigate } from "react-router-dom";

const GuestInfo = ({ hotelId, pricePerNight }: GuestInfoData) => {

    const search = useSearchContext();

    const navigate = useNavigate();

    const location = useLocation();

    const { isLoggedIn } = useAppContext();

    const { watch, setValue, handleSubmit, register, formState: { errors } } = useForm<GuestInfoFormData>({
        defaultValues: {
            checkInTime: search.checkInTime,
            checkOutTime: search.checkOutTime,
            adultMemberCount: search.adultMemberCount,
            childrenCount: search.childrenCount
        }
    });

    const signInToBook = (searchValue: GuestInfoFormData) => {
        search.saveSearchValue("",
            searchValue.checkInTime,
            searchValue.checkOutTime,
            searchValue.adultMemberCount,
            searchValue.childrenCount,
            hotelId);
        navigate("/sign-in", { state: { from: location } });
    }
    const onSubmit = (searchValue: GuestInfoFormData) => {
        search.saveSearchValue("",
            searchValue.checkInTime,
            searchValue.checkOutTime,
            searchValue.adultMemberCount,
            searchValue.childrenCount,
            hotelId);
        navigate(`/hotel/${hotelId}/booking`);
    }
    const checkInTime = watch('checkInTime');
    const checkOutTime = watch('checkOutTime');
    const minDate = new Date();
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 1);

    return (
        <div className="flex flex-col bg-blue-200 gap-2 p-4">
            <h3 className="text-md font-bold"> INR {pricePerNight}  Per Night </h3>
            <form onSubmit={isLoggedIn ? handleSubmit(onSubmit) : handleSubmit(signInToBook)}>
                <div className="grid grid-cols-1 gap-4 items-center">
                    <div>
                        <DatePicker
                            selected={checkInTime}
                            onChange={(date) => setValue("checkInTime", date as Date)}
                            startDate={checkInTime}
                            selectsStart
                            endDate={checkOutTime}
                            placeholderText="Check In Date"
                            minDate={minDate}
                            maxDate={maxDate}
                            wrapperClassName="min-w-full"
                            className="min-w-full p-2 bg-white"
                        />
                    </div>
                    <div>
                        <DatePicker
                            selected={checkOutTime}
                            onChange={(date) => setValue("checkOutTime", date as Date)}
                            startDate={checkOutTime}
                            selectsStart
                            endDate={checkOutTime}
                            placeholderText="Check Out Date"
                            minDate={minDate}
                            maxDate={maxDate}
                            wrapperClassName="min-w-full"
                            className="min-w-full p-2 bg-white"
                        />
                    </div>

                    <div className="flex gap-2 px-2 py-1 bg-white">
                        <label className="flex items-center ">
                            Adults:
                            <input
                                type="number"
                                min={1}
                                max={20}
                                className="w-full p-1 focus:outline-none"
                                {
                                ...register("adultMemberCount", {
                                    required: true,
                                    min: {
                                        value: 1,
                                        message: " At least 1 adult is required"
                                    },
                                    valueAsNumber: true,
                                })
                                }

                            />
                        </label>
                        <label className="flex items-center ">
                            Children:
                            <input
                                type="number"
                                min={0}
                                max={20}
                                className="w-full p-1 focus:outline-none"
                                {
                                ...register("childrenCount", {
                                    valueAsNumber: true,
                                })
                                }

                            />
                        </label>
                        {
                            errors.adultMemberCount && (
                                <span className="text-red-600">{errors.adultMemberCount.message}</span>
                            )
                        }

                    </div>
                    {isLoggedIn ?
                        <button type="submit" className="bg-blue-600 text-white h-full p-2 font-bold hover:bg-blue-500 text-xl"> Book Now</button> :
                        <button type="submit" className="bg-blue-600 text-white h-full p-2 font-bold hover:bg-blue-500 text-xl">Sign in to book</button>}
                </div>
            </form>
        </div>
    );
}
export default GuestInfo;