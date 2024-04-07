import { useForm } from "react-hook-form";
import * as apiClient from "../apiClients";
import { useMutation, useQueryClient } from "react-query";
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";


const Register = () => {

    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { showToast, isLoggedIn } = useAppContext();
    const { register, watch, handleSubmit, formState: { errors } } = useForm<RegisterFormData>();

    const onSubmit = handleSubmit((data) => {
        registerMutation.mutate(data);
    });

    const registerMutation = useMutation(apiClient.registerUser, {
        onSuccess: async () => {
            showToast({ "message": "Registration Successful !", "type": "SUCCESS" });
            await queryClient.invalidateQueries("validateUser");
            setTimeout(() => {
                navigate("/");
            }, 1000);
        },
        onError: (error: Error) => {
            showToast({ "message": error.message, "type": "ERROR" });
        },
    })

    if (isLoggedIn) {
        navigate("/");
        return;
    }
    return (
        <form className="flex flex-col gap-x-5 gap-y-3" onSubmit={onSubmit}>
            <h2 className="text-3xl font-bold">Create an Account</h2>
            <div className="flex flex-col gap-4 md:flex-row">
                <label className="text-sm font-bold text-gray-600 flex-1"> First name
                    <input className="w-full py-1 px-1 border rounded" {...register("firstName", { required: "This field is required" })}>
                    </input>
                    {errors.firstName && (
                        <span className="text-red-600">{errors.firstName.message}</span>
                    )}
                </label>
                <label className="text-sm font-bold text-gray-600 flex-1"> Last name
                    <input className="w-full py-1 px-1 border rounded" {...register("lastName", { required: "This field is required" })}>
                    </input>
                    {errors.lastName && (
                        <span className="text-red-600">{errors.lastName.message}</span>
                    )}
                </label>
            </div>
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
            <label className="text-sm font-bold text-gray-600 flex-1"> Confirm Password
                <input type="password" className="w-full py-1 px-1 border rounded" {...register("confirmPassword", {
                    validate: (val) => {
                        if (!val) {
                            return "This field is required";
                        } else if (watch('password') !== val) {
                            return "Password do not wtach";
                        }
                    }
                })}>
                </input>
                {errors.confirmPassword && (
                    <span className="text-red-600">{errors.confirmPassword.message}</span>
                )}
            </label>
            <span>
                <button type="submit" className="bg-blue-800 text-white p-2 hover:bg-blue-700 font-bold">Create Account</button>
            </span>
        </form>
    );
}

export default Register;