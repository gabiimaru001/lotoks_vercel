'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import RequirementsTabs from './RequirementsTabs';

export default function RequirementsPage() {
  return (
    <main className="min-h-screen" style={{ background: '#F9FAFB' }}>
      {/* ── Hero ── */}
      <section
        className="relative py-20 md:py-28 px-4"
        style={{ background: '#0B1D3A' }}
      >
        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              'linear-gradient(rgba(201,164,75,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(201,164,75,0.4) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        <div className="relative max-w-5xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xs font-semibold tracking-widest uppercase mb-4"
            style={{ color: '#C9A44B' }}
          >
            Lotoks Global Platform
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
            style={{ fontFamily: 'Georgia, "Playfair Display", serif' }}
          >
            Application Requirements
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl max-w-2xl mx-auto mb-10"
            style={{ color: 'rgba(255,255,255,0.7)' }}
          >
            Everything you need to prepare before we start your case
          </motion.p>

          {/* Important Note Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="max-w-3xl mx-auto rounded-lg p-6 text-left"
            style={{
              background: 'rgba(201,164,75,0.08)',
              border: '1px solid rgba(201,164,75,0.25)',
            }}
          >
            <p className="text-sm md:text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.85)' }}>
              <span className="text-lg mr-1">📋</span>
              <strong className="font-semibold" style={{ color: '#C9A44B' }}>Important Note:</strong>{' '}
              All documents must be translated into the official language of your destination country by
              a certified translator. Documents such as birth certificates, marriage certificates, and
              academic records must also be legalised or apostilled where required. Our team will guide
              you through this process — we&apos;re here to help every step of the way.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Tabbed Content ── */}
      <section className="max-w-6xl mx-auto px-4 py-12 md:py-16">
        <RequirementsTabs />
      </section>

      {/* ── CTA Section ── */}
      <section
        className="py-16 md:py-20 px-4"
        style={{ background: '#0B1D3A' }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2
            className="text-2xl md:text-3xl font-bold text-white mb-4"
            style={{ fontFamily: 'Georgia, "Playfair Display", serif' }}
          >
            Need help gathering these documents?
          </h2>
          <p className="mb-8 text-base md:text-lg" style={{ color: 'rgba(255,255,255,0.65)' }}>
            Our team can guide you through every requirement. Get in touch today.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-base transition-all hover:opacity-90 hover:scale-105 active:scale-95"
            style={{
              background: '#C9A44B',
              color: '#0B1D3A',
              transition: 'all 0.2s ease',
            }}
          >
            Contact Our Team
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </section>
    </main>
  );
}
