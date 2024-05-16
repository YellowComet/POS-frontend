import React from 'react'
import OrderData from './OrderData';


export default function OrderDashboard() {

    return (
        <>
            <div>
                <div className="flex h-full">
                    <div className="relative z-0 flex h-[96.8vh] flex-row-reverse flex-1 overflow-hidden">
                        <main style={{
                            background: "#060c18"
                        }} className="relative z-0 flex-1 border-r pt-4 border-black overflow-y-auto focus:outline-none xl:order-last overflow-y-scroll scrollbar-hide">
                            <OrderData />
                        </main>
                    </div>
                </div>
            </div>
        </>
    )
}
