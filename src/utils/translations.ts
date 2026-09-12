import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '../types';

export interface Translations {
  // Common
  langName: string;
  currencyLabel: string;
  xafUnit: string;
  close: string;
  cancel: string;
  confirm: string;
  back: string;
  submit: string;
  loading: string;
  required: string;
  free: string;

  // Header & Top bar
  topBannerCampaign: string;
  uploadRxNav: string;
  bookCheckupNav: string;
  askPharmacistNav: string;
  cart: string;
  cartEmpty: string;
  items: string;
  item: string;
  navCampaign: string;
  navLabTests: string;
  navPharmacy: string;
  navClinical: string;
  navTrackOrder: string;
  navFaq: string;
  navContact: string;

  // Hero
  heroBadge: string;
  heroHeadline: string;
  heroSubheadline: string;
  heroDescription: string;
  heroBookBtn: string;
  heroExploreBtn: string;
  heroUploadRxBtn: string;
  heroFeatureSameDay: string;
  heroFeatureGentle: string;
  heroFeatureCertified: string;
  heroPromoRibbon: string;

  // Laboratory Section
  labSubtitle: string;
  labTitle: string;
  labDescription: string;
  labAllDiscountRibbon: string;
  labTurnaround: string;
  labSampleType: string;
  labBookTest: string;
  labAddToCart: string;
  labPackageBadge: string;
  labPackageTitle: string;
  labPackageDesc: string;
  labPackageSave: string;
  labPackageBookBtn: string;
  labPackageIncludeTitle: string;
  labOfficialStampNote: string;

  // Tests Info
  malariaTitle: string;
  malariaDesc: string;
  typhoidTitle: string;
  typhoidDesc: string;
  hepatitisTitle: string;
  hepatitisDesc: string;
  bloodLevelTitle: string;
  bloodLevelDesc: string;
  electrophoresisTitle: string;
  electrophoresisDesc: string;

  // Recommender
  recBadge: string;
  recTitle: string;
  recSubtitle: string;
  recScenarioMatch: string;
  recDoctorProtocol: string;
  recClinicalAssessment: string;
  recNextStep: string;
  recBookBundle: string;

  // Clinical
  clinicalBadge: string;
  clinicalTitle: string;
  clinicalSubtitle: string;
  clinicalVaccineTitle: string;
  clinicalVaccineDesc: string;
  clinicalVaccineBtn: string;
  clinicalNutritionTitle: string;
  clinicalNutritionDesc: string;
  clinicalNutritionBtn: string;
  clinicalAdvisoryTitle: string;
  clinicalAdvisoryQuote: string;
  clinicalAdvisorySubtitle: string;

  // Pharmacy Catalog
  pharmacyBadge: string;
  pharmacyTitle: string;
  pharmacySubtitle: string;
  pharmacySearchPlaceholder: string;
  pharmacyCatAll: string;
  pharmacyCatPediatric: string;
  pharmacyCatVitamins: string;
  pharmacyCatFirstAid: string;
  pharmacyCatEssentials: string;
  pharmacyCatMaternal: string;
  pharmacyFilterRxOnly: string;
  pharmacyShowing: string;
  pharmacyPrescriptionRequired: string;
  pharmacyOtc: string;
  pharmacyInStock: string;
  pharmacyOutOfStock: string;
  pharmacyActiveIngredients: string;
  pharmacyDosage: string;
  pharmacyAddToCartBtn: string;
  pharmacyNeedHelpTitle: string;
  pharmacyNeedHelpDesc: string;
  pharmacyUploadRxBtn: string;

  // FAQ
  faqBadge: string;
  faqTitle: string;
  faqSubtitle: string;
  faqSearchPlaceholder: string;
  faqClearSearch: string;
  faqCatAll: string;
  faqCatLab: string;
  faqCatDelivery: string;
  faqCatInsurance: string;
  faqCatCampaign: string;
  faqKeyDetails: string;
  faqPharmacistSupportTitle: string;
  faqPharmacistSupportDesc: string;
  faqCallHotline: string;
  faqWhatsappUs: string;

  // Cart Drawer
  cartDrawerTitle: string;
  cartClearAll: string;
  cartFulfillmentMethod: string;
  cartTerranovaPickup: string;
  cartHomeCourier: string;
  cartDeliveryFeeNote: string;
  cartSubtotal: string;
  cartDeliveryFee: string;
  cartTotal: string;
  cartNamePlaceholder: string;
  cartPhonePlaceholder: string;
  cartAddressPlaceholder: string;
  cartQuickOrderWhatsapp: string;
  cartConfirmOrderBtn: string;
  cartOrderReceivedTitle: string;
  cartOrderReceivedDesc: string;
  cartSendToWhatsapp: string;
  cartStartNewOrder: string;

