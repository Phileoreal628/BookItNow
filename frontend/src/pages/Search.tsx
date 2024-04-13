import { useSearchContext } from "../contexts/SearchContext";
import * as apiClient from "../apiClients";
import { useQuery } from "react-query";
import { useState } from "react";
import HotelCard from "../components/HotelCard";

import Pagination from "../components/Pagination";
import RatingFilter from "../components/RatingFiler";
import FacilityFilter from "../components/FacilityFilter";
import HotelTypeFilter from "../components/HotelTypeFilter";
import PriceFilter from "../components/PriceFilter";

const Search = () => {
    const searchValue = useSearchContext();

    const [page, setPage] = useState<number>(1);
    const [selectedRating, setSelectedrating] = useState<string[]>([]);
    const [selectedFacility, setSelectedFacility] = useState<string[]>([]);
    const [selectedHotelType, setSelectedHotelType] = useState<string[]>([]);
    const [selectedPrice, setSelectedPrice] = useState<number | undefined>();
    const [sortOpts, setsortOpts] = useState<string | undefined>("");

    const handleRatingFilterChanges = (event: React.ChangeEvent<HTMLInputElement>) => {
        const starRating = event.target.value;
        console.log(starRating);
        setSelectedrating((prevState) => (
            event.target.checked ? [...prevState, starRating] : prevState.filter(rate => starRating !== rate)
        ));
    }

    const handleHotelTypeFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        const hotelType = event.target.value;

        setSelectedHotelType(prevState => (
            event.target.checked ? [...prevState, hotelType] : prevState.filter(type => type !== hotelType)
        ));
    }
    const handleFacilityFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const facility = event.target.value;

        setSelectedFacility(prevState => (
            event.target.checked ? [...prevState, facility] : prevState.filter(fac => fac !== facility)
        ));
    }
    const searchParams = {
        "destination": searchValue.destination,
        "checkInTime": searchValue.checkInTime.toISOString(),
        "checkOutTime": searchValue.checkOutTime.toISOString(),
        "adultMemberCount": searchValue.adultMemberCount.toString(),
        "childrenCount": searchValue.childrenCount.toString(),
        "pageNumber": page.toString(),
        "rating": selectedRating,
        "facilities": selectedFacility,
        "type": selectedHotelType,
        "price": selectedPrice?.toString(),
        "sortOpts": sortOpts
    }

    const { data: searchResults } = useQuery(["serachHotels", searchParams], () => apiClient.searchHotels(searchParams), {
        refetchOnWindowFocus: false,
        onSuccess: () => {
            console.log("success");
        },
        onError: () => {
            console.log("error");
        }
    })



    return (

        <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
            <div className=" border border-slate-300 rounded-lg  h-fit lg:sticky top-10 md:static">
                <div className="space-y-5 items-center">
                    <h3 className="pl-2 pt-3 text-lg font-semibold border-b border-slate-300 pb-5">
                        Filter By:
                    </h3>
                    <RatingFilter selectedRating={selectedRating} onChange={handleRatingFilterChanges} />
                    <FacilityFilter selectedFacility={selectedFacility} onChange={handleFacilityFilterChange} />
                    <HotelTypeFilter selectedHotelType={selectedHotelType} onChange={handleHotelTypeFilterChange} />
                    <PriceFilter selectedPrice={selectedPrice} onChange={(price?: number) => setSelectedPrice(price)} />
                </div>

            </div>
            <div className="flex flex-col gap-5">
                <div className="flex justify-between items-center">
                    <span className="text-xl font-bold">
                        {searchResults?.pagination.totalHotels} Hotels Found
                        {searchParams.destination ? ` in ${searchParams.destination}` : ""}
                    </span>
                    <select
                        value={sortOpts}
                        className="p-2 border rounded-md"
                        onChange={(event) => setsortOpts(event.target.value)}
                    >
                        <option value="">Sort By </option>
                        <option value="ratingLowToHigh">Hotel Rating Low To High</option>
                        <option value="ratingHighToLow">Hotel Rating High To Low</option>
                        <option value="priceLowToHigh">Price Low to High</option>
                        <option value="priceHighToLow">Price High to Low</option>
                    </select>
                </div>
                {searchResults?.data.map(hotel => (
                    <HotelCard key={hotel._id} hotel={hotel} />
                ))}
                <div>
                    {
                        searchResults?.pagination.totalHotels || 0 > 0 ?
                            <Pagination
                                page={searchResults?.pagination.page || 1}
                                pages={searchResults?.pagination.pages || 1}
                                onPageChange={(page) => setPage(page)} />
                            : ""
                    }
                </div>
            </div>


        </div>
    )

}
export default Search;