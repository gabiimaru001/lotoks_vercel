'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, ArrowLeft } from 'lucide-react';
import { useChatMessages } from '@/hooks/useChatMessages';
import { SUPPORT_CONFIG } from '@/config/support';
import type { OfflineFormData } from '@/types/chat';

function formatTime(date: Date): string {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function TypingIndicator() {
  return (
    <div className="flex items-end gap-2 mb-3">
      <div
        className="flex items-center gap-1 px-4 py-3 rounded-r-lg rounded-tl-lg rounded-bl-sm"
        style={{ background: '#E5E7EB' }}
      >
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="block w-2 h-2 rounded-full"
            style={{ background: '#4B5563' }}
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
          />
        ))}
      </div>
    </div>
  );
}

interface OfflineFormProps {
  onSubmit: (data: OfflineFormData) => void;
}

function OfflineForm({ onSubmit }: OfflineFormProps) {
  const [form, setForm] = useState<OfflineFormData>({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<Partial<OfflineFormData>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errs: Partial<OfflineFormData> = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Invalid email';
    if (!form.message.trim()) errs.message = 'Message is required';
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    onSubmit(form);
    setSubmitted(true);
    setForm({ name: '', email: '', message: '' });
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-4 mb-4 rounded-lg p-4 text-center text-sm font-medium"
        style={{ background: 'rgba(201,164,75,0.1)', border: '1px solid rgba(201,164,75,0.3)', color: '#0B1D3A' }}
      >
        ✅ Message sent! We&apos;ll get back to you within 24 hours.
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-3 mb-3 rounded-lg p-4"
      style={{ background: '#F9FAFB', border: '1px solid #E5E7EB' }}
    >
      <p className="text-xs font-semibold mb-3" style={{ color: '#0B1D3A' }}>
        Leave us a message
      </p>
      <div className="space-y-2">
        <div>
          <input
            type="text"
            placeholder="Your name *"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            className="w-full text-sm px-3 py-2 rounded border outline-none"
            style={{
              borderColor: errors.name ? '#D14B4B' : '#E5E7EB',
              borderRadius: '4px',
              color: '#1F2937',
            }}
          />
          {errors.name && <p className="text-xs mt-0.5" style={{ color: '#D14B4B' }}>{errors.name}</p>}
        </div>
        <div>
          <input
            type="email"
            placeholder="Your email *"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            className="w-full text-sm px-3 py-2 rounded border outline-none"
            style={{
              borderColor: errors.email ? '#D14B4B' : '#E5E7EB',
              borderRadius: '4px',
              color: '#1F2937',
            }}
          />
          {errors.email && <p className="text-xs mt-0.5" style={{ color: '#D14B4B' }}>{errors.email}</p>}
        </div>
        <div>
          <textarea
            placeholder="Your message *"
            rows={2}
            value={form.message}
            onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
            className="w-full text-sm px-3 py-2 rounded border outline-none resize-none"
            style={{
              borderColor: errors.message ? '#D14B4B' : '#E5E7EB',
              borderRadius: '4px',
              color: '#1F2937',
            }}
          />
          {errors.message && <p className="text-xs mt-0.5" style={{ color: '#D14B4B' }}>{errors.message}</p>}
        </div>
        <button
          type="submit"
          className="w-full py-2 rounded text-sm font-semibold transition-opacity hover:opacity-90"
          style={{ background: '#C9A44B', color: '#0B1D3A', borderRadius: '4px' }}
        >
          Send Message
        </button>
      </div>
    </form>
  );
}

export default function ChatWidget() {
  const {
    messages,
    isOpen,
    unreadCount,
    isTyping,
    isLoaded,
    openChat,
    closeChat,
    sendMessage,
    submitOfflineForm,
  } = useChatMessages();

  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 300);
  }, [isOpen]);

  const handleSend = () => {
    if (!inputText.trim()) return;
    sendMessage(inputText);
    setInputText('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <>
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chat-window"
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            className={
              isMobile
                ? 'fixed inset-0 z-[9998] flex flex-col bg-white'
                : 'absolute bottom-20 right-0 w-80 md:w-96 flex flex-col bg-white shadow-2xl'
            }
            style={{
              borderRadius: isMobile ? 0 : '8px',
              height: isMobile ? '100dvh' : '500px',
              overflow: 'hidden',
            }}
          >
            {/* Header */}
            <div
              className="flex items-center gap-3 px-4 py-4 flex-shrink-0"
              style={{
                background: '#0B1D3A',
                borderRadius: isMobile ? 0 : '8px 8px 0 0',
              }}
            >
              {isMobile && (
                <button
                  onClick={closeChat}
                  className="text-white/70 hover:text-white transition-colors mr-1"
                  aria-label="Close chat"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
              )}
              {/* Avatar */}
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(201,164,75,0.2)' }}
              >
                <MessageCircle className="w-5 h-5" style={{ color: '#C9A44B' }} />
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className="text-white text-base font-semibold leading-tight"
                  style={{ fontFamily: 'Georgia, serif' }}
                >
                  {SUPPORT_CONFIG.businessName} Support
                </p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-green-400 inline-block" />
                  <span className="text-xs" style={{ color: '#9CA3AF' }}>
                    {SUPPORT_CONFIG.responseTime}
                  </span>
                </div>
              </div>
              {!isMobile && (
                <button
                  onClick={closeChat}
                  className="text-white/60 hover:text-white transition-colors"
                  aria-label="Close chat"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Messages Body */}
            <div
              className="flex-1 overflow-y-auto p-4 space-y-1"
              style={{ background: '#F9FAFB' }}
            >
              {!isLoaded ? (
                /* Skeleton loader */
                <div className="space-y-3 animate-pulse">
                  {[80, 60, 90].map((w, i) => (
                    <div
                      key={i}
                      className="h-8 rounded-lg"
                      style={{ width: `${w}%`, background: '#E5E7EB' }}
                    />
                  ))}
                </div>
              ) : (
                messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className={`flex mb-3 ${
                      msg.sender === 'user'
                        ? 'justify-end'
                        : msg.sender === 'system'
                        ? 'justify-center'
                        : 'justify-start'
                    }`}
                  >
                    {msg.sender === 'system' ? (
                      <div
                        className="px-4 py-2 rounded-lg text-sm italic max-w-[85%] text-center"
                        style={{
                          background: 'rgba(201,164,75,0.1)',
                          color: '#0B1D3A',
                          border: '1px solid rgba(201,164,75,0.2)',
                        }}
                      >
                        {msg.text}
                        <p className="text-xs mt-1 not-italic" style={{ color: '#9CA3AF' }}>
                          {formatTime(msg.timestamp)}
                        </p>
                      </div>
                    ) : (
                      <div
                        className={`px-4 py-2.5 text-sm max-w-[80%] ${
                          msg.sender === 'user'
                            ? 'rounded-l-lg rounded-tr-lg rounded-br-sm'
                            : 'rounded-r-lg rounded-tl-lg rounded-bl-sm'
                        }`}
                        style={{
                          background: msg.sender === 'user' ? '#0B1D3A' : '#E5E7EB',
                          color: msg.sender === 'user' ? '#FFFFFF' : '#1F2937',
                        }}
                      >
                        {msg.text}
                        <p
                          className="text-xs mt-1"
                          style={{
                            color: msg.sender === 'user' ? 'rgba(255,255,255,0.5)' : '#9CA3AF',
                          }}
                        >
                          {formatTime(msg.timestamp)}
                        </p>
                      </div>
                    )}
                  </motion.div>
                ))
              )}
              {isTyping && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </div>

            {/* Offline Form */}
            <OfflineForm onSubmit={submitOfflineForm} />

            {/* Input Footer */}
            <div
              className="flex items-center gap-2 px-3 py-3 flex-shrink-0"
              style={{ borderTop: '1px solid #E5E7EB', background: '#FFFFFF' }}
            >
              <input
                ref={inputRef}
                type="text"
                value={inputText}
                onChange={(e) =>
                  setInputText(e.target.value.slice(0, SUPPORT_CONFIG.maxMessageLength))
                }
                onKeyDown={handleKeyDown}
                placeholder="Type a message..."
                className="flex-1 px-4 py-2 text-sm outline-none"
                style={{
                  border: '1px solid #E5E7EB',
                  borderRadius: '9999px',
                  color: '#1F2937',
                  background: '#F9FAFB',
                }}
              />
              <motion.button
                onClick={handleSend}
                whileTap={{ scale: 0.9 }}
                disabled={!inputText.trim()}
                aria-label="Send message"
                className="flex items-center justify-center w-9 h-9 rounded-full flex-shrink-0 transition-opacity"
                style={{
                  background: inputText.trim() ? '#C9A44B' : '#E5E7EB',
                  color: inputText.trim() ? '#0B1D3A' : '#9CA3AF',
                }}
              >
                <Send className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bubble Trigger */}
      <motion.button
        onClick={isOpen ? closeChat : openChat}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="relative flex items-center justify-center rounded-full shadow-lg"
        style={{
          width: '3.5rem',
          height: '3.5rem',
          background: '#C9A44B',
        }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6" style={{ color: '#0B1D3A' }} />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle className="w-6 h-6" style={{ color: '#0B1D3A' }} />
            </motion.span>
          )}
        </AnimatePresence>

        {/* Unread Badge */}
        <AnimatePresence>
          {unreadCount > 0 && !isOpen && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 rounded-full text-white text-xs font-bold"
              style={{ background: '#D14B4B' }}
            >
              {unreadCount}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
}