  // Booking Modal
  bookingModalTitle: string;
  bookingModalSubtitle: string;
  bookingSelectService: string;
  bookingChildName: string;
  bookingChildAge: string;
  bookingParentName: string;
  bookingPhone: string;
  bookingDate: string;
  bookingTimeSlot: string;
  bookingNotes: string;
  bookingPriceSummary: string;
  bookingSubmitBtn: string;
  bookingConfirmedTitle: string;
  bookingConfirmedDesc: string;
  bookingReferenceCode: string;

  // Prescription Upload Modal
  rxModalTitle: string;
  rxModalSubtitle: string;
  rxUploadZoneTitle: string;
  rxUploadZoneHint: string;
  rxFileSelected: string;
  rxChangePhoto: string;
  rxPatientName: string;
  rxPhone: string;
  rxFulfillmentPreference: string;
  rxFulfillmentPickup: string;
  rxFulfillmentDelivery: string;
  rxDeliveryAddress: string;
  rxDoctorNotes: string;
  rxSubmitBtn: string;
  rxSuccessTitle: string;
  rxSuccessDesc: string;

  // Order Tracker
  trackerBadge: string;
  trackerTitle: string;
  trackerSubtitle: string;
  trackerInputPlaceholder: string;
  trackerBtn: string;
  trackerFilterAll: string;
  trackerFilterLab: string;
  trackerFilterPharmacy: string;
  trackerSampleOrdersHint: string;
  trackerOrderNotFound: string;
  trackerNotFoundDesc: string;
  trackerOrderStatus: string;
  trackerProgressTimeline: string;
  trackerOrderDetails: string;
  trackerPatient: string;
  trackerSpecimenType: string;
  trackerLabDoctor: string;
  trackerOfficialResults: string;
  trackerDownloadCertificate: string;
  trackerDeliveryCourier: string;
  trackerDeliveryAddress: string;
  trackerItemsOrdered: string;
  trackerPaymentMethod: string;
  trackerWhatsappHelp: string;

  // Footer
  footerCommunityTrust: string;
  footerTestimonialHeading: string;
  footerAboutText: string;
  footerMottoTitle: string;
  footerQuickLinksTitle: string;
  footerHoursTitle: string;
  footerMonFri: string;
  footerSat: string;
  footerEmergencyNote: string;
  footerTerranovaAddress: string;
  footerSloganText: string;
  footerDisclaimerText: string;
  footerAllRights: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    langName: 'English',
    currencyLabel: 'Currency',
    xafUnit: 'FCFA',
    close: 'Close',
    cancel: 'Cancel',
    confirm: 'Confirm',
    back: 'Back',
    submit: 'Submit',
    loading: 'Loading...',
    required: 'Required',
    free: 'Free',

    // Header
    topBannerCampaign: 'Back-to-School Health Campaign (24th – 31st August) • Subsidized Laboratory Tests in Terranova, Bonamekano',
    uploadRxNav: 'Upload Prescription',
    bookCheckupNav: 'Book Check-Up',
    askPharmacistNav: 'Ask Pharmacist',
    cart: 'Cart',
    cartEmpty: 'Your cart is empty',
    items: 'items',
    item: 'item',
    navCampaign: 'Back-to-School',
    navLabTests: 'Laboratory Tests',
    navPharmacy: 'Pharmacy Dispensary',
    navClinical: 'Vaccines & Nutrition',
    navTrackOrder: 'Order & Results Tracker',
    navFaq: 'FAQ',
    navContact: 'Hours & Location',

    // Hero
    heroBadge: '24th – 31st August • Come one, come all!',
    heroHeadline: 'BACK-TO-SCHOOL HEALTH CHECK-UP!',
    heroSubheadline: 'Give your child the best start to a successful school year – in good health!',
    heroDescription: 'Before your child returns to school, make sure they are in good health. A healthy child learns better, stays focused and avoids illnesses.',
    heroBookBtn: 'Book Health Check-Up',
    heroExploreBtn: 'Explore Pharmacy Catalog',
    heroUploadRxBtn: 'Upload Doctor Prescription',
    heroFeatureSameDay: 'Fast Same-Day Results',
    heroFeatureGentle: 'Gentle Pediatric Sampling',
    heroFeatureCertified: 'Certified Pharmacists & Lab',
    heroPromoRibbon: 'ALL OUR SERVICES ARE OFFERED AT DISCOUNTED PRICES! Take advantage now!',

    // Laboratory Section
    labSubtitle: 'St. Stephen Diagnostic Laboratory • Bonamekano',
    labTitle: 'LABORATORY TESTS WE OFFER',
    labDescription: 'Conducted according to professional medical standards to detect silent infections before school starts.',
    labAllDiscountRibbon: 'ALL TESTS SUBSIDIZED FOR BACK-TO-SCHOOL PROMOTION',
    labTurnaround: 'Result in:',
    labSampleType: 'Sample:',
    labBookTest: 'Book This Test',
    labAddToCart: 'Add Test to Cart',
    labPackageBadge: 'Most Popular for School Resumption',
    labPackageTitle: 'Complete Back-to-School Health Bundle',
    labPackageDesc: 'All 5 tests (Malaria, Typhoid, Hepatitis, Blood Level & Sickle Cell) + Pediatric physical evaluation + Official stamped school fitness clearance certificate.',
    labPackageSave: 'SAVE 38%',
    labPackageBookBtn: 'Book Complete Health Bundle',
    labPackageIncludeTitle: 'Includes All 5 Tests & Certified Clearance:',
    labOfficialStampNote: 'Includes official stamped medical certificate required by primary and secondary schools.',

