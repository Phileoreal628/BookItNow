import { useQuery } from "react-query";
import * as apiClient from "../apiClients";
import HomePageHotelCard from "../components/HomePageHotelCard";

const HomePage = () => {
    const { data: allHotels } = useQuery("getAllHotels", apiClient.fetchAllHotels, { refetchOnWindowFocus: false });
    const topRow = allHotels?.slice(0, 2) || [];
    const bottomRow = allHotels?.slice(2) || [];
    return (
        <div className="space-y-3">
            <h2 className="font-bold text-3xl">Find your dream destination !</h2>
            <p>Most recent desinations added by our hosts</p>
            <div className="grid gap-4">
                <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                    {topRow.map(hotel => (
                        <HomePageHotelCard hotel={hotel} />
                    ))}
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                    {
                        bottomRow.map(hotel => (
                            <HomePageHotelCard hotel={hotel} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
export default HomePage;