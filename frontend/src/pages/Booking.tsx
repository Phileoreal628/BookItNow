import { useQuery } from "react-query";
import * as apiClient from "../apiClients";
import BookingForm from "../components/BookingForm.tsx/BookingForm";
import { useParams } from "react-router-dom";
import { useSearchContext } from "../contexts/SearchContext";
import { useEffect, useState } from "react";
import BookingSummary from "../components/BookingSummary";
import { Elements } from "@stripe/react-stripe-js";
import { useAppContext } from "../contexts/AppContext";

const Booking = () => {

    const { hotelId } = useParams();
    const { stripePayment } = useAppContext();
    const search = useSearchContext();

    const [nightOfStay, setNightOfStay] = useState<number>(0);
    const { data: hotelData } = useQuery("hotelDetails", () => apiClient.getHotel(hotelId as string), {
        enabled: !!hotelId
    }
    );

    const { data: paymentIntent } = useQuery("createPaymentIntent", () => apiClient.createPaymentIntent(hotelId as string, nightOfStay.toString()), {
        enabled: !!hotelId && nightOfStay > 0
    })
    const { data: loggedInUser } = useQuery("getLoggedInUser", apiClient.getLoggedInUser, { refetchOnWindowFocus: false });

    useEffect(() => {
        if (search.checkOutTime && search.checkInTime) {
            const nightCalucated = Math.abs(search.checkOutTime.getTime() - search.checkInTime.getTime()) / (1000 * 60 * 60 * 24);

            setNightOfStay(Math.ceil(nightCalucated));
        }

    }, [search.checkOutTime, search.checkInTime]);

    if (!hotelData) {
        return <></>;
    }
    return (
        <div className="grid md:grid-cols-[1fr_2fr]">
            <BookingSummary
                hotel={hotelData}
                checkIn={search.checkInTime}
                checkOut={search.checkOutTime}
                adultMemberCount={search.adultMemberCount}
                childrenCount={search.childrenCount}
                nightOfStay={nightOfStay}
            />
            {loggedInUser && paymentIntent &&
                <Elements stripe={stripePayment} options={{ clientSecret: paymentIntent.clientSecret }}>
                    <BookingForm loggedInUser={loggedInUser} paymentIntent={paymentIntent} />
                </Elements>
            }
        </div>
    )
}
export default Booking;