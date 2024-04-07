import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../apiClients";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";

const SignIn = () => {
    const { handleSubmit, register, formState: { errors } } = useForm<SignInType>();

    const navigate = useNavigate();
    const { showToast, isLoggedIn } = useAppContext();
    const queryClient = useQueryClient();

    const signInMutation = useMutation(apiClient.signIn, {
        onSuccess: async () => {
            showToast({ message: "Login Successful", "type": "SUCCESS" });
            await queryClient.invalidateQueries("validateUser");

            navigate("/");

        },
        onError: (error: Error) => {
            showToast({ "message": error.message, "type": "ERROR" });
        }
    })
    const onSubmit = handleSubmit((data) => {
        signInMutation.mutate(data);
    });
    if (queryClient.isFetching("validateUser")) return;
    if (isLoggedIn) {
        navigate("/");
        return;
    }
    return (
        <form className="flex flex-col gap-5" onSubmit={onSubmit}>
            <h2 className="text-3xl font-bold">Log In</h2>
            <label className="text-sm font-bold text-gray-600 flex-1"> Email
                <input type="email" className="w-full py-1 px-1 border rounded" {...register("email", {
                    required: "This field is required", pattern: {
                        value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                        message: 'Invalid email address',
                    },
                })}>
                </input>
                {errors.email && (
                    <span className="text-red-600">{errors.email.message}</span>
                )}
            </label>
            <label className="text-sm font-bold text-gray-600 flex-1"> Password
                <input type="password" className="w-full py-1 px-1 border rounded" {...register("password", {
                    required: "This field is required", minLength: {
                        value: 8,
                        message: "Password must be of at least 8 characters "
                    }
                })}>
                </input>
                {errors.password && (
                    <span className="text-red-600">{errors.password.message}</span>
                )}
            </label>
            <span className="flex items-center justify-between">
                <span className="text-sm"> Not Regeistered ? <Link className="text-blue-900" to="/register">Create account</Link></span>
                <button type="submit" className="bg-blue-800 text-white p-2 hover:bg-blue-700 font-bold">Log In</button>
            </span>
        </form>
    );
}

export default SignIn;