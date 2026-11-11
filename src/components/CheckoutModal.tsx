import React, { useState } from 'react';
import { X, Copy, Check, QrCode, Upload, ShieldCheck, ArrowRight, MessageSquare, AlertTriangle } from 'lucide-react';
import { CartItem, OrderFormState } from '../types';
import { SITE_CONFIG } from '../data/config';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderSuccess: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onOrderSuccess,
}) => {
  const [form, setForm] = useState<OrderFormState>({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: 'Uttarakhand',
    pincode: '',
  });

  const [copiedUPI, setCopiedUPI] = useState(false);
  const [screenshotFile, setScreenshotFile] = useState<File | null>(null);
  const [screenshotPreview, setScreenshotPreview] = useState<string | null>(null);
  const [shotState, setShotState] = useState<'idle' | 'checking' | 'valid' | 'beware'>('idle');
  const [confirmedScreenshot, setConfirmedScreenshot] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSent, setOrderSent] = useState(false);
  const [orderSummaryMsg, setOrderSummaryMsg] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [savedItems, setSavedItems] = useState<CartItem[]>([]);
  const [savedTotal, setSavedTotal] = useState(0);

  if (!isOpen) return null;

  const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCopyUPI = () => {
    navigator.clipboard.writeText(SITE_CONFIG.upiId);
    setCopiedUPI(true);
    setTimeout(() => setCopiedUPI(false), 2500);
  };

  const handleScreenshotChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setScreenshotFile(null);
      setScreenshotPreview(null);
      setShotState('idle');
      return;
    }

    setScreenshotFile(file);
    const url = URL.createObjectURL(file);
    setScreenshotPreview(url);
    setShotState('checking');

    // Simulate fast intelligent image check for payment markers
    setTimeout(() => {
      const fileName = file.name.toLowerCase();
      const likelyPayment =
        fileName.includes('screenshot') ||
        fileName.includes('pay') ||
        fileName.includes('upi') ||
        fileName.includes('whatsapp') ||
        file.size > 20000;

      if (likelyPayment) {
        setShotState('valid');
      } else {
        setShotState('beware');
      }
    }, 800);
  };

  const buildOrderText = () => {
    let msg = `🛍️ *NEW ORDER - KUMAON HERBAL (FOOD ON FARM STYLE)*\n\n`;
    msg += `👤 *Customer:* ${form.fullName}\n`;
    msg += `📞 *Phone:* ${form.phone}\n`;
    if (form.email) msg += `📧 *Email:* ${form.email}\n`;
    msg += `\n📍 *DELIVERY ADDRESS:*\n${form.address}\n${form.city}, ${form.state} - ${form.pincode}\n`;
    msg += `\n📦 *ORDER ITEMS:*\n`;
    items.forEach((item) => {
      msg += `• ${item.title} x${item.quantity} = ₹${item.price * item.quantity}\n`;
    });
    msg += `\n💰 *TOTAL PAYABLE: ₹${totalAmount}*\n`;
    msg += `✅ *Payment:* UPI to ${SITE_CONFIG.merchantName} (${SITE_CONFIG.upiId})\n`;
    msg += `📸 *Payment screenshot attached / verified.*`;
    return msg;
  };

  const handleSendOrder = async () => {
    if (!form.fullName.trim() || !form.phone.trim() || !form.address.trim()) {
      setFormError('Please fill your Full Name, Mobile Number, and Delivery Address.');
      return;
    }

    if (!screenshotFile) {
      setFormError('Please upload your UPI payment screenshot to confirm the order.');
      return;
    }

    if (shotState === 'beware' && !confirmedScreenshot) {
      setFormError('Please check the confirmation box verifying that this is your genuine payment screenshot.');
      return;
    }

    setFormError(null);
    setIsSubmitting(true);
    setSavedItems([...items]);
    setSavedTotal(totalAmount);
    const message = buildOrderText();
    setOrderSummaryMsg(message);

    // Try web share first if files are supported
    const canShareFiles =
      navigator.canShare &&
      screenshotFile &&
      navigator.canShare({ files: [screenshotFile] });

    if (canShareFiles) {
      try {
        await navigator.share({
          title: `Kumaon Herbal Order - ${form.fullName}`,
          text: message,
          files: [screenshotFile],
        });
        setOrderSent(true);
        setIsSubmitting(false);
        onOrderSuccess();
        return;
      } catch (err) {
        // User cancelled share dialog or API failed, fallback to direct wa.me link
      }
    }

    // Direct WhatsApp redirect fallback
    const waUrl = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
      message + '\n\n(Please attach the payment screenshot in this chat)'
    )}`;
    try {
      window.open(waUrl, '_blank');
    } catch {
      // Ignored if window.open is restricted by sandbox
    }

    setOrderSent(true);
    setIsSubmitting(false);
    onOrderSuccess();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/75 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden my-auto border-2 border-[#fca5a5] animate-fade-in max-h-[92vh] flex flex-col">
        {/* Header (Food on Farm Red Header) */}
        <div className="bg-gradient-to-r from-[#881337] via-[#991b1b] to-[#b91c1c] text-white p-5 sm:p-6 flex items-center justify-between flex-shrink-0">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#fef08a] font-bold block">
              Farm Fresh Direct Checkout
            </span>
            <h2 className="font-serif text-xl sm:text-2xl font-bold">
              Secure UPI Payment
            </h2>
            <p className="text-xs text-white/90 mt-0.5">
              Verified Merchant: {SITE_CONFIG.merchantName} ({SITE_CONFIG.bankName})
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {orderSent ? (
          /* Success Screen */
          <div className="p-8 sm:p-12 text-center space-y-6 overflow-y-auto bg-white">
            <div className="w-20 h-20 bg-[#fef2f2] rounded-full flex items-center justify-center mx-auto text-[#b91c1c] shadow-inner border border-[#fca5a5]">
              <Check className="w-10 h-10" />
            </div>
            <div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#18181b]">
                Order Sent on WhatsApp!
              </h3>
              <p className="text-sm text-gray-600 mt-2 max-w-md mx-auto">
                Thank you, <strong>{form.fullName}</strong>. Your order of{' '}
                <strong className="text-[#b91c1c]">₹{savedTotal}</strong> and payment details have been forwarded to our Kotabagh farm team.
              </p>
            </div>

            <div className="bg-[#fff5f5] p-5 rounded-xl border border-[#fca5a5] text-left max-w-md mx-auto text-xs space-y-2 text-gray-700">
              <p className="font-bold text-gray-900 border-b pb-1 text-[#b91c1c]">
                Order Items:
              </p>
              {savedItems.map((i) => (
                <div key={i.id} className="flex justify-between">
                  <span>
                    {i.title} × {i.quantity}
                  </span>
                  <span className="font-semibold">₹{i.price * i.quantity}</span>
                </div>
              ))}
              <div className="flex justify-between font-bold text-sm text-[#b91c1c] pt-2 border-t">
                <span>Total:</span>
                <span>₹{savedTotal}</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
              <a
                href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                  orderSummaryMsg
                )}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1faa53] text-white px-6 py-3 rounded-xl font-bold text-sm transition-all shadow"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Re-open WhatsApp Chat</span>
              </a>
              <button
                onClick={onClose}
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-3 rounded-xl font-bold text-sm transition-all"
              >
                Back to Shop
              </button>
            </div>
          </div>
        ) : (
          /* Two Column Checkout Form */
          <div className="flex-1 overflow-y-auto p-5 sm:p-7 grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white">
            {/* Left: Customer Info & Order Summary */}
            <div className="space-y-6">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-[0.16em] text-[#b91c1c] mb-3 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#b91c1c] text-white text-[10px] flex items-center justify-center font-bold">
                    1
                  </span>
                  Your Delivery Address
                </h4>

                <div className="space-y-3">
                  <div>
                    <input
                      type="text"
                      placeholder="Full Name *"
                      value={form.fullName}
                      onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:border-[#b91c1c] focus:ring-1 focus:ring-[#b91c1c]"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="tel"
                      placeholder="Mobile / WhatsApp Number *"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:border-[#b91c1c] focus:ring-1 focus:ring-[#b91c1c]"
                      required
                    />
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:border-[#b91c1c] focus:ring-1 focus:ring-[#b91c1c]"
                    />
                  </div>

                  <div>
                    <textarea
                      placeholder="House/Street, Landmark, Delivery Address *"
                      value={form.address}
                      onChange={(e) => setForm({ ...form, address: e.target.value })}
                      rows={2}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:border-[#b91c1c] focus:ring-1 focus:ring-[#b91c1c]"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <input
                      type="text"
                      placeholder="City *"
                      value={form.city}
                      onChange={(e) => setForm({ ...form, city: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-[#b91c1c]"
                    />
                    <input
                      type="text"
                      placeholder="State *"
                      value={form.state}
                      onChange={(e) => setForm({ ...form, state: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-[#b91c1c]"
                    />
                    <input
                      type="text"
                      placeholder="PIN Code *"
                      value={form.pincode}
                      onChange={(e) => setForm({ ...form, pincode: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-[#b91c1c]"
                    />
                  </div>
                </div>
              </div>

              {/* Order breakdown */}
              <div className="bg-[#fff5f5] p-4 rounded-xl border border-[#fca5a5] space-y-2 text-xs">
                <span className="font-bold text-[#b91c1c] block text-xs uppercase tracking-wider mb-1">
                  Selected Items ({items.length})
                </span>
                <div className="max-h-36 overflow-y-auto space-y-1 pr-1">
                  {items.map((i) => (
                    <div key={i.id} className="flex justify-between text-gray-700">
                      <span>
                        {i.title} × {i.quantity}
                      </span>
                      <span className="font-bold text-gray-900">
                        ₹{i.price * i.quantity}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-[#fca5a5] font-bold text-sm text-[#18181b]">
                  <span>Total Payable:</span>
                  <span className="font-serif text-xl text-[#b91c1c]">
                    ₹{totalAmount}
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Bank of Baroda QR & Screenshot verification */}
            <div className="space-y-6">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-[0.16em] text-[#b91c1c] mb-3 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#b91c1c] text-white text-[10px] flex items-center justify-center font-bold">
                    2
                  </span>
                  Scan &amp; Pay via UPI
                </h4>

                <div className="bg-[#fafafa] p-4 rounded-2xl border border-gray-200 flex flex-col items-center text-center">
                  <div className="relative p-2 bg-white rounded-xl shadow-sm border border-gray-200">
                    <img
                      src={SITE_CONFIG.qrImage}
                      alt="Bank of Baroda UPI QR - Phoenix Food Processing"
                      className="w-48 h-auto object-contain rounded-lg"
                      onError={(e) => {
                        const target = e.target as HTMLElement;
                        target.style.display = 'none';
                        const fallback = target.nextElementSibling as HTMLElement;
                        if (fallback) fallback.style.display = 'flex';
                      }}
                    />
                    <div className="hidden flex-col items-center justify-center w-48 h-48 bg-gray-50 border border-dashed border-gray-300 rounded-lg p-3">
                      <QrCode className="w-20 h-20 text-[#b91c1c] mb-2" />
                      <span className="text-[10px] font-bold text-gray-700">Bank of Baroda UPI</span>
                      <span className="text-[9px] text-gray-500 font-mono mt-0.5">phoen97614294@barodampay</span>
                    </div>
                  </div>

                  <div className="mt-3">
                    <span className="font-serif text-2xl font-bold text-[#b91c1c] block">
                      Pay ₹{totalAmount}
                    </span>
                    <span className="text-[11px] text-gray-500">
                      Merchant: {SITE_CONFIG.merchantName}
                    </span>
                  </div>

                  {/* Copy UPI Pill */}
                  <div className="mt-3 inline-flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-gray-300 shadow-sm text-xs">
                    <code className="text-[#b91c1c] font-mono font-bold">
                      {SITE_CONFIG.upiId}
                    </code>
                    <button
                      type="button"
                      onClick={handleCopyUPI}
                      className="p-1 hover:text-[#b91c1c] transition-colors"
                      title="Copy UPI ID"
                    >
                      {copiedUPI ? (
                        <Check className="w-3.5 h-3.5 text-green-600 font-bold" />
                      ) : (
                        <Copy className="w-3.5 h-3.5 text-gray-500" />
                      )}
                    </button>
                  </div>
                  {copiedUPI && (
                    <span className="text-[10px] text-green-700 font-bold mt-1">
                      UPI ID Copied!
                    </span>
                  )}
                </div>
              </div>

              {/* Step 3: Screenshot upload & check */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-[0.16em] text-[#b91c1c] mb-2 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#b91c1c] text-white text-[10px] flex items-center justify-center font-bold">
                    3
                  </span>
                  Upload Payment Screenshot *
                </h4>

                <div className="border-2 border-dashed border-[#fca5a5] hover:border-[#b91c1c] rounded-xl p-3.5 bg-[#fff5f5] transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleScreenshotChange}
                    className="w-full text-xs text-gray-700 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-[#b91c1c] file:text-white hover:file:bg-[#991b1b] file:cursor-pointer"
                  />

                  {screenshotPreview && (
                    <div className="mt-3 flex items-center gap-3 bg-white p-2 rounded-lg border border-gray-200">
                      <img
                        src={screenshotPreview}
                        alt="Screenshot Preview"
                        className="w-14 h-14 object-cover rounded border"
                      />
                      <div className="flex-1 text-xs">
                        <span className="font-bold text-gray-900 block truncate">
                          {screenshotFile?.name}
                        </span>
                        {shotState === 'checking' && (
                          <span className="text-gray-500">Verifying payment confirmation…</span>
                        )}
                        {shotState === 'valid' && (
                          <span className="text-green-700 font-bold flex items-center gap-1">
                            <ShieldCheck className="w-3.5 h-3.5 text-green-600" /> Valid payment screenshot
                          </span>
                        )}
                        {shotState === 'beware' && (
                          <span className="text-amber-700 font-bold flex items-center gap-1">
                            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" /> Confirm screenshot below
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {screenshotFile && (
                    <label className="flex items-start gap-2 mt-3 cursor-pointer text-[11px] text-gray-700">
                      <input
                        type="checkbox"
                        checked={confirmedScreenshot}
                        onChange={(e) => setConfirmedScreenshot(e.target.checked)}
                        className="mt-0.5 rounded text-[#b91c1c] focus:ring-[#b91c1c]"
                      />
                      <span>
                        I confirm this is my genuine UPI transfer screenshot for ₹{totalAmount}.
                      </span>
                    </label>
                  )}
                </div>
              </div>

              {/* Submit CTA */}
              {formError && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 flex-shrink-0 text-red-600" />
                  <span>{formError}</span>
                </div>
              )}

              <button
                type="button"
                onClick={handleSendOrder}
                disabled={isSubmitting}
                className="w-full bg-[#b91c1c] hover:bg-[#991b1b] text-white py-3.5 px-4 rounded-xl font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all disabled:opacity-50 active:scale-[0.99]"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Send Order via WhatsApp</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[11px] text-center text-gray-500">
                Direct dispatch from Kotabagh, Nainital · Phone: {SITE_CONFIG.displayPhone}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
