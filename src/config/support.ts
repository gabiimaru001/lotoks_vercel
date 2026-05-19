export const SUPPORT_CONFIG = {
  whatsappNumber: '2348012345678', // Replace with actual number (country code, no + or spaces)
  whatsappMessage: 'Hello Lotoks! I need help with...',
  businessName: 'Lotoks',
  responseTime: 'We typically reply within minutes',
  offlineMessage: "We'll get back to you within 24 hours.",
  autoReplyDelay: 1500, // ms before auto-reply appears
  typingDelay: 1000,    // ms to show typing indicator
  maxMessageLength: 500,
  persistKey: 'lotoks_chat_messages',
};

export const AUTO_REPLIES: { keywords: string[]; reply: string }[] = [
  {
    keywords: ['visa'],
    reply:
      'For Visa sponsorship inquiries, we typically need your passport details and destination preference. Would you like me to connect you with a visa specialist?',
  },
  {
    keywords: ['scholarship', 'education', 'study'],
    reply:
      'Our Education Scholarship team can help with applications across Europe. Do you have your academic documents ready?',
  },
  {
    keywords: ['job', 'work', 'career'],
    reply:
      'For Job Placement, please share your CV and preferred industry. We\'ll match you with opportunities.',
  },
  {
    keywords: ['pr', 'permanent', 'residence'],
    reply:
      'For Permanent Residence inquiries, our advisors will guide you through the requirements for your chosen country.',
  },
  {
    keywords: ['price', 'fee', 'cost'],
    reply:
      'Our application fees vary by service and country. Visit our pricing page or share your preferred service for a quick quote.',
  },
  {
    keywords: ['urgent', 'emergency', 'asap'],
    reply:
      'For urgent matters, please also reach us on WhatsApp for faster assistance. Our WhatsApp button is on the bottom right of this page.',
  },
];

export const DEFAULT_REPLY =
  '👋 Hello! Thank you for contacting Lotoks. One of our advisors will be with you shortly. How can we help you today?';
