import React from 'react';
import {
  Phone,
  MapPin,
  Clock,
  ShieldCheck,
  Heart,
  MessageCircle,
  Users,
  Award,
  ChevronRight,
} from 'lucide-react';
import { HEALTH_CENTER_INFO, TESTIMONIALS } from '../data/pharmacyData';
import { BrandLogo } from './BrandLogo';
import { useLanguage } from '../utils/translations';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenBookingModal: () => void;
  onOpenPrescriptionModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenBookingModal,
  onOpenPrescriptionModal,
}) => {
  const { t, language } = useLanguage();

  return (
    <footer id="contact" className="bg-[#001f47] text-white">
      
      {/* Testimonials from Bonamekano Parents */}
      <div className="border-b border-blue-900/60 py-10 bg-[#001736]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-900 text-blue-200 text-xs font-bold uppercase mb-2">
              <Users className="w-3.5 h-3.5 text-amber-400" />
              <span>
                {language === 'fr'
                  ? 'Confiance de la Communauté • Aire de santé de BONAMEKANO'
                  : 'Community Trust • Aire de santé de BONAMEKANO'}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white font-display">
              {language === 'fr'
                ? 'Recommandé par les Parents et Enseignants à Terranova'
                : 'Loved by Parents & Schools in Terranova'}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#002855] p-5 rounded-xl border border-blue-800/80 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex text-amber-400 text-xs">
                    {'★'.repeat(item.rating)}
                  </div>
                  <p className="text-xs sm:text-sm text-blue-100 leading-relaxed italic">
                    "{item.content}"
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-blue-900">
                  <p className="text-xs font-bold text-white">{item.parent}</p>
                  <p className="text-[11px] text-blue-300">{item.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Links & Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-4">
            <BrandLogo size="md" theme="dark" />

            <p className="text-xs sm:text-sm text-blue-200 leading-relaxed max-w-md mt-3">
              {language === 'fr'
                ? 'Le Centre Médical & Pharmacie St. Stephen est l’établissement de soins de santé primaires et de diagnostic accrédité desservant Terranova et toute l’Aire de santé de Bonamekano.'
                : 'St. Stephen Health Center & Pharmacy is the accredited primary healthcare and laboratory diagnostic facility serving Terranova and the greater Aire de santé de Bonamekano.'}
            </p>

            <div className="p-3.5 bg-blue-950/80 rounded-xl border border-blue-800/60 max-w-md">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-300 mb-1">
                <Heart className="w-4 h-4 text-red-400 fill-red-400" />
                <span>{language === 'fr' ? 'Notre Devise' : 'Our Motto'}</span>
              </div>
              <p className="text-xs text-blue-100 font-serif italic">
                "{language === 'fr' ? 'La santé pour tous, avec compassion et rigueur médicale.' : HEALTH_CENTER_INFO.motto}"
              </p>
              <p className="text-[11px] text-blue-300 mt-1">
                "{language === 'fr' ? 'Le Centre Médical St. Stephen vous aime et prend soin de vous !' : HEALTH_CENTER_INFO.secondaryMotto}"
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300">
              {language === 'fr' ? 'Services de Santé' : 'Healthcare Services'}
            </h4>
            <ul className="space-y-2 text-xs text-blue-200">
              <li>
                <button
                  onClick={() => onNavigate('lab-tests')}
                  className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <ChevronRight className="w-3 h-3 text-red-400" />
                  <span>{t.malariaTitle} & {t.typhoidTitle}</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('lab-tests')}
                  className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <ChevronRight className="w-3 h-3 text-red-400" />
                  <span>{t.bloodLevelTitle} & {t.electrophoresisTitle}</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('clinical')}
                  className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <ChevronRight className="w-3 h-3 text-red-400" />
                  <span>{t.clinicalVaccineTitle}</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('pharmacy')}
                  className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <ChevronRight className="w-3 h-3 text-red-400" />
                  <span>{t.clinicalNutritionTitle}</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('tracking')}
                  className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer text-blue-300 font-semibold"
                >
                  <ChevronRight className="w-3 h-3 text-blue-400" />
                  <span>{t.navTrackOrder}</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('faq')}
                  className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer text-amber-300 font-semibold"
                >
                  <ChevronRight className="w-3 h-3 text-amber-400" />
                  <span>{t.navFaq}</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenPrescriptionModal}
                  className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer text-emerald-300 font-semibold"
                >
                  <ChevronRight className="w-3 h-3 text-emerald-400" />
                  <span>{t.uploadRxNav}</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Working Hours & Facility Status */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300">
              {t.footerHoursTitle}
            </h4>
            
            <div className="space-y-2 text-xs text-blue-200">
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">
                    {language === 'fr' ? 'Lundi – Vendredi :' : 'Monday – Friday:'} {HEALTH_CENTER_INFO.hours.weekday}
                  </p>
                  <p className="text-blue-300">
                    {language === 'fr' ? 'Samedi :' : 'Saturday:'} {HEALTH_CENTER_INFO.hours.saturday}
                  </p>
                  <p className="text-amber-300 text-[11px] font-medium mt-0.5">
                    {language === 'fr' ? 'Urgences & Garde pharmaceutique : 24h/24' : HEALTH_CENTER_INFO.hours.emergency}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2 pt-1">
                <MapPin className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">{HEALTH_CENTER_INFO.address}</p>
                  <p className="text-[11px] text-blue-300">Carrefour Terranova, Bonamekano, Région du Littoral</p>
                </div>
              </div>
            </div>

            <div className="pt-2 flex gap-2">
              <button
                onClick={onOpenBookingModal}
                className="px-3.5 py-2 rounded-lg bg-[#d81e27] hover:bg-red-700 text-white font-bold text-xs transition-colors shadow-xs cursor-pointer"
              >
                {t.bookCheckupNav}
              </button>
              <a
                href={`https://wa.me/${HEALTH_CENTER_INFO.whatsapp}?text=Hello%20St.%20Stephen%20Health%20Center`}
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>{language === 'fr' ? 'WhatsApp Soins' : 'WhatsApp Care'}</span>
              </a>
            </div>
          </div>

        </div>

        {/* Flyer Blue Contact Bar Replica */}
        <div className="mt-10 p-5 rounded-2xl bg-[#002f6c] border border-blue-700/80 shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            
            {/* Location block */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-900 flex items-center justify-center text-white flex-shrink-0">
                <MapPin className="w-5 h-5 text-red-400" />
              </div>
              <div>
                <p className="text-xs font-black text-white uppercase tracking-wide">
                  ST. STEPHEN HEALTH CENTER
                </p>
                <p className="text-[11px] text-blue-200">
                  TERRANOVA, BONAMEKANO
                </p>
              </div>
            </div>

            {/* Direct Phone Numbers matching flyer */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-900 flex items-center justify-center text-white flex-shrink-0">
                <Phone className="w-5 h-5 text-amber-400" />
              </div>
              <div className="text-xs font-bold text-white">
                <a href={`tel:${HEALTH_CENTER_INFO.phones[0].replace(/\s+/g, '')}`} className="block hover:text-amber-300">
                  {HEALTH_CENTER_INFO.phones[0]}
                </a>
                <a href={`tel:${HEALTH_CENTER_INFO.phones[1].replace(/\s+/g, '')}`} className="block hover:text-amber-300">
                  {HEALTH_CENTER_INFO.phones[1]}
                </a>
              </div>
            </div>

            {/* Slogan with family icon */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-900 flex items-center justify-center text-white flex-shrink-0">
                <Users className="w-5 h-5 text-emerald-400" />
              </div>
              <p className="text-xs font-semibold text-blue-100">
                {language === 'fr'
                  ? 'Ensemble pour des enfants en bonne santé, forts et prêts à apprendre !'
                  : 'Together for healthy, strong and ready to learn children!'}
              </p>
            </div>

          </div>
        </div>

      </div>

      {/* Official Medical Quality Standards Strip directly from flyer bottom */}
      <div className="bg-[#00142b] py-3.5 px-4 text-center border-t border-blue-950">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-xs text-emerald-300 font-medium">
          <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>
            "{t.footerDisclaimerText}"
          </span>
        </div>
        <p className="text-[10px] text-slate-400 mt-1">
          © 2026 St. Stephen Health Center & Pharmacy. Terranova, Bonamekano. All rights reserved.
        </p>
      </div>

    </footer>
  );
};
