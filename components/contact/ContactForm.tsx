'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2, AlertCircle, Heart } from 'lucide-react';
import { Mascot } from '@/components/ui/Mascot';

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    breed: 'Any / Need Recommendation',
    visitDate: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Please provide your name';
    if (!formData.email.trim()) {
      errs.email = 'Please provide your email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please provide a valid email';
    }
    if (!formData.phone.trim()) {
      errs.phone = 'Please provide your phone number';
    } else if (formData.phone.replace(/\D/g, '').length < 7) {
      errs.phone = 'Please enter a valid phone number';
    }
    if (!formData.message.trim()) {
      errs.message = 'Please write a brief note about what you are looking for';
    }
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setSubmitting(true);

    // Simulate fast client-side submission
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 700);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-3xl border-2 border-ink bg-white p-8 sm:p-12 text-center shadow-card"
      >
        <div className="w-20 h-20 rounded-full bg-cream border-2 border-caramel flex items-center justify-center mx-auto mb-4">
          <Mascot pose="idle" animated={false} className="w-14 h-14" />
        </div>
        <div className="inline-flex items-center gap-1.5 text-whatsapp font-bold text-sm bg-emerald-50 px-3 py-1 rounded-full mb-3 border border-emerald-200">
          <CheckCircle2 className="w-4 h-4" />
          <span>Message Received Successfully</span>
        </div>
        <h3 className="font-display font-black text-2xl sm:text-3xl text-ink mb-2">
          Thank you, {formData.name}!
        </h3>
        <p className="text-sm sm:text-base text-ink/80 leading-relaxed mb-6 max-w-md mx-auto">
          Our concierge in Business Bay has received your enquiry. We will contact you via WhatsApp and
          email shortly to confirm your nursery visit details.
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setFormData({
              name: '',
              email: '',
              phone: '',
              breed: 'Any / Need Recommendation',
              visitDate: '',
              message: '',
            });
          }}
          className="text-xs font-bold text-caramel hover:text-caramel-dark underline decoration-caramel/30"
        >
          Send another message
        </button>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-3xl border-2 border-ink bg-white p-6 sm:p-10 shadow-card space-y-5"
    >
      <div>
        <h3 className="font-display font-extrabold text-2xl text-ink mb-1">
          Book an appointment or playdate
        </h3>
        <p className="text-xs sm:text-sm text-ink-muted">
          Our concierge will confirm your slot within 15 minutes.
        </p>
      </div>

      {/* Name */}
      <div>
        <label htmlFor="contact-name" className="block text-xs font-bold text-ink mb-1.5">
          Full Name *
        </label>
        <input
          id="contact-name"
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="e.g. Elena Rostova"
          className={`w-full h-12 px-4 rounded-2xl border-2 bg-cream-50 text-sm text-ink font-medium focus:outline-none transition-colors ${
            errors.name ? 'border-rose-500 bg-rose-50' : 'border-ink focus:border-caramel'
          }`}
        />
        {errors.name && (
          <p className="text-xs text-rose-600 mt-1 flex items-center gap-1 font-semibold">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>{errors.name}</span>
          </p>
        )}
      </div>

      {/* Email & Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="contact-email" className="block text-xs font-bold text-ink mb-1.5">
            Email Address *
          </label>
          <input
            id="contact-email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="elena@example.com"
            className={`w-full h-12 px-4 rounded-2xl border-2 bg-cream-50 text-sm text-ink font-medium focus:outline-none transition-colors ${
              errors.email ? 'border-rose-500 bg-rose-50' : 'border-ink focus:border-caramel'
            }`}
          />
          {errors.email && (
            <p className="text-xs text-rose-600 mt-1 flex items-center gap-1 font-semibold">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{errors.email}</span>
            </p>
          )}
        </div>

        <div>
          <label htmlFor="contact-phone" className="block text-xs font-bold text-ink mb-1.5">
            Phone / WhatsApp *
          </label>
          <input
            id="contact-phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="+971 50 000 0000"
            className={`w-full h-12 px-4 rounded-2xl border-2 bg-cream-50 text-sm text-ink font-medium focus:outline-none transition-colors ${
              errors.phone ? 'border-rose-500 bg-rose-50' : 'border-ink focus:border-caramel'
            }`}
          />
          {errors.phone && (
            <p className="text-xs text-rose-600 mt-1 flex items-center gap-1 font-semibold">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{errors.phone}</span>
            </p>
          )}
        </div>
      </div>

      {/* Breed & Visit Date */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="contact-breed" className="block text-xs font-bold text-ink mb-1.5">
            Preferred Breed
          </label>
          <select
            id="contact-breed"
            value={formData.breed}
            onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
            className="w-full h-12 px-4 rounded-2xl border-2 border-ink bg-cream-50 text-sm text-ink font-medium focus:outline-none focus:border-caramel cursor-pointer"
          >
            <option value="Any / Need Recommendation">Any / Need Recommendation</option>
            <option value="Teacup Maltipoo">Teacup Maltipoo</option>
            <option value="Teacup Pomeranian">Teacup Pomeranian</option>
            <option value="Toy Poodle">Toy Poodle</option>
            <option value="Mini Cavapoo">Mini Cavapoo</option>
            <option value="Imperial Shih Tzu">Imperial Shih Tzu</option>
            <option value="Bichon Frisé">Bichon Frisé</option>
          </select>
        </div>

        <div>
          <label htmlFor="contact-date" className="block text-xs font-bold text-ink mb-1.5">
            Preferred Visit Date (Optional)
          </label>
          <input
            id="contact-date"
            type="date"
            value={formData.visitDate}
            onChange={(e) => setFormData({ ...formData, visitDate: e.target.value })}
            className="w-full h-12 px-4 rounded-2xl border-2 border-ink bg-cream-50 text-sm text-ink font-medium focus:outline-none focus:border-caramel"
          />
        </div>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="contact-msg" className="block text-xs font-bold text-ink mb-1.5">
          Tell Us About Your Home & Questions *
        </label>
        <textarea
          id="contact-msg"
          rows={4}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Are you looking for a specific size, hypoallergenic coat, or same-day viewing?"
          className={`w-full p-4 rounded-2xl border-2 bg-cream-50 text-sm text-ink font-medium focus:outline-none transition-colors ${
            errors.message ? 'border-rose-500 bg-rose-50' : 'border-ink focus:border-caramel'
          }`}
        />
        {errors.message && (
          <p className="text-xs text-rose-600 mt-1 flex items-center gap-1 font-semibold">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>{errors.message}</span>
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full h-14 rounded-full bg-caramel text-white font-bold text-base shadow-chunky-caramel hover:-translate-y-0.5 active:translate-y-0.5 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
      >
        <Send className="w-4 h-4" />
        <span>{submitting ? 'Submitting...' : 'Submit appointment request'}</span>
      </button>
    </form>
  );
}
