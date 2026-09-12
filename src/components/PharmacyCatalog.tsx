import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  Pill,
  ShoppingBag,
  Sparkles,
  Info,
  Check,
  ShieldAlert,
  X,
  MessageCircle,
  Clock,
  Heart,
} from 'lucide-react';
import { PRODUCTS_CATALOG } from '../data/pharmacyData';
import { Product } from '../types';
import { formatCurrency, Currency } from '../utils/currency';
import { useLanguage } from '../utils/translations';

interface PharmacyCatalogProps {
  onAddToCart: (product: Product) => void;
  currency: Currency;
  onOpenPrescriptionModal: () => void;
}

export const PharmacyCatalog: React.FC<PharmacyCatalogProps> = ({
  onAddToCart,
  currency,
  onOpenPrescriptionModal,
}) => {
  const { t, language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [prescriptionFilter, setPrescriptionFilter] = useState<'all' | 'otc' | 'rx'>('all');

  const categories = [
    { id: 'all', label: language === 'fr' ? 'Tous les produits' : 'All Products' },
    { id: 'vitamins', label: language === 'fr' ? 'Vitamines & Croissance' : 'Vitamins & Nutrition' },
    { id: 'essential', label: language === 'fr' ? 'Médicaments Essentiels' : 'Essential Medicines' },
    { id: 'pediatric', label: language === 'fr' ? 'Soins Pédiatriques' : 'Pediatric Care' },
    { id: 'first-aid', label: language === 'fr' ? 'Premiers Secours & Matériel' : 'First Aid & Devices' },
    { id: 'maternal', label: language === 'fr' ? 'Maternité & Bébé' : 'Maternal & Baby' },
  ];

  const filteredProducts = useMemo(() => {
    return PRODUCTS_CATALOG.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.activeIngredients.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCat =
        selectedCategory === 'all' || item.category === selectedCategory;

      const matchesRx =
        prescriptionFilter === 'all' ||
        (prescriptionFilter === 'otc' && !item.requiresPrescription) ||
        (prescriptionFilter === 'rx' && item.requiresPrescription);

      return matchesSearch && matchesCat && matchesRx;
    });
  }, [searchQuery, selectedCategory, prescriptionFilter]);

  return (
    <section id="pharmacy" className="py-12 sm:py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-100 text-[#002f6c] text-xs font-bold uppercase tracking-wider mb-2">
              <Pill className="w-3.5 h-3.5 text-blue-700" />
              <span>{t.pharmacyBadge}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#002f6c] tracking-tight uppercase font-display">
              {t.pharmacyTitle}
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              {t.pharmacySubtitle}
            </p>
          </div>

          {/* Prescription Fast CTA */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 flex-shrink-0">
            <div>
              <p className="text-xs font-bold text-emerald-950">
                {language === 'fr' ? 'Vous avez une ordonnance médicale ?' : "Have a Doctor's Prescription?"}
              </p>
              <p className="text-[11px] text-emerald-700">
                {language === 'fr' ? 'Téléversez la photo pour une préparation rapide' : 'Upload paper Rx for rapid preparation'}
              </p>
            </div>
            <button
              onClick={onOpenPrescriptionModal}
              className="w-full sm:w-auto px-4 py-2.5 min-h-[40px] bg-[#0e7c3a] hover:bg-emerald-800 active:bg-emerald-900 text-white text-xs font-bold rounded-lg transition-colors shadow-xs cursor-pointer whitespace-nowrap text-center justify-center flex items-center"
              id="catalog-upload-rx-btn"
            >
              {language === 'fr' ? 'Téléverser ordonnance' : 'Upload Rx Photo'}
            </button>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-slate-50 p-3 sm:p-4 rounded-xl border border-slate-200 mb-8 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 sm:gap-4">
          
          {/* Search Box */}
          <div className="relative w-full lg:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.pharmacySearchPlaceholder}
              className="w-full pl-9.5 pr-8 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003882] focus:border-transparent min-h-[40px]"
              id="pharmacy-search-input"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Category Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 scrollbar-none -mx-1 px-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer min-h-[36px] ${
                  selectedCategory === cat.id
                    ? 'bg-[#002f6c] text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-slate-200/70 border border-slate-200'
                }`}
                id={`cat-filter-${cat.id}`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* OTC / Prescription Filter */}
          <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-slate-200 text-xs w-full sm:w-auto justify-between sm:justify-end overflow-x-auto">
            <span className="text-slate-400 px-1.5 font-medium whitespace-nowrap hidden sm:inline">
              {language === 'fr' ? 'Type :' : 'Type:'}
            </span>
            <button
              onClick={() => setPrescriptionFilter('all')}
              className={`px-2.5 py-1.5 min-h-[32px] rounded font-bold cursor-pointer whitespace-nowrap flex-1 sm:flex-initial text-center ${
                prescriptionFilter === 'all'
                  ? 'bg-slate-800 text-white'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {language === 'fr' ? 'Tous' : 'All'}
            </button>
            <button
              onClick={() => setPrescriptionFilter('otc')}
              className={`px-2.5 py-1.5 min-h-[32px] rounded font-bold cursor-pointer whitespace-nowrap flex-1 sm:flex-initial text-center ${
                prescriptionFilter === 'otc'
                  ? 'bg-emerald-700 text-white'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {language === 'fr' ? 'Sans ordonnance' : 'OTC (No Rx)'}
            </button>
            <button
              onClick={() => setPrescriptionFilter('rx')}
              className={`px-2.5 py-1.5 min-h-[32px] rounded font-bold cursor-pointer whitespace-nowrap flex-1 sm:flex-initial text-center ${
                prescriptionFilter === 'rx'
                  ? 'bg-red-700 text-white'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {language === 'fr' ? 'Sur ordonnance' : 'Rx Only'}
            </button>
          </div>

        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
            <Pill className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-700">
              {language === 'fr' ? 'Aucun produit trouvé selon ces critères' : 'No medications found matching your criteria'}
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              {language === 'fr' ? 'Essayez de modifier votre recherche ou vos filtres.' : 'Try clearing your search query or category filters.'}
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setPrescriptionFilter('all');
              }}
              className="mt-4 px-4 py-2 rounded-lg bg-[#002f6c] text-white text-xs font-bold cursor-pointer"
            >
              {language === 'fr' ? 'Réinitialiser' : 'Reset Filters'}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl border border-slate-200 hover:border-blue-400 shadow-xs hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group"
                id={`product-card-${product.id}`}
              >
                <div>
                  {/* Image container */}
                  <div className="relative h-44 bg-slate-100 overflow-hidden cursor-pointer" onClick={() => setSelectedProduct(product)}>
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-blue-50 text-blue-300">
                        <Pill className="w-12 h-12" />
                      </div>
                    )}

                    {/* Top Badges */}
                    <div className="absolute top-2 left-2 flex flex-col gap-1">
                      {product.badge && (
                        <span className="bg-[#d81e27] text-white text-[10px] font-black uppercase px-2 py-0.5 rounded shadow-xs">
                          {product.badge}
                        </span>
                      )}
                      {product.requiresPrescription ? (
                        <span className="bg-amber-600 text-white text-[9px] font-bold uppercase px-1.5 py-0.5 rounded shadow-xs flex items-center gap-1">
                          <ShieldAlert className="w-3 h-3" />
                          <span>{language === 'fr' ? 'Sur ordonnance (Rx)' : 'Prescription (Rx)'}</span>
                        </span>
                      ) : (
                        <span className="bg-emerald-600 text-white text-[9px] font-bold uppercase px-1.5 py-0.5 rounded shadow-xs">
                          {language === 'fr' ? 'Vente libre (OTC)' : 'OTC Available'}
                        </span>
                      )}
                    </div>

                    <span className="absolute bottom-2 right-2 bg-slate-900/80 text-white text-[10px] px-1.5 py-0.5 rounded backdrop-blur-xs font-medium">
                      {product.categoryLabel}
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="p-4">
                    <h3
                      onClick={() => setSelectedProduct(product)}
                      className="font-bold text-slate-900 text-sm hover:text-[#002f6c] cursor-pointer line-clamp-2 leading-tight"
                    >
                      {product.name}
                    </h3>

                    <p className="text-[11px] text-slate-500 mt-1 line-clamp-1">
                      <span className="font-semibold text-slate-600">
                        {language === 'fr' ? 'Formule :' : 'Active:'}
                      </span> {product.activeIngredients}
                    </p>

                    <p className="text-xs text-slate-600 mt-1.5 line-clamp-2">
                      {product.description}
                    </p>

                    <div className="mt-2 text-[11px] text-slate-500 bg-slate-50 p-2 rounded border border-slate-100">
                      <span className="font-semibold text-slate-700">
                        {language === 'fr' ? 'Posologie :' : 'Dose:'}
                      </span> {product.dosage}
                    </div>
                  </div>
                </div>

                {/* Card Footer with Price and Add to Cart */}
                <div className="p-4 pt-0 border-t border-slate-100 flex items-center justify-between gap-2 mt-2">
                  <div>
                    {product.originalPriceXAF && (
                      <span className="text-[11px] text-slate-400 line-through block">
                        {formatCurrency(product.originalPriceXAF, currency)}
                      </span>
                    )}
                    <span className="text-base font-black text-[#002f6c]">
                      {formatCurrency(product.priceXAF, currency)}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setSelectedProduct(product)}
                      className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100 text-xs cursor-pointer"
                      title={language === 'fr' ? 'Détails du produit' : 'View Details'}
                      aria-label="View product details"
                    >
                      <Info className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onAddToCart(product)}
                      className="px-3 py-2 rounded-lg bg-[#002f6c] hover:bg-[#001f47] text-white text-xs font-bold transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
                      id={`add-cart-btn-${product.id}`}
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>{t.cart}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[92vh] flex flex-col overflow-hidden shadow-2xl border border-slate-200 relative my-auto animate-in fade-in zoom-in-95">
            
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-xs hover:bg-slate-100 text-slate-700 z-10 transition-colors shadow-sm cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="overflow-y-auto flex-1 overscroll-contain">
              {selectedProduct.image && (
                <div className="h-44 sm:h-52 bg-slate-100 overflow-hidden relative flex-shrink-0">
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 flex-wrap pr-12">
                    <span className="bg-[#002f6c] text-white text-xs font-bold px-2.5 py-1 rounded shadow-xs">
                      {selectedProduct.categoryLabel}
                    </span>
                    {selectedProduct.badge && (
                      <span className="bg-[#d81e27] text-white text-xs font-bold px-2.5 py-1 rounded shadow-xs">
                        {selectedProduct.badge}
                      </span>
                    )}
                  </div>
                </div>
              )}

              <div className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-display">
                  {selectedProduct.name}
                </h3>

                <div className="mt-2 flex items-center gap-2">
                  <span className="text-xl sm:text-2xl font-black text-[#002f6c]">
                    {formatCurrency(selectedProduct.priceXAF, currency)}
                  </span>
                  {selectedProduct.originalPriceXAF && (
                    <span className="text-xs sm:text-sm text-slate-400 line-through">
                      {formatCurrency(selectedProduct.originalPriceXAF, currency)}
                    </span>
                  )}
                </div>

                <div className="mt-4 space-y-2.5 sm:space-y-3 text-xs sm:text-sm text-slate-700">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <p className="font-bold text-slate-900 mb-1">
                      {language === 'fr' ? 'Formule active / Ingrédients :' : 'Active Formula / Ingredients:'}
                    </p>
                    <p className="text-slate-600">{selectedProduct.activeIngredients}</p>
                  </div>

                  <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-200">
                    <p className="font-bold text-blue-900 mb-1">
                      {language === 'fr' ? 'Posologie recommandée & Usage :' : 'Recommended Usage & Dosage:'}
                    </p>
                    <p className="text-blue-800">{selectedProduct.dosage}</p>
                  </div>

                  <div>
                    <p className="font-bold text-slate-900 mb-1">
                      {language === 'fr' ? 'Indications & Bienfaits :' : 'Indications & Benefits:'}
                    </p>
                    <p className="text-slate-600 leading-relaxed">{selectedProduct.description}</p>
                  </div>

                  {selectedProduct.requiresPrescription && (
                    <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 flex items-start gap-2 text-amber-900 text-xs">
                      <ShieldAlert className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
                      <span>
                        {language === 'fr'
                          ? 'Médicament sous réglementation médicale. Notre pharmacien vérifiera l’ordonnance ou le certificat médical avant délivrance.'
                          : "This is a regulated prescription medication. Our pharmacist will verify your doctor's note or medical fitness history before dispensing."}
                      </span>
                    </div>
                  )}
                </div>

                {/* Action Buttons in Modal */}
                <div className="mt-6 pt-4 border-t border-slate-200 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2.5">
                  <button
                    onClick={() => setSelectedProduct(null)}
                    className="w-full sm:w-auto px-4 py-2.5 min-h-[40px] rounded-lg border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-100 cursor-pointer text-center justify-center flex items-center"
                  >
                    {language === 'fr' ? 'Fermer' : 'Close'}
                  </button>
                  <button
                    onClick={() => {
                      onAddToCart(selectedProduct);
                      setSelectedProduct(null);
                    }}
                    className="w-full sm:w-auto px-5 py-2.5 min-h-[40px] rounded-lg bg-[#002f6c] hover:bg-[#001f47] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>{t.cart}</span>
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
