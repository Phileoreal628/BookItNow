import React, { useContext, useState } from "react";
import { Toast } from "../components/Toast";

const AppContext = React.createContext<AppContextType | undefined>(undefined);

export const AppContextAprovider = ({ children }: { children: React.ReactNode }) => {

    const [toast, setToast] = useState<ToastMessage | undefined>(undefined);

    return <AppContext.Provider value={{
        showToast: (toastMsg) => {
            setToast(toastMsg);
        }
    }}>
        {children}
        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(undefined)} />}
    </AppContext.Provider>
}

export const useAppContext = () => {
    const context = useContext(AppContext);
    return context as AppContextType;
}