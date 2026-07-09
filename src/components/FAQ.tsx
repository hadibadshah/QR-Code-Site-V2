import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Sparkles, Shield, Compass, Download, HelpCircle } from 'lucide-react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const steps = [
    {
      title: 'Choose Input Type',
      desc: 'Select from Website links, Plain text, secure WiFi login, WhatsApp chat, or direct Email template.',
      icon: Compass,
    },
    {
      title: 'Style with Custom Colors',
      desc: 'Choose foreground and background colors to match your brand identity or custom aesthetic.',
      icon: Sparkles,
    },
    {
      title: 'Configure Resolution',
      desc: 'Adjust dimensions up to 1024px for ultra-high-resolution print readiness.',
      icon: Shield,
    },
    {
      title: 'Instantly Download',
      desc: 'Tap the download action to save the high-resolution PNG file locally completely free.',
      icon: Download,
    },
  ];

  const faqs = [
    {
      question: 'How to create a QR code for a link online free?',
      answer: "Using our free custom QR code maker, select the 'Website Link' preset, paste your URL, customize the colors, and download a high-quality QR vector image instantly without registration.",
    },
    {
      question: 'Can I download high-resolution QR codes from this site?',
      answer: 'Yes, absolutely! We support high-resolution QR code download outputs up to 1024 × 1024 pixels. These high-density PNG files are fully optimized for print media, stickers, menus, and high-quality physical displays.',
    },
    {
      question: 'Is this QR code generator online free tool secure?',
      answer: 'Yes. Unlike other trackers, our QR code generator online free tool operates 100% client-side in your web browser. Your credentials, WiFi passwords, and links are processed locally and are never stored or logged on external servers.',
    },
    {
      question: 'Does the generated code support modern smartphone scanners?',
      answer: 'Yes, our codes are fully compliant with ISO/IEC 18004 standards, meaning they are guaranteed to scan accurately on all iOS and Android smartphone cameras, native scanners, and QR reader applications.',
    },
  ];

  return (
    <div className="space-y-12">
      {/* Step-by-Step SEO Section */}
      <section className="space-y-6">
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-extrabold font-display text-slate-800 dark:text-slate-100 tracking-tight">
            How to Use Our <span className="bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">Free Custom QR Code Maker</span>
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
            Follow these simple steps to generate and download professional, print-ready custom QR codes in seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div 
                key={idx} 
                className="p-6 rounded-3xl border border-slate-200/60 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-[0_4px_20px_-5px_rgba(0,0,0,0.01)] hover:shadow-[0_12px_30px_-5px_rgba(0,0,0,0.03)] dark:hover:shadow-[0_12px_40px_rgba(0,0,0,0.25)] hover:border-emerald-500/40 dark:hover:border-emerald-500/30 hover:scale-[1.02] transition-all duration-300 flex flex-col items-start gap-4"
              >
                <div className="p-3 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 dark:from-emerald-950/40 dark:to-teal-950/40 text-emerald-600 dark:text-emerald-400 font-bold flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-mono text-[10px] font-extrabold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-450 border border-slate-200/20">
                      Step {idx + 1}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 font-display">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-450 dark:text-slate-450 mt-1.5 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Accordion FAQs Section */}
      <section className="space-y-6">
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-extrabold font-display text-slate-800 dark:text-slate-100 tracking-tight flex items-center justify-center md:justify-start gap-2">
            <HelpCircle className="w-6 h-6 text-emerald-500" />
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
            Learn more about high-resolution QR code downloads, link creation, and security.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx} 
                className="border border-slate-200/60 dark:border-slate-800/80 rounded-2xl bg-white dark:bg-slate-900 overflow-hidden shadow-[0_2px_12px_-5px_rgba(0,0,0,0.01)] hover:border-slate-300 dark:hover:border-slate-700/80 transition-all duration-300"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full px-6 py-4.5 flex items-center justify-between text-left font-bold text-slate-850 dark:text-slate-200 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  <span className="text-sm md:text-base font-extrabold font-display tracking-tight">{faq.question}</span>
                  <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-emerald-500' : ''}`} />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 pt-2 border-t border-slate-100 dark:border-slate-800/40 text-xs md:text-sm text-slate-500 dark:text-slate-400 leading-relaxed bg-slate-50/40 dark:bg-slate-950/20">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