    // Tests Info
    malariaTitle: 'Malaria Test',
    malariaDesc: 'To check if your child has malaria.',
    typhoidTitle: 'Typhoid Test',
    typhoidDesc: 'To detect typhoid infection.',
    hepatitisTitle: 'Hepatitis Screening',
    hepatitisDesc: 'To detect viral infections of the liver.',
    bloodLevelTitle: 'Blood Level / Hemoglobin',
    bloodLevelDesc: "To check your child's blood level and ensure it is normal according to their age.",
    electrophoresisTitle: 'Hemoglobin Electrophoresis',
    electrophoresisDesc: 'To determine the type of hemoglobin of your child (sickle cell or not), so we can help prevent possible future complications.',

    // Recommender
    recBadge: 'Interactive Parent Guide',
    recTitle: 'WHICH TESTS DOES YOUR CHILD NEED?',
    recSubtitle: "Select your child's current health status or school requirement to receive instant diagnostic guidance.",
    recScenarioMatch: 'Scenario Match:',
    recDoctorProtocol: 'Doctor Protocol',
    recClinicalAssessment: 'Clinical Assessment:',
    recNextStep: 'Recommended Next Step:',
    recBookBundle: 'Book Complete Back-to-School Bundle',

    // Clinical
    clinicalBadge: 'Clinical Healthcare & Preventive Care',
    clinicalTitle: 'VACCINATION & NUTRITIONAL SUPPORT',
    clinicalSubtitle: 'Holistic healthcare to ensure complete physical readiness, mental energy, and disease immunity for school.',
    clinicalVaccineTitle: 'Vaccination Services',
    clinicalVaccineDesc: 'Update of recommended vaccines to protect your child.',
    clinicalVaccineBtn: 'Schedule Immunization',
    clinicalNutritionTitle: 'Nutritional Support & Vitamins',
    clinicalNutritionDesc: 'To boost immunity and promote healthy growth.',
    clinicalNutritionBtn: 'Explore Child Vitamins',
    clinicalAdvisoryTitle: "Doctor's Advisory Notice",
    clinicalAdvisoryQuote: "Early detection today can prevent bigger health problems tomorrow. Don't wait until your child gets sick at school.",
    clinicalAdvisorySubtitle: 'Consult our clinical officers for personalized check-ups before the resumption rush.',

    // Pharmacy Catalog
    pharmacyBadge: 'Official Dispensary • Terranova, Bonamekano',
    pharmacyTitle: 'PHARMACY DISPENSARY & ESSENTIAL MEDICINES',
    pharmacySubtitle: 'Genuine pediatric syrups, preventive supplements, antibiotics, and first-aid kits verified by licensed pharmacists.',
    pharmacySearchPlaceholder: 'Search medicine by name, symptom or active ingredient...',
    pharmacyCatAll: 'All Products',
    pharmacyCatPediatric: 'Pediatric Suspensions',
    pharmacyCatVitamins: 'Vitamins & Growth',
    pharmacyCatFirstAid: 'First Aid & Diagnostics',
    pharmacyCatEssentials: 'Essential Medicines',
    pharmacyCatMaternal: 'Maternal Care',
    pharmacyFilterRxOnly: 'Show Rx only',
    pharmacyShowing: 'Showing',
    pharmacyPrescriptionRequired: 'Prescription Required',
    pharmacyOtc: 'Over the Counter (OTC)',
    pharmacyInStock: 'In Stock',
    pharmacyOutOfStock: 'Out of Stock',
    pharmacyActiveIngredients: 'Active:',
    pharmacyDosage: 'Dosage:',
    pharmacyAddToCartBtn: 'Add to Cart',
    pharmacyNeedHelpTitle: 'Have a Doctor Prescription Slip?',
    pharmacyNeedHelpDesc: 'Take a clear photograph of your prescription. Our pharmacists will review, prepare the exact dosages, and deliver to your home in Bonamekano.',
    pharmacyUploadRxBtn: 'Upload Prescription Photo',

