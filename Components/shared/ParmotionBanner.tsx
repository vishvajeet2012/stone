

export default function PromotionBanner() {
    return (
        <div className="max-w-7xl mx-auto px-4 md:px-8 mb-16 mt-12">
            <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-playfair font-bold text-saddle-brown tracking-tight">
                    Launching Soon
                </h1>
               
            </div>
            
            <div className="relative w-full h-[300px] md:h-[400px] rounded-xl overflow-hidden shadow-lg border border-saddle-brown/10">
                <video
                    src="/promotionVideo.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <div className="text-center">
                        <h2 className="text-3xl md:text-5xl font-playfair font-bold text-warm-cream mb-8 drop-shadow-lg tracking-tight">
                            Natural Stone
                        </h2>
                        <button className="bg-warm-cream text-saddle-brown px-8 py-3 rounded-full font-lato font-bold uppercase tracking-widest text-xs md:text-sm hover:bg-white transition-all duration-300 shadow-xl hover:scale-105 transform">
                            Shop Collection
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}
