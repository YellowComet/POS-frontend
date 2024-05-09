import React from 'react'
import Category from './Category';
// import Cart from './Cart';



export default function Dashboard() {

    return (
        <>
        <div>
                <div className="flex h-full">
                    <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
                        <div className="relative z-0 flex flex-row-reverse flex-1 overflow-hidden">
                            <main style={{
                                background: "#060c18"
                            }} className="relative z-0 flex-1 border-r pt-4 border-black overflow-y-auto focus:outline-none xl:order-last overflow-y-scroll scrollbar-hide">
                                <Category/>
                                <div className='lg:block hidden'>
                                    <div className='absolute bottom-0 w-full h-[86px]' style={{
                                        backgroundColor: "#0e1227"
                                    }}>
                                    </div>
                                </div>
                            </main>
                            <div className='lg:block hidden'>
                                <aside className="relative bg-[#0e1227] w-[350px] h-[96.8vh] flex-shrink-0 overflow-y-auto">
                                    {/* <Cart /> */}
                                </aside>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}