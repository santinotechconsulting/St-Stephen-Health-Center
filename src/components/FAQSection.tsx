import React, { useState, useMemo } from 'react';
import {
  HelpCircle,
  ChevronDown,
  Search,
  FlaskConical,
  Truck,
  ShieldCheck,
  CreditCard,
  PhoneCall,
  MessageCircle,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Calendar,
} from 'lucide-react';
import { HEALTH_CENTER_INFO } from '../data/pharmacyData';
import { useLanguage } from '../utils/translations';

interface FAQItem {
  id: string;
  category: 'lab' | 'delivery' | 'insurance' | 'campaign';
  question: { en: string; fr: string };
  answer: { en: string; fr: string };
  highlights?: { en: string[]; fr: string[] };
}

export const FAQSection: React.FC = () => {
  const { t, language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<'all' | 'lab' | 'delivery' | 'insurance' | 'campaign'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [openIds, setOpenIds] = useState<string[]>(['faq-lab-1', 'faq-delivery-1', 'faq-ins-1']);

  const faqData: FAQItem[] = [
    // LAB PREPARATION
    {
      id: 'faq-lab-1',
      category: 'lab',
      question: {
        en: 'Does my child need to fast before the Back-to-School tests (Malaria, Typhoid, Electrophoresis)?',
        fr: "Mon enfant doit-il être à jeun avant les examens de rentrée scolaire (Paludisme, Typhoïde, Électrophorèse) ?",
      },
      answer: {
        en: 'No fasting is required for standard Back-to-School tests! Routine pediatric tests such as the Malaria rapid test, Typhoid screening, Blood Level (Hemoglobin), and Hemoglobin Electrophoresis (Sickle Cell) can be taken after a normal light meal and plenty of water.',
        fr: "Non, aucun jeûne n'est requis pour les examens de rentrée scolaire ! Les tests pédiatriques de routine comme le test rapide du paludisme, le dépistage de la typhoïde, le bilan sanguin (hémoglobine) et l'électrophorèse de l'hémoglobine (drépanocytose) peuvent être réalisés après un repas léger et une bonne hydratation en eau.",
      },
      highlights: {
        en: [
          'No fasting needed for Malaria, Typhoid, or Hemoglobin tests',
          'Keep your child well-hydrated with water to ensure easy and painless blood draws',
          'If a full fasting lipid or morning blood sugar test is specifically ordered by a doctor, 8-hour fasting is required',
        ],
        fr: [
          'Aucun jeûne nécessaire pour le paludisme, la typhoïde ou l’hémoglobine',
          'Hydratez bien votre enfant pour faciliter un prélèvement rapide et sans douleur',
          'Si une glycémie à jeun ou un bilan lipidique spécifique est demandé, un jeûne de 8h s’applique',
        ],
      },
    },
    {
      id: 'faq-lab-2',
      category: 'lab',
      question: {
        en: 'How do you collect samples from young or fearful children?',
        fr: 'Comment prélevez-vous les échantillons chez les jeunes enfants ou les enfants anxieux ?',
      },
      answer: {
        en: 'Our pediatric nurses at St. Stephen Health Center are specially trained in gentle, trauma-free blood sampling. For Malaria and Hemoglobin screening, we utilize painless micro-lancet fingerpricks. For tests requiring venous blood (such as Electrophoresis), we use ultra-fine pediatric butterfly needles in a welcoming, colorful child-friendly room.',
        fr: 'Nos infirmières pédiatriques à St. Stephen sont spécialement formées aux prélèvements doux et sans traumatisme. Pour le paludisme et l’hémoglobine, nous utilisons des micro-lancettes indolores au bout du doigt. Pour les prises de sang veineuses, nous utilisons des aiguilles papillon pédiatriques ultra-fines dans une salle accueillante et rassurante.',
      },
      highlights: {
        en: [
          'Ultra-fine pediatric butterfly needles and micro-lancets',
          'Calm, gentle nursing approach with parent present throughout',
          'Rewarding courage stickers given to every child after test completion',
        ],
        fr: [
          'Aiguilles papillons pédiatriques et micro-lancettes ultrafines',
          'Approche douce avec présence rassurante des parents',
          'Stickers de courage offerts à chaque enfant en fin d’examen',
        ],
      },
    },
    {
      id: 'faq-lab-3',
      category: 'lab',
      question: {
        en: 'How fast will we receive the laboratory results and school certificate?',
        fr: 'En combien de temps recevrons-nous les résultats du laboratoire et le certificat scolaire ?',
      },
      answer: {
        en: 'Speed and diagnostic accuracy are our hallmark in Bonamekano. Rapid diagnostic tests (Malaria RDT, Typhoid antigen, Hemoglobin count) are processed within 15 to 30 minutes while you wait. Hemoglobin Electrophoresis results are ready the same day (within 4 hours). If you book the Complete Back-to-School Bundle, you will leave with the fully stamped official medical fitness certificate.',
        fr: 'La rapidité et la précision diagnostique sont notre engagement à Bonamekano. Les tests rapides (Paludisme TDR, Typhoïde, Hémoglobine) sont délivrés en 15 à 30 minutes sur place. L’électrophorèse de l’hémoglobine est disponible le jour même (sous 4h). Avec le Pack Rentrée Scolaire, vous repartez avec le certificat médical dûment visé.',
      },
      highlights: {
        en: [
          'Rapid tests: 15–30 minutes while you wait in air-conditioned lobby',
          'Hemoglobin Electrophoresis: Same-day confirmation',
          'Results can also be transmitted confidentially via WhatsApp or PDF',
        ],
        fr: [
          'Tests rapides : 15 à 30 minutes en salle d’attente climatisée',
          'Électrophorèse de l’hémoglobine : délivrance le même jour',
          'Transmission confidentielle possible par WhatsApp ou PDF',
        ],
      },
    },
    {
      id: 'faq-lab-4',
      category: 'lab',
      question: {
        en: 'What should we bring with us on the day of the check-up?',
        fr: 'Que devons-nous apporter le jour du bilan de santé de l’enfant ?',
      },
      answer: {
        en: 'Please bring your child’s school medical fitness sheet (if provided by their school), their vaccination booklet (Carnet de Vaccination), and any previous laboratory slips or known allergy information. Walk-in patients are welcomed, or you can present your booking reference code.',
        fr: 'Veuillez apporter la fiche médicale fournie par l’école de votre enfant, son carnet de santé / vaccination, ainsi que les éventuelles ordonnances de traitements en cours ou antécédents allergiques.',
      },
      highlights: {
        en: [
          'School fitness questionnaire (if provided by institution)',
          'Child’s personal vaccination booklet (Carnet de santé)',
          'Any ongoing medications or doctor notes',
        ],
        fr: [
          'Fiche médicale de l’établissement scolaire (si remise)',
          'Carnet de santé et de vaccination de l’enfant',
          'Traitements réguliers ou ordonnances médicales antérieures',
        ],
      },
    },

    // DELIVERY & PICKUP
    {
      id: 'faq-delivery-1',
      category: 'delivery',
      question: {
        en: 'What areas in Bonamekano and Douala do you deliver to, and how fast is it?',
        fr: 'Quels quartiers de Bonamekano et Douala livrez-vous, et sous quel délai ?',
      },
      answer: {
        en: 'We provide express motorcycle and courier delivery throughout Terranova, Bonamekano, Akwa Nord, Deido, Bonamoussadi, and surrounding Douala neighborhoods. Emergency fever medications, antimalarials, and children’s syrups are prioritized and typically arrive at your doorstep within 30 to 60 minutes.',
        fr: 'Nous assurons une livraison express par coursier moto à Terranova, Bonamekano, Akwa Nord, Deïdo, Bonamoussadi et environs. Les traitements de premiers secours (fièvre, antipaludiques, sirops) sont prioritaires et livrés en 30 à 60 minutes à votre porte.',
      },
      highlights: {
        en: [
          'Express delivery within 30–60 minutes in Bonamekano & Terranova',
          'Flat delivery rate of only 1,000 FCFA within our local radius',
          'Dispatched directly from St. Stephen dispensary with tamper-proof packaging',
        ],
        fr: [
          'Livraison express en 30 à 60 min à Bonamekano et Terranova',
          'Tarif forfaitaire de seulement 1 000 FCFA dans le rayon local',
          'Expédié directement depuis l’officine St. Stephen sous emballage scellé',
        ],
      },
    },
    {
      id: 'faq-delivery-2',
      category: 'delivery',
      question: {
        en: 'How does clinic pickup work at St. Stephen Center in Terranova?',
        fr: 'Comment se passe le retrait au comptoir de la pharmacie à Terranova ?',
      },
      answer: {
        en: 'Counter pickup is completely free! Once you place an order online or upload your doctor’s prescription, our pharmacist will assemble and double-check your medicines. You will receive an instant notification, and your order will be ready at our express pickup counter in Terranova, Bonamekano in under 15 minutes.',
        fr: 'Le retrait au comptoir est totalement gratuit ! Dès validation de votre commande ou réception de votre ordonnance, notre pharmacien prépare vos médicaments en moins de 15 minutes. Vos produits sont prêts sans attente au guichet express de Terranova.',
      },
      highlights: {
        en: [
          'Ready in under 15 minutes at Terranova dispensary counter',
          'No waiting in regular pharmacy lines',
          'Personal counseling on medication dosage provided by on-duty pharmacist',
        ],
        fr: [
          'Prêt en moins de 15 minutes au comptoir de Terranova',
          'Aucune file d’attente générale',
          'Conseil posologique personnalisé délivré par le pharmacien de garde',
        ],
      },
    },
    {
      id: 'faq-delivery-3',
      category: 'delivery',
      question: {
        en: 'How do you ensure safe temperature handling (Cold-Chain) during delivery?',
        fr: 'Comment garantissez-vous le respect de la chaîne du froid pour les vaccins et sirops ?',
      },
      answer: {
        en: 'All thermolabile medications—including childhood vaccines, insulin, and reconstituted suspensions—are transported in certified medical cold boxes with temperature monitoring ice-packs. Our delivery team is trained to maintain pharmaceutical integrity from dispensary shelf to your home.',
        fr: 'Tous les produits thermosensibles (vaccins infantiles, insulines, suspensions antibiotiques) voyagent dans des glacières médicales certifiées avec accumulateurs de froid. Notre protocole garantit 100% de la biodisponibilité et de la qualité des molécules.',
      },
      highlights: {
        en: [
          'Certified medical cool boxes with thermal insulation',
          'Ensures vaccines and active syrups maintain 100% biological potency',
          'Strict batch tracking and verification upon delivery receipt',
        ],
        fr: [
          'Glacières isothermes médicales avec pack de froid régulé',
          'Préservation intégrale de l’activité biologique des vaccins et sirops',
          'Traçabilité stricte des lots et remise en mains propres',
        ],
      },
    },

    // INSURANCE & PAYMENT
    {
      id: 'faq-ins-1',
      category: 'insurance',
      question: {
        en: 'Which health insurance policies and mutual funds (mutuelles) are accepted?',
        fr: 'Quelles sont les assurances santé et mutuelles d’entreprises acceptées ?',
      },
      answer: {
        en: 'St. Stephen Health Center works with major private health insurance networks, corporate mutuelles, and school medical coverage plans across Cameroon. We provide official stamped fee slips (Bons de prise en charge) and normalized medical receipts for reimbursement with providers including Ascoma, Activa, SAHAM/Sanlam, Gras Savoye, Chanas, and corporate staff plans.',
        fr: 'Le Centre Médical St. Stephen collabore avec les principaux réseaux d’assurance et mutuelles au Cameroun : Ascoma, Activa, Sanlam/SAHAM, Gras Savoye, Chanas et mutuelles d’entreprises. Nous fournissons des factures normalisées et feuilles de soins officielles pour remboursement.',
      },
      highlights: {
        en: [
          'Accepted: Ascoma, Activa, Sanlam/SAHAM, Gras Savoye, and private mutuelles',
          'Normalized receipt and official medical stamp provided for every consultation',
          'Direct billing assistance available for registered partner companies',
        ],
        fr: [
          'Partenaires : Ascoma, Activa, Sanlam/SAHAM, Gras Savoye, Chanas, Mutuelles',
          'Facture normalisée avec cachet médical certifié fournie systématiquement',
          'Assistance directe pour la prise en charge des entreprises conventionnées',
        ],
      },
    },
    {
      id: 'faq-ins-2',
      category: 'insurance',
      question: {
        en: 'What payment methods can I use at the pharmacy and clinic?',
        fr: 'Quels sont les moyens de paiement acceptés à la clinique et en pharmacie ?',
      },
      answer: {
        en: 'We offer maximum payment convenience for local families and relatives abroad supporting students. You can pay via MTN Mobile Money (MoMo), Orange Money, Cash in Central African CFA Francs (FCFA), and major debit/credit cards (Visa/Mastercard). Online cart checkout can also be finalized through WhatsApp dispatch.',
        fr: 'Nous offrons tous les modes de règlement pour faciliter le quotidien des familles : MTN Mobile Money (MoMo), Orange Money, Espèces en Francs CFA (FCFA) et cartes bancaires (Visa/Mastercard). Les commandes en ligne peuvent aussi être validées via WhatsApp.',
      },
      highlights: {
        en: [
          'Mobile Money: MTN MoMo & Orange Money instant transfers',
          'Cash payment at clinic reception or Cash on Delivery (COD)',
          'Card terminal available at dispensary counter',
        ],
        fr: [
          'Mobile Money : paiements instantanés MTN MoMo & Orange Money',
          'Espèces acceptées à l’accueil ou Paiement à la Livraison',
          'Terminal de carte bancaire disponible au comptoir de Terranova',
        ],
      },
    },
    {
      id: 'faq-ins-3',
      category: 'insurance',
      question: {
        en: 'Are the discounted Back-to-School prices eligible for insurance reimbursement?',
        fr: 'Les tarifs réduits de la campagne de rentrée sont-ils éligibles au remboursement assurance ?',
      },
      answer: {
        en: 'Yes! Even when you benefit from our subsidized Back-to-School promotional rates (such as the Complete Bundle for 12,500 FCFA instead of 20,000 FCFA), we issue a comprehensive, accredited itemized medical invoice that can be submitted to your insurance or employer for reimbursement.',
        fr: 'Oui, sans aucune restriction ! Même en profitant de nos tarifs subventionnés de rentrée (Pack Complet à 12 500 FCFA au lieu de 20 000 FCFA), nous vous remettons une facture détaillée avec visa médical reconnue par les compagnies d’assurance et comités d’entreprise.',
      },
      highlights: {
        en: [
          'Itemized diagnostic breakdown per Ministry of Public Health standards',
          'Includes physician registration and laboratory license numbers',
          'Zero extra fees for medical certification paperwork',
        ],
        fr: [
          'Détail des actes conforme aux normes du Ministère de la Santé Publique',
          'Numéro d’ordre des médecins et agrément de laboratoire inclus',
          'Aucun frais supplémentaire pour l’établissement des certificats',
        ],
      },
    },

    // CAMPAIGN & SCHOOL FIT
    {
      id: 'faq-camp-1',
      category: 'campaign',
      question: {
        en: 'Is the Back-to-School health certificate officially recognized by schools?',
        fr: 'Le certificat médical délivré est-il officiellement reconnu par les établissements scolaires ?',
      },
      answer: {
        en: 'Yes, 100%. St. Stephen Health Center is an accredited facility in the Aire de santé de Bonamekano. Our health check-up certificates bear the official medical practitioner stamp, laboratory accreditation, and physical fitness clearance recognized by public, private, and international schools throughout Cameroon.',
        fr: 'Oui, à 100%. Le Centre Médical St. Stephen est un établissement accrédité de l’Aire de santé de Bonamekano. Nos certificats médicaux comportent le cachet de notre praticien, le visa du laboratoire et l’attestation d’aptitude physique exigée par toutes les écoles primaires, secondaires et collèges bilingues.',
      },
      highlights: {
        en: [
          'Accredited by Aire de santé de Bonamekano healthcare administration',
          'Accepted by nursery, primary, secondary, and bilingual colleges',
          'Includes vision, physical readiness, and biological screening confirmation',
        ],
        fr: [
          'Reconnu par les autorités de l’Aire de santé de Bonamekano',
          'Valable pour les écoles maternelles, primaires, collèges et lycées',
          'Atteste de l’examen clinique, de la vision et des bilans biologiques',
        ],
      },
    },
  ];

  const toggleFAQ = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredFAQs = useMemo(() => {
    return faqData.filter((item) => {
      const matchesCat = activeCategory === 'all' || item.category === activeCategory;
      const q = item.question[language];
      const a = item.answer[language];
      const h = item.highlights?.[language] || [];

      const matchesSearch =
        searchQuery === '' ||
        q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.toLowerCase().includes(searchQuery.toLowerCase()) ||
        h.some((hl) => hl.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCat && matchesSearch;
    });
  }, [activeCategory, searchQuery, language]);

  const categories = [
    { id: 'all', label: t.faqCatAll, icon: HelpCircle },
    { id: 'lab', label: t.faqCatLab, icon: FlaskConical },
    { id: 'delivery', label: t.faqCatDelivery, icon: Truck },
    { id: 'insurance', label: t.faqCatInsurance, icon: CreditCard },
    { id: 'campaign', label: t.faqCatCampaign, icon: ShieldCheck },
  ];

  return (
    <section id="faq" className="py-12 sm:py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-[#002f6c] text-xs font-bold uppercase tracking-wider mb-2">
            <HelpCircle className="w-3.5 h-3.5 text-blue-700" />
            <span>{t.faqBadge}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#002f6c] tracking-tight uppercase font-display">
            {t.faqTitle}
          </h2>

          <p className="text-sm text-slate-600 mt-2 max-w-2xl mx-auto">
            {t.faqSubtitle}
          </p>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="max-w-4xl mx-auto mb-8 space-y-4">
          
          {/* Search Box */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.faqSearchPlaceholder}
              className="w-full pl-11 pr-4 py-3 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#002f6c] focus:bg-white shadow-2xs font-medium"
              id="faq-search-input"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500 hover:text-slate-800 bg-slate-200 px-2 py-0.5 rounded-md cursor-pointer"
              >
                {t.faqClearSearch}
              </button>
            )}
          </div>

          {/* Category Pills */}
          <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id as any)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#002f6c] text-white shadow-sm'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                  id={`faq-cat-btn-${cat.id}`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

        </div>

        {/* FAQ Accordion List */}
        <div className="max-w-4xl mx-auto space-y-3.5">
          {filteredFAQs.length === 0 ? (
            <div className="text-center py-12 bg-slate-50 rounded-2xl border border-slate-200 p-6">
              <HelpCircle className="w-10 h-10 text-slate-400 mx-auto mb-2" />
              <p className="font-bold text-slate-700 text-base">
                {language === 'fr'
                  ? `Aucun résultat trouvé pour « ${searchQuery} »`
                  : `No answers found for "${searchQuery}"`}
              </p>
              <p className="text-xs text-slate-500 mt-1">
                {language === 'fr'
                  ? `Vous pouvez contacter notre pharmacien de garde au ${HEALTH_CENTER_INFO.phones[0]} pour une aide directe.`
                  : `You can call our duty pharmacist at ${HEALTH_CENTER_INFO.phones[0]} for direct personal assistance.`}
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                }}
                className="mt-3 px-4 py-2 bg-[#002f6c] text-white text-xs font-bold rounded-lg cursor-pointer"
              >
                {language === 'fr' ? 'Réinitialiser la recherche' : 'Reset Search'}
              </button>
            </div>
          ) : (
            filteredFAQs.map((faq) => {
              const isOpen = openIds.includes(faq.id);
              const qText = faq.question[language];
              const aText = faq.answer[language];
              const highlightsList = faq.highlights?.[language] || [];

              return (
                <div
                  key={faq.id}
                  className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? 'border-blue-300 bg-blue-50/20 shadow-xs'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                  id={faq.id}
                >
                  {/* Accordion Trigger */}
                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                          faq.category === 'lab'
                            ? 'bg-emerald-100 text-emerald-800'
                            : faq.category === 'delivery'
                            ? 'bg-blue-100 text-blue-800'
                            : faq.category === 'insurance'
                            ? 'bg-amber-100 text-amber-900'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {faq.category === 'lab' ? '🔬' : faq.category === 'delivery' ? '🚚' : faq.category === 'insurance' ? '🛡️' : '🎒'}
                      </div>
                      <span className="font-bold text-slate-900 text-sm sm:text-base leading-snug">
                        {qText}
                      </span>
                    </div>

                    <div
                      className={`p-1 rounded-full text-slate-400 transform transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#002f6c]' : ''
                      }`}
                    >
                      <ChevronDown className="w-5 h-5" />
                    </div>
                  </button>

                  {/* Accordion Body */}
                  {isOpen && (
                    <div className="px-4 pb-5 sm:px-5 sm:pb-5 pt-0 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-100">
                      <p className="mt-3 text-slate-700">{aText}</p>

                      {highlightsList.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-slate-100 space-y-1.5">
                          <p className="text-[11px] font-bold text-slate-900 uppercase tracking-wider">
                            {t.faqKeyDetails}
                          </p>
                          {highlightsList.map((h, i) => (
                            <div key={i} className="flex items-start gap-2 text-xs text-slate-600">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                              <span>{h}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Quick Contact Box directly under FAQs */}
        <div className="max-w-4xl mx-auto mt-10 p-6 rounded-2xl bg-gradient-to-r from-[#002855] via-[#003882] to-[#002855] text-white shadow-md flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2 text-amber-300 text-xs font-bold uppercase mb-1">
              <Sparkles className="w-4 h-4" />
              <span>{language === 'fr' ? 'Permanence Pharmaceutique' : 'Dedicated Pharmacist Support'}</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold font-display text-white">
              {t.faqPharmacistSupportTitle}
            </h3>
            <p className="text-xs text-blue-200 mt-0.5">
              {t.faqPharmacistSupportDesc}
            </p>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0 w-full sm:w-auto justify-center">
            <a
              href={`tel:${HEALTH_CENTER_INFO.phones[0].replace(/\s+/g, '')}`}
              className="px-4 py-2.5 rounded-xl bg-white text-[#002855] hover:bg-blue-50 font-bold text-xs flex items-center gap-1.5 shadow-xs transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5 text-red-600" />
              <span>{t.faqCallHotline}</span>
            </a>

            <a
              href={`https://wa.me/${HEALTH_CENTER_INFO.whatsapp}?text=Hello%20St.%20Stephen%20Health%20Center`}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>{t.faqWhatsappUs}</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