    // FAQ
    faqBadge: 'Frequently Asked Questions',
    faqTitle: 'HELP & CLINICAL GUIDANCE',
    faqSubtitle: 'Everything you need to know about preparing your child for tests, home medicine delivery, insurance coverage, and official school medical certification.',
    faqSearchPlaceholder: 'Search by topic: fasting, delivery time, insurance, mobile money, sickle cell...',
    faqClearSearch: 'Clear',
    faqCatAll: 'All Questions',
    faqCatLab: 'Lab Preparation',
    faqCatDelivery: 'Delivery & Pickup',
    faqCatInsurance: 'Insurance & Payment',
    faqCatCampaign: 'School Certificate',
    faqKeyDetails: 'Key Details:',
    faqPharmacistSupportTitle: 'Still have questions about testing or medicine availability?',
    faqPharmacistSupportDesc: 'Speak directly with our on-duty medical and pharmacy team at Terranova, Bonamekano.',
    faqCallHotline: 'Call Hotline',
    faqWhatsappUs: 'WhatsApp Us',

    // Cart Drawer
    cartDrawerTitle: 'Your Health & Pharmacy Cart',
    cartClearAll: 'Clear All',
    cartFulfillmentMethod: 'Fulfillment Method',
    cartTerranovaPickup: 'Terranova Pickup',
    cartHomeCourier: 'Home Courier',
    cartDeliveryFeeNote: '+1,000 FCFA',
    cartSubtotal: 'Subtotal:',
    cartDeliveryFee: 'Delivery Fee (Bonamekano):',
    cartTotal: 'Total:',
    cartNamePlaceholder: 'Your Name *',
    cartPhonePlaceholder: 'Phone number (+237...)*',
    cartAddressPlaceholder: 'Delivery location / Landmark in Bonamekano *',
    cartQuickOrderWhatsapp: 'Quick Order on WhatsApp (+237 670 650 999)',
    cartConfirmOrderBtn: 'Confirm Order (Pay on Delivery/Pickup)',
    cartOrderReceivedTitle: 'Order Received!',
    cartOrderReceivedDesc: 'Your order is currently being packed by our dispensary staff. You can also send this summary directly to WhatsApp for real-time delivery coordination.',
    cartSendToWhatsapp: 'Send Order to WhatsApp Dispatch',
    cartStartNewOrder: 'Start New Order',

    // Booking Modal
    bookingModalTitle: 'Book Laboratory Test / Check-Up',
    bookingModalSubtitle: 'St. Stephen Health Center • Terranova, Bonamekano',
    bookingSelectService: 'Select Test or Package *',
    bookingChildName: "Child / Patient's Full Name *",
    bookingChildAge: "Child's Age (e.g. 7 years) *",
    bookingParentName: "Parent / Guardian Name *",
    bookingPhone: 'WhatsApp / Phone Number *',
    bookingDate: 'Preferred Date *',
    bookingTimeSlot: 'Preferred Time Slot *',
    bookingNotes: 'Special Health Notes or Allergies (Optional)',
    bookingPriceSummary: 'Total Fee (Pay at Center):',
    bookingSubmitBtn: 'Confirm Laboratory Appointment',
    bookingConfirmedTitle: 'Appointment Confirmed!',
    bookingConfirmedDesc: 'We have reserved your slot at St. Stephen Diagnostic Laboratory. Please arrive 10 minutes before your time slot.',
    bookingReferenceCode: 'Reference Code:',

    // Prescription Upload Modal
    rxModalTitle: 'Upload Doctor Prescription',
    rxModalSubtitle: 'Fast review & accurate preparation by licensed pharmacists',
    rxUploadZoneTitle: 'Click or drag prescription photo here',
    rxUploadZoneHint: 'JPEG, PNG, or PDF up to 10MB. Ensure patient name and medicine dosage are legible.',
    rxFileSelected: 'File selected:',
    rxChangePhoto: 'Change Photo',
    rxPatientName: 'Patient Name *',
    rxPhone: 'Phone / WhatsApp Number *',
    rxFulfillmentPreference: 'Fulfillment Preference *',
    rxFulfillmentPickup: 'Counter Pickup (Terranova)',
    rxFulfillmentDelivery: 'Home Delivery (Bonamekano)',
    rxDeliveryAddress: 'Delivery Address & Landmark *',
    rxDoctorNotes: 'Doctor instructions, brand preferences, or allergies (Optional)',
    rxSubmitBtn: 'Submit Prescription to Pharmacist',
    rxSuccessTitle: 'Prescription Submitted!',
    rxSuccessDesc: 'Our pharmacists have received your prescription and are verifying dosage and medicine stock. We will call you shortly on WhatsApp/Phone.',

