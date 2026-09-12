import { TrackedOrder } from '../types';

export const INITIAL_TRACKED_ORDERS: TrackedOrder[] = [
  {
    orderId: 'ST-LAB-4821',
    type: 'lab_test',
    customerName: 'Ndome Junior (Parent: Mme. Ndome Charlotte)',
    patientName: 'Junior Ndome',
    patientAge: '7 years',
    phone: '+237 670 123 456',
    createdAt: 'Today, 08:15 AM',
    status: 'ready',
    statusLabelEn: 'Results Ready & Validated',
    statusLabelFr: 'Résultats Prêts & Validés',
    statusDescriptionEn: 'Laboratory diagnostic results have been verified and signed by the clinical biologist. Results are ready for pickup or digital certificate download.',
    statusDescriptionFr: 'Les résultats d’analyse ont été vérifiés et signés par le biologiste médical. Le bulletin est prêt pour retrait au laboratoire ou téléchargement.',
    estimatedCompletion: 'Completed',
    specimenType: 'Venous Blood & Capillary Fingerprick',
    samplingDate: 'Today at 08:30 AM (Terranova Lab Bench #2)',
    labDoctorName: 'Dr. M. Tchatchoua, MD (Clinical Biologist)',
    canDownloadReport: true,
    labResults: [
      {
        testName: 'Malaria RDT & Thick Blood Smear',
        parameter: 'Plasmodium falciparum antigen / trophozoite count',
        resultValue: 'NEGATIVE (0 parasites/µL)',
        referenceRange: 'Negative (No hemoparasites seen)',
        status: 'negative',
        notes: 'Child has no detectable malaria parasites. Prophylactic bed net usage advised.',
      },
      {
        testName: 'Hemoglobin Level (Anemia Check)',
        parameter: 'Capillary Hemoglobin (Hb)',
        resultValue: '12.6 g/dL',
        referenceRange: '11.5 – 14.5 g/dL (Pediatric normal)',
        status: 'normal',
        notes: 'Optimal oxygen carrying capacity. No clinical anemia detected.',
      },
      {
        testName: 'Hemoglobin Electrophoresis',
        parameter: 'Cellulose Acetate Alkaline Migration',
        resultValue: 'Hb AA (Normal Adult)',
        referenceRange: 'Hb AA (Absence of Hb S or Hb C bands)',
        status: 'normal',
        notes: 'Normal hemoglobin genotype. Child does not carry sickle cell trait.',
      },
    ],
    timeline: [
      {
        title: 'Check-In & Registration',
        titleFr: 'Enregistrement & Accueil',
        description: 'Patient checked in at St. Stephen Terranova front desk.',
        descriptionFr: 'Patient enregistré à l’accueil de Terranova, Bonamekano.',
        timestamp: '08:15 AM',
        completed: true,
      },
      {
        title: 'Sterile Sample Collection',
        titleFr: 'Prélèvement Stérile',
        description: 'Capillary blood fingerprick and venous tube drawn using pediatric butterfly needle.',
        descriptionFr: 'Prélèvement sanguin pédiatrique indolore avec aiguille stérile.',
        timestamp: '08:32 AM',
        completed: true,
      },
      {
        title: 'Laboratory Microscopy & Staining',
        titleFr: 'Microscopie & Centrifugation',
        description: 'Giemsa staining of thick blood smear and electrophoresis migration performed.',
        descriptionFr: 'Coloration au Giemsa de la goutte épaisse et migration d’électrophorèse.',
        timestamp: '09:10 AM',
        completed: true,
      },
      {
        title: 'Doctor Validation & Stamping',
        titleFr: 'Validation Médicale & Visa',
        description: 'Official diagnostic report approved and stamped by Dr. M. Tchatchoua.',
        descriptionFr: 'Bulletin d’analyses visé et tamponné par le biologiste médical.',
        timestamp: '09:45 AM',
        completed: true,
        current: true,
      },
    ],
  },
  {
    orderId: 'ST-ORD-88231',
    type: 'pharmacy_delivery',
    customerName: 'Mme. Valerie Kouam',
    phone: '+237 699 443 210',
    createdAt: 'Today, 10:20 AM',
    status: 'dispatched',
    statusLabelEn: 'Dispatched with Courier',
    statusLabelFr: 'En Cours de Livraison (Moto-Express)',
    statusDescriptionEn: 'Your package has left St. Stephen Dispensary and is currently on the motorcycle courier heading towards your address in Bonamekano.',
    statusDescriptionFr: 'Votre commande a quitté l’officine St. Stephen et est actuellement acheminée par notre coursier moto à votre adresse à Bonamekano.',
    estimatedCompletion: 'In ~12 minutes (Estimated 11:15 AM)',
    deliveryAddress: 'Carrefour Terranova, facing BICEC building, Bonamekano',
    fulfillmentType: 'delivery',
    courierName: 'Junior T. (St. Stephen Moto Express #MT-08)',
    courierPhone: '+237 654 806 346',
    courierPlate: 'LT-842-DK',
    paymentStatus: 'pending_on_delivery',
    totalAmountXAF: 4700,
    items: [
      { name: 'Zinc Sulfate 20mg Dispersible (Box of 100 tabs)', quantity: 1, priceXAF: 1800 },
      { name: 'Pediatric ORS Sachets (Electrolyte Hydration)', quantity: 4, priceXAF: 1000 },
      { name: 'Omega-3 DHA Child Brain & Appetite Syrup', quantity: 1, priceXAF: 1900 },
    ],
    timeline: [
      {
        title: 'Order Confirmed',
        titleFr: 'Commande Confirmée',
        description: 'Order received and logged in dispensary system.',
        descriptionFr: 'Commande enregistrée dans le système de la pharmacie.',
        timestamp: '10:20 AM',
        completed: true,
      },
      {
        title: 'Pharmacist Inspection & Packing',
        titleFr: 'Contrôle Pharmacologique & Emballage',
        description: 'Medicines verified for expiration dates, batch numbers, and packed safely.',
        descriptionFr: 'Vérification des dates de péremption, numéros de lot et mise en sachet scellé.',
        timestamp: '10:35 AM',
        completed: true,
      },
      {
        title: 'Handed to Motorcycle Courier',
        titleFr: 'Remis au Coursier Moto',
        description: 'Courier Junior T. picked up the sealed delivery box.',
        descriptionFr: 'Le coursier Junior T. a pris en charge le colis scellé.',
        timestamp: '10:50 AM',
        completed: true,
        current: true,
      },
      {
        title: 'Delivered at Doorstep',
        titleFr: 'Livraison Effectuée',
        description: 'Recipient inspects seal, signs dispatch voucher, and makes payment.',
        descriptionFr: 'Réception par le client, signature du bordereau et règlement.',
        timestamp: 'Est. 11:15 AM',
        completed: false,
      },
    ],
  },
  {
    orderId: 'ST-LAB-91042',
    type: 'lab_test',
    customerName: 'Klara Mballa (Parent: M. Mballa Roger)',
    patientName: 'Klara Mballa',
    patientAge: '5 years',
    phone: '+237 677 882 109',
    createdAt: 'Today, 09:40 AM',
    status: 'analyzing',
    statusLabelEn: 'Laboratory Analysis in Progress',
    statusLabelFr: 'Analyse au Laboratoire en Cours',
    statusDescriptionEn: 'Blood sample is currently in the centrifuge and incubation chamber. Expected results within 20 minutes.',
    statusDescriptionFr: 'L’échantillon sanguin est actuellement en centrifugation et incubation sérologique. Résultats attendus d’ici 20 minutes.',
    estimatedCompletion: 'Ready by 10:45 AM',
    specimenType: 'Venous Blood (EDTA & Serum)',
    samplingDate: 'Today at 09:55 AM (Terranova Lab)',
    labDoctorName: 'Dr. M. Tchatchoua, MD',
    canDownloadReport: false,
    labResults: [
      {
        testName: 'Widal Typhoid Agglutination Test',
        parameter: 'Salmonella typhi O & H titers',
        resultValue: 'Analysis in Progress (Incubation Phase)...',
        referenceRange: '< 1/80 titer (Normal baseline)',
        status: 'attention',
        notes: 'Serum undergoing antibody sero-agglutination testing.',
      },
      {
        testName: 'Full Blood Count (NFS / Hémogramme)',
        parameter: 'White Blood Cell & Platelet Count',
        resultValue: 'Counting on Automated Hematology Analyzer...',
        referenceRange: 'WBC 5,000 – 11,000 /µL',
        status: 'attention',
        notes: 'Hematology cell counter running.',
      },
    ],
    timeline: [
      {
        title: 'Check-in & Registration',
        titleFr: 'Accueil & Enregistrement',
        description: 'Patient arrived with fever history.',
        descriptionFr: 'Arrivée de la jeune patiente avec antécédent de fièvre.',
        timestamp: '09:40 AM',
        completed: true,
      },
      {
        title: 'Venous Blood Drawn',
        titleFr: 'Prélèvement Sanguin',
        description: 'Collected by senior lab technician in sterile pediatric tube.',
        descriptionFr: 'Prélèvement effectué par le technicien de laboratoire.',
        timestamp: '09:55 AM',
        completed: true,
      },
      {
        title: 'Incubation & Hematology Run',
        titleFr: 'Incubation & Analyse Hématologique',
        description: 'Centrifugation and reagent titration active.',
        descriptionFr: 'Centrifugation et titration des réactifs en cours.',
        timestamp: '10:10 AM',
        completed: true,
        current: true,
      },
      {
        title: 'Doctor Validation & Result Release',
        titleFr: 'Validation Médicale',
        description: 'Biologist signs off results and uploads certificate.',
        descriptionFr: 'Signature du rapport par le biologiste.',
        timestamp: 'Est. 10:45 AM',
        completed: false,
      },
    ],
  },
  {
    orderId: 'ST-ORD-62104',
    type: 'pharmacy_pickup',
    customerName: 'Papa Emmanuel Ebongue',
    phone: '+237 675 332 901',
    createdAt: 'Today, 08:50 AM',
    status: 'ready',
    statusLabelEn: 'Ready for Counter Pickup',
    statusLabelFr: 'Prêt pour Retrait au Comptoir',
    statusDescriptionEn: 'Your package is packaged and kept under climate control at the Terranova Dispensary counter. Ready for collection.',
    statusDescriptionFr: 'Votre commande est emballée et conservée au comptoir de la pharmacie à Terranova. Vous pouvez passer la retirer à tout moment.',
    estimatedCompletion: 'Ready Now at Front Desk',
    deliveryAddress: 'St. Stephen Dispensary Counter, Terranova, Bonamekano',
    fulfillmentType: 'pickup',
    paymentStatus: 'pending_at_counter',
    totalAmountXAF: 3200,
    items: [
      { name: 'Pure Cod Liver Oil with Vitamins A & D (200ml)', quantity: 1, priceXAF: 2200 },
      { name: 'Paracetamol Pediatric Oral Suspension 250mg', quantity: 1, priceXAF: 1000 },
    ],
    timeline: [
      {
        title: 'Order Placed',
        titleFr: 'Commande Reçue',
        description: 'Reserved via web catalog.',
        descriptionFr: 'Réservation passée sur le catalogue en ligne.',
        timestamp: '08:50 AM',
        completed: true,
      },
      {
        title: 'Pharmacist Prepared & Labeled',
        titleFr: 'Préparation & Étiquetage',
        description: 'Dosage instructions labeled on packaging.',
        descriptionFr: 'Posologie pédiatrique indiquée sur le sachet.',
        timestamp: '09:05 AM',
        completed: true,
      },
      {
        title: 'Ready at Terranova Counter',
        titleFr: 'Disponible au Comptoir',
        description: 'Waiting for customer pickup at main pharmacy desk.',
        descriptionFr: 'En attente du client au comptoir principal.',
        timestamp: '09:12 AM',
        completed: true,
        current: true,
      },
    ],
  },
];

