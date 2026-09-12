import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
  theme?: 'light' | 'dark';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  showSubtitle = true,
  theme = 'light',
}) => {
  const isLg = size === 'lg';
  const isSm = size === 'sm';

  const sealDim = isLg ? 68 : isSm ? 44 : 54;

  return (
    <div className="flex items-center gap-3 select-none">
      {/* Authentic Circular Crest Seal */}
      <div
        className="relative flex-shrink-0 rounded-full flex items-center justify-center shadow-md transition-transform hover:scale-105"
        style={{
          width: sealDim,
          height: sealDim,
          background: 'linear-gradient(135deg, #00337f 0%, #001f54 100%)',
          border: '2.5px solid #ffffff',
          boxShadow: '0 4px 14px rgba(0, 51, 127, 0.25)',
        }}
        id="st-stephen-seal"
      >
        {/* Outer Ring Border */}
        <div className="absolute inset-[2px] rounded-full border border-blue-200/40 pointer-events-none" />

        {/* Circular text SVG simulation */}
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 w-full h-full pointer-events-none"
        >
          <path
            id="circlePathTop"
            d="M 16,50 A 34,34 0 0,1 84,50"
            fill="none"
          />
          <path
            id="circlePathBottom"
            d="M 84,50 A 34,34 0 0,1 16,50"
            fill="none"
          />
          <text className="text-[7.2px] font-bold tracking-wider fill-white uppercase">
            <textPath href="#circlePathTop" startOffset="50%" textAnchor="middle">
              ST. STEPHEN HEALTH
            </textPath>
          </text>
          <text className="text-[6.2px] font-medium tracking-normal fill-blue-100">
            <textPath href="#circlePathBottom" startOffset="50%" textAnchor="middle">
              BONAMEKANO
            </textPath>
          </text>
          {/* Diamond stars on side */}
          <circle cx="12" cy="50" r="1.6" fill="#FBBF24" />
          <circle cx="88" cy="50" r="1.6" fill="#FBBF24" />
        </svg>

        {/* Central S Motif */}
        <div className="z-10 flex flex-col items-center justify-center">
          <span
            className="font-serif font-black text-white leading-none tracking-tight"
            style={{
              fontSize: isLg ? '28px' : isSm ? '18px' : '22px',
              fontFamily: 'Georgia, serif',
              textShadow: '0 2px 4px rgba(0,0,0,0.3)',
            }}
          >
            S
          </span>
          <div className="h-[1.5px] w-3 bg-amber-400/80 rounded-full mt-0.5" />
        </div>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span
            className={`font-black tracking-tight leading-none ${
              theme === 'dark' ? 'text-white' : 'text-[#002f6c]'
            } ${isLg ? 'text-2xl' : isSm ? 'text-base' : 'text-xl'}`}
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            ST. STEPHEN
          </span>
          <span
            className={`font-extrabold uppercase px-1.5 py-0.5 rounded text-[10px] tracking-wide ${
              theme === 'dark'
                ? 'bg-red-600 text-white'
                : 'bg-red-600 text-white'
            }`}
          >
            Health & Pharmacy
          </span>
        </div>

        {showSubtitle && (
          <div className="flex flex-col mt-0.5">
            <span
              className={`text-[11px] font-semibold tracking-wider uppercase ${
                theme === 'dark' ? 'text-blue-200' : 'text-slate-600'
              }`}
            >
              TERRANOVA, BONAMEKANO
            </span>
            <span className="text-[11px] font-serif italic text-red-600 font-medium">
              Your health, our priority! ❤️
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
