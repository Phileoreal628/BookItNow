import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../apiClients";
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";


const SignOut = () => {

    const navigate = useNavigate();
    const { showToast } = useAppContext();
    const queryClient = useQueryClient();

    const { mutate } = useMutation(apiClient.signOut, {
        onSuccess: () => {
            queryClient.invalidateQueries("validateUser");
            showToast({ message: "Log Out Successful", type: "ERROR" });
            navigate("/sign-in");
        },
        onError: (error: Error) => {
            showToast({ message: error.message, type: "ERROR" });
        }
    })
    const onSubmit = () => {
        mutate();
    }

    return (
        <button onClick={onSubmit} className="bg-blue-800 text-white p-2 hover:bg-blue-700">Sign Out</button>
    )
}

export default SignOut;