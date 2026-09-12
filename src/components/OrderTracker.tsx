import React, { useState, useEffect } from 'react';
import {
  Search,
  CheckCircle2,
  Clock,
  Truck,
  FlaskConical,
  Pill,
  MapPin,
  Phone,
  MessageCircle,
  FileText,
  Printer,
  ShieldCheck,
  AlertCircle,
  X,
  ExternalLink,
  ChevronRight,
  Sparkles,
  User,
  Package,
} from 'lucide-react';
import { TrackedOrder } from '../types';
import {
  findOrderById,
  getStoredOrders,
  INITIAL_TRACKED_ORDERS,
} from '../data/orderTrackingData';
import { HEALTH_CENTER_INFO } from '../data/pharmacyData';
import { formatCurrency, Currency } from '../utils/currency';
import { useLanguage } from '../utils/translations';
import { BrandLogo } from './BrandLogo';

interface OrderTrackerProps {
  currency: Currency;
  initialOrderId?: string;
  onNavigateToShop?: () => void;
  onOpenBookingModal?: () => void;
}

export const OrderTracker: React.FC<OrderTrackerProps> = ({
  currency,
  initialOrderId,
  onNavigateToShop,
  onOpenBookingModal,
}) => {
  const { t, language } = useLanguage();
  const [searchInput, setSearchInput] = useState(initialOrderId || '');
  const [currentOrder, setCurrentOrder] = useState<TrackedOrder | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'lab' | 'pharmacy'>('all');
  const [isCertificateModalOpen, setIsCertificateModalOpen] = useState(false);

  // Available sample/stored orders for quick access
  const [recentOrders, setRecentOrders] = useState<TrackedOrder[]>([]);

  useEffect(() => {
    const orders = getStoredOrders();
    setRecentOrders(orders);
    
    // If an initial order ID was passed, look it up immediately
    if (initialOrderId) {
      const match = findOrderById(initialOrderId);
      if (match) {
        setCurrentOrder(match);
        setSearchInput(match.orderId);
        setHasSearched(true);
      }
    } else if (!currentOrder) {
      // Default to showing the first demo order (e.g. Lab results ready) for immediate value
      const defaultOrder = orders.find((o) => o.orderId === 'ST-LAB-4821') || orders[0];
      if (defaultOrder) {
        setCurrentOrder(defaultOrder);
        setSearchInput(defaultOrder.orderId);
      }
    }
  }, [initialOrderId]);

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!searchInput.trim()) return;

    setHasSearched(true);
    const order = findOrderById(searchInput);
    setCurrentOrder(order);
  };

  const handleSelectDemo = (orderId: string) => {
    setSearchInput(orderId);
    setHasSearched(true);
    const order = findOrderById(orderId);
    setCurrentOrder(order);
  };

  const filteredRecents = recentOrders.filter((o) => {
    if (selectedFilter === 'lab') return o.type === 'lab_test';
    if (selectedFilter === 'pharmacy') return o.type === 'pharmacy_delivery' || o.type === 'pharmacy_pickup';
    return true;
  });

  const getStatusBadge = (order: TrackedOrder) => {
    switch (order.status) {
      case 'ready':
      case 'completed':
        return {
          bg: 'bg-emerald-50 text-emerald-800 border-emerald-300',
          dot: 'bg-emerald-600',
          label: language === 'fr' ? order.statusLabelFr : order.statusLabelEn,
          icon: CheckCircle2,
        };
      case 'dispatched':
        return {
          bg: 'bg-amber-50 text-amber-900 border-amber-300',
          dot: 'bg-amber-500 animate-pulse',
          label: language === 'fr' ? order.statusLabelFr : order.statusLabelEn,
          icon: Truck,
        };
      case 'analyzing':
        return {
          bg: 'bg-blue-50 text-blue-900 border-blue-300',
          dot: 'bg-blue-600 animate-pulse',
          label: language === 'fr' ? order.statusLabelFr : order.statusLabelEn,
          icon: FlaskConical,
        };
      default:
        return {
          bg: 'bg-slate-100 text-slate-800 border-slate-300',
          dot: 'bg-slate-500',
          label: language === 'fr' ? order.statusLabelFr : order.statusLabelEn,
          icon: Clock,
        };
    }
  };

  return (
    <section id="tracking" className="py-12 sm:py-16 bg-slate-50 border-b border-slate-200 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Title Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-100 text-[#002f6c] text-xs font-bold uppercase tracking-wider mb-2">
            <Clock className="w-3.5 h-3.5 text-blue-700" />
            <span>{t.trackerBadge}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#002f6c] tracking-tight uppercase font-display">
            {t.trackerTitle}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            {t.trackerSubtitle}
          </p>
        </div>

        {/* Search & Lookup Bar Card */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-sm max-w-4xl mx-auto mb-8">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder={t.trackerInputPlaceholder}
                className="w-full pl-11 pr-10 py-3 text-sm sm:text-base bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#003882] focus:bg-white font-mono uppercase tracking-wide placeholder:font-sans placeholder:normal-case"
                id="order-tracker-search-input"
              />
              {searchInput && (
                <button
                  type="button"
                  onClick={() => setSearchInput('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <button
              type="submit"
              className="px-6 py-3 bg-[#002f6c] hover:bg-[#001f47] text-white font-bold text-sm rounded-xl transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
              id="order-tracker-search-btn"
            >
              <Search className="w-4 h-4" />
              <span>{t.trackerBtn}</span>
            </button>
          </form>

          {/* Quick Demo Samples bar */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-500 font-semibold">
              {t.trackerSampleOrdersHint}
            </span>

            <button
              type="button"
              onClick={() => handleSelectDemo('ST-LAB-4821')}
              className={`px-2.5 py-1 rounded-lg border font-mono font-bold transition-colors cursor-pointer ${
                searchInput === 'ST-LAB-4821'
                  ? 'bg-emerald-100 border-emerald-400 text-emerald-900'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              ST-LAB-4821 <span className="text-[10px] font-sans text-emerald-700">({language === 'fr' ? 'Résultats prêts' : 'Results Ready'})</span>
            </button>

            <button
              type="button"
              onClick={() => handleSelectDemo('ST-ORD-88231')}
              className={`px-2.5 py-1 rounded-lg border font-mono font-bold transition-colors cursor-pointer ${
                searchInput === 'ST-ORD-88231'
                  ? 'bg-amber-100 border-amber-400 text-amber-900'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              ST-ORD-88231 <span className="text-[10px] font-sans text-amber-700">({language === 'fr' ? 'Livraison moto' : 'Moto Courier'})</span>
            </button>

            <button
              type="button"
              onClick={() => handleSelectDemo('ST-LAB-91042')}
              className={`px-2.5 py-1 rounded-lg border font-mono font-bold transition-colors cursor-pointer ${
                searchInput === 'ST-LAB-91042'
                  ? 'bg-blue-100 border-blue-400 text-blue-900'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              ST-LAB-91042 <span className="text-[10px] font-sans text-blue-700">({language === 'fr' ? 'En analyse' : 'Analyzing'})</span>
            </button>

            <button
              type="button"
              onClick={() => handleSelectDemo('ST-ORD-62104')}
              className={`px-2.5 py-1 rounded-lg border font-mono font-bold transition-colors cursor-pointer ${
                searchInput === 'ST-ORD-62104'
                  ? 'bg-purple-100 border-purple-400 text-purple-900'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              ST-ORD-62104 <span className="text-[10px] font-sans text-purple-700">({language === 'fr' ? 'Retrait comptoir' : 'Counter Pickup'})</span>
            </button>
          </div>
        </div>

        {/* Order Display or Empty State */}
        {!currentOrder ? (
          <div className="bg-white rounded-2xl p-8 text-center border border-dashed border-slate-300 max-w-2xl mx-auto">
            <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mx-auto mb-3">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">
              {t.trackerOrderNotFound}
            </h3>
            <p className="text-sm text-slate-500 mt-1 max-w-md mx-auto">
              {t.trackerNotFoundDesc}
            </p>
            <div className="mt-5 flex flex-wrap gap-2 justify-center">
              <a
                href={`https://wa.me/${HEALTH_CENTER_INFO.whatsapp}?text=Hello%20St.%20Stephen%20Health%20Center,%20I%20am%20looking%20for%20my%20order%20status.`}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{t.trackerWhatsappHelp}</span>
              </a>
              <button
                onClick={() => handleSelectDemo('ST-LAB-4821')}
                className="px-4 py-2 bg-[#002f6c] hover:bg-[#001f47] text-white rounded-lg text-xs font-bold cursor-pointer transition-colors"
              >
                {language === 'fr' ? 'Voir un exemple' : 'View Sample Order'}
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden max-w-5xl mx-auto">
            
            {/* Top Status Header Banner */}
            {(() => {
              const badge = getStatusBadge(currentOrder);
              const BadgeIcon = badge.icon;
              return (
                <div className="p-6 sm:p-7 bg-[#002f6c] text-white flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-blue-900">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="font-mono text-xl sm:text-2xl font-black text-amber-300 tracking-wider">
                        {currentOrder.orderId}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-white/15 text-blue-100">
                        {currentOrder.type === 'lab_test'
                          ? language === 'fr' ? 'ANALYSE DE LABORATOIRE' : 'DIAGNOSTIC LAB TEST'
                          : currentOrder.fulfillmentType === 'delivery'
                          ? language === 'fr' ? 'LIVRAISON PHARMACIE (MOTO)' : 'PHARMACY DELIVERY (MOTO)'
                          : language === 'fr' ? 'RETRAIT AU COMPTOIR PHARMACIE' : 'PHARMACY COUNTER PICKUP'}
                      </span>
                      <span className="text-xs text-blue-200">
                        • {currentOrder.createdAt}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-blue-100 max-w-2xl leading-relaxed">
                      {language === 'fr' ? currentOrder.statusDescriptionFr : currentOrder.statusDescriptionEn}
                    </p>
                  </div>

                  {/* Status Indicator Pill */}
                  <div className="flex-shrink-0">
                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border font-bold text-xs sm:text-sm shadow-xs ${badge.bg}`}>
                      <span className={`w-2.5 h-2.5 rounded-full ${badge.dot}`} />
                      <BadgeIcon className="w-4 h-4" />
                      <span>{badge.label}</span>
                    </div>
                    <div className="text-right mt-1.5">
                      <span className="text-[11px] text-blue-200 font-medium">
                        {language === 'fr' ? 'Délai estimé :' : 'Est. Completion:'}{' '}
                        <strong className="text-white">{currentOrder.estimatedCompletion}</strong>
                      </span>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Main Content Grid: Timeline on Left, Details on Right */}
            <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
              
              {/* Left: Progress Stepper */}
              <div className="lg:col-span-6 p-6 sm:p-8">
                <div className="flex items-center gap-2 pb-4 mb-6 border-b border-slate-100">
                  <Clock className="w-5 h-5 text-[#002f6c]" />
                  <h3 className="font-bold text-base text-slate-900 font-display">
                    {t.trackerProgressTimeline}
                  </h3>
                </div>

                <div className="relative pl-8 sm:pl-9 space-y-6 before:absolute before:left-[13px] sm:before:left-[15px] before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                  {currentOrder.timeline.map((step, idx) => (
                    <div key={idx} className="relative group">
                      {/* Step Indicator Bullet */}
                      <div
                        className={`absolute -left-8 sm:-left-9 top-0.5 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                          step.completed
                            ? 'bg-emerald-600 text-white shadow-xs'
                            : step.current
                            ? 'bg-[#002f6c] text-white ring-4 ring-blue-100 shadow-xs'
                            : 'bg-slate-200 text-slate-500'
                        }`}
                      >
                        {step.completed ? (
                          <CheckCircle2 className="w-4 h-4" />
                        ) : (
                          <span>{idx + 1}</span>
                        )}
                      </div>

                      {/* Step Content */}
                      <div>
                        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-0.5 sm:gap-2">
                          <h4 className={`text-sm font-bold ${
                            step.completed || step.current ? 'text-slate-900' : 'text-slate-500'
                          }`}>
                            {language === 'fr' && step.titleFr ? step.titleFr : step.title}
                          </h4>
                          <span className="text-[11px] font-mono text-slate-400 font-medium whitespace-nowrap">
                            {step.timestamp}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                          {language === 'fr' && step.descriptionFr ? step.descriptionFr : step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Bottom Quick Action */}
                <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between gap-3 text-xs">
                  <span className="text-slate-500 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Terranova, Bonamekano Clinic Dispatch</span>
                  </span>
                  <a
                    href={`https://wa.me/${HEALTH_CENTER_INFO.whatsapp}?text=Hello%20St.%20Stephen,%20I%20am%20checking%20the%20status%20of%20reference%20${currentOrder.orderId}.`}
                    target="_blank"
                    rel="noreferrer"
                    className="font-bold text-[#002f6c] hover:underline flex items-center gap-1"
                  >
                    <span>{t.trackerWhatsappHelp}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Right: Specialized Order / Lab Result Details */}
              <div className="lg:col-span-6 p-6 sm:p-8 bg-slate-50/50 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-200">
                    <div className="flex items-center gap-2">
                      {currentOrder.type === 'lab_test' ? (
                        <FlaskConical className="w-5 h-5 text-[#002f6c]" />
                      ) : (
                        <Package className="w-5 h-5 text-[#002f6c]" />
                      )}
                      <h3 className="font-bold text-base text-slate-900 font-display">
                        {currentOrder.type === 'lab_test'
                          ? language === 'fr' ? 'Fiche d’Analyse & Résultats' : 'Lab Test & Result Record'
                          : language === 'fr' ? 'Bordereau de Délivrance Pharmacie' : 'Pharmacy Dispensing Record'}
                      </h3>
                    </div>

                    {currentOrder.type === 'lab_test' && currentOrder.canDownloadReport && (
                      <button
                        onClick={() => setIsCertificateModalOpen(true)}
                        className="px-3 py-1.5 bg-[#002f6c] hover:bg-[#001f47] text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-xs cursor-pointer"
                        id="view-official-certificate-btn"
                      >
                        <FileText className="w-3.5 h-3.5 text-amber-300" />
                        <span>{t.trackerDownloadCertificate}</span>
                      </button>
                    )}
                  </div>

                  {/* LAB TEST SPECIFIC CARD */}
                  {currentOrder.type === 'lab_test' ? (
                    <div className="space-y-4 text-xs">
                      {/* Patient & Sampling metadata */}
                      <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
                        <div className="flex justify-between">
                          <span className="text-slate-500 font-medium">{t.trackerPatient}:</span>
                          <span className="font-bold text-slate-900">
                            {currentOrder.patientName || currentOrder.customerName} ({currentOrder.patientAge})
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500 font-medium">{t.trackerSpecimenType}:</span>
                          <span className="font-semibold text-slate-800">{currentOrder.specimenType}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500 font-medium">
                            {language === 'fr' ? 'Prélèvement Réalisé :' : 'Sampling Taken:'}
                          </span>
                          <span className="text-slate-700">{currentOrder.samplingDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500 font-medium">{t.trackerLabDoctor}:</span>
                          <span className="font-bold text-[#002f6c]">{currentOrder.labDoctorName}</span>
                        </div>
                      </div>

                      {/* Official Lab Results Table */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                            {t.trackerOfficialResults}
                          </span>
                          <span className="text-[11px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                            {language === 'fr' ? 'Accrédité St. Stephen' : 'Accredited Lab Findings'}
                          </span>
                        </div>

                        {currentOrder.labResults && currentOrder.labResults.length > 0 ? (
                          <div className="space-y-2.5">
                            {currentOrder.labResults.map((res, i) => (
                              <div
                                key={i}
                                className="p-3 bg-white rounded-xl border border-slate-200 space-y-1"
                              >
                                <div className="flex items-start justify-between gap-2">
                                  <div>
                                    <p className="font-bold text-slate-900 text-xs">{res.testName}</p>
                                    <p className="text-[11px] text-slate-500">{res.parameter}</p>
                                  </div>
                                  <span
                                    className={`px-2 py-0.5 rounded text-[10px] font-black uppercase whitespace-nowrap ${
                                      res.status === 'negative'
                                        ? 'bg-emerald-100 text-emerald-800'
                                        : res.status === 'normal'
                                        ? 'bg-blue-100 text-blue-800'
                                        : 'bg-amber-100 text-amber-800'
                                    }`}
                                  >
                                    {res.status}
                                  </span>
                                </div>

                                <div className="pt-1 flex items-baseline justify-between text-xs">
                                  <span className="text-slate-500">
                                    {language === 'fr' ? 'Valeur trouvée :' : 'Measured Value:'}
                                  </span>
                                  <span className="font-mono font-bold text-slate-900">
                                    {res.resultValue}
                                  </span>
                                </div>

                                <p className="text-[11px] text-slate-600 bg-slate-50 p-1.5 rounded border border-slate-100 italic">
                                  "{res.notes}"
                                </p>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="p-4 bg-blue-50/60 rounded-xl border border-blue-200 text-center text-xs text-blue-900">
                            <Clock className="w-5 h-5 mx-auto text-blue-700 mb-1 animate-spin" />
                            <p className="font-bold">
                              {language === 'fr'
                                ? 'Analyses microscopiques et sérologiques en cours de lecture.'
                                : 'Microscopic and serological readings in active analysis.'}
                            </p>
                            <p className="text-[11px] text-blue-700 mt-0.5">
                              {language === 'fr'
                                ? 'Les résultats définitifs apparaîtront dès signature par le biologiste.'
                                : 'Final values will appear here as soon as certified by the lab biologist.'}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    /* PHARMACY DELIVERY / PICKUP SPECIFIC CARD */
                    <div className="space-y-4 text-xs">
                      {/* Courier & Delivery location */}
                      <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
                        <div className="flex justify-between">
                          <span className="text-slate-500 font-medium">{t.trackerPatient}:</span>
                          <span className="font-bold text-slate-900">{currentOrder.customerName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500 font-medium">
                            {language === 'fr' ? 'Téléphone client :' : 'Customer Phone:'}
                          </span>
                          <span className="font-mono font-bold text-slate-800">{currentOrder.phone}</span>
                        </div>

                        {currentOrder.fulfillmentType === 'delivery' ? (
                          <>
                            <div className="flex justify-between">
                              <span className="text-slate-500 font-medium">{t.trackerDeliveryAddress}:</span>
                              <span className="font-semibold text-slate-900 max-w-[200px] text-right">
                                {currentOrder.deliveryAddress}
                              </span>
                            </div>
                            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Truck className="w-4 h-4 text-amber-600" />
                                <div>
                                  <p className="font-bold text-slate-900">{currentOrder.courierName}</p>
                                  <p className="text-[10px] text-slate-500 font-mono">Immatriculation: {currentOrder.courierPlate}</p>
                                </div>
                              </div>
                              <a
                                href={`tel:${currentOrder.courierPhone?.replace(/\s+/g, '')}`}
                                className="px-2.5 py-1 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-lg text-xs flex items-center gap-1 transition-colors"
                              >
                                <Phone className="w-3 h-3" />
                                <span>{language === 'fr' ? 'Appeler coursier' : 'Call Courier'}</span>
                              </a>
                            </div>
                          </>
                        ) : (
                          <div className="flex justify-between">
                            <span className="text-slate-500 font-medium">{t.trackerDeliveryAddress}:</span>
                            <span className="font-bold text-emerald-800">
                              {currentOrder.deliveryAddress}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Items Ordered Table */}
                      <div>
                        <p className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-2">
                          {t.trackerItemsOrdered}
                        </p>
                        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden divide-y divide-slate-100">
                          {currentOrder.items?.map((item, i) => (
                            <div key={i} className="p-3 flex items-center justify-between">
                              <div>
                                <p className="font-bold text-slate-900 text-xs">{item.name}</p>
                                <p className="text-[11px] text-slate-500">
                                  {language === 'fr' ? 'Quantité :' : 'Qty:'} {item.quantity}
                                </p>
                              </div>
                              <span className="font-mono font-bold text-slate-900">
                                {formatCurrency(item.priceXAF * item.quantity, currency)}
                              </span>
                            </div>
                          ))}

                          {currentOrder.totalAmountXAF && (
                            <div className="p-3 bg-slate-50 flex items-center justify-between font-bold">
                              <span className="text-slate-700">Total :</span>
                              <span className="text-[#d81e27] font-black text-sm">
                                {formatCurrency(currentOrder.totalAmountXAF, currency)}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Payment Terms note */}
                      <div className="p-3 bg-blue-50 rounded-xl border border-blue-200 flex items-center justify-between text-xs">
                        <span className="font-medium text-blue-900">{t.trackerPaymentMethod}:</span>
                        <span className="font-bold text-[#002f6c] uppercase">
                          {currentOrder.paymentStatus === 'paid'
                            ? language === 'fr' ? 'Réglé' : 'Paid'
                            : currentOrder.paymentStatus === 'pending_on_delivery'
                            ? language === 'fr' ? 'Paiement à la livraison (Cash / MoMo)' : 'Pay on Delivery (Cash / MoMo)'
                            : language === 'fr' ? 'Règlement au comptoir' : 'Pay at Counter'}
                        </span>
                      </div>
                    </div>
                  )}

                </div>

                {/* Bottom Assistance Card */}
                <div className="mt-6 pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="text-xs text-slate-500 text-center sm:text-left">
                    <p className="font-bold text-slate-700">
                      {language === 'fr' ? 'Une question sur cette référence ?' : 'Questions about this reference?'}
                    </p>
                    <p>{HEALTH_CENTER_INFO.phones[0]} • Terranova, Bonamekano</p>
                  </div>

                  <a
                    href={`https://wa.me/${HEALTH_CENTER_INFO.whatsapp}?text=Hello%20St.%20Stephen%20Health%20Center,%20I%20am%20inquiring%20about%20order%20${currentOrder.orderId}.`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-colors whitespace-nowrap"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp Support</span>
                  </a>
                </div>

              </div>

            </div>

          </div>
        )}

      </div>

      {/* Official Medical Lab Certificate Modal (Print Friendly) */}
      {isCertificateModalOpen && currentOrder && currentOrder.type === 'lab_test' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[92vh] flex flex-col overflow-hidden shadow-2xl border border-slate-200 relative my-auto animate-in fade-in zoom-in-95">
            
            {/* Top Bar with Print and Close */}
            <div className="bg-slate-900 text-white p-3.5 px-4 sm:px-6 flex items-center justify-between no-print flex-shrink-0">
              <span className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-2 truncate pr-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span className="truncate">{language === 'fr' ? 'Certificat Médical Officiel' : 'Official Medical Certificate'}</span>
              </span>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => window.print()}
                  className="px-3 py-1.5 bg-white/15 hover:bg-white/25 rounded text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer min-h-[34px]"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{language === 'fr' ? 'Imprimer / PDF' : 'Print / PDF'}</span>
                  <span className="sm:hidden">{language === 'fr' ? 'PDF' : 'PDF'}</span>
                </button>
                <button
                  onClick={() => setIsCertificateModalOpen(false)}
                  className="p-1.5 rounded-full hover:bg-white/10 text-white cursor-pointer"
                  aria-label="Close certificate modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Printable Certificate Sheet */}
            <div className="p-4 sm:p-8 space-y-5 sm:space-y-6 text-slate-800 print:p-0 overflow-y-auto overscroll-contain flex-1">
              
              {/* Official Clinic Letterhead */}
              <div className="text-center pb-4 border-b-2 border-[#002f6c]">
                <p className="text-[9px] sm:text-[10px] uppercase font-bold text-slate-500 tracking-widest leading-tight">
                  RÉPUBLIQUE DU CAMEROUN • MINISTÈRE DE LA SANTÉ PUBLIQUE
                </p>
                <p className="text-[9px] sm:text-[10px] text-slate-500 mt-0.5">
                  Délégation Régionale du Littoral • District de Santé de Bonassama • Aire de santé de BONAMEKANO
                </p>
                <h3 className="text-lg sm:text-2xl font-black text-[#002f6c] tracking-tight uppercase font-display mt-2">
                  ST. STEPHEN HEALTH CENTER & CLINICAL LABORATORY
                </h3>
                <p className="text-[11px] sm:text-xs font-bold text-slate-600">
                  Terranova, Bonamekano • Tél: {HEALTH_CENTER_INFO.phones[0]} / {HEALTH_CENTER_INFO.phones[1]}
                </p>
                <div className="inline-block mt-2.5 px-3 py-1 rounded bg-blue-50 border border-blue-200">
                  <h4 className="text-[11px] sm:text-sm font-black text-[#002f6c] uppercase tracking-wider font-display">
                    BULLETIN D'ANALYSES MÉDICALES & CERTIFICAT D'APTITUDE SCOLAIRE
                  </h4>
                </div>
              </div>

              {/* Patient Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 text-xs bg-slate-50 p-3 sm:p-3.5 rounded-xl border border-slate-200">
                <div>
                  <span className="text-slate-500">Nom du Patient / Élève :</span>
                  <p className="font-black text-slate-900 text-sm">{currentOrder.patientName}</p>
                </div>
                <div>
                  <span className="text-slate-500">Âge :</span>
                  <p className="font-bold text-slate-900">{currentOrder.patientAge}</p>
                </div>
                <div>
                  <span className="text-slate-500">Référence Dossier :</span>
                  <p className="font-mono font-bold text-[#002f6c]">{currentOrder.orderId}</p>
                </div>
                <div>
                  <span className="text-slate-500">Date du Prélèvement :</span>
                  <p className="font-bold text-slate-800">{currentOrder.samplingDate}</p>
                </div>
              </div>

              {/* Diagnostic Results Table */}
              <div className="overflow-x-auto -mx-1 sm:mx-0">
                <table className="w-full text-left text-xs border border-slate-200 rounded-lg overflow-hidden min-w-[480px]">
                  <thead className="bg-[#002f6c] text-white">
                    <tr>
                      <th className="p-2.5">Examen Demandé</th>
                      <th className="p-2.5">Paramètre</th>
                      <th className="p-2.5">Résultat Trouvé</th>
                      <th className="p-2.5">Valeurs de Référence</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {currentOrder.labResults?.map((res, i) => (
                      <tr key={i} className="hover:bg-slate-50">
                        <td className="p-2.5 font-bold text-slate-900">{res.testName}</td>
                        <td className="p-2.5 text-slate-600">{res.parameter}</td>
                        <td className="p-2.5 font-mono font-bold text-[#002f6c]">{res.resultValue}</td>
                        <td className="p-2.5 text-slate-500">{res.referenceRange}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Biologist Clinical Conclusion */}
              <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-950">
                <p className="font-bold uppercase tracking-wider text-emerald-800 mb-1">
                  Conclusion Médicale du Biologiste :
                </p>
                <p className="leading-relaxed">
                  L’élève présente un profil hématologique et sérologique sans anomalie infectieuse aiguë détectée à ce jour. Aptitude médicale sans contre-indication pour l’année scolaire.
                </p>
              </div>

              {/* Signatures and Official Stamp */}
              <div className="pt-4 flex justify-between items-end">
                <div className="text-[11px] text-slate-500">
                  <p>Terranova, le 24 Août 2026</p>
                  <p className="italic">Accréditation N° 0482/MINSANTE/DRSPL/DSB</p>
                </div>

                <div className="text-center">
                  <div className="inline-block p-3 border-2 border-dashed border-[#002f6c] rounded-xl text-center bg-blue-50/50 mb-1">
                    <p className="text-[10px] font-black uppercase text-[#002f6c] tracking-wider">
                      ST. STEPHEN HEALTH CENTER
                    </p>
                    <p className="text-[9px] font-bold text-red-600 uppercase">
                      ★ VISA DU BIOLOGISTE MÉDICAL ★
                    </p>
                    <p className="text-[9px] text-slate-700 font-serif italic mt-0.5">
                      {currentOrder.labDoctorName}
                    </p>
                  </div>
                  <p className="text-[10px] text-slate-600 font-bold">Cachet & Signature</p>
                </div>
              </div>

              {/* Modal footer with buttons */}
              <div className="pt-4 border-t border-slate-200 flex justify-end gap-2 no-print">
                <button
                  onClick={() => setIsCertificateModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-100 cursor-pointer"
                >
                  {t.close}
                </button>
                <button
                  onClick={() => window.print()}
                  className="px-5 py-2 rounded-lg bg-[#002f6c] hover:bg-[#001f47] text-white font-bold text-xs flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>{language === 'fr' ? 'Imprimer ce Bulletin' : 'Print Certificate'}</span>
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </section>
  );
};
