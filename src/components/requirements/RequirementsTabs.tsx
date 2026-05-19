'use client';

import { useState, useRef, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import RequirementTabPanel, { type TabPanelData } from './RequirementTabPanel';

const TABS: TabPanelData[] = [
  {
    id: 'visa',
    label: 'Visa',
    icon: '🛂',
    sections: [
      {
        title: 'Core Documents',
        items: [
          'International passport — valid for at least 6 months beyond your planned return date, with at least 2 blank pages',
          'Completed visa application form — filled and signed',
          'Two biometric passport photos — 35×45mm, white background, taken within the last 6 months',
          'Travel itinerary — flight reservation showing entry and exit dates (do not purchase tickets before approval)',
          'Proof of accommodation — hotel booking confirmation or signed invitation letter from your host',
          'Travel medical insurance — minimum cover of €30,000, valid across the Schengen area or destination country',
          'Proof of sufficient financial means — bank statements from the last 3–6 months, recent payslips, or a formal sponsorship letter accompanied by your sponsor\'s bank statements',
          'Visa fee receipt — proof of payment',
        ],
      },
      {
        title: 'Purpose-Specific Documents',
        items: [
          '<strong>Tourism:</strong> Day-by-day travel itinerary and a leave approval letter from your employer',
          '<strong>Business:</strong> Invitation letter from the European company, conference or meeting registration, and a letter from your employer confirming your role, purpose of travel, and duration of stay',
          '<strong>Visiting family or friends:</strong> Signed invitation letter from your host, a copy of the host\'s passport or residence permit, and proof of your relationship such as a birth or marriage certificate',
          '<strong>Medical treatment:</strong> Medical report from your doctor at home and an acceptance letter from the European hospital or clinic confirming your appointment and treatment plan',
        ],
      },
      {
        title: 'Proof of Ties to Your Home Country (Very Important)',
        items: [
          'Employment letter — stating your position, salary, and approved leave period',
          'If self-employed — business registration documents and tax clearance certificate',
          'Property ownership — title deeds, land documents, or mortgage statements',
          'Family ties — marriage certificate and children\'s birth certificates',
          'Evidence of ongoing studies — student ID card and enrolment letter',
          'Previous travel history — old passports showing previous visas and entry/exit stamps',
        ],
      },
    ],
  },
  {
    id: 'education',
    label: 'Education',
    icon: '🎓',
    sections: [
      {
        title: 'Identity & Eligibility',
        items: [
          'International passport — clear scan of the biodata page',
          'Birth certificate — certified copy',
          'Recent passport-sized photograph',
        ],
      },
      {
        title: 'Academic Documents',
        items: [
          'Certified copies of all certificates and diplomas (secondary school, bachelor\'s, master\'s, etc.)',
          'Full academic transcripts for each qualification',
          'Grading scale explanation — if your transcripts use a grading system different from the destination country',
          'Certified translations — all documents must be translated and apostilled/legalised where required',
        ],
      },
      {
        title: 'Application Package',
        items: [
          'Detailed CV — Europass format preferred',
          'Statement of purpose or motivation letter — explaining why you chose the programme and how it fits your career goals',
          'Two to three recommendation letters — each signed and on the institution\'s or employer\'s official letterhead',
          'Research proposal — required if applying for a PhD or post-doctoral position',
        ],
      },
      {
        title: 'Language Proficiency',
        items: [
          'Valid language test certificate — IELTS or TOEFL for English-taught programmes; DELF/DALF for French; TestDaF or Goethe-Zertifikat for German; or the appropriate CEFR-aligned test for your destination language',
        ],
      },
      {
        title: 'Financial & Sponsorship Documents',
        items: [
          'Sponsor\'s bank statements — covering the last 3–6 months (usually parents or legal guardian)',
          'Sponsor\'s payslips or income tax returns',
          'Notarised affidavit of financial support from your sponsor',
          'Proof of any existing funding, scholarship awards, or education loans',
        ],
      },
      {
        title: 'Sponsorship-Specific (If You Have an Official Sponsor)',
        items: [
          'Official sponsorship letter — detailing exactly what is covered (tuition fees, living expenses, accommodation, travel)',
          'Contractual agreement between you and your sponsor',
          'Sponsor\'s registration documents and valid identification',
        ],
      },
      {
        title: 'Additional Documents',
        items: [
          'Medical certificate or health clearance (requirements vary by country)',
          'Police clearance certificate — often requested at a later stage of the process',
        ],
      },
    ],
  },
  {
    id: 'job',
    label: 'Job Placement',
    icon: '💼',
    sections: [
      {
        title: 'Personal Documents',
        items: [
          'International passport — clear copy',
          'Recent passport-sized photograph',
          'Birth certificate — sometimes required, depending on the employer or country',
        ],
      },
      {
        title: 'Professional Profile',
        items: [
          'Up-to-date CV — Europass format strongly recommended',
          'Tailored cover letter(s) — specific to the job or industry you are targeting',
          'Certified copies of your educational certificates and diplomas',
          'Professional training certificates and licences relevant to your field',
          'Detailed employment reference letters — on official letterhead, stating your job title, duration of employment, main duties, and performance',
          'Portfolio or work samples — if applicable to your profession (design, writing, engineering, etc.)',
        ],
      },
      {
        title: 'Qualification Recognition',
        items: [
          'Statement of Comparability — from the relevant NARIC office or an official credential evaluation report that confirms your qualification level in the destination country',
          'Proof of application for professional recognition — required if you work in a regulated profession (healthcare, law, engineering, teaching, etc.)',
        ],
      },
      {
        title: 'Language Skills',
        items: [
          'Official language test certificate — IELTS or TOEFL for English, or the appropriate CEFR-aligned test for the local language of the destination country',
          'Evidence of previous work experience conducted in that language',
        ],
      },
      {
        title: 'Pre-Screening Documents',
        items: [
          'Police clearance certificate — from your home country and from any country where you have lived for 6 months or more in the last 5–10 years',
          'Medical fitness certificate — if required by the employer or immigration authority',
          'Valid travel medical insurance — to cover you until you enrol in the national health insurance scheme of your destination country',
        ],
      },
      {
        title: 'Additional Information to Prepare',
        items: [
          'Your notice period and earliest availability to start',
          'Salary expectations — specify whether gross or net',
          'Preferred contract type and any information relevant to EU Blue Card eligibility',
        ],
      },
    ],
  },
  {
    id: 'pr',
    label: 'Permanent Residence',
    icon: '🏠',
    sections: [
      {
        title: 'Identity & Civil Status',
        items: [
          'Valid international passport — for you and any accompanying family members',
          'Full birth certificate — long-form version',
          'Marriage certificate, divorce decree, or death certificate of spouse — as applicable',
          'Birth certificates of all children included in the application',
          'Two passport-sized photographs per applicant',
        ],
      },
      {
        title: 'Criminal & Health Checks',
        items: [
          'Police clearance certificate — from your country of nationality and from every country where you have resided in the last 5–10 years (valid for 3–6 months depending on the destination)',
          'Medical certificate — issued by an approved panel physician',
          'Valid health insurance policy',
        ],
      },
      {
        title: 'Accommodation',
        items: [
          'Rental contract or property deed in the destination country',
          'For family reunification — invitation letter from your host along with their ID or residence documents',
        ],
      },
      {
        title: 'Financial Means',
        items: [
          'Personal bank statements — covering the last 6 months, showing steady income or sufficient savings',
          'Employment contract and recent payslips',
          'Proof of regular income — pension statements, rental income, or a blocked bank account if required',
        ],
      },
      {
        title: 'Work-Based Route (EU Blue Card / Skilled Worker)',
        items: [
          'Signed job offer or employment contract meeting the salary threshold',
          'Recognised qualifications and NARIC Statement of Comparability',
          'Employer declaration or work permit approval letter',
        ],
      },
      {
        title: 'Investor / Golden Visa Route',
        items: [
          'Proof of qualifying investment — real estate purchase contract, investment fund subscription, or capital transfer records',
          'Source-of-funds declaration with supporting evidence — tax returns, business accounts, sale of assets',
          'Business plan and company registration documents',
          'Completed due diligence questionnaires from the relevant authority or bank',
        ],
      },
      {
        title: 'Family Reunification Route',
        items: [
          'Sponsor\'s valid residence permit or national ID',
          'Legalised proof of family relationship (marriage/birth certificates)',
          'Evidence of adequate housing and stable income from the sponsor',
          'Integration certificate — A1 level language, if required by the destination country',
        ],
      },
      {
        title: 'Long-Term Resident EU (After 5 Years)',
        items: [
          'Copies of all previous residence permits',
          'Continuous residence proof — rental payment history, utility bills',
          'Tax returns and fiscal residency documents',
          'Integration certificate — language and civic knowledge as required',
        ],
      },
      {
        title: 'Translation & Legalisation',
        items: [
          'All official documents must be translated by a certified translator and apostilled or legalised according to the requirements of your destination country. Our team can advise you on the specific process for your case.',
        ],
      },
    ],
  },
];

export default function RequirementsTabs() {
  const [activeTab, setActiveTab] = useState(0);
  const tabsRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, index: number) => {
      if (e.key === 'ArrowRight') {
        const next = (index + 1) % TABS.length;
        setActiveTab(next);
        (tabsRef.current?.children[next] as HTMLElement)?.focus();
      } else if (e.key === 'ArrowLeft') {
        const prev = (index - 1 + TABS.length) % TABS.length;
        setActiveTab(prev);
        (tabsRef.current?.children[prev] as HTMLElement)?.focus();
      } else if (e.key === 'Enter' || e.key === ' ') {
        setActiveTab(index);
      }
    },
    []
  );

  return (
    <div className="w-full">
      {/* Tab List */}
      <div
        ref={tabsRef}
        role="tablist"
        aria-label="Service requirements"
        className="flex flex-wrap gap-1 sm:gap-0"
      >
        {TABS.map((tab, i) => (
          <button
            key={tab.id}
            id={`tab-${tab.id}`}
            role="tab"
            aria-selected={activeTab === i}
            aria-controls={`panel-${tab.id}`}
            tabIndex={activeTab === i ? 0 : -1}
            onClick={() => setActiveTab(i)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            className="relative flex items-center gap-2 px-5 py-3 text-sm font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 rounded-t-lg"
            style={{
              background: activeTab === i ? '#FFFFFF' : 'transparent',
              color: activeTab === i ? '#0B1D3A' : 'rgba(255,255,255,0.7)',
              fontWeight: activeTab === i ? 700 : 500,
              borderBottom: activeTab === i ? 'none' : undefined,
              marginBottom: activeTab === i ? '-1px' : 0,
              zIndex: activeTab === i ? 1 : 0,
            }}
          >
            <span className="text-base">{tab.icon}</span>
            <span>{tab.label}</span>
            {activeTab === i && (
              <motion.div
                layoutId="active-tab-bg"
                className="absolute inset-0 rounded-t-lg"
                style={{ background: '#C9A44B', zIndex: -1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      <AnimatePresence mode="wait">
        <RequirementTabPanel key={activeTab} panel={TABS[activeTab]} />
      </AnimatePresence>
    </div>
  );
}
