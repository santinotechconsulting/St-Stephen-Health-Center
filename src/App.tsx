import React, { useState, useEffect } from 'react';
import {
  MessageCircle,
  Phone,
  ArrowUp,
  Sparkles,
  ShoppingBag,
  Check,
} from 'lucide-react';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { LaboratorySection } from './components/LaboratorySection';
import { PharmacyCatalog } from './components/PharmacyCatalog';
import { ClinicalServices } from './components/ClinicalServices';
import { TestRecommender } from './components/TestRecommender';
import { TestBookingModal } from './components/TestBookingModal';
import { PrescriptionUploadModal } from './components/PrescriptionUploadModal';
import { CartDrawer } from './components/CartDrawer';
import { FAQSection } from './components/FAQSection';
import { OrderTracker } from './components/OrderTracker';
import { Footer } from './components/Footer';
import { CartItem, Product, LabTest } from './types';
import { Currency } from './utils/currency';
import { HEALTH_CENTER_INFO, COMPLETE_CHECKUP_PACKAGE } from './data/pharmacyData';
import { LanguageProvider, useLanguage } from './utils/translations';

function AppContent() {
  const { t, language } = useLanguage();
  const [currency, setCurrency] = useState<Currency>('XAF');
  const [activeSection, setActiveSection] = useState<string>('campaign');
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedBookingTestId, setSelectedBookingTestId] = useState<string | undefined>(undefined);
  const [isPrescriptionModalOpen, setIsPrescriptionModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [trackingOrderId, setTrackingOrderId] = useState<string>('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Cart state with persistence
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('st_stephen_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('st_stephen_cart', JSON.stringify(cartItems));
    } catch {
      // ignore
    }
  }, [cartItems]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.type === 'product' && item.product?.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === existing.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          id: `cart-prod-${product.id}`,
          type: 'product',
          product,
          quantity: 1,
        },
      ];
    });
    showToast(
      language === 'fr'
        ? `« ${product.name} » ajouté au panier`
        : `Added ${product.name} to cart`
    );
  };

  const handleAddTestToCart = (test: LabTest) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.type === 'test' && item.test?.id === test.id);
      if (existing) {
        return prev.map((item) =>
          item.id === existing.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          id: `cart-test-${test.id}`,
          type: 'test',
          test,
          quantity: 1,
        },
      ];
    });
    showToast(
      language === 'fr'
        ? `Examen « ${test.title} » ajouté au panier`
        : `Added ${test.title} to cart`
    );
  };

  const handleUpdateQuantity = (itemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(itemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity: newQty } : item))
    );
  };

  const handleRemoveItem = (itemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
    showToast(language === 'fr' ? 'Article retiré du panier' : 'Item removed from cart');
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenBooking = (testId?: string) => {
    setSelectedBookingTestId(testId);
    setIsBookingModalOpen(true);
  };

  const handleBookSingleTest = (test: LabTest) => {
    handleOpenBooking(test.id);
  };

  const handleBookCompletePackage = () => {
    handleOpenBooking('package-back-to-school-all');
  };

  const handleTrackOrder = (orderId: string) => {
    setTrackingOrderId(orderId);
    handleNavigate('tracking');
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col text-slate-800 font-sans">
      
      {/* Main App Header */}
      <Header
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenPrescriptionModal={() => setIsPrescriptionModalOpen(true)}
        onOpenBookingModal={handleOpenBooking}
        currency={currency}
        onCurrencyChange={setCurrency}
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      <main className="flex-1">
        {/* Campaign Hero Banner mimicking flyer */}
        <HeroBanner
          onBookCheckup={handleBookCompletePackage}
          onExplorePharmacy={() => handleNavigate('pharmacy')}
          onUploadRx={() => setIsPrescriptionModalOpen(true)}
        />

        {/* Diagnostic Laboratory Section directly from flyer */}
        <LaboratorySection
          onBookTest={handleBookSingleTest}
          onBookPackage={handleBookCompletePackage}
          onAddTestToCart={handleAddTestToCart}
          currency={currency}
        />

        {/* Parent Interactive Triage Recommender */}
        <TestRecommender
          onSelectTest={handleBookSingleTest}
          onSelectPackage={handleBookCompletePackage}
          currency={currency}
        />

        {/* Clinical Services: Vaccination & Nutrition from flyer */}
        <ClinicalServices
          onBookConsultation={(service) => handleOpenBooking()}
          onExploreVitamins={() => handleNavigate('pharmacy')}
        />

        {/* Pharmacy & Medicine Dispensary */}
        <PharmacyCatalog
          onAddToCart={handleAddToCart}
          currency={currency}
          onOpenPrescriptionModal={() => setIsPrescriptionModalOpen(true)}
        />

        {/* Real-time Order & Diagnostic Lab Results Tracker */}
        <OrderTracker
          key={trackingOrderId || 'order-tracker-main'}
          currency={currency}
          initialOrderId={trackingOrderId}
          onNavigateToShop={() => handleNavigate('pharmacy')}
          onOpenBookingModal={() => handleOpenBooking()}
        />

        {/* FAQ Section answering Lab Preparation, Delivery, and Insurance */}
        <FAQSection />
      </main>

      {/* Comprehensive St. Stephen Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenBookingModal={() => handleOpenBooking()}
        onOpenPrescriptionModal={() => setIsPrescriptionModalOpen(true)}
      />

      {/* Booking Modal */}
      <TestBookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        initialTestId={selectedBookingTestId}
        currency={currency}
        onTrackOrder={handleTrackOrder}
      />

      {/* Prescription Upload Modal */}
      <PrescriptionUploadModal
        isOpen={isPrescriptionModalOpen}
        onClose={() => setIsPrescriptionModalOpen(false)}
      />

      {/* Cart & Checkout Slide-Over Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        currency={currency}
        onOpenBookingModal={handleOpenBooking}
        onTrackOrder={handleTrackOrder}
      />

      {/* Floating Action WhatsApp Help Button */}
      <div className="fixed bottom-5 right-5 z-30 flex flex-col items-end gap-2">
        <a
          href={`https://wa.me/${HEALTH_CENTER_INFO.whatsapp}?text=Hello%20St.%20Stephen%20Health%20Center,%20I%20need%20assistance%20with%20pharmacy%20or%20lab%20tests.`}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white px-4 py-3 rounded-full shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 group font-bold text-xs"
          id="floating-whatsapp-btn"
          aria-label={t.askPharmacistNav}
        >
          <MessageCircle className="w-5 h-5 fill-white" />
          <span className="hidden sm:inline">{t.askPharmacistNav}</span>
        </a>
      </div>

      {/* Toast notification */}
      {toastMessage && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-xl shadow-2xl text-xs font-semibold flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
