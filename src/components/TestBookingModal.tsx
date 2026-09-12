import React, { useState } from 'react';
import {
  X,
  Calendar,
  Clock,
  User,
  Phone,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ShieldCheck,
  Building2,
} from 'lucide-react';
import { LAB_TESTS, COMPLETE_CHECKUP_PACKAGE, HEALTH_CENTER_INFO } from '../data/pharmacyData';
import { LabTest, TestBooking } from '../types';
import { formatCurrency, Currency } from '../utils/currency';
import { registerLabBooking } from '../data/orderTrackingData';

interface TestBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTestId?: string;
  currency: Currency;
  onTrackOrder?: (orderId: string) => void;
}

export const TestBookingModal: React.FC<TestBookingModalProps> = ({
  isOpen,
  onClose,
  initialTestId,
  currency,
  onTrackOrder,
}) => {
  const [selectedTestId, setSelectedTestId] = useState<string>(
    initialTestId || 'package-back-to-school-all'
  );
  const [patientName, setPatientName] = useState('');
  const [patientAge, setPatientAge] = useState('');
  const [parentName, setParentName] = useState('');
  const [phone, setPhone] = useState('+237 ');
  const [bookingDate, setBookingDate] = useState('2026-08-25');
  const [timeSlot, setTimeSlot] = useState('08:30 - 10:00 AM (Morning)');
  const [notes, setNotes] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  if (!isOpen) return null;

  const currentSelectedTest =
    selectedTestId === 'package-back-to-school-all'
      ? {
          title: COMPLETE_CHECKUP_PACKAGE.title,
          price: COMPLETE_CHECKUP_PACKAGE.packagePriceXAF,
          isPackage: true,
        }
      : {
          title: LAB_TESTS.find((t) => t.id === selectedTestId)?.title || 'Diagnostic Test',
          price:
            LAB_TESTS.find((t) => t.id === selectedTestId)?.discountedPriceXAF ||
            LAB_TESTS.find((t) => t.id === selectedTestId)?.priceXAF ||
            2000,
          isPackage: false,
        };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ref = `ST-${Math.floor(100000 + Math.random() * 900000)}`;
    setBookingRef(ref);

    // Register with tracking system
    registerLabBooking({
      bookingRef: ref,
      patientName: patientName || 'Patient',
      patientAge: patientAge || 'Child',
      testTitle: currentSelectedTest.title,
      date: bookingDate,
      timeSlot: timeSlot,
      feeXAF: currentSelectedTest.price,
      phone: phone || '+237 670 650 999',
    });

    setIsSuccess(true);
  };

  const resetAndClose = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-xl w-full max-h-[92vh] flex flex-col overflow-hidden shadow-2xl border border-slate-200 relative my-auto animate-in fade-in zoom-in-95">
        
        {/* Header */}
        <div className="bg-[#002f6c] text-white p-4 sm:p-6 relative flex-shrink-0">
          <button
            onClick={resetAndClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-amber-400 text-slate-900 text-[11px] font-extrabold uppercase mb-2">
            <Sparkles className="w-3 h-3 text-slate-950" />
            <span>Discounted Campaign Rate</span>
          </div>

          <h3 className="text-lg sm:text-2xl font-black font-display tracking-tight text-white pr-8">
            Schedule Lab Test & Health Check-Up
          </h3>
          <p className="text-xs sm:text-sm text-blue-100 mt-1">
            St. Stephen Health Center • Terranova, Bonamekano
          </p>
        </div>

        {isSuccess ? (
          <div className="p-4 sm:p-8 text-center space-y-4 overflow-y-auto overscroll-contain flex-1">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h4 className="text-2xl font-black text-slate-900 font-display">
              Appointment Confirmed!
            </h4>

            <div className="p-4 bg-blue-50 rounded-xl border border-blue-200 text-left text-xs sm:text-sm space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Booking Reference:</span>
                <span className="font-mono font-bold text-[#002f6c]">{bookingRef}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Patient:</span>
                <span className="font-bold text-slate-800">{patientName} (Age: {patientAge})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Selected Test:</span>
                <span className="font-bold text-slate-800">{currentSelectedTest.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Date & Slot:</span>
                <span className="font-bold text-slate-800">{bookingDate} • {timeSlot}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Fee:</span>
                <span className="font-bold text-[#d81e27]">
                  {formatCurrency(currentSelectedTest.price, currency)}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              We have received your appointment details. Our reception desk will send an SMS reminder to <span className="font-semibold text-slate-800">{phone}</span>. Please arrive 10 minutes before your slot at Terranova, Bonamekano.
            </p>

            <div className="pt-3 flex flex-col sm:flex-row gap-2 justify-center">
              {onTrackOrder && (
                <button
                  type="button"
                  onClick={() => {
                    resetAndClose();
                    onTrackOrder(bookingRef);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-[#002f6c] hover:bg-[#001f47] text-white text-xs font-bold transition-colors inline-flex items-center justify-center gap-2 cursor-pointer shadow-xs min-h-[44px]"
                  id="modal-track-booking-btn"
                >
                  <Clock className="w-3.5 h-3.5 text-amber-300" />
                  <span>Track Appointment Live</span>
                </button>
              )}

              <a
                href={`https://wa.me/${HEALTH_CENTER_INFO.whatsapp}?text=Hello%20St.%20Stephen%20Health%20Center,%20I%20just%20booked%20an%20appointment%20ref%20${bookingRef}%20for%20${encodeURIComponent(patientName)}.`}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors inline-flex items-center justify-center gap-2 min-h-[44px]"
              >
                <span>Notify via WhatsApp</span>
              </a>

              <button
                onClick={resetAndClose}
                className="px-5 py-2.5 rounded-xl bg-slate-100 text-slate-800 text-xs font-bold hover:bg-slate-200 transition-colors cursor-pointer min-h-[44px]"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 overflow-y-auto overscroll-contain flex-1">
            {/* Test Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Select Service or Test *
              </label>
              <select
                value={selectedTestId}
                onChange={(e) => setSelectedTestId(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#002f6c] font-medium"
                id="booking-select-test"
                required
              >
                <option value="package-back-to-school-all">
                  ⭐ {COMPLETE_CHECKUP_PACKAGE.title} (All 5 Tests + Exam) - {formatCurrency(COMPLETE_CHECKUP_PACKAGE.packagePriceXAF, currency)}
                </option>
                {LAB_TESTS.map((test) => (
                  <option key={test.id} value={test.id}>
                    {test.title} - {formatCurrency(test.discountedPriceXAF || test.priceXAF, currency)} ({test.shortDesc})
                  </option>
                ))}
              </select>
            </div>

            {/* Patient Info Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Child / Patient Name *
                </label>
                <input
                  type="text"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  placeholder="e.g. Junior Paul"
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002f6c]"
                  id="booking-patient-name"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Child Age / School Grade *
                </label>
                <input
                  type="text"
                  value={patientAge}
                  onChange={(e) => setPatientAge(e.target.value)}
                  placeholder="e.g. 8 years (Class 4 / CM1)"
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002f6c]"
                  id="booking-patient-age"
                  required
                />
              </div>
            </div>

            {/* Parent & Contact */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Parent / Guardian Name *
                </label>
                <input
                  type="text"
                  value={parentName}
                  onChange={(e) => setParentName(e.target.value)}
                  placeholder="e.g. Marie Paul"
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002f6c]"
                  id="booking-parent-name"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Phone Number (Call/WhatsApp) *
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+237 6xx xxx xxx"
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002f6c]"
                  id="booking-phone"
                  required
                />
              </div>
            </div>

            {/* Date & Time Slot */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Preferred Date *
                </label>
                <input
                  type="date"
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002f6c]"
                  id="booking-date"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Preferred Time Window *
                </label>
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002f6c]"
                  id="booking-timeslot"
                >
                  <option>08:00 - 09:30 AM (Early Morning)</option>
                  <option>09:30 - 11:30 AM (Mid Morning)</option>
                  <option>01:00 - 03:00 PM (Afternoon)</option>
                  <option>03:00 - 05:00 PM (Late Afternoon)</option>
                  <option>05:30 - 07:30 PM (Evening Express)</option>
                </select>
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Symptoms or School Requirements (Optional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={2}
                placeholder="e.g. Needs school fitness certificate, child had slight fever yesterday, or routine check-up."
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002f6c]"
                id="booking-notes"
              />
            </div>

            {/* Quality Standard note */}
            <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200 flex items-center gap-2 text-xs text-emerald-900">
              <ShieldCheck className="w-4 h-4 text-emerald-700 flex-shrink-0" />
              <span>
                Accredited medical standards with sterile pediatric sampling.
              </span>
            </div>

            {/* Submit */}
            <div className="pt-2 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-500">Total payable at clinic:</span>
                <p className="text-lg font-black text-[#d81e27]">
                  {formatCurrency(currentSelectedTest.price, currency)}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={resetAndClose}
                  className="px-4 py-2.5 rounded-lg border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-lg bg-[#002f6c] hover:bg-[#001f47] text-white font-bold text-xs shadow-md transition-colors flex items-center gap-1.5 cursor-pointer"
                  id="confirm-booking-submit-btn"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Confirm Appointment</span>
                </button>
              </div>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