const LOCAL_STORAGE_KEY = 'st_stephen_tracked_orders';

export function getStoredOrders(): TrackedOrder[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        // Merge with initial defaults to ensure demo codes always work
        const existingIds = new Set(parsed.map((o: TrackedOrder) => o.orderId.toUpperCase()));
        const missingDefaults = INITIAL_TRACKED_ORDERS.filter(
          (o) => !existingIds.has(o.orderId.toUpperCase())
        );
        return [...parsed, ...missingDefaults];
      }
    }
  } catch (err) {
    console.error('Failed to load tracked orders from storage', err);
  }
  return INITIAL_TRACKED_ORDERS;
}

export function saveTrackedOrder(order: TrackedOrder): void {
  try {
    const all = getStoredOrders();
    const existingIdx = all.findIndex(
      (o) => o.orderId.toUpperCase() === order.orderId.toUpperCase()
    );
    let updated: TrackedOrder[];
    if (existingIdx >= 0) {
      updated = [...all];
      updated[existingIdx] = order;
    } else {
      updated = [order, ...all];
    }
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to save tracked order to storage', err);
  }
}

export function findOrderById(searchId: string): TrackedOrder | null {
  if (!searchId) return null;
  const clean = searchId.trim().toUpperCase();
  const all = getStoredOrders();

  // 1. Direct match
  const match = all.find((o) => o.orderId.toUpperCase() === clean);
  if (match) return match;

  // 2. Partial match (e.g. without "ST-" prefix)
  const partial = all.find(
    (o) =>
      o.orderId.toUpperCase().includes(clean) ||
      clean.includes(o.orderId.toUpperCase())
  );
  if (partial) return partial;

  // 3. Synthesize realistic dynamic order if the ID follows ST-... format
  if (clean.startsWith('ST-') || clean.startsWith('ORD-') || clean.startsWith('LAB-')) {
    const isLab = clean.includes('LAB') || !clean.includes('ORD');
    const syntheticOrder: TrackedOrder = isLab
      ? {
          orderId: clean.startsWith('ST-') ? clean : `ST-${clean}`,
          type: 'lab_test',
          customerName: 'Patient Walk-in / School Student',
          patientName: 'Registered Patient',
          patientAge: 'School Age',
          phone: '+237 670 650 999',
          createdAt: 'Recently Registered',
          status: 'processing',
          statusLabelEn: 'Sample Processing at Lab Bench',
          statusLabelFr: 'Traitement de l’Échantillon au Laboratoire',
          statusDescriptionEn: 'Your diagnostic laboratory sample has been logged and is undergoing systematic validation.',
          statusDescriptionFr: 'Votre échantillon d’analyse a été enregistré et fait l’objet d’un traitement systématique.',
          estimatedCompletion: 'Under 30 minutes',
          specimenType: 'Sterile Biological Sample',
          samplingDate: 'Today at Terranova Lab',
          labDoctorName: 'Dr. M. Tchatchoua, MD (Clinical Biologist)',
          canDownloadReport: false,
          timeline: [
            {
              title: 'Appointment Logged',
              titleFr: 'Rendez-vous Enregistré',
              description: 'Patient file opened in medical registry.',
              descriptionFr: 'Dossier ouvert au registre médical.',
              timestamp: 'Earlier today',
              completed: true,
            },
            {
              title: 'Sampling Conducted',
              titleFr: 'Prélèvement Effectué',
              description: 'Pediatric sterile sample prepared.',
              descriptionFr: 'Échantillon stérile préparé.',
              timestamp: 'Recently',
              completed: true,
              current: true,
            },
            {
              title: 'Clinical Staining & Test Run',
              titleFr: 'Analyse & Coloration',
              description: 'Microscopic and biochemical evaluation.',
              descriptionFr: 'Évaluation microscopique et biochimique.',
              timestamp: 'In progress',
              completed: false,
            },
            {
              title: 'Biologist Stamp & Release',
              titleFr: 'Validation & Sortie',
              description: 'Doctor sign-off and certificate ready.',
              descriptionFr: 'Visa du médecin et rapport prêt.',
              timestamp: 'Pending',
              completed: false,
            },
          ],
        }
      : {
          orderId: clean.startsWith('ST-') ? clean : `ST-${clean}`,
          type: 'pharmacy_delivery',
          customerName: 'Customer in Bonamekano',
          phone: '+237 670 650 999',
          createdAt: 'Recently Ordered',
          status: 'processing',
          statusLabelEn: 'Packing at Terranova Dispensary',
          statusLabelFr: 'En Préparation à la Pharmacie',
          statusDescriptionEn: 'Our pharmacy staff is assembling and quality-checking your medicines.',
          statusDescriptionFr: 'Notre équipe officinale prépare et vérifie vos médicaments.',
          estimatedCompletion: 'Within 25 - 40 minutes',
          fulfillmentType: 'delivery',
          deliveryAddress: 'Bonamekano Zone, Douala',
          paymentStatus: 'pending_on_delivery',
          totalAmountXAF: 3500,
          courierName: 'St. Stephen Courier Dispatch',
          courierPhone: '+237 670 650 999',
          timeline: [
            {
              title: 'Order Confirmed',
              titleFr: 'Commande Confirmée',
              description: 'Entered into pharmacy dispensary queue.',
              descriptionFr: 'Enregistrée dans la file de délivrance.',
              timestamp: 'Just now',
              completed: true,
            },
            {
              title: 'Pharmacist Quality Review',
              titleFr: 'Contrôle Qualité Pharmacien',
              description: 'Expiration checks and protective packing.',
              descriptionFr: 'Contrôle des péremptions et mise sous emballage sécurisé.',
              timestamp: 'Active',
              completed: true,
              current: true,
            },
            {
              title: 'Courier Dispatch',
              titleFr: 'Expédition Moto',
              description: 'Motorcycle courier delivery across Bonamekano.',
              descriptionFr: 'Livraison express par moto dans l’aire de santé.',
              timestamp: 'Upcoming',
              completed: false,
            },
          ],
        };

    saveTrackedOrder(syntheticOrder);
    return syntheticOrder;
  }

  return null;
}

