const BookingSummary = ({ hotel, checkIn, checkOut, childrenCount, adultMemberCount, nightOfStay }: BookingSummary) => {

    return (

        <div className="grid gap-4 rounded-lg p-3 mr-1 h-fit border border-slate-300">
            <h2 className="text-xl font-bold"> Your Booking Details :-</h2>
            <div className=" border-b py-2 px-2">
                Location :
                <div className="font-bold">{`${hotel.name},${hotel.city},${hotel.country}`}</div>
            </div>
            <div className=" flex justify-between">
                <div>
                    Check-In
                    <div className="font-bold">{checkIn.toDateString()}</div>
                </div>
                <div>
                    Check-Out
                    <div className="font-bold">{checkOut.toDateString()}</div>
                </div>
            </div>
            <div className="border-t border-b py-2">
                Total Nights :
                <div className="font-bold">{nightOfStay} nights</div>
            </div>
            <div>
                Guests{" "}
                <div className="font-bold">
                    {adultMemberCount} adults & {childrenCount} children
                </div>
            </div>
        </div>
    );
}

export default BookingSummary;