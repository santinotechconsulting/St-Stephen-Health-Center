import React, { useState } from 'react';
import {
  Phone,
  Clock,
  MapPin,
  ShoppingBag,
  UploadCloud,
  FlaskConical,
  Pill,
  Menu,
  X,
  Sparkles,
  MessageCircle,
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { HEALTH_CENTER_INFO } from '../data/pharmacyData';
import { Currency } from '../utils/currency';
import { useLanguage } from '../utils/translations';
import { LanguageSwitcher } from './LanguageSwitcher';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenPrescriptionModal: () => void;
  onOpenBookingModal: (testId?: string) => void;
  currency: Currency;
  onCurrencyChange: (c: Currency) => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenCart,
  onOpenPrescriptionModal,
  onOpenBookingModal,
  currency,
  onCurrencyChange,
  activeSection,
  onNavigate,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t, language } = useLanguage();

  const navLinks = [
    { id: 'campaign', label: t.navCampaign, badge: language === 'fr' ? 'Réduit' : 'Discounted' },
    { id: 'lab-tests', label: t.navLabTests, icon: FlaskConical },
    { id: 'pharmacy', label: t.navPharmacy, icon: Pill },
    { id: 'tracking', label: t.navTrackOrder, icon: Clock },
    { id: 'clinical', label: t.navClinical },
    { id: 'faq', label: t.navFaq },
    { id: 'contact', label: t.navContact },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
      {/* Top Notice & Hotlines Bar */}
      <div className="bg-[#002855] text-white text-xs py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* Location & Accreditation */}
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1 text-slate-200 font-medium">
              <MapPin className="w-3.5 h-3.5 text-red-400" />
              <span>{HEALTH_CENTER_INFO.subtitle}</span>
            </span>
            <span className="hidden md:inline-block text-blue-300 font-semibold border-l border-blue-800 pl-3">
              {HEALTH_CENTER_INFO.zone}
            </span>
            <span className="hidden lg:inline-flex items-center gap-1 text-emerald-300 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30 font-medium">
              <Clock className="w-3 h-3" />
              <span>{language === 'fr' ? 'Ouvert aujourd’hui' : 'Open Today'}: {HEALTH_CENTER_INFO.hours.weekday}</span>
            </span>
          </div>

          {/* Contact Numbers, Language Switcher & Currency Switcher */}
          <div className="flex items-center gap-2 sm:gap-4 ml-auto">
            {/* Phone Hotline */}
            <div className="flex items-center gap-2 text-white">
              <a
                href={`tel:${HEALTH_CENTER_INFO.phones[0].replace(/\s+/g, '')}`}
                className="hover:text-amber-300 transition-colors flex items-center gap-1 font-semibold"
                id="header-phone-link-1"
              >
                <Phone className="w-3 h-3 text-amber-400" />
                <span className="hidden sm:inline">{HEALTH_CENTER_INFO.phones[0]}</span>
                <span className="sm:hidden">Appel</span>
              </a>
              <span className="hidden sm:inline text-blue-400">•</span>
              <a
                href={`https://wa.me/${HEALTH_CENTER_INFO.whatsapp}?text=Hello%20St.%20Stephen%20Health%20Center`}
                target="_blank"
                rel="noreferrer"
                className="hidden sm:flex items-center gap-1 text-emerald-300 hover:text-emerald-200 font-semibold"
                id="header-whatsapp-top-link"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>{t.askPharmacistNav}</span>
              </a>
            </div>

            {/* Language Switcher in Top Bar */}
            <LanguageSwitcher variant="compact" />

            {/* Currency Selector */}
            <div className="flex items-center gap-1 bg-[#001b3d] px-2 py-0.5 rounded border border-blue-900 text-[11px]">
              <span className="text-slate-400 font-medium hidden sm:inline">{t.currencyLabel}:</span>
              {(['XAF', 'USD', 'EUR'] as Currency[]).map((curr) => (
                <button
                  key={curr}
                  onClick={() => onCurrencyChange(curr)}
                  className={`px-1 rounded font-bold transition-colors cursor-pointer ${
                    currency === curr
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-300 hover:text-white'
                  }`}
                  id={`curr-btn-${curr.toLowerCase()}`}
                >
                  {curr === 'XAF' ? t.xafUnit : curr}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 sm:py-3">
        <div className="flex items-center justify-between gap-3">
          {/* Brand Identity */}
          <div
            onClick={() => handleNavClick('campaign')}
            className="cursor-pointer flex-shrink-0"
            id="brand-logo-trigger"
          >
            <BrandLogo size="md" />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all relative cursor-pointer ${
                    isActive
                      ? 'text-[#002f6c] bg-blue-50/80 font-bold'
                      : 'text-slate-700 hover:text-[#002f6c] hover:bg-slate-100/70'
                  }`}
                  id={`nav-link-${item.id}`}
                >
                  <span className="flex items-center gap-1.5">
                    {item.label}
                    {item.badge && (
                      <span className="text-[10px] font-bold px-1.5 py-0.2 bg-red-600 text-white rounded-full uppercase tracking-tight">
                        {item.badge}
                      </span>
                    )}
                  </span>
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-[2.5px] bg-[#002f6c] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action CTAs & Language Switcher */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Prominent Header Language Switcher (Desktop) */}
            <div className="hidden md:block">
              <LanguageSwitcher variant="header" />
            </div>

            {/* Prescription Upload Button */}
            <button
              onClick={onOpenPrescriptionModal}
              className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-300 hover:bg-emerald-100 transition-colors shadow-xs cursor-pointer"
              id="upload-prescription-header-btn"
            >
              <UploadCloud className="w-4 h-4 text-emerald-700" />
              <span>{t.uploadRxNav}</span>
            </button>

            {/* Book Health Check-Up Button */}
            <button
              onClick={() => onOpenBookingModal()}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold text-white bg-[#d81e27] hover:bg-red-700 transition-colors shadow-sm cursor-pointer"
              id="book-checkup-header-btn"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.bookCheckupNav}</span>
            </button>

            {/* Shopping Cart Drawer Trigger */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800 transition-colors flex items-center gap-1.5 cursor-pointer"
              id="header-cart-btn"
              aria-label={t.cart}
            >
              <ShoppingBag className="w-5 h-5 text-[#002f6c]" />
              {cartCount > 0 ? (
                <span className="absolute -top-1.5 -right-1.5 bg-[#d81e27] text-white text-[11px] font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-sm">
                  {cartCount}
                </span>
              ) : null}
              <span className="hidden xl:inline text-xs font-semibold text-slate-700">
                {t.cart}
              </span>
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 border border-slate-200 cursor-pointer"
              id="mobile-menu-toggle-btn"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-down Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-slate-200 flex flex-col gap-2 pb-2">
            {/* Language Selector in Mobile Menu */}
            <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                {language === 'fr' ? 'Langue / Language:' : 'Language / Langue:'}
              </span>
              <LanguageSwitcher variant="compact" />
            </div>

            {navLinks.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold text-left cursor-pointer ${
                  activeSection === item.id
                    ? 'bg-blue-50 text-[#002f6c] font-bold'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span>{item.label}</span>
                {item.badge && (
                  <span className="text-[10px] bg-red-600 text-white font-bold px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenPrescriptionModal();
                }}
                className="flex items-center justify-center gap-1.5 px-3 py-3 rounded-xl text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 cursor-pointer min-h-[44px]"
              >
                <UploadCloud className="w-4 h-4 text-emerald-700" />
                <span>{t.uploadRxNav}</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBookingModal();
                }}
                className="flex items-center justify-center gap-1.5 px-3 py-3 rounded-xl text-xs font-bold text-white bg-[#d81e27] hover:bg-red-700 transition-colors cursor-pointer min-h-[44px]"
              >
                <Sparkles className="w-4 h-4" />
                <span>{t.bookCheckupNav}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
