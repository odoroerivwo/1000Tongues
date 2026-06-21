import React, { useRef, useEffect, useState } from 'react';


const Prophesy: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [, setVideoLoaded] = useState(false);
    const [videoError, setVideoError] = useState(false);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handleLoadedData = () => {
            setVideoLoaded(true);
            video.classList.add('opacity-100');
        };

        const handleError = () => {
            setVideoError(true);
            console.warn('Background video failed to load, falling back to static background');
        };

        video.addEventListener('loadeddata', handleLoadedData);
        video.addEventListener('error', handleError);

        return () => {
            video.removeEventListener('loadeddata', handleLoadedData);
            video.removeEventListener('error', handleError);
        };
    }, []);

    return (
        <section
            className="min-h-screen flex items-center justify-center relative overflow-hidden py-16 md:py-20 lg:py-30 pt-20 md:pt-24"
            style={{ background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)' }}
        >
            {/* Video */}
            {!videoError && (
                <div className="absolute inset-0 z-0">
                    <video
                        ref={videoRef}
                        className="w-full h-full object-cover object-center opacity-0 transition-opacity duration-500"
                        autoPlay
                        muted
                        loop
                        playsInline
                    >
                        <source src="/concert-background.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    <div className="absolute inset-0 bg-black/80"></div>
                </div>
            )}

        </section>
    );
};

export default Prophesy;
