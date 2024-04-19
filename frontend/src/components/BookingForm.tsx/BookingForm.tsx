import { useForm } from "react-hook-form";

type BookingFormProps = {
    loggedInUser: BookingUserType
}
type BookingData = {
    firstName: string;
    lastName: string;
    email: string;
}
const BookingForm = ({ loggedInUser }: BookingFormProps) => {

    const { register, handleSubmit } = useForm<BookingData>({
        defaultValues: {
            firstName: loggedInUser.firstName,
            lastName: loggedInUser.lastName,
            email: loggedInUser.email
        }
    });

    return (
        <form className="grid grid-cols-1 gap-5 rounded-lg border border-slate-300 p-5">
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
        </form>
    )
}

export default BookingForm;