export function registerCartOrder(params: {
  orderId: string;
  customerName: string;
  phone: string;
  fulfillment: 'delivery' | 'pickup';
  address?: string;
  items: { name: string; quantity: number; priceXAF: number }[];
  totalXAF: number;
}): TrackedOrder {
  const newOrder: TrackedOrder = {
    orderId: params.orderId,
    type: params.fulfillment === 'delivery' ? 'pharmacy_delivery' : 'pharmacy_pickup',
    customerName: params.customerName || 'Customer in Bonamekano',
    phone: params.phone,
    createdAt: 'Just now',
    status: 'processing',
    statusLabelEn: 'Dispensary Packaging & Verification',
    statusLabelFr: 'Préparation & Vérification Officinale',
    statusDescriptionEn: params.fulfillment === 'delivery'
      ? 'Your medications have been logged. The pharmacist is verifying formulations and preparing the motorcycle dispatch.'
      : 'Your medications are being packaged and reserved at the Terranova Dispensary front counter.',
    statusDescriptionFr: params.fulfillment === 'delivery'
      ? 'Vos médicaments sont enregistrés. Le pharmacien vérifie les posologies et prépare le coursier moto.'
      : 'Vos médicaments sont emballés et mis de côté au comptoir de la pharmacie de Terranova.',
    estimatedCompletion: params.fulfillment === 'delivery' ? 'In 30-45 minutes' : 'Ready in 15 minutes',
    deliveryAddress: params.fulfillment === 'delivery' ? params.address : 'St. Stephen Dispensary Counter, Terranova',
    fulfillmentType: params.fulfillment,
    paymentStatus: params.fulfillment === 'delivery' ? 'pending_on_delivery' : 'pending_at_counter',
    totalAmountXAF: params.totalXAF,
    courierName: params.fulfillment === 'delivery' ? 'Junior T. (Moto Express)' : undefined,
    courierPhone: params.fulfillment === 'delivery' ? '+237 654 806 346' : undefined,
    courierPlate: params.fulfillment === 'delivery' ? 'LT-842-DK' : undefined,
    items: params.items,
    timeline: [
      {
        title: 'Order Confirmed',
        titleFr: 'Commande Confirmée',
        description: 'Logged successfully in St. Stephen system.',
        descriptionFr: 'Enregistrée avec succès dans le système St. Stephen.',
        timestamp: 'Just now',
        completed: true,
      },
      {
        title: 'Pharmacist Prescription & Safety Check',
        titleFr: 'Vérification du Pharmacien',
        description: 'Checking batch numbers and packaging in protective medical envelopes.',
        descriptionFr: 'Vérification des lots et conditionnement sous scellé de sécurité.',
        timestamp: 'Active',
        completed: true,
        current: true,
      },
      {
        title: params.fulfillment === 'delivery' ? 'Motorcycle Courier Dispatch' : 'Ready for Counter Pickup',
        titleFr: params.fulfillment === 'delivery' ? 'Départ du Coursier Moto' : 'Disponible au Comptoir',
        description: params.fulfillment === 'delivery'
          ? 'Fast delivery to your landmark in Bonamekano.'
          : 'Ready for collection at Terranova front desk.',
        descriptionFr: params.fulfillment === 'delivery'
          ? 'Livraison rapide à votre repère à Bonamekano.'
          : 'Prêt pour retrait à l’accueil de Terranova.',
        timestamp: 'Upcoming',
        completed: false,
      },
    ],
  };

  saveTrackedOrder(newOrder);
  return newOrder;
}