    // Order Tracker
    trackerBadge: 'Live Diagnostic & Dispensary Tracking',
    trackerTitle: 'Track Pharmacy Order & Lab Results',
    trackerSubtitle: 'Check the real-time status of your medicine home delivery or download official medical laboratory analysis certificates with your reference number.',
    trackerInputPlaceholder: 'Enter Order # (e.g. ST-LAB-4821 or ST-ORD-88231)...',
    trackerBtn: 'Track Status',
    trackerFilterAll: 'All Orders',
    trackerFilterLab: 'Lab Diagnostic Results',
    trackerFilterPharmacy: 'Pharmacy Deliveries',
    trackerSampleOrdersHint: 'Quick demo samples to test:',
    trackerOrderNotFound: 'No Record Found for this Reference',
    trackerNotFoundDesc: 'Please check your receipt or WhatsApp message for the correct ST- reference code, or contact our Terranova front desk for instant lookup.',
    trackerOrderStatus: 'Current Status',
    trackerProgressTimeline: 'Fulfillment & Diagnostic Milestones',
    trackerOrderDetails: 'Order & Patient Information',
    trackerPatient: 'Patient / Customer',
    trackerSpecimenType: 'Sample / Specimen',
    trackerLabDoctor: 'Supervising Biologist',
    trackerOfficialResults: 'Official Laboratory Findings',
    trackerDownloadCertificate: 'View / Print Medical Certificate',
    trackerDeliveryCourier: 'Motorcycle Courier Dispatch',
    trackerDeliveryAddress: 'Delivery Address & Landmark',
    trackerItemsOrdered: 'Medications Dispensed',
    trackerPaymentMethod: 'Payment Terms',
    trackerWhatsappHelp: 'Contact Dispatch on WhatsApp',

