import React from "react"
import Footer from "../components/Footer"
import Header from "../components/Header"
import HeroBanner from "../components/HeroBanner"

interface props {
    children: React.ReactNode
}

export const Layout = ({ children }: props) => {
    return (<div className="flex flex-col min-h-screen w-full">
        <Header />
        <HeroBanner />
        <div className="container mx-auto py-10 flex-1">{children}</div>
        <Footer />
    </div>)
}