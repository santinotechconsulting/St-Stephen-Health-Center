import React, { useState, useRef } from 'react';
import {
  X,
  UploadCloud,
  FileText,
  CheckCircle2,
  Clock,
  ShieldCheck,
  AlertCircle,
  Truck,
  Building,
} from 'lucide-react';
import { HEALTH_CENTER_INFO } from '../data/pharmacyData';

interface PrescriptionUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrescriptionUploadModal: React.FC<PrescriptionUploadModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [patientName, setPatientName] = useState('');
  const [phone, setPhone] = useState('+237 ');
  const [notes, setNotes] = useState('');
  const [deliveryPreference, setDeliveryPreference] = useState<'pickup' | 'delivery'>('pickup');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [rxTicketNumber, setRxTicketNumber] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      setFile(selected);
      if (selected.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = () => setFilePreview(reader.result as string);
        reader.readAsDataURL(selected);
      } else {
        setFilePreview(null);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRxTicketNumber(`RX-${Math.floor(10000 + Math.random() * 90000)}`);
    setIsSubmitted(true);
  };

  const resetAndClose = () => {
    setIsSubmitted(false);
    setFile(null);
    setFilePreview(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[92vh] flex flex-col overflow-hidden shadow-2xl border border-slate-200 relative my-auto animate-in fade-in zoom-in-95">
        
        {/* Header */}
        <div className="bg-[#0e7c3a] text-white p-4 sm:p-6 relative flex-shrink-0">
          <button
            onClick={resetAndClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-emerald-950/60 text-emerald-200 text-[11px] font-bold uppercase mb-2 border border-emerald-400/30">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Licensed Pharmacist Verification</span>
          </div>

          <h3 className="text-lg sm:text-2xl font-black font-display tracking-tight text-white pr-8">
            Upload Doctor's Prescription
          </h3>
          <p className="text-xs sm:text-sm text-emerald-100 mt-1">
            Send your prescription slip for rapid dispensing & dosage verification.
          </p>
        </div>

        {isSubmitted ? (
          <div className="p-4 sm:p-8 text-center space-y-4 overflow-y-auto overscroll-contain flex-1">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h4 className="text-2xl font-black text-slate-900 font-display">
              Prescription Received!
            </h4>

            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-left text-xs sm:text-sm space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Ticket Reference:</span>
                <span className="font-mono font-bold text-emerald-800">{rxTicketNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Patient:</span>
                <span className="font-bold text-slate-800">{patientName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Phone:</span>
                <span className="font-bold text-slate-800">{phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Fulfillment:</span>
                <span className="font-bold text-slate-800 uppercase">
                  {deliveryPreference === 'pickup' ? 'Terranova Clinic Pickup' : 'Home Delivery'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 p-3 bg-blue-50 text-blue-900 rounded-lg text-xs text-left">
              <Clock className="w-4 h-4 text-blue-600 flex-shrink-0" />
              <span>
                Our pharmacist is reviewing the medicines now. You will receive a call or WhatsApp message within 15 minutes with availability and cost.
              </span>
            </div>

            <button
              onClick={resetAndClose}
              className="w-full py-3 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors cursor-pointer min-h-[44px]"
            >
              Close Window
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 overflow-y-auto overscroll-contain flex-1">
            {/* File Upload Drop Zone */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Prescription Photo or Scan *
              </label>

              <div
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-colors ${
                  file
                    ? 'border-emerald-500 bg-emerald-50/40'
                    : 'border-slate-300 hover:border-emerald-500 bg-slate-50'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleFileChange}
                  className="hidden"
                  id="rx-file-input"
                />

                {file ? (
                  <div className="flex flex-col items-center gap-2">
                    {filePreview ? (
                      <img
                        src={filePreview}
                        alt="Prescription preview"
                        className="h-24 max-w-full object-contain rounded-lg border border-slate-200"
                      />
                    ) : (
                      <FileText className="w-10 h-10 text-emerald-600" />
                    )}
                    <span className="text-xs font-bold text-slate-800 truncate max-w-xs">
                      {file.name}
                    </span>
                    <span className="text-[11px] text-emerald-700 font-semibold underline">
                      Click to change file
                    </span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-1.5 text-slate-600">
                    <UploadCloud className="w-8 h-8 text-emerald-600 mb-1" />
                    <span className="text-xs font-bold text-slate-800">
                      Click or drag & drop prescription image
                    </span>
                    <span className="text-[11px] text-slate-400">
                      Supports JPG, PNG, or PDF up to 10MB
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Patient & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Patient Full Name *
                </label>
                <input
                  type="text"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  placeholder="Patient name"
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  id="rx-patient-name"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Phone (WhatsApp active) *
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+237 6xx xxx xxx"
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  id="rx-phone"
                  required
                />
              </div>
            </div>

            {/* Fulfillment option */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                How would you like to receive your medication?
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setDeliveryPreference('pickup')}
                  className={`p-2.5 rounded-lg border text-left flex items-center gap-2 text-xs font-bold transition-all ${
                    deliveryPreference === 'pickup'
                      ? 'bg-emerald-50 border-emerald-600 text-emerald-900'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Building className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                  <div>
                    <p className="leading-tight">Pickup at Terranova</p>
                    <p className="text-[10px] text-slate-400 font-normal">Ready in 20 min</p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setDeliveryPreference('delivery')}
                  className={`p-2.5 rounded-lg border text-left flex items-center gap-2 text-xs font-bold transition-all ${
                    deliveryPreference === 'delivery'
                      ? 'bg-emerald-50 border-emerald-600 text-emerald-900'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Truck className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                  <div>
                    <p className="leading-tight">Home Delivery</p>
                    <p className="text-[10px] text-slate-400 font-normal">Bonamekano area</p>
                  </div>
                </button>
              </div>
            </div>

            {deliveryPreference === 'delivery' && (
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Delivery Address / Landmark in Bonamekano *
                </label>
                <input
                  type="text"
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  placeholder="e.g. Near Carrefour Terranova, 2nd house right"
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  required
                />
              </div>
            )}

            {/* Special Instructions */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Known Drug Allergies or Special Notes
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={2}
                placeholder="e.g. Allergic to penicillin, prefers syrup instead of tablets for child..."
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600"
                id="rx-notes"
              />
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={resetAndClose}
                className="px-4 py-2.5 rounded-lg border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-lg bg-[#0e7c3a] hover:bg-emerald-800 text-white font-bold text-xs shadow-md transition-colors flex items-center gap-1.5 cursor-pointer"
                id="submit-rx-btn"
              >
                <UploadCloud className="w-4 h-4" />
                <span>Submit Prescription</span>
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
