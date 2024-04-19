import React, { useContext, useState } from "react";

const SearchContext = React.createContext<SearchContext | undefined>(undefined);

export const SearchContextProvider = ({ children }: SearchContextProvider) => {
    const [destination, setDestination] = useState<string>(() => sessionStorage.getItem("description") || "");
    const [checkInTime, setCheckInTime] = useState<Date>(() => new Date(sessionStorage.getItem("checkIn") || new Date().toISOString()));
    const [checkOutTime, setCheckOutTime] = useState<Date>(() => new Date(sessionStorage.getItem("checkOut") || new Date().toISOString()));
    const [adultMemberCount, setAdultMemberCount] = useState<number>(() => parseInt(sessionStorage.getItem("adultMemberCount") || "1"));
    const [childrenCount, setChildrenCount] = useState<number>(() => parseInt(sessionStorage.getItem("childrenCount") || "0"));
    const [hotelId, setHotelid] = useState<string>(() => sessionStorage.getItem("hotelId") || "");


    const saveSearchValue = (destination: string, checkInTime: Date, checkOutTime: Date, adultMemberCount: number, childrenCount: number, hotelId?: string) => {
        setDestination(destination);
        setCheckInTime(checkInTime);
        setCheckOutTime(checkOutTime);
        setAdultMemberCount(adultMemberCount);
        setChildrenCount(childrenCount);
        if (hotelId) setHotelid(hotelId);

        sessionStorage.setItem("description", destination);
        sessionStorage.setItem("checkIn", checkInTime.toISOString());
        sessionStorage.setItem("checkOut", checkOutTime.toISOString());
        sessionStorage.setItem("adultMemberCount", adultMemberCount.toString());
        sessionStorage.setItem("childrenCount", childrenCount.toString());

        if (hotelId)
            sessionStorage.setItem("hotelId", hotelId);
    }
    const resetSearch = () => {
        saveSearchValue("", new Date(), new Date(), 1, 0);
    }

    return (
        <SearchContext.Provider value={{
            destination,
            checkInTime,
            checkOutTime,
            adultMemberCount,
            childrenCount,
            saveSearchValue,
            resetSearch,
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