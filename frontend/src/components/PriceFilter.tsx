const PriceFilter = ({ selectedPrice, onChange }: PriceFilter) => {

    return (
        <div className="pl-2 pb-2 border border-slate-300">
            <h3 className="font-base mb-2 pl-1">Max Price :</h3>
            <select
                className="border rounded-md w-[90%] p-1"
                value={selectedPrice}
                onChange={(event) => (event.target.value ? onChange(parseInt(event.target.value)) : undefined)}
            >
                <option value="">Select Max Price</option>
                {[500, 1000, 3000, 5000, 10000, 10000].map((price) => (
                    <option value={price}>{price} INR</option>
                ))}
            </select>
        </div>
    )
}
export default PriceFilter;