    // Footer
    footerCommunityTrust: 'Community Trust • Aire de santé de BONAMEKANO',
    footerTestimonialHeading: 'Loved by Parents & Schools in Terranova',
    footerAboutText: 'St. Stephen Health Center & Pharmacy is the accredited primary healthcare and laboratory diagnostic facility serving Terranova and the greater Aire de santé de Bonamekano.',
    footerMottoTitle: 'Our Motto',
    footerQuickLinksTitle: 'Healthcare Services',
    footerHoursTitle: 'Facility Hours & Location',
    footerMonFri: 'Monday – Friday: 7:30 AM – 8:30 PM',
    footerSat: 'Saturday: 8:00 AM – 7:00 PM',
    footerEmergencyNote: 'Emergency On-Call: 24/7 Service Available',
    footerTerranovaAddress: 'Terranova, Bonamekano (Beside Carrefour)',
    footerSloganText: 'Together for healthy, strong and ready to learn children!',
    footerDisclaimerText: 'Our tests and vaccinations are carried out according to professional medical standards and after proper assessment.',
    footerAllRights: 'All rights reserved.',
  },

  fr: {
    langName: 'Français',
    currencyLabel: 'Devise',
    xafUnit: 'FCFA',
    close: 'Fermer',
    cancel: 'Annuler',
    confirm: 'Confirmer',
    back: 'Retour',
    submit: 'Soumettre',
    loading: 'Chargement...',
    required: 'Obligatoire',
    free: 'Gratuit',

    // Header
    topBannerCampaign: 'Campagne Santé Rentrée Scolaire (24 – 31 Août) • Examens de Laboratoire Subventionnés à Terranova, Bonamekano',
    uploadRxNav: 'Envoyer Ordonnance',
    bookCheckupNav: 'Prendre RDV Bilan',
    askPharmacistNav: 'Parler au Pharmacien',
    cart: 'Panier',
    cartEmpty: 'Votre panier est vide',
    items: 'articles',
    item: 'article',
    navCampaign: 'Rentrée Scolaire',
    navLabTests: 'Analyses Médicales',
    navPharmacy: 'Pharmacie & Officine',
    navClinical: 'Vaccins & Nutrition',
    navTrackOrder: 'Suivi Commande & Labo',
    navFaq: 'FAQ',
    navContact: 'Horaires & Accès',

    // Hero
    heroBadge: '24 – 31 Août • Venez tous, venez nombreux !',
    heroHeadline: 'BILAN DE SANTÉ RENTRÉE SCOLAIRE !',
    heroSubheadline: "Offrez à votre enfant le meilleur départ pour une année scolaire réussie – en pleine santé !",
    heroDescription: "Avant le retour à l'école de votre enfant, assurez-vous qu'il est en bonne santé. Un enfant en bonne santé apprend mieux, reste concentré et évite les maladies.",
    heroBookBtn: 'Réserver le Bilan de Santé',
    heroExploreBtn: 'Découvrir la Pharmacie',
    heroUploadRxBtn: 'Envoyer une Ordonnance',
    heroFeatureSameDay: 'Résultats Rapides le Même Jour',
    heroFeatureGentle: 'Prélèvements Pédiatriques Doux',
    heroFeatureCertified: 'Pharmaciens & Biologistes Agréés',
    heroPromoRibbon: 'TOUS NOS SERVICES SONT OFFERTS À PRIX RÉDUITS ! Profitez-en dès maintenant !',

    // Laboratory Section
    labSubtitle: "Laboratoire d'Analyses Médicales St. Stephen • Bonamekano",
    labTitle: 'LES EXAMENS DE LABORATOIRE DISPONIBLES',
    labDescription: "Réalisés selon les normes médicales professionnelles pour détecter les infections silencieuses avant la rentrée des classes.",
    labAllDiscountRibbon: 'TOUS LES TESTS SONT SUBVENTIONNÉS POUR LA RENTRÉE SCOLAIRE',
    labTurnaround: 'Résultats en :',
    labSampleType: 'Prélèvement :',
    labBookTest: 'Réserver cet Examen',
    labAddToCart: 'Ajouter au Panier',
    labPackageBadge: 'Le Plus Recommandé pour les Écoliers',
    labPackageTitle: 'Pack Complet Bilan de Santé Rentrée',
    labPackageDesc: 'Les 5 examens (Paludisme, Typhoïde, Hépatite, Bilan Sanguin & Drépanocytose) + Consultation physique pédiatrique + Certificat médical officiel visé pour l’école.',
    labPackageSave: 'ÉCONOMISEZ 38%',
    labPackageBookBtn: 'Réserver le Pack Complet',
    labPackageIncludeTitle: 'Comprend les 5 examens majeurs & le certificat visé :',
    labOfficialStampNote: 'Fournit le certificat médical d’aptitude officiel exigé par les écoles maternelles, primaires et secondaires.',

    // Tests Info
    malariaTitle: 'Test Paludisme (Goutte Épaisse & TDR)',
    malariaDesc: 'Pour vérifier si votre enfant a le paludisme.',
    typhoidTitle: 'Test Typhoïde (Sérodiagnostic)',
    typhoidDesc: "Pour détecter l'infection typhoïde.",
    hepatitisTitle: 'Dépistage des Hépatites',
    hepatitisDesc: 'Pour détecter les infections virales du foie.',
    bloodLevelTitle: 'Bilan Sanguin / Hémoglobine',
    bloodLevelDesc: "Pour vérifier le taux d'hémoglobine de votre enfant et s'assurer qu'il est normal pour son âge.",
    electrophoresisTitle: "Électrophorèse de l'Hémoglobine",
    electrophoresisDesc: "Pour déterminer le type d'hémoglobine de votre enfant (drépanocytaire ou non), afin de prévenir d'éventuelles complications futures.",

    // Recommender
    recBadge: 'Guide Conseil pour Parents',
    recTitle: 'DE QUELS EXAMENS VOTRE ENFANT A-T-IL BESOIN ?',
    recSubtitle: "Sélectionnez l'état de santé actuel ou l'exigence scolaire de votre enfant pour obtenir des recommandations médicales immédiates.",
    recScenarioMatch: 'Situation Détectée :',
    recDoctorProtocol: 'Protocole Médical',
    recClinicalAssessment: 'Avis Clinique :',
    recNextStep: 'Action Recommandée :',
    recBookBundle: 'Réserver le Pack Complet de Rentrée',

    // Clinical
    clinicalBadge: 'Soins Cliniques & Médecine Préventive',
    clinicalTitle: 'VACCINATION & SOUTIEN NUTRITIONNEL',
    clinicalSubtitle: 'Prise en charge globale pour garantir la forme physique, la concentration et une immunité solide pour la rentrée.',
    clinicalVaccineTitle: 'Services de Vaccination',
    clinicalVaccineDesc: 'Mise à jour des vaccins recommandés pour protéger votre enfant.',
    clinicalVaccineBtn: 'Prendre Rendez-vous Vaccin',
    clinicalNutritionTitle: 'Soutien Nutritionnel & Vitamines',
    clinicalNutritionDesc: 'Pour stimuler le système immunitaire et favoriser une croissance saine.',
    clinicalNutritionBtn: 'Découvrir les Vitamines Enfants',
    clinicalAdvisoryTitle: 'Conseil du Médecin',
    clinicalAdvisoryQuote: "Un dépistage précoce aujourd'hui peut prévenir de graves problèmes de santé demain. N'attendez pas que votre enfant tombe malade à l'école.",
    clinicalAdvisorySubtitle: 'Consultez notre équipe médicale pour un bilan complet avant l’affluence de la rentrée.',

    // Pharmacy Catalog
    pharmacyBadge: 'Officine Agréée • Terranova, Bonamekano',
    pharmacyTitle: 'PHARMACIE & MÉDICAMENTS ESSENTIELS',
    pharmacySubtitle: 'Sirops pédiatriques certifiés, compléments de croissance, antipaludéens et trousses de secours validés par nos pharmaciens.',
    pharmacySearchPlaceholder: 'Rechercher par médicament, symptôme ou principe actif...',
    pharmacyCatAll: 'Tous les Produits',
    pharmacyCatPediatric: 'Sirops & Suspensions Pédiatriques',
    pharmacyCatVitamins: 'Vitamines & Croissance',
    pharmacyCatFirstAid: 'Premiers Secours & Thermomètres',
    pharmacyCatEssentials: 'Médicaments Essentiels',
    pharmacyCatMaternal: 'Soins Maternels',
    pharmacyFilterRxOnly: 'Sur ordonnance uniquement',
    pharmacyShowing: 'Affichage de',
    pharmacyPrescriptionRequired: 'Sur Ordonnance',
    pharmacyOtc: 'Vente Libre (Sans Ordonnance)',
    pharmacyInStock: 'En Stock',
    pharmacyOutOfStock: 'Rupture temporaire',
    pharmacyActiveIngredients: 'Principe Actif :',
    pharmacyDosage: 'Posologie :',
    pharmacyAddToCartBtn: 'Ajouter au Panier',
    pharmacyNeedHelpTitle: 'Vous avez une ordonnance médicale ?',
    pharmacyNeedHelpDesc: 'Prenez une photo nette de votre ordonnance. Nos pharmaciens préparent vos médicaments et les livrent directement chez vous à Bonamekano.',
    pharmacyUploadRxBtn: 'Envoyer la Photo de l’Ordonnance',

    // FAQ
    faqBadge: 'Foire Aux Questions',
    faqTitle: 'AIDE & CONSEILS CLINIQUES',
    faqSubtitle: 'Tout ce que vous devez savoir sur la préparation des examens, la livraison de médicaments à domicile, la prise en charge assurance et le certificat scolaire.',
    faqSearchPlaceholder: 'Rechercher par mot-clé : jeûne, délai livraison, assurance, orange money, drépanocytose...',
    faqClearSearch: 'Effacer',
    faqCatAll: 'Toutes les Questions',
    faqCatLab: 'Préparation Labo',
    faqCatDelivery: 'Livraison & Retrait',
    faqCatInsurance: 'Assurances & Paiement',
    faqCatCampaign: 'Certificat Scolaire',
    faqKeyDetails: 'Points Clés :',
    faqPharmacistSupportTitle: 'Une question sur un examen ou la disponibilité d’un médicament ?',
    faqPharmacistSupportDesc: 'Discutez directement avec notre équipe soignante et pharmaceutique de garde à Terranova, Bonamekano.',
    faqCallHotline: 'Appeler le Standard',
    faqWhatsappUs: 'Nous Écrire sur WhatsApp',

    // Cart Drawer
    cartDrawerTitle: 'Votre Panier Santé & Pharmacie',
    cartClearAll: 'Vider le Panier',
    cartFulfillmentMethod: 'Mode de Réception',
    cartTerranovaPickup: 'Retrait à Terranova',
    cartHomeCourier: 'Livraison à Domicile',
    cartDeliveryFeeNote: '+1 000 FCFA',
    cartSubtotal: 'Sous-total :',
    cartDeliveryFee: 'Frais de Livraison (Bonamekano) :',
    cartTotal: 'Total Général :',
    cartNamePlaceholder: 'Votre Nom Complet *',
    cartPhonePlaceholder: 'Numéro Téléphone / WhatsApp (+237...)*',
    cartAddressPlaceholder: 'Quartier / Repère de livraison à Bonamekano *',
    cartQuickOrderWhatsapp: 'Commander Rapide par WhatsApp (+237 670 650 999)',
    cartConfirmOrderBtn: 'Valider la Commande (Paiement au Retrait/Livraison)',
    cartOrderReceivedTitle: 'Commande Confirmée !',
    cartOrderReceivedDesc: 'Votre commande est en cours de préparation par notre équipe en pharmacie. Vous pouvez également transférer le récapitulatif sur WhatsApp pour un suivi en temps réel.',
    cartSendToWhatsapp: 'Envoyer la Commande sur WhatsApp',
    cartStartNewOrder: 'Nouvelle Commande',

    // Booking Modal
    bookingModalTitle: 'Prendre Rendez-vous Labo / Bilan',
    bookingModalSubtitle: 'Centre Médical St. Stephen • Terranova, Bonamekano',
    bookingSelectService: 'Sélectionner l’Examen ou le Pack *',
    bookingChildName: "Nom et Prénom de l'Enfant *",
    bookingChildAge: "Âge de l'Enfant (ex: 8 ans) *",
    bookingParentName: "Nom du Parent / Tuteur *",
    bookingPhone: 'Numéro Téléphone / WhatsApp *',
    bookingDate: 'Date Souhaitée *',
    bookingTimeSlot: 'Créneau Horaire *',
    bookingNotes: 'Antécédents médicaux ou allergies (Optionnel)',
    bookingPriceSummary: 'Montant Total (à régler sur place) :',
    bookingSubmitBtn: 'Confirmer le Rendez-vous',
    bookingConfirmedTitle: 'Rendez-vous Confirmé !',
    bookingConfirmedDesc: 'Votre créneau est réservé au Laboratoire St. Stephen. Merci de vous présenter 10 minutes avant l’heure convenue.',
    bookingReferenceCode: 'Code de Référence :',

    // Prescription Upload Modal
    rxModalTitle: 'Téléverser une Ordonnance Médicale',
    rxModalSubtitle: 'Contrôle rapide & délivrance exacte par nos pharmaciens agréés',
    rxUploadZoneTitle: 'Cliquez ou glissez la photo de l’ordonnance ici',
    rxUploadZoneHint: 'Format JPEG, PNG ou PDF max 10 Mo. Veillez à ce que le nom du patient et les posologies soient bien lisibles.',
    rxFileSelected: 'Document sélectionné :',
    rxChangePhoto: 'Changer la photo',
    rxPatientName: 'Nom du Patient *',
    rxPhone: 'Numéro Téléphone / WhatsApp *',
    rxFulfillmentPreference: 'Mode de Réception Souhaité *',
    rxFulfillmentPickup: 'Retrait au Comptoir (Terranova)',
    rxFulfillmentDelivery: 'Livraison à Domicile (Bonamekano)',
    rxDeliveryAddress: 'Adresse précise & Repère *',
    rxDoctorNotes: 'Remarques du médecin ou intolérances (Optionnel)',
    rxSubmitBtn: 'Transmettre l’Ordonnance au Pharmacien',
    rxSuccessTitle: 'Ordonnance Bien Reçue !',
    rxSuccessDesc: 'Nos pharmaciens examinent actuellement votre ordonnance et préparent les médicaments. Nous vous contactons par téléphone ou WhatsApp dans quelques instants.',

    // Order Tracker
    trackerBadge: 'Suivi en Temps Réel Labo & Officine',
    trackerTitle: 'Suivi de Commande & Résultats de Laboratoire',
    trackerSubtitle: 'Suivez en direct l’acheminement de vos médicaments à domicile ou consultez et téléchargez vos bulletins d’analyses médicales certifiés grâce à votre numéro de référence.',
    trackerInputPlaceholder: 'Entrez votre référence (ex: ST-LAB-4821 ou ST-ORD-88231)...',
    trackerBtn: 'Vérifier l’État',
    trackerFilterAll: 'Toutes les Commandes',
    trackerFilterLab: 'Résultats Analyses Labo',
    trackerFilterPharmacy: 'Livraisons Pharmacie',
    trackerSampleOrdersHint: 'Exemples de démonstration à tester :',
    trackerOrderNotFound: 'Aucune commande trouvée avec cette référence',
    trackerNotFoundDesc: 'Vérifiez le code figurant sur votre reçu ou message WhatsApp, ou contactez directement l’accueil de Terranova pour une recherche immédiate.',
    trackerOrderStatus: 'Statut Actuel',
    trackerProgressTimeline: 'Étapes du Traitement & Livraison',
    trackerOrderDetails: 'Détails de la Commande & Patient',
    trackerPatient: 'Patient / Client',
    trackerSpecimenType: 'Type d’Échantillon',
    trackerLabDoctor: 'Biologiste Responsable',
    trackerOfficialResults: 'Résultats d’Analyses Médicales',
    trackerDownloadCertificate: 'Voir / Imprimer le Bulletin Médical',
    trackerDeliveryCourier: 'Coursier Moto-Express',
    trackerDeliveryAddress: 'Adresse & Repère de Livraison',
    trackerItemsOrdered: 'Médicaments Délivrés',
    trackerPaymentMethod: 'Modalité de Paiement',
    trackerWhatsappHelp: 'Assistance Livraison WhatsApp',

    // Footer
    footerCommunityTrust: 'Confiance Communautaire • Aire de santé de BONAMEKANO',
    footerTestimonialHeading: 'Recommandé par les Parents et Écoles de Terranova',
    footerAboutText: "Le Centre Médical & Pharmacie St. Stephen est l'établissement de soins primaires et d'analyses médicales accrédité desservant Terranova et l'Aire de santé de Bonamekano.",
    footerMottoTitle: 'Notre Devise',
    footerQuickLinksTitle: 'Services Médicaux',
    footerHoursTitle: 'Horaires & Localisation',
    footerMonFri: 'Lundi – Vendredi : 7h30 – 20h30',
    footerSat: 'Samedi : 8h00 – 19h00',
    footerEmergencyNote: 'Urgences & Garde : Service 24h/24 et 7j/7',
    footerTerranovaAddress: 'Terranova, Bonamekano (À côté du Carrefour)',
    footerSloganText: 'Ensemble pour des enfants sains, forts et prêts à apprendre !',
    footerDisclaimerText: 'Nos tests et vaccinations sont réalisés selon les normes médicales professionnelles et après évaluation appropriée.',
    footerAllRights: 'Tous droits réservés.',
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('st_stephen_lang');
      if (saved === 'en' || saved === 'fr') return saved;
      // Default to English, with French easily accessible
      return 'en';
    } catch {
      return 'en';
    }
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('st_stephen_lang', lang);
    } catch {
      // ignore
    }
  };

  const t = translations[language];

  return React.createElement(
    LanguageContext.Provider,
    { value: { language, setLanguage, t } },
    children
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
