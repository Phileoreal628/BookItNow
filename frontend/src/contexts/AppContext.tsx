import React, { useContext, useState } from "react";
import { Toast } from "../components/Toast";
import { useQuery } from "react-query";
import * as apiClient from "../apiClients";

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
        isLoggedIn: loggedIn
    }}>
        {children}
        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(undefined)} />}
    </AppContext.Provider>
}

export const useAppContext = () => {
    const context = useContext(AppContext);
    return context as AppContextType;
}