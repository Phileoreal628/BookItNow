import { hotelFacilities } from "../config/hotelConfig";

const FacilityFilter = ({ selectedFacility, onChange }: FacilityFilter) => {

    return (
        <div className="border border-slate-300 pb-4 pl-3">
            <h3 className="text-base mb-2" >Hotel Facilities :</h3>
            {hotelFacilities.map(facility => (
                <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" onChange={onChange} checked={selectedFacility?.includes(facility)} value={facility} />
                    <span>{facility}</span>
                </label>

            ))}
        </div>
    )
}
export default FacilityFilter;