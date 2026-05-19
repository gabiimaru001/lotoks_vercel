'use client';

import { usePathname } from 'next/navigation';
import ChatWidget from './ChatWidget';
import WhatsAppButton from './WhatsAppButton';
import { useChatMessages } from '@/hooks/useChatMessages';

// Inner component that shares state between ChatWidget and WhatsAppButton
function SupportWidgets() {
  const { isOpen } = useChatMessages();
  return (
    <div className="flex flex-col items-end gap-3">
      <div className="relative">
        <ChatWidget />
      </div>
      <WhatsAppButton isChatOpen={isOpen} />
    </div>
  );
}

export default function SupportSystem() {
  const pathname = usePathname();
  if (pathname?.startsWith('/admin')) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[9000] pointer-events-none">
      <div className="pointer-events-auto">
        <SupportWidgets />
      </div>
    </div>
  );
}
