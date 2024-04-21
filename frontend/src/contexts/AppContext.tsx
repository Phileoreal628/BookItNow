import React, { useContext, useState } from "react";
import { Toast } from "../components/Toast";
import { useQuery } from "react-query";
import * as apiClient from "../apiClients";
import { loadStripe } from "@stripe/stripe-js";

const stripeKey = import.meta.env.VITE_STRIPE_PUB_KEY || "";

const stripePayment = loadStripe(stripeKey);

const AppContext = React.createContext<AppContextType | undefined>(undefined);


export const AppContextProvider = ({ children }: { children: React.ReactNode }) => {

    const [toast, setToast] = useState<ToastMessage | undefined>(undefined);
    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    const loginQuery = useQuery("validateUser", apiClient.verifyUser, {
        retry: false,
        refetchOnWindowFocus: false,
        onSuccess: () => {
            setLoggedIn(true);
        },
        onError: () => {
            setLoggedIn(false);
        }
    });

    console.log(loginQuery);

    return <AppContext.Provider value={{
        showToast: (toastMsg) => {
            setToast(toastMsg);
        },
        isLoggedIn: loggedIn,
        stripePayment
    }}>
        {children}
        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(undefined)} />}
    </AppContext.Provider>
}

export const useAppContext = () => {
    const context = useContext(AppContext);
    return context as AppContextType;
}