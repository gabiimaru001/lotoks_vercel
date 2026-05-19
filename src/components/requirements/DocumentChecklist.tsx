'use client';

import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

interface DocumentChecklistProps {
  title: string;
  items: string[];
  delay?: number;
}

export default function DocumentChecklist({ title, items, delay = 0 }: DocumentChecklistProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="mb-8"
    >
      <h3
        className="text-base font-semibold mb-3 pb-2"
        style={{
          color: '#0B1D3A',
          borderBottom: '2px solid rgba(201,164,75,0.3)',
        }}
      >
        {title}
      </h3>
      <ul className="space-y-2.5">
        {items.map((item, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: delay + i * 0.04 }}
            className="flex items-start gap-3 text-sm leading-relaxed"
            style={{ color: '#1F2937' }}
          >
            <CheckCircle2
              className="w-4 h-4 flex-shrink-0 mt-0.5"
              style={{ color: '#C9A44B' }}
            />
            <span dangerouslySetInnerHTML={{ __html: item }} />
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}
