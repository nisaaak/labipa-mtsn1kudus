import React, { useEffect, useState } from 'react'

const ImageSlider = ({ images = [], containerClassName = 'w-sm h-auto' }) => {
    const [current, setCurrent] = useState(0);

    // Slider 
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % images.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);
    const prevSlide = () => {
        setCurrent((current - 1 + images.length) % images.length);
    };
    const nextSlide = () => {
        setCurrent((current + 1) % images.length);
    };
    return (
        <div className={containerClassName} >
            <div className='relative overflow-hidden rounded-2xl shadow-lg'>
                <div style={{ transform: `translateX(-${current * 100}%)` }} className='
                flex transition-transform duration-700 w-full h-full'>
                    {images.map((img, index) => (
                        <img src={img} key={index} className='w-full h-full
                        object-cover flex-shrink-0'/>
                    ))}
                </div>
                {/* button  */}
                <button
                    onClick={prevSlide}
                    className='absolute top-1/2 left-4 -translate-y-1/2 bg-white/70
                hover:bg-white p-2 rounded-full shadow-md'>
                    ❮
                </button>
                <button
                    onClick={nextSlide}
                    className='absolute top-1/2 right-4 -translate-y-1/2 bg-white/70
                hover:bg-white p-2 rounded-full shadow-md'>
                    ❯
                </button>
                {/* <div className='absolute bottom-4 left-1/2 -translate-y-1/2 flex gap-2'>
                    {images.map((_, i) => (
                        <div
                            key={i}
                            className={`w-3 h-3 rounded-full ${i === current ? "bg-white" : "bg-gray-400"}`}
                        ></div>
                    ))}
                </div> */}
            </div>
        </div>
    )
}

export default ImageSlider