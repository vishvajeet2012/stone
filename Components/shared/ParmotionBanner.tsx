

export default function PromotionBanner() {
    return (
        <div className="max-w-7xl mx-auto px-4 md:px-8 mb-16 mt-12">
            <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-serif font-bold text-saddle-brown tracking-tight">
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

            </div>
        </div>
    );
}