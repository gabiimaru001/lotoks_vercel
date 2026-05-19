'use client';

import { motion } from 'framer-motion';
import DocumentChecklist from './DocumentChecklist';

export interface TabPanelData {
  id: string;
  label: string;
  icon: string;
  sections: {
    title: string;
    items: string[];
  }[];
}

interface RequirementTabPanelProps {
  panel: TabPanelData;
}

export default function RequirementTabPanel({ panel }: RequirementTabPanelProps) {
  return (
    <motion.div
      key={panel.id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.35 }}
      role="tabpanel"
      aria-labelledby={`tab-${panel.id}`}
      id={`panel-${panel.id}`}
      className="bg-white shadow-lg p-6 md:p-10"
      style={{ borderRadius: '0 8px 8px 8px' }}
    >
      <div className="flex items-center gap-3 mb-8">
        <span className="text-3xl">{panel.icon}</span>
        <h2
          className="text-2xl md:text-3xl font-bold"
          style={{ color: '#0B1D3A', fontFamily: 'Georgia, "Playfair Display", serif' }}
        >
          {panel.label}
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12">
        {panel.sections.map((section, i) => (
          <DocumentChecklist
            key={section.title}
            title={section.title}
            items={section.items}
            delay={i * 0.08}
          />
        ))}
      </div>
    </motion.div>
  );
}
