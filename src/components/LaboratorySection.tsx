import React from 'react';
import {
  Sparkles,
  CalendarCheck,
  CheckCircle,
  Clock,
  ShieldCheck,
  Info,
  ArrowRight,
} from 'lucide-react';
import { LAB_TESTS, COMPLETE_CHECKUP_PACKAGE } from '../data/pharmacyData';
import { LabTest } from '../types';
import { formatCurrency, Currency } from '../utils/currency';
import { useLanguage } from '../utils/translations';
import {
  MalariaIcon,
  TyphoidTestTubeIcon,
  LiverIcon,
  BloodCellsIcon,
  DnaIcon,
} from './LabIcons';

interface LaboratorySectionProps {
  onBookTest: (test: LabTest) => void;
  onBookPackage: () => void;
  onAddTestToCart: (test: LabTest) => void;
  currency: Currency;
}

export const LaboratorySection: React.FC<LaboratorySectionProps> = ({
  onBookTest,
  onBookPackage,
  onAddTestToCart,
  currency,
}) => {
  const { t, language } = useLanguage();

  const renderLabIcon = (type: string) => {
    switch (type) {
      case 'malaria':
        return <MalariaIcon className="w-8 h-8" />;
      case 'typhoid':
        return <TyphoidTestTubeIcon className="w-8 h-8" />;
      case 'hepatitis':
        return <LiverIcon className="w-8 h-8" />;
      case 'blood':
        return <BloodCellsIcon className="w-8 h-8" />;
      case 'dna':
        return <DnaIcon className="w-8 h-8" />;
      default:
        return <MalariaIcon className="w-8 h-8" />;
    }
  };

  const getTestTitle = (test: LabTest) => {
    if (language === 'fr') {
      switch (test.id) {
        case 'malaria-test':
          return t.malariaTitle;
        case 'typhoid-test':
          return t.typhoidTitle;
        case 'hepatitis-screening':
          return t.hepatitisTitle;
        case 'blood-level-hemoglobin':
          return t.bloodLevelTitle;
        case 'hemoglobin-electrophoresis':
          return t.electrophoresisTitle;
        default:
          return test.title;
      }
    }
    return test.title;
  };

  const getTestShortDesc = (test: LabTest) => {
    if (language === 'fr') {
      switch (test.id) {
        case 'malaria-test':
          return t.malariaDesc;
        case 'typhoid-test':
          return t.typhoidDesc;
        case 'hepatitis-screening':
          return t.hepatitisDesc;
        case 'blood-level-hemoglobin':
          return t.bloodLevelDesc;
        case 'hemoglobin-electrophoresis':
          return t.electrophoresisDesc;
        default:
          return test.shortDesc;
      }
    }
    return test.shortDesc;
  };

  return (
    <section id="lab-tests" className="py-12 sm:py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Title matching flyer */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{t.labSubtitle}</span>
            </div>
            {/* Header style inspired directly by green block in flyer */}
            <div className="inline-block bg-[#0e7c3a] text-white px-5 py-2.5 rounded-lg shadow-sm">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-wide font-display">
                {t.labTitle}
              </h2>
            </div>
            <p className="text-sm text-slate-600 mt-2 max-w-2xl">
              {t.labDescription}
            </p>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-center gap-3">
            <div className="p-2 bg-amber-500 text-white rounded-lg">
              <Clock className="w-5 h-5" />
            </div>
            <div className="text-xs">
              <p className="font-bold text-amber-900">
                {language === 'fr' ? 'Protocole Résultats Rapides' : 'Rapid Result Protocol'}
              </p>
              <p className="text-amber-800">
                {language === 'fr' ? 'Prêts en 15 à 30 minutes au labo !' : 'Most tests ready within 15–30 minutes!'}
              </p>
            </div>
          </div>
        </div>

        {/* 2-Column Grid: 5 Individual Tests on Left / Complete Bundle on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* 5 Individual Tests from Flyer */}
          <div className="lg:col-span-7 flex flex-col gap-3.5">
            {LAB_TESTS.map((test) => {
              const ringColorClass =
                test.iconType === 'typhoid' || test.iconType === 'dna'
                  ? 'border-emerald-600 bg-emerald-50/50'
                  : 'border-red-600 bg-red-50/50';

              return (
                <div
                  key={test.id}
                  className="bg-white rounded-xl border border-slate-200 hover:border-blue-400 p-4 sm:p-5 transition-all shadow-xs hover:shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
                  id={`lab-card-${test.id}`}
                >
                  {/* Left: Icon and Description */}
                  <div className="flex items-start gap-4 flex-1">
                    {/* Flyer Style Circular Badge */}
                    <div
                      className={`w-14 h-14 rounded-full border-2 ${ringColorClass} flex items-center justify-center flex-shrink-0 shadow-2xs group-hover:scale-105 transition-transform`}
                    >
                      {renderLabIcon(test.iconType)}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-base sm:text-lg font-black text-[#002f6c] tracking-tight uppercase font-display">
                          {getTestTitle(test)}
                        </h3>
                        {test.isPopular && (
                          <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-red-100 text-red-700 border border-red-200">
                            {language === 'fr' ? 'Priorité Rentrée' : 'High Priority'}
                          </span>
                        )}
                      </div>

                      {/* Literal flyer description */}
                      <p className="text-sm font-semibold text-slate-800 mt-0.5">
                        {getTestShortDesc(test)}
                      </p>

                      <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                        {test.purpose}
                      </p>

                      <div className="flex items-center gap-3 mt-2 text-[11px] text-slate-500">
                        <span className="flex items-center gap-1 font-medium text-emerald-700">
                          <Clock className="w-3 h-3" />
                          <span>{test.turnaroundTime}</span>
                        </span>
                        <span>•</span>
                        <span className="text-slate-600">{test.sampleType}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Pricing & Booking Actions */}
                  <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100 gap-2 flex-shrink-0">
                    <div className="text-left sm:text-right">
                      {test.discountedPriceXAF && (
                        <span className="text-xs text-slate-400 line-through mr-1 sm:mr-0 block">
                          {formatCurrency(test.priceXAF, currency)}
                        </span>
                      )}
                      <span className="text-lg font-black text-[#d81e27]">
                        {formatCurrency(test.discountedPriceXAF || test.priceXAF, currency)}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onAddTestToCart(test)}
                        className="px-3 py-2 min-h-[38px] rounded-lg border border-slate-300 text-slate-700 hover:text-[#002f6c] hover:border-[#002f6c] active:bg-slate-100 text-xs font-bold transition-colors cursor-pointer"
                        id={`add-cart-test-${test.id}`}
                      >
                        + {t.cart}
                      </button>
                      <button
                        onClick={() => onBookTest(test)}
                        className="px-3.5 py-2 min-h-[38px] rounded-lg bg-[#002f6c] hover:bg-[#001f47] active:bg-[#00122b] text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                        id={`book-test-${test.id}`}
                      >
                        <CalendarCheck className="w-3.5 h-3.5" />
                        <span>{language === 'fr' ? 'Réserver' : 'Book'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Complete Back-to-School All-in-One Package */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <div className="bg-gradient-to-b from-[#002855] to-[#001733] text-white rounded-2xl p-6 sm:p-7 shadow-xl border-2 border-blue-400/30 relative overflow-hidden">
              
              {/* Highlight ribbon */}
              <div className="absolute top-4 right-4 bg-[#d81e27] text-white text-[10px] sm:text-[11px] font-black uppercase px-2.5 sm:px-3 py-1 rounded-full tracking-wider shadow-sm flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-300 flex-shrink-0" />
                <span>{language === 'fr' ? 'ÉCONOMIE' : 'SAVE'} {formatCurrency(COMPLETE_CHECKUP_PACKAGE.savingsXAF, currency)}</span>
              </div>

              <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider mb-2">
                <span>{t.labPackageBadge}</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-white font-display leading-tight pr-20">
                {t.labPackageTitle}
              </h3>

              <p className="text-xs text-blue-200 mt-2 leading-relaxed">
                {t.labPackageDesc}
              </p>

              {/* Price card */}
              <div className="mt-5 p-3.5 sm:p-4 rounded-xl bg-white/10 backdrop-blur-xs border border-white/15 flex items-center justify-between">
                <div>
                  <span className="text-xs text-blue-200 line-through block">
                    {language === 'fr' ? 'Prix normal' : 'Regular'}: {formatCurrency(COMPLETE_CHECKUP_PACKAGE.originalTotalXAF, currency)}
                  </span>
                  <span className="text-2xl sm:text-3xl font-black text-amber-300 font-display">
                    {formatCurrency(COMPLETE_CHECKUP_PACKAGE.packagePriceXAF, currency)}
                  </span>
                </div>
                <div className="text-right">
                  <span className="inline-block bg-emerald-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                    {language === 'fr' ? 'Offre Spéciale' : 'Flyer Discount'}
                  </span>
                  <p className="text-[10px] sm:text-[11px] text-blue-200 mt-0.5">
                    {language === 'fr' ? 'Les 5 examens inclus' : 'Includes all 5 tests'}
                  </p>
                </div>
              </div>

              {/* Checklist */}
              <div className="mt-5 space-y-2 text-xs">
                <p className="font-bold text-slate-200 uppercase tracking-wider text-[11px]">
                  {t.labPackageIncludeTitle}
                </p>
                {COMPLETE_CHECKUP_PACKAGE.included.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-blue-100">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Action */}
              <div className="mt-6 pt-5 border-t border-white/15 flex flex-col gap-2.5">
                <button
                  onClick={onBookPackage}
                  className="w-full py-3.5 min-h-[44px] rounded-xl font-extrabold text-sm text-[#002855] bg-gradient-to-r from-amber-300 via-amber-400 to-amber-300 hover:from-amber-400 hover:to-amber-500 active:from-amber-500 active:to-amber-600 transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                  id="book-complete-package-btn"
                >
                  <CalendarCheck className="w-4 h-4" />
                  <span>{t.labPackageBookBtn}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <p className="text-[11px] text-center text-blue-300">
                  {language === 'fr'
                    ? '⚡ Visites libres ou avec rendez-vous du lundi au samedi à Terranova.'
                    : '⚡ Walk-ins and scheduled appointments accepted Mon–Sat at Terranova.'}
                </p>
              </div>

            </div>

            {/* Flyer Quality Assurance Box */}
            <div className="mt-4 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-3 text-xs text-emerald-900">
              <ShieldCheck className="w-5 h-5 text-emerald-700 flex-shrink-0 mt-0.5" />
              <p className="font-medium leading-relaxed">
                "{t.footerDisclaimerText}"
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
