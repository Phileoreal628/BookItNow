import { FormEvent, useState } from "react";
import { MdTravelExplore } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import { useSearchContext } from "../contexts/SearchContext";

const SearchBar = () => {

    const navigate = useNavigate();

    const searchContext = useSearchContext();

    const [destination, setDestination] = useState<string>(searchContext.destination);
    const [checkInTime, setCheckInTime] = useState<Date>(searchContext.checkInTime);
    const [checkOutTime, setCheckOutTime] = useState<Date>(searchContext.checkOutTime);
    const [adultMemberCount, setAdultMemberCount] = useState<number>(searchContext.adultMemberCount);
    const [childrenCount, setChildrenCount] = useState<number>(searchContext.childrenCount);

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        searchContext.saveSearchValue(destination, checkInTime, checkOutTime, adultMemberCount, childrenCount);
        navigate("/search");
    }
    const resetForm = () => {
        searchContext.resetSearch();
        setDestination("");
        setCheckInTime(new Date());
        setCheckOutTime(new Date());
        setAdultMemberCount(1);
        setChildrenCount(0);
    }
    const minDate = new Date();
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 1);


    return (
        <form onSubmit={handleSubmit} onReset={resetForm} className="items-center p-3 -mt-8 gap-4 bg-orange-400 rounded shadow-md grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5">
            <div className="flex items-center flex-1 p-2 bg-white">
                <MdTravelExplore className="mr-2" size={25} />
                <input className="text-md w-full focus:outline-none" placeholder="Where are you going ?" value={destination} onChange={(event) => setDestination(event.target.value)} />
            </div>
            <div className="flex gap-2 px-2 py-1 bg-white">
                <label className="flex items-center ">
                    Adults:
                    <input
                        type="number"
                        value={adultMemberCount}
                        min={1}
                        max={20}
                        className="w-full p-1 focus:outline-none"
                        onChange={(event) => setAdultMemberCount(parseInt(event.target.value))}
                    />
                </label>
                <label className="items-center flex">
                    Children:
                    <input
                        type="number"
                        value={childrenCount}
                        min={0}
                        max={20}
                        className="w-full p-1 focus:outline-none"
                        onChange={(event) => setChildrenCount(parseInt(event.target.value))}
                    />
                </label>
            </div>
            <div>
                <DatePicker
                    selected={checkInTime}
                    onChange={(date) => setCheckInTime(date as Date)}
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
                    onChange={(date) => setCheckOutTime(date as Date)}
                    startDate={checkInTime}
                    selectsStart
                    endDate={checkOutTime}
                    placeholderText="Check Out Date"
                    minDate={minDate}
                    maxDate={maxDate}
                    wrapperClassName="min-w-full"
                    className="min-w-full p-2 bg-white"
                />
            </div>
            <div className="flex gap-1">
                <button type="submit" className="w-2/3 bg-blue-600 text-white h-full p-2 font-bold text-xl hover:bg-blue-500">
                    Search
                </button>
                <button type="reset" className="w-1/3 bg-red-600 text-white h-full p-2 font-bold text-xl hover:bg-red-500">
                    Clear
                </button>
            </div>
        </form>
    )
}
export default SearchBar;