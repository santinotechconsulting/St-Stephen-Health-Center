import React from 'react';
import {
  Calendar,
  CheckCircle2,
  Sparkles,
  PhoneCall,
  Activity,
  Heart,
  ShieldCheck,
  Award,
} from 'lucide-react';
import { HEALTH_CENTER_INFO } from '../data/pharmacyData';
import { useLanguage } from '../utils/translations';
import schoolKidsImg from '../assets/images/school_kids_health_1789220691002.jpg';

interface HeroBannerProps {
  onBookCheckup: () => void;
  onExplorePharmacy: () => void;
  onUploadRx: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onBookCheckup,
  onExplorePharmacy,
  onUploadRx,
}) => {
  const { t, language } = useLanguage();

  return (
    <section
      className="relative overflow-hidden bg-gradient-to-b from-blue-50/70 via-white to-slate-50 pt-8 pb-12 sm:pt-12 sm:pb-16 border-b border-slate-200"
      id="campaign-hero-section"
    >
      {/* Decorative subtle medical wave curves in background */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-blue-100/60 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-emerald-100/40 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Flyer Messaging & Action */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Health Center Tag & Slogan */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100 text-[#002f6c] text-xs font-bold uppercase tracking-wider mb-4 border border-blue-200 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
              <span>
                {language === 'fr'
                  ? 'Aire de santé de BONAMEKANO • Campagne Spéciale'
                  : 'Aire de santé de BONAMEKANO • Special Campaign'}
              </span>
            </div>

            {/* Main Headline mimicking flyer exact typography */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-black tracking-tight leading-[1.08] text-[#002f6c] font-display">
              {language === 'fr' ? (
                <>
                  BILAN DE SANTÉ{' '}
                  <span className="text-[#d81e27] block sm:inline mt-1 sm:mt-0 drop-shadow-xs">
                    RENTRÉE SCOLAIRE !
                  </span>
                </>
              ) : (
                <>
                  BACK-TO-SCHOOL{' '}
                  <span className="text-[#d81e27] block sm:inline mt-1 sm:mt-0 drop-shadow-xs">
                    HEALTH CHECK-UP!
                  </span>
                </>
              )}
            </h1>

            {/* Sub-headline directly from flyer */}
            <div className="mt-4 p-3 sm:p-4 rounded-xl bg-gradient-to-r from-blue-900 to-[#003882] text-white shadow-md w-full max-w-2xl border border-blue-800">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-blue-800/80 text-amber-300 mt-0.5 flex-shrink-0">
                  <Activity className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-bold leading-snug text-white">
                    {t.heroSubheadline}
                  </h2>
                  <p className="text-xs sm:text-sm text-blue-100 mt-1 leading-relaxed">
                    {t.heroDescription}
                  </p>
                </div>
              </div>
            </div>

            {/* Key Flyer Highlights List */}
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full max-w-xl text-slate-700 text-xs sm:text-sm font-medium">
              <div className="flex items-center gap-2 bg-white/90 p-2 rounded-lg border border-slate-200/80 shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>
                  {language === 'fr'
                    ? 'Dépistage rapide Paludisme, Typhoïde & Hépatites'
                    : 'Malaria, Typhoid & Hepatitis rapid lab screens'}
                </span>
              </div>
              <div className="flex items-center gap-2 bg-white/90 p-2 rounded-lg border border-slate-200/80 shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>
                  {language === 'fr'
                    ? 'Taux d’Hémoglobine & Électrophorèse Drépanocytose'
                    : 'Hemoglobin & Sickle Cell Electrophoresis'}
                </span>
              </div>
              <div className="flex items-center gap-2 bg-white/90 p-2 rounded-lg border border-slate-200/80 shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>
                  {language === 'fr'
                    ? 'Mise à jour des vaccins & consultation vitamines'
                    : 'Vaccination & Growth Vitamin consultation'}
                </span>
              </div>
              <div className="flex items-center gap-2 bg-white/90 p-2 rounded-lg border border-slate-200/80 shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>
                  {language === 'fr'
                    ? 'Certificat médical officiel visé pour l’école'
                    : 'Official school medical fitness certificate'}
                </span>
              </div>
            </div>

            {/* Discount Ribbon Badge from flyer */}
            <div className="mt-5 inline-flex items-center gap-2 bg-[#d81e27] text-white px-4 py-2 rounded-lg font-extrabold text-xs sm:text-sm shadow-md animate-bounce-subtle">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>{t.heroPromoRibbon}</span>
            </div>

            {/* CTA Buttons */}
            <div className="mt-6 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-2.5 sm:gap-3 w-full">
              <button
                onClick={onBookCheckup}
                className="w-full sm:w-auto px-6 py-3.5 min-h-[44px] rounded-xl font-bold text-sm sm:text-base text-white bg-[#00337f] hover:bg-[#002257] active:bg-[#00183f] transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group cursor-pointer"
                id="hero-book-checkup-btn"
              >
                <span>{t.heroBookBtn}</span>
                <Sparkles className="w-4 h-4 text-amber-300 group-hover:rotate-12 transition-transform" />
              </button>

              <button
                onClick={onExplorePharmacy}
                className="w-full sm:w-auto px-5 py-3.5 min-h-[44px] rounded-xl font-bold text-sm sm:text-base text-emerald-900 bg-emerald-100 hover:bg-emerald-200 active:bg-emerald-300 border border-emerald-300 transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                id="hero-browse-medicines-btn"
              >
                <span>{t.heroExploreBtn}</span>
              </button>

              <button
                onClick={onUploadRx}
                className="w-full sm:w-auto px-4 py-3.5 min-h-[44px] rounded-xl font-bold text-xs sm:text-sm text-slate-700 bg-white hover:bg-slate-100 active:bg-slate-200 border border-slate-300 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                id="hero-upload-rx-btn"
              >
                <span>{t.heroUploadRxBtn}</span>
              </button>
            </div>

            {/* Motto note from flyer */}
            <div className="mt-5 flex items-center gap-2 text-xs text-slate-600 font-medium italic">
              <Heart className="w-4 h-4 text-red-500 fill-red-500 flex-shrink-0" />
              <span>
                {language === 'fr'
                  ? 'Le Centre Médical St. Stephen vous aime et prend soin de vous ! ❤️'
                  : HEALTH_CENTER_INFO.secondaryMotto}
              </span>
            </div>
          </div>

          {/* Right Column: Visual Composition with School Children Photo & Circular Date Badge */}
          <div className="lg:col-span-5 relative flex justify-center items-center mt-6 lg:mt-0 px-2 sm:px-0">
            
            {/* Primary Frame with Generated School Children Photo */}
            <div className="relative w-full max-w-md rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-white">
              <img
                src={schoolKidsImg}
                alt="Two smiling African school children ready for healthy school year"
                className="w-full h-72 sm:h-96 object-cover object-center transform hover:scale-102 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />

              {/* Gradient overlay on bottom of image for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#002855]/95 via-[#002855]/30 to-transparent flex flex-col justify-end p-4 sm:p-5 text-white">
                <div className="flex items-center gap-1 text-amber-300 text-xs font-bold uppercase tracking-wider">
                  <Award className="w-3.5 h-3.5 flex-shrink-0" />
                  <span className="truncate">St. Stephen Health Center • Terranova</span>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-white/95 mt-0.5 leading-snug">
                  {language === 'fr'
                    ? '« Un enfant en bonne santé aujourd’hui, un avenir meilleur ! »'
                    : '"A healthy child today, a better tomorrow!"'}
                </p>
                <p className="text-[10px] sm:text-[11px] text-blue-200 mt-1">
                  {language === 'fr'
                    ? 'Réalisé selon les normes médicales professionnelles.'
                    : 'Carried out according to professional medical standards.'}
                </p>
              </div>
            </div>

            {/* Big Circular Red Campaign Badge directly mimicking flyer */}
            <div
              className="absolute -top-3 -right-1 sm:-top-6 sm:-right-4 w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-gradient-to-br from-[#d81e27] to-[#990d14] text-white flex flex-col items-center justify-center p-2 text-center shadow-xl border-2 sm:border-4 border-white z-20 transform rotate-3 hover:rotate-0 transition-transform select-none"
              id="flyer-calendar-circle"
            >
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300 mb-0.5" />
              <div className="text-[9px] sm:text-xs font-semibold uppercase tracking-wider text-red-100">
                {language === 'fr' ? 'CAMPAGNE' : 'CAMPAIGN'}
              </div>
              <div className="text-sm sm:text-lg font-black tracking-tight leading-none text-white font-display">
                {language === 'fr' ? (
                  <>24 – 31</>
                ) : (
                  <>24<sup className="text-[8px] sm:text-[9px]">TH</sup> – 31<sup className="text-[8px] sm:text-[9px]">ST</sup></>
                )}
              </div>
              <div className="text-[11px] sm:text-sm font-black tracking-wider text-amber-300 font-display">
                {language === 'fr' ? 'AOÛT' : 'AUGUST'}
              </div>
              <div className="text-[9px] sm:text-[10px] font-medium text-white/90 mt-0.5 tracking-tight">
                {language === 'fr' ? 'Venez tous !' : 'Come one, come all!'}
              </div>
            </div>

            {/* Quality Standard Floating Card */}
            <div className="absolute -bottom-4 -left-1 sm:-bottom-5 sm:-left-4 bg-white/95 backdrop-blur-xs rounded-xl p-2.5 sm:p-3 shadow-lg border border-slate-200 flex items-center gap-2.5 sm:gap-3 z-20 max-w-[210px] sm:max-w-[240px]">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 flex-shrink-0">
                <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div>
                <p className="text-[11px] sm:text-xs font-bold text-slate-800 leading-tight">
                  {language === 'fr' ? 'Évaluation Médicale' : 'Proper Assessment'}
                </p>
                <p className="text-[9px] sm:text-[10px] text-slate-500 leading-tight mt-0.5">
                  {language === 'fr'
                    ? 'Normes professionnelles certifiées'
                    : 'Sterile & certified diagnostic standards'}
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
