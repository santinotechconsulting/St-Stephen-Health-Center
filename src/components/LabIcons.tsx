import React from 'react';

export const MalariaIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 48 48" fill="none" className={className} stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    {/* Stylized Mosquito Vector */}
    <ellipse cx="24" cy="24" rx="4" ry="10" fill="#dc2626" fillOpacity="0.2" stroke="#dc2626" />
    <circle cx="24" cy="11" r="3" fill="#dc2626" />
    <line x1="24" y1="8" x2="24" y2="4" stroke="#dc2626" strokeWidth="2" />
    {/* Wings */}
    <path d="M26 19 C34 12, 42 16, 40 24 C38 30, 28 24, 26 23" fill="#3b82f6" fillOpacity="0.3" stroke="#2563eb" />
    <path d="M22 19 C14 12, 6 16, 8 24 C10 30, 20 24, 22 23" fill="#3b82f6" fillOpacity="0.3" stroke="#2563eb" />
    {/* Legs */}
    <path d="M20 22 L11 20 L6 26" stroke="#475569" />
    <path d="M28 22 L37 20 L42 26" stroke="#475569" />
    <path d="M20 28 L10 32 L8 40" stroke="#475569" />
    <path d="M28 28 L38 32 L40 40" stroke="#475569" />
  </svg>
);

export const TyphoidTestTubeIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 48 48" fill="none" className={className} stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    {/* Test tube with liquid */}
    <rect x="18" y="6" width="12" height="4" rx="1.5" stroke="#16a34a" fill="#dcfce7" />
    <path d="M20 10 V34 C20 38.4 23.6 42 28 42 C32.4 42 36 38.4 36 34 V10" transform="translate(-4, 0)" stroke="#16a34a" />
    {/* Liquid in tube */}
    <path d="M16 26 C18 25, 22 27, 24 26 C26 25, 30 27, 32 26 V34 C32 38.4 28.4 42 24 42 C19.6 42 16 38.4 16 34 Z" fill="#dc2626" />
    {/* Measurement ticks */}
    <line x1="20" y1="16" x2="24" y2="16" stroke="#94a3b8" />
    <line x1="20" y1="21" x2="23" y2="21" stroke="#94a3b8" />
    {/* Bubble */}
    <circle cx="23" cy="33" r="1.5" fill="#fecaca" />
  </svg>
);

export const LiverIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 48 48" fill="none" className={className} stroke="#b91c1c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {/* Anatomical Liver silhouette */}
    <path
      d="M10 18 C11 12, 22 10, 32 12 C38 13, 41 16, 40 21 C39 28, 35 34, 28 36 C22 38, 16 38, 12 34 C8 30, 8 23, 10 18 Z"
      fill="#b91c1c"
      fillOpacity="0.85"
    />
    <path d="M26 14 C27 20, 25 28, 20 34" stroke="#ffffff" strokeWidth="1.5" strokeDasharray="2 2" />
    {/* Gallbladder / duct indication */}
    <path d="M22 28 C23 30, 24 33, 22 35 C20 37, 18 35, 18 33 C18 30, 21 28, 22 28 Z" fill="#15803d" stroke="#166534" strokeWidth="1.2" />
  </svg>
);

export const BloodCellsIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 48 48" fill="none" className={className}>
    {/* Erythrocytes / Red Blood Cells */}
    <ellipse cx="18" cy="20" rx="9" ry="8" fill="#dc2626" stroke="#991b1b" strokeWidth="2" />
    <ellipse cx="18" cy="20" rx="4.5" ry="3.5" fill="#ef4444" />
    
    <ellipse cx="32" cy="18" rx="7" ry="6.5" fill="#b91c1c" stroke="#7f1d1d" strokeWidth="2" />
    <ellipse cx="32" cy="18" rx="3.5" ry="2.5" fill="#dc2626" />
    
    <ellipse cx="26" cy="34" rx="8" ry="7" fill="#dc2626" stroke="#991b1b" strokeWidth="2" />
    <ellipse cx="26" cy="34" rx="4" ry="3" fill="#ef4444" />

    <circle cx="12" cy="34" r="3" fill="#ef4444" />
    <circle cx="38" cy="30" r="3.5" fill="#ef4444" />
  </svg>
);

export const DnaIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 48 48" fill="none" className={className} stroke="#16a34a" strokeWidth="2.2" strokeLinecap="round">
    {/* Double Helix */}
    <path d="M14 8 C22 14, 26 20, 34 24 C26 28, 22 34, 14 40" stroke="#16a34a" />
    <path d="M34 8 C26 14, 22 20, 14 24 C22 28, 26 34, 34 40" stroke="#0284c7" />
    {/* Base pairs rungs */}
    <line x1="17" y1="11" x2="31" y2="11" stroke="#475569" strokeWidth="1.8" />
    <line x1="20" y1="17" x2="28" y2="17" stroke="#475569" strokeWidth="1.8" />
    <line x1="24" y1="24" x2="24" y2="24" stroke="#475569" strokeWidth="2.5" />
    <line x1="20" y1="31" x2="28" y2="31" stroke="#475569" strokeWidth="1.8" />
    <line x1="17" y1="37" x2="31" y2="37" stroke="#475569" strokeWidth="1.8" />
  </svg>
);
