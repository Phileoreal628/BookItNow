import React, { useContext, useState } from "react";

const SearchContext = React.createContext<SearchContext | undefined>(undefined);

export const SearchContextProvider = ({ children }: SearchContextProvider) => {
    const [destination, setDestination] = useState<string>("");
    const [checkInTime, setCheckInTime] = useState<Date>(new Date());
    const [checkOutTime, setCheckOutTime] = useState<Date>(new Date());
    const [adultMemberCount, setAdultMemberCount] = useState<number>(1);
    const [childrenCount, setChildrenCount] = useState<number>(0);
    const [hotelId, setHotelid] = useState<string>("");


    const saveSearchValue = (destination: string, checkInTime: Date, checkOutTime: Date, adultMemberCount: number, childrenCount: number, hotelId?: string) => {
        setDestination(destination);
        setCheckInTime(checkInTime);
        setCheckOutTime(checkOutTime);
        setAdultMemberCount(adultMemberCount);
        setChildrenCount(childrenCount);
        if (hotelId) setHotelid(hotelId);
    }

    return (
        <SearchContext.Provider value={{
            destination,
            checkInTime,
            checkOutTime,
            adultMemberCount,
            childrenCount,
            saveSearchValue,
            hotelId
        }}>
            {children}
        </SearchContext.Provider>
    )
}

export const useSearchContext = () => {
    const context = useContext(SearchContext);
    return context as SearchContext;
}