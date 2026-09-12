import React, { useState } from 'react';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  MessageCircle,
  CreditCard,
  Building,
  Truck,
  CheckCircle2,
  Sparkles,
  Clock,
} from 'lucide-react';
import { CartItem } from '../types';
import { formatCurrency, Currency } from '../utils/currency';
import { HEALTH_CENTER_INFO } from '../data/pharmacyData';
import { registerCartOrder } from '../data/orderTrackingData';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  currency: Currency;
  onOpenBookingModal: (testId?: string) => void;
  onTrackOrder?: (orderId: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  currency,
  onOpenBookingModal,
  onTrackOrder,
}) => {
  const [fulfillment, setFulfillment] = useState<'pickup' | 'delivery'>('pickup');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('+237 ');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderId, setOrderId] = useState('');

  if (!isOpen) return null;

  const subtotalXAF = items.reduce((sum, item) => {
    const unitPrice =
      item.type === 'product'
        ? item.product?.priceXAF || 0
        : item.labTest?.discountedPriceXAF || item.labTest?.priceXAF || 0;
    return sum + unitPrice * item.quantity;
  }, 0);

  const deliveryFeeXAF = fulfillment === 'delivery' ? 1000 : 0;
  const grandTotalXAF = subtotalXAF + deliveryFeeXAF;

  const generateWhatsAppMessage = () => {
    let text = `*New Order - St. Stephen Health Center & Pharmacy*\n`;
    text += `Customer: ${customerName || 'Walk-in Customer'}\n`;
    text += `Phone: ${customerPhone}\n`;
    text += `Fulfillment: ${fulfillment === 'pickup' ? 'Terranova Clinic Pickup' : `Delivery to: ${deliveryAddress}`}\n\n`;
    text += `*Items Ordered:*\n`;

    items.forEach((item, index) => {
      if (item.type === 'product' && item.product) {
        text += `${index + 1}. ${item.product.name} (Qty: ${item.quantity}) - ${item.product.priceXAF * item.quantity} FCFA\n`;
      } else if (item.type === 'labTest' && item.labTest) {
        const p = (item.labTest.discountedPriceXAF || item.labTest.priceXAF) * item.quantity;
        text += `${index + 1}. [Lab Test] ${item.labTest.title} (Qty: ${item.quantity}) - ${p} FCFA\n`;
      }
    });

    if (fulfillment === 'delivery') {
      text += `\nDelivery Fee: 1,000 FCFA\n`;
    }
    text += `\n*Grand Total: ${grandTotalXAF} FCFA*\n`;
    text += `\nPlease confirm availability and prepare for dispatch!`;

    return encodeURIComponent(text);
  };

  const handleInstantWebCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    const newOrderId = `ST-ORD-${Math.floor(10000 + Math.random() * 90000)}`;
    setOrderId(newOrderId);

    // Register with order tracking data
    const itemRecords = items.map((i) => ({
      name: i.type === 'product' ? i.product?.name || 'Medicine' : i.labTest?.title || 'Diagnostic Test',
      quantity: i.quantity,
      priceXAF: i.type === 'product' ? (i.product?.priceXAF || 0) : (i.labTest?.discountedPriceXAF || i.labTest?.priceXAF || 0),
    }));

    registerCartOrder({
      orderId: newOrderId,
      customerName: customerName || 'Customer in Bonamekano',
      phone: customerPhone,
      fulfillment,
      address: deliveryAddress || 'Terranova, Bonamekano',
      items: itemRecords,
      totalXAF: grandTotalXAF,
    });

    setOrderConfirmed(true);
  };

  const handleReset = () => {
    setOrderConfirmed(false);
    onClearCart();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col h-full">
          
          {/* Header */}
          <div className="bg-[#002f6c] text-white p-4 sm:p-5 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-amber-300" />
              <h3 className="text-base sm:text-lg font-bold font-display text-white">
                Your Health & Pharmacy Cart
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/10 text-white transition-colors cursor-pointer"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {orderConfirmed ? (
            <div className="p-6 text-center space-y-4 my-auto overflow-y-auto">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <h4 className="text-2xl font-black text-slate-900 font-display">
                Order Received!
              </h4>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-left text-xs space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-500">Order ID:</span>
                  <span className="font-mono font-bold text-[#002f6c]">{orderId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Total:</span>
                  <span className="font-black text-[#d81e27]">
                    {formatCurrency(grandTotalXAF, currency)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Fulfillment:</span>
                  <span className="font-bold text-slate-800 uppercase">
                    {fulfillment === 'pickup' ? 'Terranova Counter Pickup' : 'Bonamekano Delivery'}
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-600">
                Your order is currently being packed by our dispensary staff. You can also send this summary directly to WhatsApp for real-time delivery coordination.
              </p>

              <div className="pt-2 flex flex-col gap-2">
                {onTrackOrder && (
                  <button
                    type="button"
                    onClick={() => {
                      const id = orderId;
                      handleReset();
                      onTrackOrder(id);
                    }}
                    className="py-3 px-4 rounded-xl bg-[#002f6c] hover:bg-[#001f47] text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                    id="cart-track-order-live-btn"
                  >
                    <Clock className="w-4 h-4 text-amber-300" />
                    <span>Track Order Status Live</span>
                  </button>
                )}

                <a
                  href={`https://wa.me/${HEALTH_CENTER_INFO.whatsapp}?text=${generateWhatsAppMessage()}`}
                  target="_blank"
                  rel="noreferrer"
                  className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send Order to WhatsApp Dispatch</span>
                </a>

                <button
                  onClick={handleReset}
                  className="py-2.5 px-4 rounded-xl bg-slate-100 text-slate-800 font-bold text-xs hover:bg-slate-200 cursor-pointer"
                >
                  Start New Order
                </button>
              </div>
            </div>
          ) : items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-3">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <p className="text-base font-bold text-slate-700">Your cart is empty</p>
              <p className="text-xs text-slate-500 mt-1 max-w-xs">
                Add pediatric multivitamins, emergency medicines, or diagnostic lab tests to checkout.
              </p>
              <button
                onClick={onClose}
                className="mt-5 px-5 py-2.5 rounded-lg bg-[#002f6c] text-white text-xs font-bold"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 flex flex-col justify-between">
              
              {/* Item list */}
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    {items.length} {items.length === 1 ? 'Item' : 'Items'} Selected
                  </span>
                  <button
                    onClick={onClearCart}
                    className="text-xs text-red-600 hover:underline font-semibold"
                  >
                    Clear All
                  </button>
                </div>

                {items.map((item) => {
                  const isProd = item.type === 'product';
                  const title = isProd ? item.product?.name : item.labTest?.title;
                  const price = isProd
                    ? item.product?.priceXAF || 0
                    : item.labTest?.discountedPriceXAF || item.labTest?.priceXAF || 0;

                  return (
                    <div
                      key={item.id}
                      className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start justify-between gap-3"
                    >
                      <div className="flex-1">
                        <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ${
                          isProd ? 'bg-blue-100 text-blue-800' : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {isProd ? 'Medicine' : 'Lab Test'}
                        </span>
                        <h4 className="text-xs font-bold text-slate-800 mt-1 leading-snug">
                          {title}
                        </h4>
                        <p className="text-xs font-bold text-[#d81e27] mt-0.5">
                          {formatCurrency(price, currency)}
                        </p>
                      </div>

                      <div className="flex flex-col items-end gap-1.5">
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-slate-400 hover:text-red-600 transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>

                        <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-md px-1.5 py-0.5">
                          <button
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="text-slate-600 hover:text-slate-900"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold text-slate-800 min-w-[12px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="text-slate-600 hover:text-slate-900"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* Fulfillment Selection */}
                <div className="pt-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Fulfillment Method
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setFulfillment('pickup')}
                      className={`p-2.5 rounded-lg border text-left text-xs font-bold transition-all ${
                        fulfillment === 'pickup'
                          ? 'bg-blue-50 border-[#002f6c] text-[#002f6c]'
                          : 'bg-white border-slate-200 text-slate-600'
                      }`}
                    >
                      <Building className="w-4 h-4 mb-1 text-[#002f6c]" />
                      <p>Terranova Pickup</p>
                      <p className="text-[10px] text-emerald-700 font-semibold">Free</p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setFulfillment('delivery')}
                      className={`p-2.5 rounded-lg border text-left text-xs font-bold transition-all ${
                        fulfillment === 'delivery'
                          ? 'bg-blue-50 border-[#002f6c] text-[#002f6c]'
                          : 'bg-white border-slate-200 text-slate-600'
                      }`}
                    >
                      <Truck className="w-4 h-4 mb-1 text-[#002f6c]" />
                      <p>Home Courier</p>
                      <p className="text-[10px] text-slate-500 font-normal">+1,000 FCFA</p>
                    </button>
                  </div>
                </div>

                {/* Customer Details */}
                <div className="space-y-2 pt-1">
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Your Name *"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#002f6c]"
                    required
                  />
                  <input
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="Phone number (+237...)*"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#002f6c]"
                    required
                  />
                  {fulfillment === 'delivery' && (
                    <input
                      type="text"
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      placeholder="Delivery location / Landmark in Bonamekano *"
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#002f6c]"
                      required
                    />
                  )}
                </div>

              </div>

              {/* Checkout Summary & Action Buttons */}
              <div className="pt-4 border-t border-slate-200 space-y-3 mt-4">
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between text-slate-500">
                    <span>Subtotal:</span>
                    <span>{formatCurrency(subtotalXAF, currency)}</span>
                  </div>
                  {fulfillment === 'delivery' && (
                    <div className="flex justify-between text-slate-500">
                      <span>Delivery Fee (Bonamekano):</span>
                      <span>{formatCurrency(deliveryFeeXAF, currency)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-base font-black text-slate-900 pt-1 border-t border-slate-100">
                    <span>Total:</span>
                    <span className="text-[#d81e27] font-display">
                      {formatCurrency(grandTotalXAF, currency)}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <a
                    href={`https://wa.me/${HEALTH_CENTER_INFO.whatsapp}?text=${generateWhatsAppMessage()}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-colors text-center"
                    id="cart-whatsapp-order-btn"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Quick Order on WhatsApp (+237 670 650 999)</span>
                  </a>

                  <button
                    onClick={handleInstantWebCheckout}
                    className="w-full py-3 rounded-xl bg-[#002f6c] hover:bg-[#001f47] text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                    id="cart-web-checkout-btn"
                  >
                    <CreditCard className="w-4 h-4 text-amber-300" />
                    <span>Confirm Order (Pay on Delivery/Pickup)</span>
                  </button>
                </div>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
