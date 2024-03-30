import { useEffect } from "react";

export const Toast = ({ message, type, onClose }: ToastPros) => {

    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 5000);

        return () => {
            clearTimeout(timer);
        }
    }, [onClose]);

    const style = type === 'SUCCESS' ?
        "fixed transition-all ease-in-out delay-150 duration-300 top-3 right-3 z-50 p-3 bg-green-700 rounded-md text-white max-w-md" :
        "fixed transition-all ease-in-out delay-150 duration-300 top-3 right-3 z-50 p-3 bg-red-700 rounded-md text-white max-w-md";
    return (
        <div className={style}>
            <div className="flex justify-center items-center">
                <span className="text-lg">{message}</span>
            </div>
        </div>
    )
}