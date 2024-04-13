const RatingFilter = ({ selectedRating, onChange }: ratingFilter) => {

    return (
        <div className="border border-slate-300 pb-4 pl-3">
            <h3 className="text-base mb-2" >Hotel Rating :</h3>
            {[...Array(5).keys()].reverse().map(star => (
                <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" onChange={onChange} checked={selectedRating?.includes((star + 1).toString())} value={(star + 1).toString()} />
                    <span>{star + 1} Star</span>
                </label>

            ))}
        </div>
    )
}
export default RatingFilter;