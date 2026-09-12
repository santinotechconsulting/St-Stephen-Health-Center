import React from 'react';
import {
  ShieldAlert,
  Syringe,
  Sparkles,
  Heart,
  Stethoscope,
  Apple,
  Check,
  UserCheck,
  PhoneCall,
  Calendar,
} from 'lucide-react';
import { HEALTH_CENTER_INFO } from '../data/pharmacyData';
import { useLanguage } from '../utils/translations';
import pharmacistImg from '../assets/images/pharmacist_consult_1789220703659.jpg';

interface ClinicalServicesProps {
  onBookConsultation: (serviceName: string) => void;
  onExploreVitamins: () => void;
}

export const ClinicalServices: React.FC<ClinicalServicesProps> = ({
  onBookConsultation,
  onExploreVitamins,
}) => {
  const { t, language } = useLanguage();

  return (
    <section id="clinical" className="py-12 sm:py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header Block matching flyer's "WE ALSO OFFER" */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-block bg-[#003882] text-white px-6 py-2.5 rounded-lg shadow-sm mb-3">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-wide font-display">
              {t.clinicalTitle}
            </h2>
          </div>
          <p className="text-slate-600 text-sm sm:text-base font-medium">
            {t.clinicalSubtitle}
          </p>
        </div>

        {/* 2 Feature Cards directly from Flyer */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          
          {/* Card 1: Vaccination Services */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 hover:border-blue-300 shadow-sm transition-all hover:shadow-md flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-4 mb-4">
                {/* Shield with syringe icon as on flyer */}
                <div className="w-16 h-16 rounded-full bg-blue-50 border-2 border-[#003882] flex items-center justify-center text-[#003882] flex-shrink-0 shadow-xs">
                  <Syringe className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-[#002f6c] tracking-tight uppercase font-display">
                    {t.clinicalVaccineTitle}
                  </h3>
                  <p className="text-sm font-bold text-slate-800 mt-0.5">
                    {t.clinicalVaccineDesc}
                  </p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {language === 'fr'
                  ? 'Maintenez une protection optimale contre les maladies infantiles contagieuses. Nous assurons la mise à jour des vaccins scolaires obligatoires, les rappels antitétaniques, la rougeole, la fièvre jaune et les méningites, sous conservation stricte de la chaîne du froid.'
                  : 'Maintain optimal protection against communicable childhood diseases. We provide mandatory school vaccination updates, catch-up doses, tetanus boosters, measles, yellow fever, and meningitis immunizations administered with rigorous cold-chain integrity.'}
              </p>

              <div className="mt-4 space-y-1.5 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>
                    {language === 'fr'
                      ? 'Conformité avec le Programme Élargi de Vaccination (PEV)'
                      : 'National Expanded Programme on Immunization (EPI) compliance'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>
                    {language === 'fr'
                      ? 'Vérification, visa et cachet sur carnet de vaccination officiel'
                      : 'Official vaccination booklet verification and stamping'}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                {language === 'fr' ? 'Vaccins de routine disponibles tous les jours' : 'Routine Vaccines Available Daily'}
              </span>
              <button
                onClick={() => onBookConsultation('Vaccination Service')}
                className="px-4 py-2 rounded-lg bg-[#003882] hover:bg-blue-900 text-white text-xs font-bold transition-colors cursor-pointer"
                id="book-vaccine-btn"
              >
                {language === 'fr' ? 'Réserver un vaccin' : 'Book Vaccine Update'}
              </button>
            </div>
          </div>

          {/* Card 2: Nutritional Support & Vitamins */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 hover:border-emerald-300 shadow-sm transition-all hover:shadow-md flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-4 mb-4">
                {/* Green pill jar icon as on flyer */}
                <div className="w-16 h-16 rounded-full bg-emerald-50 border-2 border-[#0e7c3a] flex items-center justify-center text-[#0e7c3a] flex-shrink-0 shadow-xs">
                  <Apple className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-[#002f6c] tracking-tight uppercase font-display">
                    {t.clinicalNutritionTitle}
                  </h3>
                  <p className="text-sm font-bold text-slate-800 mt-0.5">
                    {t.clinicalNutritionDesc}
                  </p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {language === 'fr'
                  ? 'Pour faire face aux exigences d’une nouvelle année académique, les enfants ont besoin d’un apport équilibré en micronutriments. Nos pharmaciens conseillent sur la stimulation de l’appétit, les Oméga-3 pour la concentration, le fer contre l’anémie et la Vitamine D3 + Calcium pour la croissance osseuse.'
                  : 'Children returning to demanding academic schedules need fortified micronutrients. Our certified pharmacists guide parents on appetite stimulation, Omega-3 brain support, iron therapy for anemia prevention, and Vitamin D3 + Calcium for bone development.'}
              </p>

              <div className="mt-4 space-y-1.5 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>
                    {language === 'fr'
                      ? 'Posologies pédiatriques personnalisées selon l’âge et le poids'
                      : 'Personalized age-graded syrup and chewable dosing'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>
                    {language === 'fr'
                      ? 'Huile de foie de morue, Zinc, Vitamine C, Lysine et multivitamines'
                      : 'Cod Liver Oil, Zinc, Vitamin C & Lysine selections'}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                {language === 'fr' ? 'Conseil du Pharmacien' : 'Pharmacist Guided'}
              </span>
              <button
                onClick={onExploreVitamins}
                className="px-4 py-2 rounded-lg bg-[#0e7c3a] hover:bg-emerald-800 text-white text-xs font-bold transition-colors cursor-pointer"
                id="explore-vitamins-btn"
              >
                {language === 'fr' ? 'Découvrir nos vitamines' : 'Shop Nutrition & Syrups'}
              </button>
            </div>
          </div>

        </div>

        {/* Doctor Banner from Flyer: Early Detection Message */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-blue-200 shadow-sm relative overflow-hidden mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            <div className="lg:col-span-8 flex items-start gap-4 sm:gap-5">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-blue-100 text-[#003882] flex items-center justify-center flex-shrink-0 border-2 border-blue-300">
                <Stethoscope className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs font-extrabold uppercase text-[#003882] tracking-wider">
                  {language === 'fr' ? 'Conseil Médical du Docteur' : "Doctor's Clinical Advisory"}
                </span>
                <blockquote className="text-base sm:text-xl font-bold text-slate-800 leading-snug mt-1">
                  {language === 'fr' ? (
                    <>
                      « Un dépistage précoce aujourd’hui évite de graves complications demain.{' '}
                      <span className="text-[#d81e27] font-black">
                        N’attendez pas que votre enfant tombe malade en classe. »
                      </span>
                    </>
                  ) : (
                    <>
                      "Early detection today can prevent bigger health problems tomorrow.{' '}
                      <span className="text-[#d81e27] font-black">
                        Don't wait until your child gets sick at school."
                      </span>
                    </>
                  )}
                </blockquote>
                <p className="text-xs sm:text-sm text-slate-500 mt-2">
                  {language === 'fr'
                    ? 'Un enfant souffrant de paludisme discret, de typhoïde sous-clinique ou d’anémie ne peut pas se concentrer sur les leçons au tableau. Offrons-lui un bilan clair avant la rentrée des classes.'
                    : 'A child suffering from untreated low-grade malaria, sub-clinical typhoid, or fatigue-inducing anemia cannot concentrate on blackboard lessons. Let us give them a clean bill of health before school resumes.'}
                </p>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <img
                  src={pharmacistImg}
                  alt="St. Stephen Pharmacist on duty"
                  className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-xs"
                  referrerPolicy="no-referrer"
                />
                <div className="text-xs">
                  <p className="font-bold text-slate-800">
                    {language === 'fr' ? 'Pharmacien diplômé sur place' : 'Licensed Pharmacist on Duty'}
                  </p>
                  <p className="text-slate-500">
                    {language === 'fr' ? 'Conseil gratuit pour les parents' : 'Free advice for all parents'}
                  </p>
                </div>
              </div>

              <a
                href={`tel:${HEALTH_CENTER_INFO.phones[0].replace(/\s+/g, '')}`}
                className="w-full py-3 rounded-xl bg-[#002f6c] hover:bg-[#001f47] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-colors text-center"
              >
                <PhoneCall className="w-4 h-4 text-amber-400" />
                <span>
                  {language === 'fr' ? 'Appelez le centre :' : 'Call Center:'} {HEALTH_CENTER_INFO.phones[0]}
                </span>
              </a>
            </div>

          </div>
        </div>

        {/* Red Brush Ribbon Banner matching Flyer: "ALL OUR SERVICES ARE OFFERED AT DISCOUNTED PRICES!" */}
        <div className="relative my-8 text-center" id="discount-banner-flyer">
          <div className="inline-block bg-[#d81e27] text-white px-6 sm:px-10 py-3.5 rounded-xl shadow-lg transform -rotate-1 hover:rotate-0 transition-transform">
            <p className="text-xs sm:text-sm font-semibold tracking-wider text-red-100 uppercase">
              {language === 'fr' ? 'Campagne Spéciale Rentrée Scolaire' : 'Limited Period Back-to-School Campaign'}
            </p>
            <h3 className="text-lg sm:text-2xl md:text-3xl font-black uppercase tracking-tight text-white font-display mt-0.5">
              {t.heroPromoRibbon}
            </h3>
            <span className="inline-block mt-1 text-xs sm:text-sm font-extrabold bg-[#002855] text-amber-300 px-3 py-1 rounded-full uppercase">
              {language === 'fr' ? 'Profitez-en dès maintenant !' : 'Take advantage now!'}
            </span>
          </div>
        </div>

        {/* St. Stephen Heart & Care Banner from flyer */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center flex-shrink-0">
              <UserCheck className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-bold text-emerald-950">
                {language === 'fr' ? '« Un enfant en bonne santé aujourd’hui, un avenir meilleur ! »' : 'A healthy child today, a better tomorrow!'}
              </p>
              <p className="text-xs text-emerald-800 font-semibold mt-0.5">
                {language === 'fr' ? 'Protégeons-les avant le début des cours.' : "Let's protect them before the school year begins."}
              </p>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-full bg-[#003882] text-white flex items-center justify-center flex-shrink-0">
              <Heart className="w-6 h-6 text-red-400 fill-red-400" />
            </div>
            <div>
              <p className="text-sm font-bold text-[#002f6c]">
                {language === 'fr'
                  ? 'Le Centre Médical St. Stephen vous aime et prend soin de vous !'
                  : HEALTH_CENTER_INFO.loveStatement}
              </p>
              <p className="text-xs text-blue-800 font-medium mt-0.5">
                {language === 'fr'
                  ? 'Terranova, Bonamekano • Dévoué à la santé de toute la communauté.'
                  : 'Terranova, Bonamekano • Dedicated to community wellbeing.'}
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