export function registerLabBooking(params: {
  bookingRef: string;
  patientName: string;
  patientAge: string;
  testTitle: string;
  date: string;
  timeSlot: string;
  feeXAF: number;
  phone: string;
}): TrackedOrder {
  const newOrder: TrackedOrder = {
    orderId: params.bookingRef,
    type: 'lab_test',
    customerName: `${params.patientName} (${params.phone})`,
    patientName: params.patientName,
    patientAge: params.patientAge ? `${params.patientAge} years` : 'Child',
    phone: params.phone,
    createdAt: 'Scheduled Today',
    status: 'received',
    statusLabelEn: 'Appointment Confirmed & Reserved',
    statusLabelFr: 'Rendez-vous Confirmé & Réservé',
    statusDescriptionEn: `Appointment registered for ${params.testTitle}. The laboratory team has reserved sterile pediatric equipment for ${params.date} during ${params.timeSlot}.`,
    statusDescriptionFr: `Rendez-vous confirmé pour ${params.testTitle}. L'équipe du laboratoire a réservé le matériel pédiatrique pour le ${params.date} créneau ${params.timeSlot}.`,
    estimatedCompletion: `${params.date} (${params.timeSlot})`,
    specimenType: 'Pediatric Blood / Sterile Diagnostic Sample',
    samplingDate: `${params.date} at ${params.timeSlot}`,
    labDoctorName: 'Dr. M. Tchatchoua, MD (Clinical Biologist)',
    canDownloadReport: false,
    timeline: [
      {
        title: 'Appointment Registered',
        titleFr: 'Rendez-vous Enregistré',
        description: `Scheduled for ${params.testTitle} at St. Stephen Terranova.`,
        descriptionFr: `Planifié pour ${params.testTitle} à St. Stephen Terranova.`,
        timestamp: 'Just now',
        completed: true,
        current: true,
      },
      {
        title: 'Patient Arrival & Sample Collection',
        titleFr: 'Arrivée & Prélèvement Stérile',
        description: 'Fast, child-safe capillary or venous collection.',
        descriptionFr: 'Prélèvement rapide et adapté aux enfants.',
        timestamp: params.timeSlot,
        completed: false,
      },
      {
        title: 'Diagnostic Analysis & Microscopy',
        titleFr: 'Analyse Médicale & Microscopie',
        description: 'Biochemical and microscopic testing.',
        descriptionFr: 'Examens biochimiques et microscopiques.',
        timestamp: 'After sampling',
        completed: false,
      },
      {
        title: 'Official Results & Certificate Visa',
        titleFr: 'Validation & Certificat Officiel',
        description: 'Stamping and digital result availability.',
        descriptionFr: 'Cachet officiel et délivrance des résultats.',
        timestamp: 'Turnaround 20-30 min',
        completed: false,
      },
    ],
  };

  saveTrackedOrder(newOrder);
  return newOrder;
}
