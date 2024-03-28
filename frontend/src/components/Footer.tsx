const Footer = () => {
    return (
        <div className="bg-blue-900 py-10">
            <div className="container mx-auto flex justify-between ">
                <span className="text-3xl text-white tracking-tight font-bold">
                    BookItNow
                </span>
                <span className="text-white flex gap-4 tracking-tight font-bold">
                    <p className="cursor-pointer"> Terms and conditions</p>
                    <p className="cursor-pointer"> Privacy Policy</p>
                </span>

            </div>

        </div>
    );
}

export default Footer;