'use client';

export function LogoSlider() {
  // Placeholder logos using simple SVG shapes
  const logos = Array.from({ length: 6 }, (_, i) => ({
    id: i + 1,
    name: `Cliente ${i + 1}`,
  }));

  return (
    <div className="w-full overflow-hidden py-8">
      <div className="relative">
        {/* Gradient masks */}
        <div className="absolute left-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-r from-[var(--color-gray-50)] to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-l from-[var(--color-gray-50)] to-transparent z-10" />
        
        {/* Scrolling container */}
        <div className="flex animate-infinite-scroll">
          {/* First set of logos */}
          {[...logos, ...logos].map((logo, index) => (
            <div
              key={`${logo.id}-${index}`}
              className="flex-shrink-0 mx-6 md:mx-10 group"
            >
              <div 
                className="w-28 h-16 md:w-36 md:h-20 flex items-center justify-center
                           rounded-lg bg-white shadow-sm border border-gray-100
                           grayscale opacity-60 hover:grayscale-0 hover:opacity-100
                           transition-all duration-300 cursor-pointer"
              >
                {/* Placeholder logo */}
                <div className="flex flex-col items-center">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
                    style={{ 
                      backgroundColor: `hsl(${(logo.id * 60) % 360}, 50%, 45%)`,
                      fontFamily: 'var(--font-heading)'
                    }}
                  >
                    {logo.name.charAt(0)}
                  </div>
                  <span className="text-xs text-gray-500 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {logo.name}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
