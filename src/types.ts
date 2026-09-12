export type Language = 'en' | 'fr';

export interface Product {
  id: string;
  name: string;
  category: 'pediatric' | 'essential' | 'vitamins' | 'first-aid' | 'maternal';
  categoryLabel: string;
  priceXAF: number;
  originalPriceXAF?: number;
  dosage: string;
  activeIngredients: string;
  description: string;
  inStock: boolean;
  requiresPrescription: boolean;
  rating: number;
  reviewsCount: number;
  badge?: string;
  image?: string;
}

export interface LabTest {
  id: string;
  title: string;
  shortDesc: string;
  purpose: string;
  turnaroundTime: string;
  sampleType: 'Blood fingerprick' | 'Venous Blood' | 'Urine/Stool' | 'Rapid Test Strip';
  priceXAF: number;
  discountedPriceXAF?: number;
  isPopular?: boolean;
  flyerMatch: boolean;
  badgeColor?: 'red' | 'green' | 'blue';
  iconType: 'malaria' | 'typhoid' | 'hepatitis' | 'blood' | 'dna';
}

export interface CartItem {
  id: string;
  product?: Product;
  labTest?: LabTest;
  quantity: number;
  type: 'product' | 'labTest';
}

export interface TestBooking {
  testId: string;
  testName: string;
  patientName: string;
  patientAge: string;
  parentName: string;
  phone: string;
  date: string;
  timeSlot: string;
  notes?: string;
}

export interface PrescriptionSubmission {
  patientName: string;
  phone: string;
  notes: string;
  file?: File | null;
  fileName?: string;
  deliveryPreference: 'pickup' | 'delivery';
  deliveryAddress?: string;
}

export type OrderType = 'pharmacy_delivery' | 'pharmacy_pickup' | 'lab_test';

export type TrackingStatus =
  | 'received'
  | 'processing'
  | 'analyzing'
  | 'dispatched'
  | 'ready'
  | 'completed';

export interface TimelineStep {
  title: string;
  titleFr?: string;
  description: string;
  descriptionFr?: string;
  timestamp: string;
  completed: boolean;
  current?: boolean;
}

export interface LabResultReport {
  testName: string;
  parameter: string;
  resultValue: string;
  referenceRange: string;
  status: 'normal' | 'negative' | 'positive' | 'attention';
  notes: string;
}

export interface TrackedOrder {
  orderId: string;
  type: OrderType;
  customerName: string;
  phone: string;
  createdAt: string;
  status: TrackingStatus;
  statusLabelEn: string;
  statusLabelFr: string;
  statusDescriptionEn: string;
  statusDescriptionFr: string;
  estimatedCompletion: string;

  // Specific for Pharmacy Orders
  deliveryAddress?: string;
  fulfillmentType?: 'delivery' | 'pickup';
  courierName?: string;
  courierPhone?: string;
  courierPlate?: string;
  items?: { name: string; quantity: number; priceXAF: number }[];
  totalAmountXAF?: number;
  paymentStatus?: 'paid' | 'pending_on_delivery' | 'pending_at_counter';

  // Specific for Lab Tests
  patientName?: string;
  patientAge?: string;
  specimenType?: string;
  samplingDate?: string;
  labDoctorName?: string;
  labResults?: LabResultReport[];
  canDownloadReport?: boolean;

  timeline: TimelineStep[];
}
