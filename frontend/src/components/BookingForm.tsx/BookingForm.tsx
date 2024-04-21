import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useForm } from "react-hook-form";
import { useSearchContext } from "../../contexts/SearchContext";
import { useNavigate, useParams } from "react-router-dom";
import { StripeCardElement } from "@stripe/stripe-js";
import { useMutation } from "react-query";
import * as apiClient from "../../apiClients";
import { useAppContext } from "../../contexts/AppContext";
import Loader from "../Loader";

type BookingFormProps = {
    loggedInUser: BookingUserType;
    paymentIntent: PaymentIntentResponse;
}

const BookingForm = ({ loggedInUser, paymentIntent }: BookingFormProps) => {

    const search = useSearchContext();
    const stripe = useStripe();
    const elements = useElements();
    const { showToast } = useAppContext();
    const { hotelId } = useParams();
    const navigate = useNavigate();
    const { mutate: reserveRoom, isLoading } = useMutation(apiClient.reserveRoom, {
        onSuccess: () => {
            showToast({ "message": "Booking Successful !", "type": "SUCCESS" });
            navigate("/")

        },
        onError: () => {
            showToast({ "message": "Error while booking the hotel", "type": "ERROR" });
        }
    })
    const { register, handleSubmit } = useForm<BookingFormData>({
        defaultValues: {
            firstName: loggedInUser.firstName,
            lastName: loggedInUser.lastName,
            email: loggedInUser.email,
            adultMemberCount: search.adultMemberCount,
            childrenCount: search.childrenCount,
            checkIn: search.checkInTime.toISOString(),
            checkOut: search.checkOutTime.toISOString(),
            hotelId: hotelId,
            paymentIntentId: paymentIntent.paymentIntentId,
            totalCost: paymentIntent.totalCost
        }
    });
    const onSubmit = async (formData: BookingFormData) => {
        if (!stripe || !elements) return;

        const result = await stripe.confirmCardPayment(paymentIntent.clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement) as StripeCardElement
            }
        });

        if (result.paymentIntent?.status === 'succeeded') {
            reserveRoom({ ...formData, paymentIntentId: result.paymentIntent?.id || "" });
        }
    }
    if (isLoading) {
        return <Loader />
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-5 rounded-lg border border-slate-300 p-5">
            <span className="text-3xl font-bold">Confirm Your Details :-</span>
            <div className="grid grid-cols-2 gap-5">
                <label className="text-grey-800 text-sm font-bold flex-1">
                    First Name :
                    <input
                        type="text"
                        readOnly
                        disabled
                        className="mt-1 border rounded w-full text-grey-800"
                        {...register("firstName")}
                    />
                </label>
                <label className="text-grey-800 text-sm font-bold flex-1">
                    Last Name :
                    <input
                        type="text"
                        readOnly
                        disabled
                        className="mt-1 border rounded w-full text-grey-800"
                        {...register("lastName")}
                    />
                </label>
                <label className="text-grey-800 text-sm font-bold flex-1">
                    Email:
                    <input
                        type="text"
                        readOnly
                        disabled
                        className="mt-1 border rounded w-full text-grey-800"
                        {...register("email")}
                    />
                </label>
            </div>
            <div className="rounded-md bg-blue-200 p-3">
                <div className="font-semibold text-lg">Total Cost : {paymentIntent.totalCost.toFixed(2)}</div>
                <div className="text-xs">Inclusive of all taxes.</div>
            </div>
            <div className="space-y-2">
                <h3 className="text-xl font-semibold">Payment Details</h3>
                <CardElement id="payment-elemnt"
                    className="border rounded-md text-sm p-2" />

            </div>
            <div className="flex justify-end">
                <button disabled={isLoading} className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-md disabled:bg-gray-500">
                    {isLoading ? "Booking in Progress" : "Confirm Booking"}
                </button>
            </div>
        </form>
    )
}

export default BookingForm;