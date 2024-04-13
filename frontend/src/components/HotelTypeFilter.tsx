import { hotelType } from "../config/hotelConfig";

const HotelTypeFilter = ({ selectedHotelType, onChange }: HotelTypeFilter) => {

    return (
        <div className="border border-slate-300 pb-4 pl-3">
            <h3 className="text-base mb-2" >Hotel Type :</h3>
            {hotelType.map(type => (
                <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" onChange={onChange} checked={selectedHotelType?.includes(type)} value={type} />
                    <span>{type}</span>
                </label>

            ))}
        </div>
    )
}
export default HotelTypeFilter;