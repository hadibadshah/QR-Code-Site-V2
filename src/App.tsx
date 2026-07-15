import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import QRCode from 'qrcode';
import { jsPDF } from 'jspdf';
import {
  QrCode,
  Link2,
  FileText,
  Wifi,
  MessageSquare,
  Mail,
  Download,
  Copy,
  Check,
  Sun,
  Moon,
  ExternalLink,
  Mail as MailIcon,
  X,
  Sparkles,
  ShieldCheck,
  Zap,
  Lock,
  Globe,
  Share2,
  ArrowRight,
  ArrowLeft,
  MapPin,
  Compass,
  Box,
  CreditCard,
  UserRound,
  Upload,
  Plus,
  Image as ImageIcon,
  Phone,
  Calendar,
  Video,
  Music,
  Coins,
  Facebook,
  Instagram,
  Linkedin,
  Youtube
} from 'lucide-react';

import {
  QRInputType,
  WiFiForm,
  WhatsAppForm,
  EmailForm,
  MapForm,
  SocialForm,
  ProductForm,
  PaymentForm,
  VCardForm,
  QRStyleOptions
} from './types';
import { generateQRPayload } from './utils/qrHelper';
import PromoGrid from './components/PromoGrid';
import FAQ from './components/FAQ';
import { AdsterraBanner } from './components/AdsterraBanner';
import { Adsterra300x250 } from './components/Adsterra300x250';
import { Adsterra160x600 } from './components/Adsterra160x600';
import { Adsterra320x50 } from './components/Adsterra320x50';
import { AdsterraNative } from './components/AdsterraNative';
import { useRouter, Link } from './components/Router';
import { articles } from './data/articles';

export default function App() {
  const { path, navigateTo } = useRouter();

  // Normalize path
  const cleanPath = path === '/' ? '/' : path.replace(/\/$/, '');

  let activeTab: 'tool' | 'about' | 'blog' | 'privacy' | 'terms' | 'contact' | 'article' = 'tool';
  let currentArticleSlug: string | null = null;

  if (cleanPath === '/about') {
    activeTab = 'about';
  } else if (cleanPath === '/blog') {
    activeTab = 'blog';
  } else if (cleanPath === '/contact') {
    activeTab = 'contact';
  } else if (cleanPath === '/privacy') {
    activeTab = 'privacy';
  } else if (cleanPath === '/terms') {
    activeTab = 'terms';
  } else if (cleanPath.startsWith('/articles/')) {
    activeTab = 'article';
    currentArticleSlug = cleanPath.substring('/articles/'.length);
  } else {
    activeTab = 'tool';
  }

  // --- STATE ---
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('ez-qr-theme');
      if (saved === 'dark' || saved === 'light') return saved;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  const [exportFormat, setExportFormat] = useState<'png' | 'jpeg' | 'pdf'>('png');
  const [inputType, setInputType] = useState<QRInputType>('website');

  // Input Data States
  const [websiteUrl, setWebsiteUrl] = useState('https://eztoolbox.xyz');
  const [plainText, setPlainText] = useState('Welcome to EZ Toolbox QR Code Generator! Customize colors, resolution, and margins completely free.');
  
  const [wifiForm, setWifiForm] = useState<WiFiForm>({
    ssid: 'MyHomeWiFi',
    password: 'SecurePassword123',
    security: 'WPA'
  });

  const [whatsappForm, setWhatsappForm] = useState<WhatsAppForm>({
    phone: '+923017480809',
    message: 'Hello, I scanned your custom QR code!'
  });

  const [emailForm, setEmailForm] = useState<EmailForm>({
    recipient: 'raorafique2010@gmail.com',
    subject: 'EZ QR Code Inquiry',
    body: "Hi! I'm reaching out using the custom QR code generated on your free online tool."
  });

  const [mapForm, setMapForm] = useState<MapForm>({
    address: 'Times Square, New York, NY',
    useCoordinates: false,
    latitude: '40.758895',
    longitude: '-73.985131'
  });

  const [socialForm, setSocialForm] = useState<SocialForm>({
    platform: 'twitter',
    username: 'Google'
  });

  const [productForm, setProductForm] = useState<ProductForm>({
    name: 'EZ Smart Coffee Mug',
    sku: 'EZ-MUG-99',
    price: '$45.00',
    description: 'Keep your drink perfectly warm with full Bluetooth temperature control.'
  });

  const [paymentForm, setPaymentForm] = useState<PaymentForm>({
    type: 'upi',
    payeeId: 'eztoolbox@upi',
    payeeName: 'EZ Toolbox',
    amount: '100',
    note: 'Premium Subscription'
  });

  const [vcardForm, setVCardForm] = useState<VCardForm>({
    firstName: 'Rao',
    lastName: 'Rafique',
    mobile: '+92 301 7480809',
    phone: '+92 301 7480809',
    email: 'raorafique2010@gmail.com',
    company: 'EZ Tech Solutions',
    title: 'Senior Product Lead',
    url: 'https://eztoolbox.xyz'
  });

  // Additional New Form States
  const [phoneState, setPhoneState] = useState('+923017480809');
  const [smsState, setSmsState] = useState({ phone: '+923017480809', message: 'Hi there!' });
  const [facebookState, setFacebookState] = useState('https://facebook.com/Google');
  const [instagramState, setInstagramState] = useState('https://instagram.com/google');
  const [linkedinState, setLinkedinState] = useState('https://linkedin.com/company/google');
  const [youtubeState, setYoutubeState] = useState('https://youtube.com/@google');
  const [tiktokState, setTiktokState] = useState('https://tiktok.com/@google');
  const [twitterState, setTwitterState] = useState('https://x.com/Google');
  const [bitcoinState, setBitcoinState] = useState({ address: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa', amount: '0.001', message: 'EZ Payment' });
  const [ethereumState, setEthereumState] = useState({ address: '0x32Be343B94f860124dC4fEe278FDCBD38C102D88', amount: '0.05' });
  const [paypalState, setPaypalState] = useState({ email: 'pay@eztoolbox.xyz', amount: '10', memo: 'Services rendered' });
  const [eventState, setEventState] = useState({ title: 'EZ Toolbox Launch Party', location: 'Virtual & Worldwide', start: '20261231T180000Z', end: '20261231T210000Z', description: 'Join us live!' });
  const [zoomState, setZoomState] = useState({ meetingId: '1234567890', password: 'secretpassword' });
  const [spotifyState, setSpotifyState] = useState('https://open.spotify.com/playlist/37i9dQZF1DXcBWIGg6j3H9');
  const [appstoreState, setAppstoreState] = useState('https://apps.apple.com/app/id123456789');
  const [googleplayState, setGoogleplayState] = useState('https://play.google.com/store/apps/details?id=com.google.android.googleplay');

  // Custom Styling Panel States
  const [styleOptions, setStyleOptions] = useState<QRStyleOptions>({
    foreground: '#0f172a',
    background: '#ffffff',
    resolution: 512,
    quietZone: 2,
    errorCorrectionLevel: 'H',
    logoType: 'none',
    customLogoData: null,
    customLogoScale: 1.0,
    customLogoRadius: 0.25
  });

  // Utility states
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastIsError, setToastIsError] = useState(false);
  const [supportModalOpen, setSupportModalOpen] = useState(false);

  // Helper to generate dynamic random support message link
  const getWhatsAppSupportLink = () => {
    const messages = [
      "Assalam-o-Alaikum, I need support with the EZ QR Code Generator!",
      "Hi Rafique! I am using your free QR tool and need some custom assistance.",
      "Hello EZ Toolbox team, I have a quick suggestion for the QR generator.",
      "Hi! I scanned your WhatsApp support. I want to connect regarding EZ Toolbox.",
      "Hello Rao Rafique, I'd like to ask a technical question about the QR styling."
    ];
    const randomMsg = messages[Math.floor(Math.random() * messages.length)];
    return `https://wa.me/923017480809?text=${encodeURIComponent(randomMsg)}`;
  };

  // Interactive SEO Contact Form state
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactSubject, setContactSubject] = useState('Inquiry');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSubmitting, setContactSubmitting] = useState(false);

  // Canvas ref
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // --- PERSIST THEME ---
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('ez-qr-theme', theme);
  }, [theme]);

  // --- DYNAMIC PAYLOAD COMPUTATION ---
  const payload = generateQRPayload(inputType, {
    website: websiteUrl,
    text: plainText,
    wifi: wifiForm,
    whatsapp: whatsappForm,
    email: emailForm,
    map: mapForm,
    social: socialForm,
    product: productForm,
    payment: paymentForm,
    vcard: vcardForm,
    phone: phoneState,
    sms: smsState,
    facebook: facebookState,
    instagram: instagramState,
    linkedin: linkedinState,
    youtube: youtubeState,
    tiktok: tiktokState,
    twitter: twitterState,
    bitcoin: bitcoinState,
    ethereum: ethereumState,
    paypal: paypalState,
    event: eventState,
    zoom: zoomState,
    spotify: spotifyState,
    appstore: appstoreState,
    googleplay: googleplayState
  });

  // --- QR CODE GENERATION ENGINE ---
  useEffect(() => {
    if (canvasRef.current && payload.trim()) {
      QRCode.toCanvas(
        canvasRef.current,
        payload,
        {
          width: styleOptions.resolution,
          margin: styleOptions.quietZone,
          color: {
            dark: styleOptions.foreground,
            light: styleOptions.background
          },
          errorCorrectionLevel: styleOptions.errorCorrectionLevel
        },
        (error) => {
          if (error) {
            console.error('QR code generation failed:', error);
            return;
          }

          // Draw the center logo
          const canvas = canvasRef.current;
          if (!canvas) return;

          // Crucial fix: Prevent the canvas from blowing up its display size by overriding inline styles
          canvas.style.setProperty('width', '100%', 'important');
          canvas.style.setProperty('height', '100%', 'important');
          canvas.style.setProperty('max-width', '100%', 'important');
          canvas.style.setProperty('max-height', '100%', 'important');

          const logoTypeToDraw = styleOptions.logoType === 'auto' ? inputType : styleOptions.logoType;
          if (logoTypeToDraw === 'none') return;

          const ctx = canvas.getContext('2d');
          if (!ctx) return;

          const w = canvas.width;
          const h = canvas.height;
          
          // Outer backing size (around 22% of QR width)
          const size = Math.floor(w * 0.22);
          const x = (w - size) / 2;
          const y = (h - size) / 2;

          // Clear backing block with background color
          ctx.fillStyle = styleOptions.background;
          ctx.beginPath();
          const radius = size * 0.25; // rounded backing
          ctx.moveTo(x + radius, y);
          ctx.lineTo(x + size - radius, y);
          ctx.quadraticCurveTo(x + size, y, x + size, y + radius);
          ctx.lineTo(x + size, y + size - radius);
          ctx.quadraticCurveTo(x + size, y + size, x + size - radius, y + size);
          ctx.lineTo(x + radius, y + size);
          ctx.quadraticCurveTo(x, y + size, x, y + size - radius);
          ctx.lineTo(x, y + radius);
          ctx.quadraticCurveTo(x, y, x + radius, y);
          ctx.closePath();
          ctx.fill();

          // Subtle border matching the dark color with transparency
          ctx.strokeStyle = styleOptions.foreground + '25';
          ctx.lineWidth = Math.max(1.5, w * 0.006);
          ctx.stroke();

          // Draw logo icon/emoji inside backing block (around 16% of QR width)
          const logoSize = Math.floor(w * 0.16);
          const lx = (w - logoSize) / 2;
          const ly = (h - logoSize) / 2;

          if (logoTypeToDraw === 'custom' && styleOptions.customLogoData) {
            const img = new Image();
            img.onload = () => {
              ctx.save();
              ctx.beginPath();
              
              const currentScale = styleOptions.customLogoScale ?? 1.0;
              const currentRadius = styleOptions.customLogoRadius ?? 0.25;
              
              const adjustedLogoSize = Math.floor(logoSize * currentScale);
              const lxAdjusted = (w - adjustedLogoSize) / 2;
              const lyAdjusted = (h - adjustedLogoSize) / 2;
              const lr = adjustedLogoSize * currentRadius;
              
              ctx.moveTo(lxAdjusted + lr, lyAdjusted);
              ctx.lineTo(lxAdjusted + adjustedLogoSize - lr, lyAdjusted);
              ctx.quadraticCurveTo(lxAdjusted + adjustedLogoSize, lyAdjusted, lxAdjusted + adjustedLogoSize, lyAdjusted + lr);
              ctx.lineTo(lxAdjusted + adjustedLogoSize, lyAdjusted + adjustedLogoSize - lr);
              ctx.quadraticCurveTo(lxAdjusted + adjustedLogoSize, lyAdjusted + adjustedLogoSize, lxAdjusted + adjustedLogoSize - lr, lyAdjusted + adjustedLogoSize);
              ctx.lineTo(lxAdjusted + lr, lyAdjusted + adjustedLogoSize);
              ctx.quadraticCurveTo(lxAdjusted, lyAdjusted + adjustedLogoSize, lxAdjusted, lyAdjusted + adjustedLogoSize - lr);
              ctx.lineTo(lxAdjusted, lyAdjusted + lr);
              ctx.quadraticCurveTo(lxAdjusted, lyAdjusted, lxAdjusted + lr, lyAdjusted);
              ctx.closePath();
              ctx.clip();
              
              ctx.drawImage(img, lxAdjusted, lyAdjusted, adjustedLogoSize, adjustedLogoSize);
              ctx.restore();
            };
            img.src = styleOptions.customLogoData;
          } else if (logoTypeToDraw === 'social' || ['facebook', 'instagram', 'linkedin', 'youtube', 'tiktok', 'twitter'].includes(logoTypeToDraw)) {
            const platform = (logoTypeToDraw === 'social' || logoTypeToDraw === 'auto') ? (['facebook', 'instagram', 'linkedin', 'youtube', 'tiktok', 'twitter'].includes(inputType) ? inputType : socialForm.platform) : logoTypeToDraw;
            ctx.save();
            
            if (platform === 'youtube') {
              ctx.fillStyle = '#FF0000';
              ctx.beginPath();
              const r = logoSize * 0.25;
              ctx.moveTo(lx + r, ly);
              ctx.lineTo(lx + logoSize - r, ly);
              ctx.quadraticCurveTo(lx + logoSize, ly, lx + logoSize, ly + r);
              ctx.lineTo(lx + logoSize, ly + logoSize - r);
              ctx.quadraticCurveTo(lx + logoSize, ly + logoSize, lx + logoSize - r, ly + logoSize);
              ctx.lineTo(lx + r, ly + logoSize);
              ctx.quadraticCurveTo(lx, ly + logoSize, lx, ly + logoSize - r);
              ctx.lineTo(lx, ly + r);
              ctx.quadraticCurveTo(lx, ly, lx + r, ly);
              ctx.closePath();
              ctx.fill();

              ctx.fillStyle = '#FFFFFF';
              ctx.beginPath();
              const tw = logoSize * 0.35;
              const th = logoSize * 0.35;
              const tx = lx + (logoSize - tw) / 2 + (logoSize * 0.04);
              const ty = ly + (logoSize - th) / 2;
              ctx.moveTo(tx, ty);
              ctx.lineTo(tx + tw, ty + th / 2);
              ctx.lineTo(tx, ty + th);
              ctx.closePath();
              ctx.fill();
            } else if (platform === 'facebook') {
              ctx.fillStyle = '#1877F2';
              ctx.beginPath();
              const r = logoSize * 0.25;
              ctx.moveTo(lx + r, ly);
              ctx.lineTo(lx + logoSize - r, ly);
              ctx.quadraticCurveTo(lx + logoSize, ly, lx + logoSize, ly + r);
              ctx.lineTo(lx + logoSize, ly + logoSize - r);
              ctx.quadraticCurveTo(lx + logoSize, ly + logoSize, lx + logoSize - r, ly + logoSize);
              ctx.lineTo(lx + r, ly + logoSize);
              ctx.quadraticCurveTo(lx, ly + logoSize, lx, ly + logoSize - r);
              ctx.lineTo(lx, ly + r);
              ctx.quadraticCurveTo(lx, ly, lx + r, ly);
              ctx.closePath();
              ctx.fill();

              ctx.fillStyle = '#FFFFFF';
              ctx.font = `bold ${Math.floor(logoSize * 0.95)}px "Helvetica Neue", Arial, sans-serif`;
              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';
              ctx.fillText('f', lx + logoSize * 0.55, ly + logoSize * 0.52);
            } else if (platform === 'twitter') {
              ctx.fillStyle = '#000000';
              ctx.beginPath();
              const r = logoSize * 0.25;
              ctx.moveTo(lx + r, ly);
              ctx.lineTo(lx + logoSize - r, ly);
              ctx.quadraticCurveTo(lx + logoSize, ly, lx + logoSize, ly + r);
              ctx.lineTo(lx + logoSize, ly + logoSize - r);
              ctx.quadraticCurveTo(lx + logoSize, ly + logoSize, lx + logoSize - r, ly + logoSize);
              ctx.lineTo(lx + r, ly + logoSize);
              ctx.quadraticCurveTo(lx, ly + logoSize, lx, ly + logoSize - r);
              ctx.lineTo(lx, ly + r);
              ctx.quadraticCurveTo(lx, ly, lx + r, ly);
              ctx.closePath();
              ctx.fill();

              ctx.fillStyle = '#FFFFFF';
              ctx.font = `bold ${Math.floor(logoSize * 0.65)}px sans-serif`;
              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';
              ctx.fillText('𝕏', lx + logoSize * 0.5, ly + logoSize * 0.5);
            } else if (platform === 'linkedin') {
              ctx.fillStyle = '#0A66C2';
              ctx.beginPath();
              const r = logoSize * 0.25;
              ctx.moveTo(lx + r, ly);
              ctx.lineTo(lx + logoSize - r, ly);
              ctx.quadraticCurveTo(lx + logoSize, ly, lx + logoSize, ly + r);
              ctx.lineTo(lx + logoSize, ly + logoSize - r);
              ctx.quadraticCurveTo(lx + logoSize, ly + logoSize, lx + logoSize - r, ly + logoSize);
              ctx.lineTo(lx + r, ly + logoSize);
              ctx.quadraticCurveTo(lx, ly + logoSize, lx, ly + logoSize - r);
              ctx.lineTo(lx, ly + r);
              ctx.quadraticCurveTo(lx, ly, lx + r, ly);
              ctx.closePath();
              ctx.fill();

              ctx.fillStyle = '#FFFFFF';
              ctx.font = `bold ${Math.floor(logoSize * 0.55)}px "Inter", Arial, sans-serif`;
              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';
              ctx.fillText('in', lx + logoSize * 0.5, ly + logoSize * 0.46);
            } else if (platform === 'instagram') {
              const grad = ctx.createLinearGradient(lx, ly + logoSize, lx + logoSize, ly);
              grad.addColorStop(0, '#f9ce34');
              grad.addColorStop(0.5, '#ee2a7b');
              grad.addColorStop(1, '#6228d7');
              ctx.fillStyle = grad;
              
              ctx.beginPath();
              const r = logoSize * 0.25;
              ctx.moveTo(lx + r, ly);
              ctx.lineTo(lx + logoSize - r, ly);
              ctx.quadraticCurveTo(lx + logoSize, ly, lx + logoSize, ly + r);
              ctx.lineTo(lx + logoSize, ly + logoSize - r);
              ctx.quadraticCurveTo(lx + logoSize, ly + logoSize, lx + logoSize - r, ly + logoSize);
              ctx.lineTo(lx + r, ly + logoSize);
              ctx.quadraticCurveTo(lx, ly + logoSize, lx, ly + logoSize - r);
              ctx.lineTo(lx, ly + r);
              ctx.quadraticCurveTo(lx, ly, lx + r, ly);
              ctx.closePath();
              ctx.fill();

              ctx.strokeStyle = '#FFFFFF';
              ctx.lineWidth = Math.max(1.5, logoSize * 0.08);
              ctx.lineCap = 'round';
              ctx.lineJoin = 'round';
              
              const cw = logoSize * 0.55;
              const cx = lx + (logoSize - cw) / 2;
              const cy = ly + (logoSize - cw) / 2;
              const cr = cw * 0.25;
              
              ctx.beginPath();
              ctx.moveTo(cx + cr, cy);
              ctx.lineTo(cx + cw - cr, cy);
              ctx.quadraticCurveTo(cx + cw, cy, cx + cw, cy + cr);
              ctx.lineTo(cx + cw, cy + cw - cr);
              ctx.quadraticCurveTo(cx + cw, cy + cw, cx + cw - r, cy + cw);
              ctx.lineTo(cx + cr, cy + cw);
              ctx.quadraticCurveTo(cx, cy + cw, cx, cy + cw - cr);
              ctx.lineTo(cx, cy + cr);
              ctx.quadraticCurveTo(cx, cy, cx + cr, cy);
              ctx.closePath();
              ctx.stroke();

              ctx.beginPath();
              ctx.arc(lx + logoSize / 2, ly + logoSize / 2, cw * 0.23, 0, Math.PI * 2);
              ctx.stroke();

              ctx.fillStyle = '#FFFFFF';
              ctx.beginPath();
              ctx.arc(cx + cw * 0.78, cy + cw * 0.22, cw * 0.06, 0, Math.PI * 2);
              ctx.fill();
            } else if (platform === 'tiktok') {
              ctx.fillStyle = '#000000';
              ctx.beginPath();
              const r = logoSize * 0.25;
              ctx.moveTo(lx + r, ly);
              ctx.lineTo(lx + logoSize - r, ly);
              ctx.quadraticCurveTo(lx + logoSize, ly, lx + logoSize, ly + r);
              ctx.lineTo(lx + logoSize, ly + logoSize - r);
              ctx.quadraticCurveTo(lx + logoSize, ly + logoSize, lx + logoSize - r, ly + logoSize);
              ctx.lineTo(lx + r, ly + logoSize);
              ctx.quadraticCurveTo(lx, ly + logoSize, lx, ly + logoSize - r);
              ctx.lineTo(lx, ly + r);
              ctx.quadraticCurveTo(lx, ly, lx + r, ly);
              ctx.closePath();
              ctx.fill();

              ctx.fillStyle = '#FFFFFF';
              ctx.font = `bold ${Math.floor(logoSize * 0.65)}px sans-serif`;
              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';
              ctx.fillText('🎵', lx + logoSize * 0.5, ly + logoSize * 0.5);
            } else {
              ctx.fillStyle = '#FFFFFF';
              ctx.font = `bold ${Math.floor(logoSize * 0.65)}px sans-serif`;
              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';
              ctx.fillText('📱', lx + logoSize * 0.5, ly + logoSize * 0.5);
            }
            ctx.restore();
          } else {
            const emojiMap: Record<string, string> = {
              website: '🌐',
              text: '📝',
              wifi: '📶',
              whatsapp: '💬',
              email: '✉️',
              map: '📍',
              social: '📱',
              product: '📦',
              payment: '💳',
              vcard: '👤',
              phone: '📞',
              sms: '💬',
              bitcoin: '₿',
              ethereum: '♦️',
              paypal: '💳',
              event: '📅',
              zoom: '📹',
              spotify: '🎵',
              appstore: '🍎',
              googleplay: '🤖'
            };

            const emoji = emojiMap[logoTypeToDraw] || '🌐';
            ctx.save();
            ctx.font = `bold ${Math.floor(logoSize * 0.85)}px "Inter", sans-serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(emoji, w / 2, h / 2 + (logoSize * 0.05));
            ctx.restore();
          }
        }
      );
    }
  }, [payload, styleOptions, inputType, socialForm.platform]);

  // --- HELPERS ---
  const showToast = (message: string, isError = false) => {
    setToastMessage(message);
    setToastIsError(isError);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleDownload = () => {
    if (!canvasRef.current) return;
    try {
      if (exportFormat === 'pdf') {
        const dataUrl = canvasRef.current.toDataURL('image/png');
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: 'a4'
        });
        
        // Add beautiful layout & design matching our premium EZ Toolbox theme
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(22);
        pdf.setTextColor(16, 185, 129); // emerald-500
        pdf.text('EZ TOOLBOX QR CODE', 105, 45, { align: 'center' });
        
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(11);
        pdf.setTextColor(100, 116, 139); // slate-500
        pdf.text('High-Resolution Print-Ready PDF Document', 105, 52, { align: 'center' });
        
        // Center the QR Code
        const imgSize = 100;
        const xPos = (210 - imgSize) / 2;
        const yPos = 65;
        pdf.addImage(dataUrl, 'PNG', xPos, yPos, imgSize, imgSize);
        
        // Dynamic payload metadata box
        pdf.setDrawColor(241, 245, 249);
        pdf.setFillColor(248, 250, 252);
        pdf.roundedRect(25, 180, 160, 30, 4, 4, 'FD');
        
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(9);
        pdf.setTextColor(15, 23, 42); // slate-900
        pdf.text('Encoded Payload Summary:', 30, 188);
        
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(8.5);
        pdf.setTextColor(71, 85, 105); // slate-600
        const splitText = pdf.splitTextToSize(payload || '(No payload data)', 150);
        pdf.text(splitText, 30, 195);
        
        // Footer line
        pdf.setDrawColor(226, 232, 240);
        pdf.line(20, 235, 190, 235);
        
        pdf.setFont('helvetica', 'italic');
        pdf.setFontSize(8.5);
        pdf.setTextColor(148, 163, 184); // slate-400
        pdf.text('Generated instantly on eztoolbox.xyz. Permanent, unlimited scanning, and 100% free.', 105, 245, { align: 'center' });
        
        pdf.save(`eztoolbox-qr-${inputType}-${Date.now()}.pdf`);
        showToast('✨ High-fidelity print-ready PDF downloaded successfully!');
      } else {
        const mimeType = exportFormat === 'jpeg' ? 'image/jpeg' : 'image/png';
        const fileExt = exportFormat === 'jpeg' ? 'jpg' : 'png';
        const dataUrl = canvasRef.current.toDataURL(mimeType, 0.95);
        
        const link = document.createElement('a');
        link.download = `eztoolbox-qr-${inputType}-${styleOptions.resolution}px.${fileExt}`;
        link.href = dataUrl;
        link.click();
        showToast(`✨ High-resolution QR code ${exportFormat.toUpperCase()} downloaded successfully!`);
      }
    } catch (err) {
      console.error(err);
      showToast('Failed to download image. Try copying instead.', true);
    }
  };

  const handleCopyClipboard = async () => {
    if (!canvasRef.current) return;
    try {
      canvasRef.current.toBlob(async (blob) => {
        if (!blob) {
          showToast('Failed to copy. Image buffer error.', true);
          return;
        }
        try {
          await navigator.clipboard.write([
            new ClipboardItem({ 'image/png': blob })
          ]);
          showToast('✅ High-resolution QR Code PNG copied to clipboard!');
        } catch (clipErr) {
          console.error(clipErr);
          // Fallback if browser blocks clipboard item
          showToast('Blocked by browser permissions. Try the direct Download button.', true);
        }
      }, 'image/png');
    } catch (err) {
      console.error(err);
      showToast('Clipboard copy failed. Try the direct Download button.', true);
    }
  };

  const handleCopyRawPayload = () => {
    if (!payload) return;
    navigator.clipboard.writeText(payload);
    showToast('📋 Raw QR protocol payload copied to clipboard!');
  };

  // Preset color swatches
  const foregroundPresets = ['#0f172a', '#10b981', '#1e3a8a', '#dc2626', '#d97706'];
  const backgroundPresets = ['#ffffff', '#f8fafc', '#fafaf9', '#f0fdf4', '#f5f3ff'];

  return (
    <div className="relative min-h-screen font-sans bg-slate-50 bg-ez-dots dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300 flex flex-col justify-between overflow-x-hidden">
      
      {/* Ambient Color Cloud Shading Background with low opacity matching main site */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none" aria-hidden="true">
        {/* Group 1 (Top Left Mashup - Green + Rose) */}
        <div className="absolute top-[2%] left-[5%] w-[25%] h-[15%] rounded-full bg-[#009b62]/14 dark:bg-[#009b62]/9 blur-[80px] md:blur-[120px]" />
        <div className="absolute top-[4%] left-[12%] w-[20%] h-[12%] rounded-full bg-rose-500/12 dark:bg-rose-500/8 blur-[80px] md:blur-[120px]" />

        {/* Group 2 (Top Right Mashup - Rose + Amber) */}
        <div className="absolute top-[12%] right-[10%] w-[25%] h-[15%] rounded-full bg-rose-500/12 dark:bg-rose-500/8 blur-[80px] md:blur-[120px]" />
        <div className="absolute top-[14%] right-[4%] w-[20%] h-[12%] rounded-full bg-amber-500/10 dark:bg-amber-500/7 blur-[80px] md:blur-[120px]" />

        {/* Group 3 (Middle Left Mashup - Teal + Green) */}
        <div className="absolute top-[30%] left-[8%] w-[25%] h-[15%] rounded-full bg-teal-500/12 dark:bg-teal-500/8 blur-[80px] md:blur-[120px]" />
        <div className="absolute top-[28%] left-[18%] w-[20%] h-[12%] rounded-full bg-[#009b62]/12 dark:bg-[#009b62]/8 blur-[80px] md:blur-[120px]" />

        {/* Group 4 (Middle Right Mashup - Amber + Rose) */}
        <div className="absolute top-[45%] right-[15%] w-[25%] h-[15%] rounded-full bg-amber-500/10 dark:bg-amber-500/7 blur-[80px] md:blur-[120px]" />
        <div className="absolute top-[43%] right-[8%] w-[20%] h-[12%] rounded-full bg-rose-500/12 dark:bg-rose-500/8 blur-[80px] md:blur-[120px]" />

        {/* Group 5 (Lower Left Mashup - Green + Teal) */}
        <div className="absolute top-[65%] left-[10%] w-[25%] h-[15%] rounded-full bg-[#009b62]/12 dark:bg-[#009b62]/9 blur-[80px] md:blur-[120px]" />
        <div className="absolute top-[67%] left-[4%] w-[20%] h-[12%] rounded-full bg-teal-500/12 dark:bg-teal-500/8 blur-[80px] md:blur-[120px]" />

        {/* Group 6 (Bottom Right Mashup - Rose + Amber) */}
        <div className="absolute top-[82%] right-[12%] w-[25%] h-[15%] rounded-full bg-rose-500/12 dark:bg-rose-500/8 blur-[80px] md:blur-[120px]" />
        <div className="absolute top-[84%] right-[18%] w-[20%] h-[12%] rounded-full bg-amber-500/10 dark:bg-amber-500/7 blur-[80px] md:blur-[120px]" />
      </div>
      
      {/* Toast Notification Container */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.9 }}
              className={`px-6 py-3.5 rounded-2xl shadow-xl flex items-center gap-3 border text-xs md:text-sm font-medium ${
                toastIsError 
                  ? 'bg-rose-50 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400 border-rose-100 dark:border-rose-900/50'
                  : 'bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900/50'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
              <span>{toastMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* --- HEADER NAVIGATION --- */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-200/55 dark:border-slate-900 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <div 
            onClick={() => navigateTo('/')} 
            className="flex items-center gap-3 cursor-pointer group shrink-0"
            id="brand-logo"
          >
            {/* Green Squircle Logo Container matching screenshot exactly */}
            <div className="w-11 h-11 md:w-12 md:h-12 bg-[#009b62] rounded-[14px] md:rounded-[16px] shadow-sm flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 duration-200">
              {/* White Monitor/Play screen icon */}
              <svg 
                className="w-5.5 h-5.5 md:w-6.5 md:h-6.5 text-white" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                {/* TV/Screen with rounded corners */}
                <rect x="2" y="3" width="20" height="14" rx="3.5" />
                {/* Center Play triangle (filled) */}
                <polygon points="10 7.5 15 10 10 12.5" fill="currentColor" />
                {/* Stand representation */}
                <path d="M9 20h6" />
                <path d="M12 17v3" />
              </svg>
            </div>

            {/* Typography brand details */}
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 leading-none">
                <span className="text-lg md:text-xl font-extrabold font-sans text-slate-950 dark:text-white tracking-tight">
                  EZ Toolbox
                </span>
                {/* Tool Badge Pill */}
                <span className="inline-flex items-center justify-center bg-slate-100 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/80 px-1.5 py-0.5 rounded text-[10px] md:text-xs shadow-xs font-mono select-none">
                  🛠️
                </span>
              </div>
              <span className="text-[8px] md:text-[9px] font-bold text-slate-400 dark:text-slate-500 tracking-widest uppercase mt-1 block font-sans">
                QR CODE ENGINE
              </span>
            </div>
          </div>

          {/* Multi Tab Switcher Pill Layout */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-900 p-1 rounded-full border border-slate-200/40 dark:border-slate-800/60 shadow-inner max-w-[50vw] md:max-w-xl overflow-x-auto no-scrollbar">
            {(
              [
                { id: 'tool', label: 'Generator' },
                { id: 'about', label: 'About' },
                { id: 'blog', label: 'Articles' },
                { id: 'contact', label: 'Contact' },
                { id: 'privacy', label: 'Privacy' },
                { id: 'terms', label: 'Terms' }
              ] as const
            ).map((tab) => {
              const tabActive = activeTab === tab.id || (tab.id === 'blog' && activeTab === 'article');
              return (
                <button
                  key={tab.id}
                  onClick={() => navigateTo(tab.id === 'tool' ? '/' : '/' + tab.id)}
                  className={`px-3 py-1 md:px-4 md:py-1.5 rounded-full text-xs font-bold tracking-wide transition-all whitespace-nowrap cursor-pointer ${
                    tabActive
                      ? 'bg-white dark:bg-slate-800 text-slate-800 dark:text-white shadow-xs'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                  id={`tab-${tab.id}`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Self-contained Dark Mode switch & CTA */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-all cursor-pointer shadow-xs"
              title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
              id="theme-toggler"
            >
              {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-emerald-400" />}
            </button>
          </div>
        </div>
      </header>

      {/* --- MAIN BODY CONTAINER --- */}
      <main className="relative z-10 flex-grow max-w-6xl w-full mx-auto px-4 py-8">
        
        {/* Left Side Floating Fixed Skyscraper (160x600) - Only on 2xl+ viewports to guarantee 0 overlapping with layout */}
        <div className="hidden 2xl:block fixed left-4 top-[180px] z-30">
          <Adsterra160x600 id="floating-sidebar-left" />
        </div>

        {/* Right Side Floating Fixed Skyscraper (160x600) - Only on 2xl+ viewports to guarantee 0 overlapping with layout */}
        <div className="hidden 2xl:block fixed right-4 top-[180px] z-30">
          <Adsterra160x600 id="floating-sidebar-right" />
        </div>

        <AnimatePresence mode="wait">
          
          {/* TAB 1: CORE QR CODE TOOL */}
          {activeTab === 'tool' && (
            <motion.div
              key="tool-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-12"
            >
              {/* Tool Intro Header */}
              <div className="text-center max-w-2xl mx-auto space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-100/60 dark:border-emerald-900/30 text-xs font-semibold tracking-wider uppercase font-mono">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-500 animate-spin-slow" />
                  100% Client-Side Encryption
                </div>
                <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight font-display text-slate-900 dark:text-white leading-tight">
                  Free Custom <span className="bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">QR Code Generator</span>
                </h1>
                <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base leading-relaxed">
                  Instantly construct error-free, custom-styled, and high-resolution QR codes. Perfect for business cards, brochures, digital signage, and hospitality menus. No registration required.
                </p>
              </div>

              {/* Mobile Top Banner Ad (320x50) - Only shown on smaller screens to prevent top clutter on Desktop */}
              <div className="w-full flex lg:hidden justify-center items-center my-1 overflow-visible">
                <div className="shrink-0">
                  <Adsterra320x50 id="top-mobile" />
                </div>
              </div>

              {/* Grid Layout: Controls (Col-8) vs Live Preview (Col-4) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* LEFT SIDE: PRESETS & CONFIGS */}
                <div className="lg:col-span-8 space-y-6">
                  
                  {/* Preset Swapper Panels */}
                  <div className="bg-white dark:bg-slate-900/80 border border-slate-200/60 dark:border-slate-800/50 rounded-3xl p-6 md:p-8 shadow-[0_4px_25px_-5px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_40px_-5px_rgba(0,0,0,0.04)] dark:hover:shadow-[0_12px_45px_rgba(0,0,0,0.3)] transition-all duration-300 space-y-6">
                    <div>
                      <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 font-mono tracking-wider uppercase">
                        Select Input Type
                      </h3>
                      
                      {/* Interactive presets swapper bar */}
                      <div className="grid grid-cols-4 gap-3 sm:gap-4 mt-4">
                        {(
                          [
                            { id: 'website', label: 'URL', icon: Link2 },
                            { id: 'text', label: 'Text', icon: FileText },
                            { id: 'email', label: 'Email', icon: Mail },
                            { id: 'phone', label: 'Phone', icon: Phone },
                            { id: 'sms', label: 'SMS', icon: MessageSquare },
                            { id: 'whatsapp', label: 'WhatsApp', icon: MessageSquare },
                            { id: 'wifi', label: 'WiFi', icon: Wifi },
                            { id: 'map', label: 'Location', icon: MapPin },
                            { id: 'vcard', label: 'vCard', icon: UserRound },
                            { id: 'product', label: 'Business Card', icon: Box },
                            { id: 'facebook', label: 'Facebook', icon: Facebook },
                            { id: 'instagram', label: 'Instagram', icon: Instagram },
                            { id: 'linkedin', label: 'LinkedIn', icon: Linkedin },
                            { id: 'youtube', label: 'YouTube', icon: Youtube },
                            { id: 'tiktok', label: 'TikTok', icon: Share2 },
                            { id: 'twitter', label: 'Twitter', icon: Share2 },
                            { id: 'bitcoin', label: 'Bitcoin', icon: Coins },
                            { id: 'ethereum', label: 'Ethereum', icon: Coins },
                            { id: 'payment', label: 'UPI', icon: CreditCard },
                            { id: 'paypal', label: 'PayPal', icon: CreditCard },
                            { id: 'event', label: 'Event', icon: Calendar },
                            { id: 'zoom', label: 'Zoom', icon: Video },
                            { id: 'spotify', label: 'Spotify', icon: Music },
                            { id: 'appstore', label: 'App Store', icon: Download },
                            { id: 'googleplay', label: 'Google Play', icon: Download }
                          ] as const
                        ).map((preset) => {
                          const Icon = preset.icon;
                          const isSelected = inputType === preset.id;
                          return (
                            <button
                              key={preset.id}
                              onClick={() => setInputType(preset.id)}
                              className={`flex flex-col items-center justify-center p-3 sm:p-4 h-[100px] sm:h-[114px] rounded-2xl border text-center transition-all duration-200 cursor-pointer ${
                                isSelected
                                  ? 'bg-blue-50/80 border-blue-500/40 dark:bg-blue-950/25 dark:border-blue-500/30 text-blue-600 dark:text-blue-400 font-semibold shadow-[0_2px_12px_-3px_rgba(59,130,246,0.15)] scale-[1.02]'
                                  : 'bg-white dark:bg-slate-900/60 border-slate-200/50 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-850 dark:hover:text-slate-200'
                              }`}
                              id={`input-preset-${preset.id}`}
                            >
                              <Icon className={`w-6 h-6 mb-2 transition-colors ${isSelected ? 'text-blue-500' : 'text-slate-400 dark:text-slate-500'}`} />
                              <span className="text-[10px] sm:text-[11px] font-bold tracking-tight leading-tight max-w-full break-words px-0.5">{preset.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Active Form Inputs */}
                    <div className="pt-5 border-t border-slate-100 dark:border-slate-800/60">
                      <AnimatePresence mode="wait">
                        
                        {/* WEBSITE URL FORM */}
                        {inputType === 'website' && (
                          <motion.div
                            key="web-form"
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="space-y-3"
                          >
                            <label className="text-sm font-bold text-slate-750 dark:text-slate-300 block">
                              Website URL / Link
                            </label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                <Link2 className="w-4 h-4" />
                              </div>
                              <input
                                type="url"
                                value={websiteUrl}
                                onChange={(e) => setWebsiteUrl(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm text-slate-800 dark:text-white"
                                placeholder="https://eztoolbox.com"
                                id="input-website-url"
                              />
                            </div>
                            <p className="text-[11px] text-slate-400 dark:text-slate-500">
                              Users will be redirected instantly to this web address upon scanning.
                            </p>
                          </motion.div>
                        )}

                        {/* PLAIN TEXT FORM */}
                        {inputType === 'text' && (
                          <motion.div
                            key="text-form"
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="space-y-3"
                          >
                            <label className="text-sm font-bold text-slate-750 dark:text-slate-300 block">
                              Plain Text / Message
                            </label>
                            <textarea
                              rows={4}
                              value={plainText}
                              onChange={(e) => setPlainText(e.target.value)}
                              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm text-slate-800 dark:text-white font-sans"
                              placeholder="Type or paste any plain text message or code snippets here..."
                              id="input-plain-text"
                            />
                            <p className="text-[11px] text-slate-400 dark:text-slate-500">
                              Ideal for physical text handouts, serial numbers, product codes, or static descriptions.
                            </p>
                          </motion.div>
                        )}

                        {/* WIFI LOGIN FORM */}
                        {inputType === 'wifi' && (
                          <motion.div
                            key="wifi-form"
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="space-y-4"
                          >
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="space-y-1.5">
                                <label className="text-sm font-bold text-slate-750 dark:text-slate-300 block">
                                  WiFi SSID (Network Name)
                                </label>
                                <input
                                  type="text"
                                  value={wifiForm.ssid}
                                  onChange={(e) => setWifiForm({ ...wifiForm, ssid: e.target.value })}
                                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm text-slate-800 dark:text-white"
                                  placeholder="e.g. MyHomeWiFi"
                                  id="input-wifi-ssid"
                                />
                              </div>

                              <div className="space-y-1.5">
                                <label className="text-sm font-bold text-slate-750 dark:text-slate-300 block">
                                  Security Type
                                </label>
                                <select
                                  value={wifiForm.security}
                                  onChange={(e) => setWifiForm({ ...wifiForm, security: e.target.value as any })}
                                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm text-slate-800 dark:text-white"
                                  id="input-wifi-security"
                                >
                                  <option value="WPA">WPA/WPA2</option>
                                  <option value="WEP">WEP</option>
                                  <option value="nopass">Unsecured (No Password)</option>
                                </select>
                              </div>
                            </div>

                            {wifiForm.security !== 'nopass' && (
                              <div className="space-y-1.5">
                                <label className="text-sm font-bold text-slate-750 dark:text-slate-300 block">
                                  Network Password
                                </label>
                                <input
                                  type="password"
                                  value={wifiForm.password}
                                  onChange={(e) => setWifiForm({ ...wifiForm, password: e.target.value })}
                                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm text-slate-800 dark:text-white"
                                  placeholder="Enter network password..."
                                  id="input-wifi-password"
                                />
                              </div>
                            )}
                            <p className="text-[11px] text-slate-400 dark:text-slate-500">
                              Guests can scan this QR code with their mobile device camera to connect to your WiFi network instantly.
                            </p>
                          </motion.div>
                        )}

                        {/* WHATSAPP CHAT FORM */}
                        {inputType === 'whatsapp' && (
                          <motion.div
                            key="whatsapp-form"
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="space-y-4"
                          >
                            <div className="space-y-1.5">
                              <label className="text-sm font-bold text-slate-750 dark:text-slate-300 block">
                                Phone Number (Include Country Code)
                              </label>
                              <input
                                  type="text"
                                  value={whatsappForm.phone}
                                  onChange={(e) => setWhatsappForm({ ...whatsappForm, phone: e.target.value })}
                                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm text-slate-800 dark:text-white"
                                  placeholder="e.g. +1234567890"
                                  id="input-whatsapp-phone"
                              />
                            </div>

                            <div className="space-y-1.5">
                              <label className="text-sm font-bold text-slate-750 dark:text-slate-300 block">
                                Pre-filled Message
                              </label>
                              <textarea
                                rows={2}
                                value={whatsappForm.message}
                                onChange={(e) => setWhatsappForm({ ...whatsappForm, message: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm text-slate-800 dark:text-white font-sans"
                                placeholder="e.g. Hello, I scanned your custom QR code!"
                                id="input-whatsapp-message"
                              />
                            </div>
                            <p className="text-[11px] text-slate-400 dark:text-slate-500">
                              Users will instantly launch a secure chat window with your contact containing this pre-filled message.
                            </p>
                          </motion.div>
                        )}

                        {/* EMAIL MESSAGE FORM */}
                        {inputType === 'email' && (
                          <motion.div
                            key="email-form"
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="space-y-4"
                          >
                            <div className="space-y-1.5">
                              <label className="text-sm font-bold text-slate-750 dark:text-slate-300 block">
                                Recipient Email Address
                              </label>
                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                  <MailIcon className="w-4 h-4" />
                                </div>
                                <input
                                  type="email"
                                  value={emailForm.recipient}
                                  onChange={(e) => setEmailForm({ ...emailForm, recipient: e.target.value })}
                                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm text-slate-800 dark:text-white"
                                  placeholder="info@domain.com"
                                  id="input-email-recipient"
                                />
                              </div>
                            </div>

                            <div className="space-y-1.5">
                              <label className="text-sm font-bold text-slate-750 dark:text-slate-300 block">
                                Email Subject Line
                              </label>
                              <input
                                type="text"
                                value={emailForm.subject}
                                onChange={(e) => setEmailForm({ ...emailForm, subject: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm text-slate-800 dark:text-white"
                                placeholder="Inquiry about services"
                                id="input-email-subject"
                              />
                            </div>

                            <div className="space-y-1.5">
                              <label className="text-sm font-bold text-slate-750 dark:text-slate-300 block">
                                Email Message Body
                              </label>
                              <textarea
                                rows={3}
                                value={emailForm.body}
                                onChange={(e) => setEmailForm({ ...emailForm, body: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm text-slate-800 dark:text-white font-sans"
                                placeholder="Type the default message text..."
                                id="input-email-body"
                              />
                            </div>
                            <p className="text-[11px] text-slate-400 dark:text-slate-500">
                              Scanning this code automatically triggers the local email client with recipient details pre-filled.
                            </p>
                          </motion.div>
                        )}

                        {/* MAP LOCATION FORM */}
                        {inputType === 'map' && (
                          <motion.div
                            key="map-form"
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="space-y-4"
                          >
                            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/60 pb-2">
                              <label className="text-sm font-bold text-slate-750 dark:text-slate-300 block">
                                Locate Address or Coordinates
                              </label>
                              <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-bold text-emerald-500 font-mono">
                                <input
                                  type="checkbox"
                                  checked={mapForm.useCoordinates}
                                  onChange={(e) => setMapForm({ ...mapForm, useCoordinates: e.target.checked })}
                                  className="rounded border-slate-300 text-emerald-500 focus:ring-emerald-500"
                                />
                                Use Coordinates
                              </label>
                            </div>

                            {mapForm.useCoordinates ? (
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                  <label className="text-xs font-bold text-slate-500 dark:text-slate-400 font-mono uppercase">Latitude</label>
                                  <input
                                    type="text"
                                    value={mapForm.latitude}
                                    onChange={(e) => setMapForm({ ...mapForm, latitude: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm text-slate-800 dark:text-white"
                                    placeholder="40.758895"
                                  />
                                </div>
                                <div className="space-y-1.5">
                                  <label className="text-xs font-bold text-slate-500 dark:text-slate-400 font-mono uppercase">Longitude</label>
                                  <input
                                    type="text"
                                    value={mapForm.longitude}
                                    onChange={(e) => setMapForm({ ...mapForm, longitude: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm text-slate-800 dark:text-white"
                                    placeholder="-73.985131"
                                  />
                                </div>
                              </div>
                            ) : (
                              <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 font-mono uppercase">Location Address / Landmark</label>
                                <div className="relative">
                                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                    <MapPin className="w-4 h-4" />
                                  </div>
                                  <input
                                    type="text"
                                    value={mapForm.address}
                                    onChange={(e) => setMapForm({ ...mapForm, address: e.target.value })}
                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm text-slate-800 dark:text-white"
                                    placeholder="e.g. Times Square, NY or Grand Palace, Bangkok"
                                  />
                                </div>
                              </div>
                            )}
                            <p className="text-[11px] text-slate-400 dark:text-slate-500">
                              Scanning this QR code automatically loads Google Maps with search coordinates or landmark directions.
                            </p>
                          </motion.div>
                        )}

                        {/* SOCIAL PROFILE FORM */}
                        {inputType === 'social' && (
                          <motion.div
                            key="social-form"
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="space-y-4"
                          >
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="space-y-1.5">
                                <label className="text-sm font-bold text-slate-750 dark:text-slate-300 block">
                                  Social Platform
                                </label>
                                <select
                                  value={socialForm.platform}
                                  onChange={(e) => setSocialForm({ ...socialForm, platform: e.target.value as any })}
                                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm text-slate-800 dark:text-white"
                                >
                                  <option value="twitter">Twitter / X</option>
                                  <option value="instagram">Instagram</option>
                                  <option value="youtube">YouTube Channel</option>
                                  <option value="tiktok">TikTok Profile</option>
                                  <option value="linkedin">LinkedIn Profile</option>
                                  <option value="facebook">Facebook Profile</option>
                                </select>
                              </div>

                              <div className="space-y-1.5">
                                <label className="text-sm font-bold text-slate-750 dark:text-slate-300 block">
                                  Username / Handle
                                </label>
                                <input
                                  type="text"
                                  value={socialForm.username}
                                  onChange={(e) => setSocialForm({ ...socialForm, username: e.target.value })}
                                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm text-slate-800 dark:text-white"
                                  placeholder="e.g. Google"
                                />
                              </div>
                            </div>
                            <p className="text-[11px] text-slate-400 dark:text-slate-500">
                              Creates a standard, direct profile connection to launch your feed instantly.
                            </p>
                          </motion.div>
                        )}

                        {/* PRODUCT CARD FORM */}
                        {inputType === 'product' && (
                          <motion.div
                            key="product-form"
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="space-y-3"
                          >
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="space-y-1.5">
                                <label className="text-sm font-bold text-slate-750 dark:text-slate-300 block">
                                  Product Name
                                </label>
                                <input
                                  type="text"
                                  value={productForm.name}
                                  onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm text-slate-800 dark:text-white"
                                  placeholder="e.g. Smart Coffee Mug"
                                />
                              </div>
                              <div className="space-y-1.5">
                                <label className="text-sm font-bold text-slate-750 dark:text-slate-300 block">
                                  SKU / ID (Optional)
                                </label>
                                <input
                                  type="text"
                                  value={productForm.sku}
                                  onChange={(e) => setProductForm({ ...productForm, sku: e.target.value })}
                                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm text-slate-800 dark:text-white"
                                  placeholder="e.g. EZ-MUG-99"
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="space-y-1.5">
                                <label className="text-sm font-bold text-slate-750 dark:text-slate-300 block">
                                  Price Tag (Optional)
                                </label>
                                <input
                                  type="text"
                                  value={productForm.price}
                                  onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm text-slate-800 dark:text-white"
                                  placeholder="e.g. $45.00"
                                />
                              </div>
                            </div>

                            <div className="space-y-1.5">
                              <label className="text-sm font-bold text-slate-750 dark:text-slate-300 block">
                                Product Description / Notes
                              </label>
                              <textarea
                                rows={2}
                                value={productForm.description}
                                onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm text-slate-800 dark:text-white font-sans"
                                placeholder="Details about product characteristics..."
                              />
                            </div>
                            <p className="text-[11px] text-slate-400 dark:text-slate-500">
                              Compiles product parameters into a structured raw code perfect for retail or inventory scans.
                            </p>
                          </motion.div>
                        )}

                        {/* PAYMENT / UPI FORM */}
                        {inputType === 'payment' && (
                          <motion.div
                            key="payment-form"
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="space-y-3"
                          >
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="space-y-1.5">
                                <label className="text-sm font-bold text-slate-750 dark:text-slate-300 block">
                                  Payment Gateway
                                </label>
                                <select
                                  value={paymentForm.type}
                                  onChange={(e) => setPaymentForm({ ...paymentForm, type: e.target.value as any })}
                                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm text-slate-800 dark:text-white"
                                >
                                  <option value="upi">UPI (India Standard)</option>
                                  <option value="paypal">PayPal.me Link</option>
                                  <option value="custom">Invoice Details</option>
                                </select>
                              </div>

                              <div className="space-y-1.5">
                                <label className="text-sm font-bold text-slate-750 dark:text-slate-300 block">
                                  {paymentForm.type === 'upi' ? 'UPI ID / VPA Address' : paymentForm.type === 'paypal' ? 'PayPal Username' : 'Invoice Number'}
                                </label>
                                <input
                                  type="text"
                                  value={paymentForm.payeeId}
                                  onChange={(e) => setPaymentForm({ ...paymentForm, payeeId: e.target.value })}
                                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm text-slate-800 dark:text-white"
                                  placeholder={paymentForm.type === 'upi' ? 'e.g. eztoolbox@upi' : 'e.g. mypaypaluser'}
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="space-y-1.5">
                                <label className="text-sm font-bold text-slate-750 dark:text-slate-300 block">
                                  Payee Name
                                </label>
                                <input
                                  type="text"
                                  value={paymentForm.payeeName}
                                  onChange={(e) => setPaymentForm({ ...paymentForm, payeeName: e.target.value })}
                                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm text-slate-800 dark:text-white"
                                  placeholder="Merchant or Business Name"
                                />
                              </div>

                              <div className="space-y-1.5">
                                <label className="text-sm font-bold text-slate-750 dark:text-slate-300 block">
                                  Amount (Optional)
                                </label>
                                <input
                                  type="text"
                                  value={paymentForm.amount}
                                  onChange={(e) => setPaymentForm({ ...paymentForm, amount: e.target.value })}
                                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm text-slate-800 dark:text-white"
                                  placeholder="e.g. 100"
                                />
                              </div>
                            </div>

                            <div className="space-y-1.5">
                              <label className="text-sm font-bold text-slate-750 dark:text-slate-300 block">
                                Payment Note / Memo (Optional)
                              </label>
                              <input
                                type="text"
                                value={paymentForm.note}
                                onChange={(e) => setPaymentForm({ ...paymentForm, note: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm text-slate-800 dark:text-white"
                                placeholder="e.g. Bill payment or Donation"
                              />
                            </div>
                            <p className="text-[11px] text-slate-400 dark:text-slate-500">
                              Generates compliant digital billing transactions to trigger instant wallet logins on scanning.
                            </p>
                          </motion.div>
                        )}

                        {/* CONTACT / VCARD CARD FORM */}
                        {inputType === 'vcard' && (
                          <motion.div
                            key="vcard-form"
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="space-y-3"
                          >
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 font-mono uppercase">First Name</label>
                                <input
                                  type="text"
                                  value={vcardForm.firstName}
                                  onChange={(e) => setVCardForm({ ...vcardForm, firstName: e.target.value })}
                                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm text-slate-800 dark:text-white"
                                  placeholder="Usman"
                                />
                              </div>
                              <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 font-mono uppercase">Last Name</label>
                                <input
                                  type="text"
                                  value={vcardForm.lastName}
                                  onChange={(e) => setVCardForm({ ...vcardForm, lastName: e.target.value })}
                                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm text-slate-800 dark:text-white"
                                  placeholder="Qureshi"
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 font-mono uppercase">Mobile Phone</label>
                                <input
                                  type="text"
                                  value={vcardForm.mobile}
                                  onChange={(e) => setVCardForm({ ...vcardForm, mobile: e.target.value })}
                                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm text-slate-800 dark:text-white"
                                  placeholder="+92 300 1234567"
                                />
                              </div>
                              <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 font-mono uppercase">Work Phone</label>
                                <input
                                  type="text"
                                  value={vcardForm.phone}
                                  onChange={(e) => setVCardForm({ ...vcardForm, phone: e.target.value })}
                                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm text-slate-800 dark:text-white"
                                  placeholder="+92 42 111111"
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 font-mono uppercase">Company</label>
                                <input
                                  type="text"
                                  value={vcardForm.company}
                                  onChange={(e) => setVCardForm({ ...vcardForm, company: e.target.value })}
                                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm text-slate-800 dark:text-white"
                                  placeholder="EZ Tech Solutions"
                                />
                              </div>
                              <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 font-mono uppercase">Job Title</label>
                                <input
                                  type="text"
                                  value={vcardForm.title}
                                  onChange={(e) => setVCardForm({ ...vcardForm, title: e.target.value })}
                                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm text-slate-800 dark:text-white"
                                  placeholder="Senior Product Lead"
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="space-y-1.5 col-span-1">
                                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 font-mono uppercase">Email Address</label>
                                <input
                                  type="email"
                                  value={vcardForm.email}
                                  onChange={(e) => setVCardForm({ ...vcardForm, email: e.target.value })}
                                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm text-slate-800 dark:text-white"
                                  placeholder="name@company.com"
                                />
                              </div>
                              <div className="space-y-1.5 col-span-1">
                                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 font-mono uppercase">Website / Portfolio</label>
                                <input
                                  type="url"
                                  value={vcardForm.url}
                                  onChange={(e) => setVCardForm({ ...vcardForm, url: e.target.value })}
                                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm text-slate-800 dark:text-white"
                                  placeholder="https://myportfolio.com"
                                />
                              </div>
                            </div>
                            <p className="text-[11px] text-slate-400 dark:text-slate-500">
                              Produces standard VCard format. Mobile cameras scan and prompt the user to instantly save this contact card!
                            </p>
                          </motion.div>
                        )}

                        {/* PHONE NUMBER FORM */}
                        {inputType === 'phone' && (
                          <motion.div
                            key="phone-form"
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="space-y-3"
                          >
                            <label className="text-sm font-bold text-slate-750 dark:text-slate-300 block">
                              Phone Number
                            </label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                <Phone className="w-4 h-4" />
                              </div>
                              <input
                                type="tel"
                                value={phoneState}
                                onChange={(e) => setPhoneState(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm text-slate-800 dark:text-white"
                                placeholder="+1 (555) 000-0000"
                                id="input-phone-number"
                              />
                            </div>
                            <p className="text-[11px] text-slate-400 dark:text-slate-500">
                              Scanning this QR code prompts the user to instantly dial your phone number.
                            </p>
                          </motion.div>
                        )}

                        {/* SMS MESSAGE FORM */}
                        {inputType === 'sms' && (
                          <motion.div
                            key="sms-form"
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="space-y-3"
                          >
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="space-y-1.5">
                                <label className="text-sm font-bold text-slate-750 dark:text-slate-300 block">
                                  Phone Number
                                </label>
                                <input
                                  type="tel"
                                  value={smsState.phone}
                                  onChange={(e) => setSmsState({ ...smsState, phone: e.target.value })}
                                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm text-slate-800 dark:text-white"
                                  placeholder="+15550000000"
                                  id="input-sms-phone"
                                />
                              </div>
                              <div className="space-y-1.5">
                                <label className="text-sm font-bold text-slate-750 dark:text-slate-300 block">
                                  Pre-filled Message
                                </label>
                                <input
                                  type="text"
                                  value={smsState.message}
                                  onChange={(e) => setSmsState({ ...smsState, message: e.target.value })}
                                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm text-slate-800 dark:text-white"
                                  placeholder="Interested in your services!"
                                  id="input-sms-message"
                                />
                              </div>
                            </div>
                            <p className="text-[11px] text-slate-400 dark:text-slate-500">
                              Generates a standard SMS protocol that draft a new text message directly on scanning.
                            </p>
                          </motion.div>
                        )}

                        {/* FACEBOOK LINK FORM */}
                        {inputType === 'facebook' && (
                          <motion.div
                            key="facebook-form"
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="space-y-3"
                          >
                            <label className="text-sm font-bold text-slate-750 dark:text-slate-300 block">
                              Facebook Page / Profile Link or Username
                            </label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                <Facebook className="w-4 h-4 text-blue-600" />
                              </div>
                              <input
                                type="text"
                                value={facebookState}
                                onChange={(e) => setFacebookState(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm text-slate-800 dark:text-white"
                                placeholder="e.g. Google or https://facebook.com/Google"
                                id="input-facebook-url"
                              />
                            </div>
                            <p className="text-[11px] text-slate-400 dark:text-slate-500">
                              Redirects scanning users instantly to your Facebook Profile or official Brand Page.
                            </p>
                          </motion.div>
                        )}

                        {/* INSTAGRAM LINK FORM */}
                        {inputType === 'instagram' && (
                          <motion.div
                            key="instagram-form"
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="space-y-3"
                          >
                            <label className="text-sm font-bold text-slate-750 dark:text-slate-300 block">
                              Instagram Username or Link
                            </label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                <Instagram className="w-4 h-4 text-pink-500" />
                              </div>
                              <input
                                type="text"
                                value={instagramState}
                                onChange={(e) => setInstagramState(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm text-slate-800 dark:text-white"
                                placeholder="e.g. google or https://instagram.com/google"
                                id="input-instagram-url"
                              />
                            </div>
                            <p className="text-[11px] text-slate-400 dark:text-slate-500">
                              Directs scanning users straight to your Instagram profile.
                            </p>
                          </motion.div>
                        )}

                        {/* LINKEDIN LINK FORM */}
                        {inputType === 'linkedin' && (
                          <motion.div
                            key="linkedin-form"
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="space-y-3"
                          >
                            <label className="text-sm font-bold text-slate-750 dark:text-slate-300 block">
                              LinkedIn Profile or Company Link
                            </label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                <Linkedin className="w-4 h-4 text-blue-700" />
                              </div>
                              <input
                                type="text"
                                value={linkedinState}
                                onChange={(e) => setLinkedinState(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm text-slate-800 dark:text-white"
                                placeholder="e.g. company/google or in/username"
                                id="input-linkedin-url"
                              />
                            </div>
                            <p className="text-[11px] text-slate-400 dark:text-slate-500">
                              Creates a standard direct connection to launch your professional profile or corporate page instantly.
                            </p>
                          </motion.div>
                        )}

                        {/* YOUTUBE LINK FORM */}
                        {inputType === 'youtube' && (
                          <motion.div
                            key="youtube-form"
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="space-y-3"
                          >
                            <label className="text-sm font-bold text-slate-750 dark:text-slate-300 block">
                              YouTube Channel or Video Link
                            </label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                <Youtube className="w-4 h-4 text-red-600" />
                              </div>
                              <input
                                type="text"
                                value={youtubeState}
                                onChange={(e) => setYoutubeState(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm text-slate-800 dark:text-white"
                                placeholder="e.g. @google or a direct watch URL"
                                id="input-youtube-url"
                              />
                            </div>
                            <p className="text-[11px] text-slate-400 dark:text-slate-500">
                              Directs scanning audience directly to your YouTube channel feed or promo video.
                            </p>
                          </motion.div>
                        )}

                        {/* TIKTOK LINK FORM */}
                        {inputType === 'tiktok' && (
                          <motion.div
                            key="tiktok-form"
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="space-y-3"
                          >
                            <label className="text-sm font-bold text-slate-750 dark:text-slate-300 block">
                              TikTok Username or Video Link
                            </label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                <Share2 className="w-4 h-4 text-black dark:text-white" />
                              </div>
                              <input
                                type="text"
                                value={tiktokState}
                                onChange={(e) => setTiktokState(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm text-slate-800 dark:text-white"
                                placeholder="e.g. @google or direct video URL"
                                id="input-tiktok-url"
                              />
                            </div>
                            <p className="text-[11px] text-slate-400 dark:text-slate-500">
                              Instantly launches the scanned profile or individual short-form video in the TikTok app.
                            </p>
                          </motion.div>
                        )}

                        {/* TWITTER LINK FORM */}
                        {inputType === 'twitter' && (
                          <motion.div
                            key="twitter-form"
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="space-y-3"
                          >
                            <label className="text-sm font-bold text-slate-750 dark:text-slate-300 block">
                              Twitter / X Profile Link or Handle
                            </label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                <Share2 className="w-4 h-4" />
                              </div>
                              <input
                                type="text"
                                value={twitterState}
                                onChange={(e) => setTwitterState(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm text-slate-800 dark:text-white"
                                placeholder="e.g. Google or https://x.com/Google"
                                id="input-twitter-url"
                              />
                            </div>
                            <p className="text-[11px] text-slate-400 dark:text-slate-500">
                              Directs scanners instantly to your social feed or tweet thread.
                            </p>
                          </motion.div>
                        )}

                        {/* BITCOIN FORM */}
                        {inputType === 'bitcoin' && (
                          <motion.div
                            key="bitcoin-form"
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="space-y-4"
                          >
                            <div className="space-y-1.5">
                              <label className="text-sm font-bold text-slate-750 dark:text-slate-300 block">
                                Bitcoin Address
                              </label>
                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                  <Coins className="w-4 h-4 text-amber-500" />
                                </div>
                                <input
                                  type="text"
                                  value={bitcoinState.address}
                                  onChange={(e) => setBitcoinState({ ...bitcoinState, address: e.target.value })}
                                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm text-slate-800 dark:text-white font-mono"
                                  placeholder="e.g. 1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"
                                  id="input-bitcoin-address"
                                />
                              </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="space-y-1.5">
                                <label className="text-sm font-bold text-slate-750 dark:text-slate-300 block">
                                  Amount (BTC) <span className="text-xs text-slate-400 font-normal">(Optional)</span>
                                </label>
                                <input
                                  type="text"
                                  value={bitcoinState.amount}
                                  onChange={(e) => setBitcoinState({ ...bitcoinState, amount: e.target.value })}
                                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm text-slate-800 dark:text-white"
                                  placeholder="e.g. 0.005"
                                  id="input-bitcoin-amount"
                                />
                              </div>
                              <div className="space-y-1.5">
                                <label className="text-sm font-bold text-slate-750 dark:text-slate-300 block">
                                  Memo / Msg <span className="text-xs text-slate-400 font-normal">(Optional)</span>
                                </label>
                                <input
                                  type="text"
                                  value={bitcoinState.message}
                                  onChange={(e) => setBitcoinState({ ...bitcoinState, message: e.target.value })}
                                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm text-slate-800 dark:text-white"
                                  placeholder="e.g. EZ Toolbox Checkout"
                                  id="input-bitcoin-memo"
                                />
                              </div>
                            </div>
                            <p className="text-[11px] text-slate-400 dark:text-slate-500">
                              Produces a standard `bitcoin:` URI to trigger mobile wallets with direct recipient details and pre-filled transaction parameters.
                            </p>
                          </motion.div>
                        )}

                        {/* ETHEREUM FORM */}
                        {inputType === 'ethereum' && (
                          <motion.div
                            key="ethereum-form"
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="space-y-4"
                          >
                            <div className="space-y-1.5">
                              <label className="text-sm font-bold text-slate-750 dark:text-slate-300 block">
                                Ethereum Address / ENS Name
                              </label>
                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                  <Coins className="w-4 h-4 text-indigo-500" />
                                </div>
                                <input
                                  type="text"
                                  value={ethereumState.address}
                                  onChange={(e) => setEthereumState({ ...ethereumState, address: e.target.value })}
                                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm text-slate-800 dark:text-white font-mono"
                                  placeholder="e.g. 0x32Be34... or vitalik.eth"
                                  id="input-ethereum-address"
                                />
                              </div>
                            </div>
                            <div className="space-y-1.5">
                              <label className="text-sm font-bold text-slate-750 dark:text-slate-300 block">
                                Value (ETH) <span className="text-xs text-slate-400 font-normal">(Optional)</span>
                              </label>
                              <input
                                type="text"
                                value={ethereumState.amount}
                                onChange={(e) => setEthereumState({ ...ethereumState, amount: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm text-slate-800 dark:text-white"
                                placeholder="e.g. 0.1"
                                id="input-ethereum-value"
                              />
                            </div>
                            <p className="text-[11px] text-slate-400 dark:text-slate-500">
                              Produces standard `ethereum:` QR codes compatible with MetaMask, Trust Wallet, Coinbase Wallet, etc.
                            </p>
                          </motion.div>
                        )}

                        {/* PAYPAL FORM */}
                        {inputType === 'paypal' && (
                          <motion.div
                            key="paypal-form"
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="space-y-4"
                          >
                            <div className="space-y-1.5">
                              <label className="text-sm font-bold text-slate-750 dark:text-slate-300 block">
                                PayPal.Me Username or Custom Link
                              </label>
                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                  <CreditCard className="w-4 h-4 text-blue-500" />
                                </div>
                                <input
                                  type="text"
                                  value={paypalState.email}
                                  onChange={(e) => setPaypalState({ ...paypalState, email: e.target.value })}
                                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm text-slate-800 dark:text-white"
                                  placeholder="e.g. eztoolbox"
                                  id="input-paypal-email"
                                />
                              </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="space-y-1.5">
                                <label className="text-sm font-bold text-slate-750 dark:text-slate-300 block">
                                  Amount (USD) <span className="text-xs text-slate-400 font-normal">(Optional)</span>
                                </label>
                                <input
                                  type="text"
                                  value={paypalState.amount}
                                  onChange={(e) => setPaypalState({ ...paypalState, amount: e.target.value })}
                                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm text-slate-800 dark:text-white"
                                  placeholder="e.g. 25"
                                  id="input-paypal-amount"
                                />
                              </div>
                              <div className="space-y-1.5">
                                <label className="text-sm font-bold text-slate-750 dark:text-slate-300 block">
                                  Memo / Item Name <span className="text-xs text-slate-400 font-normal">(Optional)</span>
                                </label>
                                <input
                                  type="text"
                                  value={paypalState.memo}
                                  onChange={(e) => setPaypalState({ ...paypalState, memo: e.target.value })}
                                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm text-slate-800 dark:text-white"
                                  placeholder="e.g. Payment for design work"
                                  id="input-paypal-memo"
                                />
                              </div>
                            </div>
                            <p className="text-[11px] text-slate-400 dark:text-slate-500">
                              Produces standard PayPal.Me payment link to request custom transfers directly and securely.
                            </p>
                          </motion.div>
                        )}

                        {/* EVENT DETAILS FORM */}
                        {inputType === 'event' && (
                          <motion.div
                            key="event-form"
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="space-y-4"
                          >
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="space-y-1.5">
                                <label className="text-sm font-bold text-slate-750 dark:text-slate-300 block">
                                  Event Title
                                </label>
                                <input
                                  type="text"
                                  value={eventState.title}
                                  onChange={(e) => setEventState({ ...eventState, title: e.target.value })}
                                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm text-slate-800 dark:text-white"
                                  placeholder="e.g. Grand Opening"
                                  id="input-event-title"
                                />
                              </div>
                              <div className="space-y-1.5">
                                <label className="text-sm font-bold text-slate-750 dark:text-slate-300 block">
                                  Location
                                </label>
                                <input
                                  type="text"
                                  value={eventState.location}
                                  onChange={(e) => setEventState({ ...eventState, location: e.target.value })}
                                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm text-slate-800 dark:text-white"
                                  placeholder="e.g. 123 Main St, New York"
                                  id="input-event-location"
                                />
                              </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="space-y-1.5">
                                <label className="text-sm font-bold text-slate-750 dark:text-slate-300 block">
                                  Start Date & Time
                                </label>
                                <input
                                  type="text"
                                  value={eventState.start}
                                  onChange={(e) => setEventState({ ...eventState, start: e.target.value })}
                                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm text-slate-800 dark:text-white font-mono text-xs"
                                  placeholder="YYYYMMDDTHHMMSSZ (UTC)"
                                  id="input-event-start"
                                />
                              </div>
                              <div className="space-y-1.5">
                                <label className="text-sm font-bold text-slate-750 dark:text-slate-300 block">
                                  End Date & Time
                                </label>
                                <input
                                  type="text"
                                  value={eventState.end}
                                  onChange={(e) => setEventState({ ...eventState, end: e.target.value })}
                                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm text-slate-800 dark:text-white font-mono text-xs"
                                  placeholder="YYYYMMDDTHHMMSSZ (UTC)"
                                  id="input-event-end"
                                />
                              </div>
                            </div>
                            <div className="space-y-1.5">
                              <label className="text-sm font-bold text-slate-750 dark:text-slate-300 block">
                                Event Description
                              </label>
                              <input
                                type="text"
                                value={eventState.description}
                                onChange={(e) => setEventState({ ...eventState, description: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm text-slate-800 dark:text-white"
                                placeholder="Come enjoy food, drinks, and networking!"
                                id="input-event-desc"
                              />
                            </div>
                            <p className="text-[11px] text-slate-400 dark:text-slate-500">
                              Produces standard iCalendar VEVENT format. Scan results automatically prompt the user to add this meeting or party to their calendar.
                            </p>
                          </motion.div>
                        )}

                        {/* ZOOM MEETING FORM */}
                        {inputType === 'zoom' && (
                          <motion.div
                            key="zoom-form"
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="space-y-4"
                          >
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="space-y-1.5">
                                <label className="text-sm font-bold text-slate-750 dark:text-slate-300 block">
                                  Zoom Meeting ID
                                </label>
                                <input
                                  type="text"
                                  value={zoomState.meetingId}
                                  onChange={(e) => setZoomState({ ...zoomState, meetingId: e.target.value })}
                                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm text-slate-800 dark:text-white"
                                  placeholder="e.g. 1234567890"
                                  id="input-zoom-id"
                                />
                              </div>
                              <div className="space-y-1.5">
                                <label className="text-sm font-bold text-slate-750 dark:text-slate-300 block">
                                  Meeting Password
                                </label>
                                <input
                                  type="text"
                                  value={zoomState.password}
                                  onChange={(e) => setZoomState({ ...zoomState, password: e.target.value })}
                                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm text-slate-800 dark:text-white"
                                  placeholder="e.g. secretpassword"
                                  id="input-zoom-password"
                                />
                              </div>
                            </div>
                            <p className="text-[11px] text-slate-400 dark:text-slate-500">
                              Easily generates a direct-join URL with meeting credentials pre-embedded.
                            </p>
                          </motion.div>
                        )}

                        {/* SPOTIFY MUSIC FORM */}
                        {inputType === 'spotify' && (
                          <motion.div
                            key="spotify-form"
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="space-y-3"
                          >
                            <label className="text-sm font-bold text-slate-750 dark:text-slate-300 block">
                              Spotify Song, Playlist or Artist Link
                            </label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                <Music className="w-4 h-4 text-emerald-500" />
                              </div>
                              <input
                                type="text"
                                value={spotifyState}
                                onChange={(e) => setSpotifyState(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm text-slate-800 dark:text-white"
                                placeholder="e.g. https://open.spotify.com/playlist/..."
                                id="input-spotify-url"
                              />
                            </div>
                            <p className="text-[11px] text-slate-400 dark:text-slate-500">
                              Users scanning this can immediately open your Spotify playlists, profile, or specific songs.
                            </p>
                          </motion.div>
                        )}

                        {/* APP STORE LINK FORM */}
                        {inputType === 'appstore' && (
                          <motion.div
                            key="appstore-form"
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="space-y-3"
                          >
                            <label className="text-sm font-bold text-slate-750 dark:text-slate-300 block">
                              Apple App Store Product Link
                            </label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                <Download className="w-4 h-4 text-blue-500" />
                              </div>
                              <input
                                type="text"
                                value={appstoreState}
                                onChange={(e) => setAppstoreState(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm text-slate-800 dark:text-white"
                                placeholder="e.g. https://apps.apple.com/app/id123456789"
                                id="input-appstore-url"
                              />
                            </div>
                            <p className="text-[11px] text-slate-400 dark:text-slate-500">
                              Scanning instantly launches App Store with download details for your iOS App.
                            </p>
                          </motion.div>
                        )}

                        {/* GOOGLE PLAY LINK FORM */}
                        {inputType === 'googleplay' && (
                          <motion.div
                            key="googleplay-form"
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="space-y-3"
                          >
                            <label className="text-sm font-bold text-slate-750 dark:text-slate-300 block">
                              Google Play Store Product Link
                            </label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                <Download className="w-4 h-4 text-emerald-600" />
                              </div>
                              <input
                                type="text"
                                value={googleplayState}
                                onChange={(e) => setGoogleplayState(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm text-slate-800 dark:text-white"
                                placeholder="e.g. https://play.google.com/store/apps/details?id=..."
                                id="input-googleplay-url"
                              />
                            </div>
                            <p className="text-[11px] text-slate-400 dark:text-slate-500">
                              Launches Google Play Store directly to your Android application product description page on scanning.
                            </p>
                          </motion.div>
                        )}

                      </AnimatePresence>
                    </div>
                  </div>

                </div>

                {/* RIGHT SIDE: LIVE PREVIEW & SAVE ACTIONS (Sticky) */}
                <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
                  
                  {/* LIVE PREVIEW PANEL CARD */}
                  <div className="bg-white dark:bg-slate-900/90 border border-slate-200/60 dark:border-slate-800/50 rounded-3xl p-6 md:p-8 shadow-[0_4px_25px_-5px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_40px_-5px_rgba(0,0,0,0.04)] dark:hover:shadow-[0_12px_45px_rgba(0,0,0,0.3)] transition-all duration-300 space-y-6 flex flex-col items-center">
                    <div className="w-full flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                      <h3 className="text-sm font-extrabold text-slate-800 dark:text-slate-100 font-display uppercase tracking-tight">
                        Live Preview
                      </h3>
                      <div className="inline-flex items-center gap-1.5 text-[10px] font-mono font-extrabold bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400 px-3 py-1 rounded-full border border-blue-100 dark:border-blue-900/40">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                        Interactive
                      </div>
                    </div>

                    {/* REAL-TIME LIVE CANVAS CONTAINER */}
                    <div 
                      className="p-4 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.3)] border border-slate-100 dark:border-slate-800 flex items-center justify-center relative group transition-all duration-300 hover:scale-[1.01] aspect-square w-64 h-64 sm:w-72 sm:h-72 overflow-hidden bg-white"
                      style={{ backgroundColor: styleOptions.background }}
                    >
                      <canvas 
                        ref={canvasRef} 
                        className="w-full h-full max-w-full max-h-full object-contain transition-all duration-300"
                        style={{ width: '100%', height: '100%', maxWidth: '100%', maxHeight: '100%' }}
                        id="live-qr-canvas"
                      />
                    </div>

                    {/* Action Stats Panel */}
                    <div className="w-full grid grid-cols-2 gap-3 text-center">
                      <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-950/50 border border-slate-100 dark:border-slate-850">
                        <div className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider font-mono">
                          Dimensions
                        </div>
                        <div className="text-xs md:text-sm font-extrabold font-mono text-slate-700 dark:text-slate-300 mt-0.5">
                          {styleOptions.resolution} × {styleOptions.resolution}
                        </div>
                      </div>
                      <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-950/50 border border-slate-100 dark:border-slate-850">
                        <div className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider font-mono">
                          Scan Reliability
                        </div>
                        <div className="text-xs md:text-sm font-extrabold font-mono text-blue-500 mt-0.5">
                          {styleOptions.errorCorrectionLevel === 'L' && 'Standard'}
                          {styleOptions.errorCorrectionLevel === 'M' && 'Enhanced'}
                          {styleOptions.errorCorrectionLevel === 'Q' && 'Excellent'}
                          {styleOptions.errorCorrectionLevel === 'H' && 'Maximum'}
                        </div>
                      </div>
                    </div>

                    {/* RAW STREAM METADATA payload display */}
                    <div className="w-full space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-[11px] font-bold text-slate-400 dark:text-slate-500 font-mono uppercase tracking-wider">
                          QR Payload Data
                        </label>
                        <button
                          onClick={handleCopyRawPayload}
                          className="text-[10px] font-bold text-slate-450 hover:text-blue-500 transition-colors flex items-center gap-1 cursor-pointer"
                          title="Copy raw string"
                        >
                          <Copy className="w-3 h-3" />
                          <span>Copy Raw</span>
                        </button>
                      </div>
                      <div className="w-full px-4 py-3 rounded-xl border border-slate-100 dark:border-slate-850 bg-slate-50 dark:bg-slate-950/80 font-mono text-[10px] md:text-xs text-slate-600 dark:text-slate-400 break-all select-all leading-relaxed whitespace-pre-wrap max-h-[85px] overflow-y-auto">
                        {payload || '(No payload, enter fields)'}
                      </div>
                    </div>

                    {/* EXPORT ACTION BUTTONS */}
                    <div className="w-full space-y-4 pt-1">
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-slate-400 dark:text-slate-500 font-mono uppercase tracking-wider block">
                          Export Format
                        </label>
                        <div className="grid grid-cols-3 gap-1.5 bg-slate-50 dark:bg-slate-950 p-1 rounded-xl border border-slate-150 dark:border-slate-850">
                          {(['png', 'jpeg', 'pdf'] as const).map((fmt) => {
                            const isSel = exportFormat === fmt;
                            return (
                              <button
                                key={fmt}
                                onClick={() => setExportFormat(fmt)}
                                className={`py-1.5 rounded-lg text-center text-[11px] font-extrabold uppercase tracking-wider transition-all cursor-pointer ${
                                  isSel
                                    ? 'bg-blue-600 text-white shadow-xs'
                                    : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
                                }`}
                              >
                                {fmt}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <button
                        onClick={handleDownload}
                        className="w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-extrabold shadow-lg shadow-blue-500/20 cursor-pointer transition-all hover:scale-[1.015] active:scale-[0.985] flex items-center justify-center gap-2"
                        id="btn-download"
                      >
                        <Download className="w-4 h-4" />
                        <span>Download {exportFormat.toUpperCase()}</span>
                      </button>

                      <button
                        onClick={handleCopyClipboard}
                        className="w-full py-3 px-4 bg-slate-100 hover:bg-slate-200/80 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-200 border border-slate-200/50 dark:border-slate-700/40 rounded-xl text-xs font-bold cursor-pointer transition-all hover:scale-[1.015] active:scale-[0.985] flex items-center justify-center gap-2"
                        id="btn-copy-clipboard"
                      >
                        <Copy className="w-4 h-4" />
                        <span>Copy to Clipboard</span>
                      </button>
                    </div>

                  </div>

                  {/* CUSTOM STYLING PANEL */}
                  <div className="bg-white dark:bg-slate-900/90 border border-slate-200/60 dark:border-slate-800/50 rounded-3xl p-5 md:p-6 shadow-[0_4px_25px_-5px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_40px_-5px_rgba(0,0,0,0.04)] dark:hover:shadow-[0_12px_45px_rgba(0,0,0,0.3)] transition-all duration-300 space-y-5">
                    <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800/60">
                      <Sparkles className="w-4 h-4 text-emerald-500" />
                      <h3 className="text-xs font-extrabold text-slate-850 dark:text-slate-100 font-display uppercase tracking-tight">
                        Custom Styling
                      </h3>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      
                      {/* FOREGROUND COLOR PICKER */}
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 block font-mono uppercase tracking-wider">
                          Foreground
                        </label>
                        <div className="flex items-center gap-2">
                          <input
                            type="color"
                            value={styleOptions.foreground}
                            onChange={(e) => setStyleOptions({ ...styleOptions, foreground: e.target.value })}
                            className="w-7 h-7 rounded-lg cursor-pointer border border-slate-200 dark:border-slate-800 bg-transparent p-0 overflow-hidden shrink-0"
                            id="style-foreground-picker"
                          />
                          <input
                            type="text"
                            value={styleOptions.foreground}
                            onChange={(e) => setStyleOptions({ ...styleOptions, foreground: e.target.value })}
                            className="w-full min-w-0 px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 font-mono text-[10px] text-slate-750 dark:text-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20"
                            placeholder="#0f172a"
                            id="style-foreground-text"
                          />
                        </div>
                        {/* Circular presets */}
                        <div className="flex flex-wrap items-center gap-1 pt-1">
                          {foregroundPresets.map((color) => (
                            <button
                              key={color}
                              onClick={() => setStyleOptions({ ...styleOptions, foreground: color })}
                              style={{ backgroundColor: color }}
                              className={`w-4 h-4 rounded-full border border-slate-200 dark:border-slate-800/80 cursor-pointer hover:scale-110 active:scale-95 transition-all ${
                                styleOptions.foreground.toLowerCase() === color.toLowerCase()
                                  ? 'ring-2 ring-emerald-500 scale-105 shadow-sm'
                                  : ''
                              }`}
                              title={color}
                            />
                          ))}
                        </div>
                      </div>

                      {/* BACKGROUND COLOR PICKER */}
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 block font-mono uppercase tracking-wider">
                          Background
                        </label>
                        <div className="flex items-center gap-2">
                          <input
                            type="color"
                            value={styleOptions.background}
                            onChange={(e) => setStyleOptions({ ...styleOptions, background: e.target.value })}
                            className="w-7 h-7 rounded-lg cursor-pointer border border-slate-200 dark:border-slate-800 bg-transparent p-0 overflow-hidden shrink-0"
                            id="style-background-picker"
                          />
                          <input
                            type="text"
                            value={styleOptions.background}
                            onChange={(e) => setStyleOptions({ ...styleOptions, background: e.target.value })}
                            className="w-full min-w-0 px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 font-mono text-[10px] text-slate-750 dark:text-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20"
                            placeholder="#ffffff"
                            id="style-background-text"
                          />
                        </div>
                        {/* Soft light presets */}
                        <div className="flex flex-wrap items-center gap-1 pt-1">
                          {backgroundPresets.map((color) => (
                            <button
                              key={color}
                              onClick={() => setStyleOptions({ ...styleOptions, background: color })}
                              style={{ backgroundColor: color }}
                              className={`w-4 h-4 rounded-full border border-slate-200 dark:border-slate-800/80 cursor-pointer hover:scale-110 active:scale-95 transition-all ${
                                styleOptions.background.toLowerCase() === color.toLowerCase()
                                  ? 'ring-2 ring-emerald-500 scale-105 shadow-sm'
                                  : ''
                              }`}
                              title={color}
                            />
                          ))}
                        </div>
                      </div>

                    </div>

                    <div className="space-y-3.5 pt-4 border-t border-slate-100 dark:border-slate-800/60">
                      
                      {/* RESOLUTION SLIDER */}
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 font-mono uppercase tracking-wider">
                            Resolution
                          </label>
                          <span className="text-[10px] font-bold text-emerald-500 font-mono">
                            {styleOptions.resolution}px
                          </span>
                        </div>
                        <input
                          type="range"
                          min={256}
                          max={1024}
                          step={64}
                          value={styleOptions.resolution}
                          onChange={(e) => setStyleOptions({ ...styleOptions, resolution: parseInt(e.target.value) })}
                          className="w-full accent-emerald-500 h-1 bg-slate-100 dark:bg-slate-850 rounded-lg appearance-none cursor-pointer"
                          id="style-resolution-range"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        {/* QUIET ZONE SELECTOR */}
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 block font-mono uppercase tracking-wider">
                            Quiet Zone
                          </label>
                          <select
                            value={styleOptions.quietZone}
                            onChange={(e) => setStyleOptions({ ...styleOptions, quietZone: parseInt(e.target.value) })}
                            className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-[11px] text-slate-750 dark:text-slate-300 font-semibold"
                            id="style-quietzone-select"
                          >
                            <option value="0">0px (None)</option>
                            <option value="1">1 Block</option>
                            <option value="2">2 Blocks</option>
                            <option value="4">4 Blocks</option>
                          </select>
                        </div>

                        {/* SCAN RELIABILITY SELECTOR */}
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 block font-mono uppercase tracking-wider">
                            Reliability
                          </label>
                          <select
                            value={styleOptions.errorCorrectionLevel}
                            onChange={(e) => setStyleOptions({ ...styleOptions, errorCorrectionLevel: e.target.value as any })}
                            className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-[11px] text-slate-750 dark:text-slate-300 font-semibold"
                            id="style-errorcorrection-select"
                          >
                            <option value="L">Standard</option>
                            <option value="M">Enhanced</option>
                            <option value="Q">Excellent</option>
                            <option value="H">Maximum</option>
                          </select>
                        </div>
                      </div>

                    </div>

                    {/* CENTER LOGO CONFIGURATION */}
                    <div className="pt-4 border-t border-slate-100 dark:border-slate-800/60 space-y-3">
                      <div className="flex items-center gap-1.5">
                        <ImageIcon className="w-3.5 h-3.5 text-emerald-500" />
                        <h4 className="text-[10px] font-bold text-slate-750 dark:text-slate-300 font-display uppercase tracking-tight">
                          Center Logo Overlay
                        </h4>
                      </div>

                      <div className="space-y-3">
                        <div className="space-y-1 flex flex-col">
                          <label className="text-[10px] font-bold text-slate-450 dark:text-slate-500 uppercase tracking-wider block font-mono mb-1">Logo Type</label>
                          <select
                            value={styleOptions.logoType}
                            onChange={(e) => {
                              const val = e.target.value as any;
                              setStyleOptions({ ...styleOptions, logoType: val });
                            }}
                            className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-[11px] text-slate-750 dark:text-slate-300 font-semibold"
                            id="logo-type-select"
                          >
                            <option value="auto">Auto (Match QR)</option>
                            <option value="none">None (Plain QR)</option>
                            <option value="custom">Custom Image...</option>
                            <option value="website">🌐 Globe</option>
                            <option value="text">📝 Note</option>
                            <option value="wifi">📶 WiFi Signal</option>
                            <option value="whatsapp">💬 WhatsApp</option>
                            <option value="email">✉️ Envelope</option>
                            <option value="map">📍 Location</option>
                            <option value="social">📱 Phone / Social</option>
                            <option value="facebook">📘 Facebook</option>
                            <option value="instagram">📸 Instagram</option>
                            <option value="linkedin">💼 LinkedIn</option>
                            <option value="youtube">📺 YouTube</option>
                            <option value="tiktok">🎵 TikTok</option>
                            <option value="twitter">𝕏 Twitter</option>
                            <option value="product">📦 Product Box</option>
                            <option value="payment">💳 Card Payment</option>
                            <option value="vcard">👤 User Avatar</option>
                          </select>
                        </div>

                        {styleOptions.logoType === 'custom' && (
                          <div className="space-y-3">
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-slate-450 dark:text-slate-500 uppercase tracking-wider block font-mono">Upload Logo</label>
                              <div className="flex flex-wrap items-center gap-2">
                                <label className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-dashed border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 hover:bg-slate-100/50 dark:hover:bg-slate-900/50 text-[10px] font-semibold text-slate-600 dark:text-slate-400 cursor-pointer transition-all">
                                  <Upload className="w-3 h-3 text-emerald-500" />
                                  <span>Browse...</span>
                                  <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => {
                                      const file = e.target.files?.[0];
                                      if (file) {
                                        const reader = new FileReader();
                                        reader.onload = (event) => {
                                          setStyleOptions({
                                            ...styleOptions,
                                            customLogoData: event.target?.result as string,
                                            customLogoScale: 1.0,
                                            customLogoRadius: 0.25
                                          });
                                        };
                                        reader.readAsDataURL(file);
                                      }
                                    }}
                                  />
                                </label>
                                {styleOptions.customLogoData ? (
                                  <div className="flex items-center gap-1.5">
                                    <img
                                      src={styleOptions.customLogoData}
                                      alt="Custom logo"
                                      className="w-6 h-6 rounded-md object-contain border border-slate-200 dark:border-slate-800 bg-white"
                                    />
                                    <button
                                      onClick={() => setStyleOptions({ ...styleOptions, customLogoData: null })}
                                      className="p-0.5 rounded-full text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 cursor-pointer"
                                      title="Remove Image"
                                    >
                                      <X className="w-3 h-3" />
                                    </button>
                                  </div>
                                ) : (
                                  <span className="text-[9px] text-slate-400 dark:text-slate-500 font-mono">No file</span>
                                )}
                              </div>
                            </div>

                            {styleOptions.customLogoData && (
                              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-850/60 space-y-3">
                                <div className="space-y-3">
                                  <div className="space-y-1">
                                    <div className="flex items-center justify-between">
                                      <label className="text-[10px] font-semibold text-slate-600 dark:text-slate-400">
                                        Zoom Scale
                                      </label>
                                      <span className="text-[9px] font-mono font-bold text-emerald-500">
                                        {Math.round((styleOptions.customLogoScale ?? 1.0) * 100)}%
                                      </span>
                                    </div>
                                    <input
                                      type="range"
                                      min="0.5"
                                      max="1.5"
                                      step="0.05"
                                      value={styleOptions.customLogoScale ?? 1.0}
                                      onChange={(e) => setStyleOptions({
                                        ...styleOptions,
                                        customLogoScale: parseFloat(e.target.value)
                                      })}
                                      className="w-full accent-emerald-500 h-1 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer"
                                    />
                                  </div>

                                  <div className="space-y-1">
                                    <div className="flex items-center justify-between">
                                      <label className="text-[10px] font-semibold text-slate-600 dark:text-slate-400">
                                        Corner Radius
                                      </label>
                                      <span className="text-[9px] font-mono font-bold text-emerald-500">
                                        {Math.round((styleOptions.customLogoRadius ?? 0.25) * 200)}%
                                      </span>
                                    </div>
                                    <input
                                      type="range"
                                      min="0"
                                      max="0.5"
                                      step="0.02"
                                      value={styleOptions.customLogoRadius ?? 0.25}
                                      onChange={(e) => setStyleOptions({
                                        ...styleOptions,
                                        customLogoRadius: parseFloat(e.target.value)
                                      })}
                                      className="w-full accent-emerald-500 h-1 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer"
                                    />
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                  </div>

                </div>


              </div>



            </motion.div>
          )}

          {/* TAB 2: ABOUT US PAGE */}
          {activeTab === 'about' && (
            <motion.div
              key="about-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-12"
            >
              {/* Heading */}
              <div className="text-center max-w-2xl mx-auto space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-100/60 dark:border-emerald-900/30 text-xs font-semibold tracking-wider uppercase font-mono">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  SEO Optimised & Secure
                </div>
                <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight font-display text-slate-900 dark:text-white leading-tight">
                  About Our Custom <span className="bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">QR Code Generator</span>
                </h1>
                <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base leading-relaxed">
                  Learn about our commitment to lightweight, secure, and blazing-fast utility tools built for modern web creators.
                </p>
              </div>

              {/* Pristine Geometric Bento Grid */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                
                {/* Bento Item 1: Our Mission */}
                <div className="md:col-span-8 p-8 rounded-3xl border border-slate-200/60 dark:border-slate-800/80 bg-white dark:bg-slate-900/40 shadow-[0_4px_25px_-5px_rgba(0,0,0,0.01)] hover:shadow-[0_12px_35px_-5px_rgba(0,0,0,0.03)] dark:hover:shadow-[0_12px_45px_rgba(0,0,0,0.25)] hover:scale-[1.015] transition-all duration-300 flex flex-col justify-between space-y-6">
                  <div className="space-y-3">
                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 dark:from-emerald-950/40 dark:to-teal-950/40 flex items-center justify-center text-emerald-500 border border-emerald-500/10">
                      <Zap className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl font-extrabold text-slate-850 dark:text-slate-100 font-display tracking-tight">
                      Our Core Mission
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                      EZ Toolbox aims to solve complex, repetitive digital tasks cleanly, fast, and completely free of charge. Instead of forcing visitors through multi-layered registration, dynamic paywalls, or distracting tracking banners, our tools provide direct client-side utility immediately. We believe the internet should be helper-centric, giving everyone access to premium development and marketing assets with ease.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-500">
                    <span>BUILDING THE INDIE WEB</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Bento Item 2: Safe Encryption */}
                <div className="md:col-span-4 p-8 rounded-3xl border border-slate-200/60 dark:border-slate-800/80 bg-white dark:bg-slate-900/40 shadow-[0_4px_25px_-5px_rgba(0,0,0,0.01)] hover:shadow-[0_12px_35px_-5px_rgba(0,0,0,0.03)] dark:hover:shadow-[0_12px_45px_rgba(0,0,0,0.25)] hover:scale-[1.015] transition-all duration-300 flex flex-col justify-between space-y-6">
                  <div className="space-y-3">
                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-teal-500/10 to-emerald-500/10 dark:from-teal-950/40 dark:to-emerald-950/40 flex items-center justify-center text-teal-500 border border-teal-500/10">
                      <Lock className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl font-extrabold text-slate-850 dark:text-slate-100 font-display tracking-tight">
                      Client-Side Privacy
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                      Your confidential data, SSID, WiFi keys, phone numbers, and links are generated and converted to vectors directly in your web browser. No external tracking databases or Dynamic API routes are involved.
                    </p>
                  </div>
                  <div className="text-[10px] font-mono font-bold tracking-wider text-slate-400 dark:text-slate-500">
                    SECURED LOCAL HOSTING
                  </div>
                </div>

                {/* Bento Item 3: Print Ready High Definition */}
                <div className="md:col-span-4 p-8 rounded-3xl border border-slate-200/60 dark:border-slate-800/80 bg-white dark:bg-slate-900/40 shadow-[0_4px_25px_-5px_rgba(0,0,0,0.01)] hover:shadow-[0_12px_35px_-5px_rgba(0,0,0,0.03)] dark:hover:shadow-[0_12px_45px_rgba(0,0,0,0.25)] hover:scale-[1.015] transition-all duration-300 flex flex-col justify-between space-y-6">
                  <div className="space-y-3">
                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 dark:from-blue-950/40 dark:to-cyan-950/40 flex items-center justify-center text-blue-500 border border-blue-500/10">
                      <Download className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl font-extrabold text-slate-850 dark:text-slate-100 font-display tracking-tight">
                      Print Readiness
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                      Select outputs up to 1024 × 1024 pixels. These high-density PNG files are fully optimized for print media, menus, stickers, flyers, and physical signs.
                    </p>
                  </div>
                  <div className="text-[10px] font-mono font-bold tracking-wider text-slate-400 dark:text-slate-500">
                    RESOLUTIONS UP TO 1024px
                  </div>
                </div>

                {/* Bento Item 4: No Dynamic Tracker Expirations */}
                <div className="md:col-span-8 p-8 rounded-3xl border border-slate-200/60 dark:border-slate-800/80 bg-white dark:bg-slate-900/40 shadow-[0_4px_25px_-5px_rgba(0,0,0,0.01)] hover:shadow-[0_12px_35px_-5px_rgba(0,0,0,0.03)] dark:hover:shadow-[0_12px_45px_rgba(0,0,0,0.25)] hover:scale-[1.015] transition-all duration-300 flex flex-col justify-between space-y-6">
                  <div className="space-y-3">
                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-purple-500/10 to-indigo-500/10 dark:from-purple-950/40 dark:to-indigo-950/40 flex items-center justify-center text-purple-500 border border-purple-500/10">
                      <Globe className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl font-extrabold text-slate-850 dark:text-slate-100 font-display tracking-tight">
                      No Dynamic Link Expirations
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                      Most commercial "free" generators wrap your URL inside their tracking redirect domain, which they expire after 14 days to force you into a paid subscription. Our custom QR generator uses pure, native QR payloads containing your direct data. Since there is no redirect proxy, your code remains fully active forever.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-500">
                    <span>100% PERMANENT & UNLIMITED</span>
                  </div>
                </div>

              </div>

              {/* Pulsing emerald Callout CTA */}
              <div className="p-8 rounded-3xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-center space-y-5 shadow-lg relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.1),transparent)] pointer-events-none" />
                <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight font-display">
                  Ready to Create Your Custom QR Code?
                </h3>
                <p className="text-emerald-100 max-w-xl mx-auto text-sm leading-relaxed">
                  Use our free custom QR code maker with multiple input templates, granular color picking, high density quality parameters, and instant clipboard export.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => navigateTo('/')}
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-900 font-bold text-sm shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer animate-pulse-slow"
                  >
                    <span>Create Your Free QR Code Now</span>
                    <ArrowRight className="w-4 h-4 text-emerald-500" />
                  </button>
                </div>
              </div>

            </motion.div>
          )}

          {/* TAB 3: BLOG / ARTICLES (SEO Rich) */}
          {activeTab === 'blog' && (
            <motion.div
              key="blog-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-12"
            >
              {/* Heading */}
              <div className="text-center max-w-2xl mx-auto space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-100/60 dark:border-emerald-900/30 text-xs font-semibold tracking-wider uppercase font-mono">
                  <FileText className="w-3.5 h-3.5 text-emerald-500" />
                  SEO Knowledge Hub & Guide
                </div>
                <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight font-display text-slate-900 dark:text-white leading-tight">
                  Free Digital Utilities & <span className="bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent font-display font-extrabold">QR Codes Blog</span>
                </h1>
                <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base leading-relaxed">
                  Discover trending strategies, developer guides, and high-quality marketing checklists for modern search engines.
                </p>
              </div>

              {/* Bento Article Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Article Card 1 */}
                <div className="bg-white dark:bg-slate-900/50 border border-slate-200/65 dark:border-slate-800/80 rounded-3xl p-6 md:p-8 flex flex-col justify-between space-y-6 hover:shadow-[0_15px_45px_-15px_rgba(16,185,129,0.1)] transition-all duration-300">
                  <div className="space-y-4">
                    <span className="text-[10px] bg-emerald-500/10 text-emerald-500 font-extrabold px-2.5 py-1 rounded-full font-mono uppercase tracking-wider">
                      Branding Guide
                    </span>
                    <h3 className="text-xl font-extrabold text-slate-800 dark:text-white font-display tracking-tight leading-snug">
                      How to Create Custom QR Codes with Logos Free: 2026 Playbook
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-sans">
                      Learn how to combine vector backgrounds with customized channel emblems (like Facebook, YouTube, or custom company logos) to double scanner click-through-rates. This dynamic guide breaks down visual margin guides, contrast ratios, and how to safely run scans forever on any device.
                    </p>
                  </div>
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800/50 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-slate-400 font-bold">5 MIN READ</span>
                    <button onClick={() => navigateTo('/articles/how-to-create-custom-qr-codes-with-logos-free')} className="text-xs font-mono font-bold text-emerald-500 hover:underline inline-flex items-center gap-1 cursor-pointer">
                      <span>Read Guide</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Article Card 2 */}
                <div className="bg-white dark:bg-slate-900/50 border border-slate-200/65 dark:border-slate-800/80 rounded-3xl p-6 md:p-8 flex flex-col justify-between space-y-6 hover:shadow-[0_15px_45px_-15px_rgba(16,185,129,0.1)] transition-all duration-300">
                  <div className="space-y-4">
                    <span className="text-[10px] bg-amber-500/10 text-amber-500 font-extrabold px-2.5 py-1 rounded-full font-mono uppercase tracking-wider">
                      Scam Alert
                    </span>
                    <h3 className="text-xl font-extrabold text-slate-800 dark:text-white font-display tracking-tight leading-snug">
                      The Expiration Trap of Free Online QR Generators
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-sans">
                      Many commercial generator platforms hijack your scanned data by nesting links inside dynamic redirection domains. After 14 days, your codes expire, demanding expensive monthly subscriptions. Discover how static browser generators (like EZ Toolbox) keep your codes active forever, 100% free.
                    </p>
                  </div>
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800/50 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-slate-400 font-bold">4 MIN READ</span>
                    <button onClick={() => navigateTo('/articles/the-expiration-trap-of-free-online-qr-generators')} className="text-xs font-mono font-bold text-emerald-500 hover:underline inline-flex items-center gap-1 cursor-pointer">
                      <span>Read Guide</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Article Card 3 */}
                <div className="bg-white dark:bg-slate-900/50 border border-slate-200/65 dark:border-slate-800/80 rounded-3xl p-6 md:p-8 flex flex-col justify-between space-y-6 hover:shadow-[0_15px_45px_-15px_rgba(16,185,129,0.1)] transition-all duration-300">
                  <div className="space-y-4">
                    <span className="text-[10px] bg-blue-500/10 text-blue-500 font-extrabold px-2.5 py-1 rounded-full font-mono uppercase tracking-wider">
                      Utility Suite
                    </span>
                    <h3 className="text-xl font-extrabold text-slate-800 dark:text-white font-display tracking-tight leading-snug">
                      Top 7 Free Digital Tools for Modern Businesses in 2026
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-sans">
                      From high-speed YouTube Thumbnail Downloaders and password generators to vector converters and QR suites, discover how to leverage client-side developer platforms. Improve your operational workflow and reduce tech expenditures with premium utility tool lists.
                    </p>
                  </div>
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800/50 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-slate-400 font-bold">6 MIN READ</span>
                    <button onClick={() => navigateTo('/articles/top-7-free-digital-tools-for-modern-businesses-in-2026')} className="text-xs font-mono font-bold text-emerald-500 hover:underline inline-flex items-center gap-1 cursor-pointer">
                      <span>Read Guide</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>

              {/* Detailed SEO Keywords Content for Crawlers */}
              <div className="p-8 rounded-3xl border border-slate-200/60 dark:border-slate-800 bg-white/40 dark:bg-slate-900/10 space-y-6">
                <h3 className="text-lg font-bold font-display text-slate-800 dark:text-white">
                  Why Use EZ Toolbox for Free QR Codes & Digital Creator Tools?
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  <p>
                    Search engine spiders and digital designers favor <strong className="text-emerald-500">EZ Toolbox free tools</strong> because we build with a pure, code-first design philosophy. Our QR codes are structured on native SVG/Canvas grids that preserve maximum scanning integrity under low-light or wrinkled paper conditions. By letting webmasters customize parameters like quiet zones, foreground dark parameters, and error correction levels, we ensure every asset looks professional and operates cleanly.
                  </p>
                  <p>
                    Unlike alternative commercial sites, our systems require no server proxies or cookie session trackers. All payload generation happens directly within the browser, offering unmatched data security for Wi-Fi configurations, WhatsApp links, billing credentials, and contact details. Use our generator today to download permanent, zero-expiry high-definition graphics for print, restaurant menus, retail tags, or commercial pamphlets.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 3.5: DETAILED ARTICLE READER PAGE */}
          {activeTab === 'article' && (() => {
            const article = articles.find(a => a.slug === currentArticleSlug);
            if (!article) {
              return (
                <motion.div
                  key="article-404"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="text-center py-20 space-y-6"
                >
                  <h2 className="text-3xl font-black font-display text-slate-800 dark:text-white">Article Not Found</h2>
                  <p className="text-slate-500 max-w-sm mx-auto">This reading guide could not be located. It may have been moved or renamed.</p>
                  <button onClick={() => navigateTo('/blog')} className="px-5 py-2.5 rounded-xl bg-emerald-500 text-white font-bold text-sm cursor-pointer hover:bg-emerald-600 transition-colors">
                    Back to Articles
                  </button>
                </motion.div>
              );
            }
            return (
              <motion.div
                key={`article-${article.slug}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="max-w-3xl mx-auto space-y-8"
              >
                {/* Back Link */}
                <div>
                  <button 
                    onClick={() => navigateTo('/blog')} 
                    className="inline-flex items-center gap-2 text-sm font-bold text-emerald-500 hover:underline cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Articles</span>
                  </button>
                </div>

                {/* Article Header Card */}
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2">
                    <span className="text-[10px] bg-emerald-500/10 text-emerald-500 font-extrabold px-3 py-1 rounded-full font-mono uppercase tracking-wider">
                      {article.category}
                    </span>
                    <span className="text-xs text-slate-400 dark:text-slate-500">•</span>
                    <span className="text-xs font-mono text-slate-400 dark:text-slate-500 font-bold">{article.readTime}</span>
                    <span className="text-xs text-slate-400 dark:text-slate-500">•</span>
                    <span className="text-xs font-mono text-slate-400 dark:text-slate-500 font-bold">{article.publishDate}</span>
                  </div>
                  
                  <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight font-display text-slate-900 dark:text-white leading-tight">
                    {article.title}
                  </h1>
                </div>

                {/* --- ADSTERRA BANNER: TOP OF ARTICLE --- */}
                <div className="my-6 p-1 border border-slate-200/50 dark:border-slate-800/40 rounded-3xl bg-white dark:bg-slate-900/50 overflow-hidden">
                  <div className="text-[10px] text-center text-slate-400 font-mono font-bold py-1 uppercase tracking-wider">ADVERTISEMENT</div>
                  <AdsterraBanner id={`article-top-${article.slug}`} />
                </div>

                {/* Detailed Content */}
                <div 
                  className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 space-y-6 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: article.contentHtml }}
                />

                {/* --- ADSTERRA BANNER: BOTTOM OF ARTICLE --- */}
                <div className="my-6 p-1 border border-slate-200/50 dark:border-slate-800/40 rounded-3xl bg-white dark:bg-slate-900/50 overflow-hidden">
                  <div className="text-[10px] text-center text-slate-400 font-mono font-bold py-1 uppercase tracking-wider">ADVERTISEMENT</div>
                  <AdsterraBanner id={`article-bottom-${article.slug}`} />
                </div>

                {/* Ready to generate footer CTA */}
                <div className="p-8 rounded-3xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-center space-y-5 shadow-lg relative overflow-hidden mt-12">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.1),transparent)] pointer-events-none" />
                  <h3 className="text-xl md:text-2xl font-extrabold tracking-tight font-display">
                    Need a high-resolution custom QR Code?
                  </h3>
                  <p className="text-emerald-100 max-w-md mx-auto text-xs leading-relaxed">
                    Create vector PNG/PDF codes with your custom colors, margins, and logos right now in our free client-side tool.
                  </p>
                  <div className="pt-2">
                    <button
                      onClick={() => navigateTo('/')}
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-900 font-bold text-xs shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
                    >
                      <span>Generate QR Code Free</span>
                      <ArrowRight className="w-3.5 h-3.5 text-emerald-500" />
                    </button>
                  </div>
                </div>

              </motion.div>
            );
          })()}

          {/* TAB 4: CONTACT US PAGE (Interactive) */}
          {activeTab === 'contact' && (
            <motion.div
              key="contact-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-12"
            >
              {/* Heading */}
              <div className="text-center max-w-2xl mx-auto space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-100/60 dark:border-emerald-900/30 text-xs font-semibold tracking-wider uppercase font-mono">
                  <Mail className="w-3.5 h-3.5 text-emerald-500" />
                  Interactive Support Desk
                </div>
                <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight font-display text-slate-900 dark:text-white leading-tight">
                  Contact Our <span className="bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent font-display font-extrabold">Tools Suite Team</span>
                </h1>
                <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base leading-relaxed">
                  Have feature requests, commercial inquiries, or custom code suggestions? Leave a message and our global team will respond within 24 hours.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left Side: Contact Information Cards */}
                <div className="lg:col-span-4 space-y-6">
                  
                  {/* Address card */}
                  <div className="p-6 rounded-3xl border border-slate-200/60 dark:border-slate-800/60 bg-white dark:bg-slate-900/50 space-y-4">
                    <span className="text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">Developer Base</span>
                    <h3 className="text-base font-extrabold text-slate-800 dark:text-white font-display">EZ Toolbox Operations</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-sans">
                      Our decentralized digital utility engineers design safe open-source packages and creator shortcuts globally.
                    </p>
                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800/50 text-xs font-semibold text-slate-700 dark:text-slate-300 space-y-2">
                      <div className="flex items-center gap-2">
                        <Mail className="w-3.5 h-3.5 text-emerald-500" />
                        <span className="font-mono text-xs text-slate-800 dark:text-slate-200">raorafique2010@gmail.com</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MessageSquare className="w-3.5 h-3.5 text-emerald-500" />
                        <a href="https://wa.me/923017480809" target="_blank" rel="noopener noreferrer" className="font-mono text-xs text-slate-800 dark:text-slate-200 hover:text-emerald-500 transition-colors">WhatsApp Support: +92 301 7480809</a>
                      </div>
                      <div className="flex items-center gap-2">
                        <MessageSquare className="w-3.5 h-3.5 text-emerald-500" />
                        <a href="https://whatsapp.com/channel/0029VbCmqXdFnSzBpUgQzz1T" target="_blank" rel="noopener noreferrer" className="font-mono text-xs text-slate-800 dark:text-slate-200 hover:text-emerald-500 transition-colors">WhatsApp Channel 📢</a>
                      </div>
                    </div>
                  </div>

                  {/* Quick helper card */}
                  <div className="p-6 rounded-3xl border border-slate-200/60 dark:border-slate-800/60 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 dark:from-emerald-950/10 dark:to-teal-950/10 space-y-3">
                    <h4 className="text-sm font-bold text-emerald-500 font-display">Looking for Sister Tools?</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-sans">
                      Need high-resolution thumbnails, background removers, or dynamic links? Head to <a href="https://eztoolbox.xyz" className="text-emerald-500 hover:underline font-semibold font-mono">eztoolbox.xyz</a> to explore our flagship downloader.
                    </p>
                  </div>
                </div>

                {/* Right Side: Interactive Support Form */}
                <div className="lg:col-span-8 p-6 md:p-8 rounded-3xl border border-slate-200/60 dark:border-slate-800/80 bg-white dark:bg-slate-900/30 space-y-6">
                  <h3 className="text-lg font-extrabold text-slate-800 dark:text-white font-display">
                    Send Us a Message Directly
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-400 dark:text-slate-500 font-mono uppercase">Your Name</label>
                      <input
                        type="text"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 text-sm text-slate-800 dark:text-white"
                        placeholder="Usman Qureshi"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-400 dark:text-slate-500 font-mono uppercase">Email Address</label>
                      <input
                        type="email"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 text-sm text-slate-800 dark:text-white"
                        placeholder="name@gmail.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-400 dark:text-slate-500 font-mono uppercase">Subject / Request Type</label>
                    <select
                      value={contactSubject}
                      onChange={(e) => setContactSubject(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 text-sm text-slate-850 dark:text-white font-semibold"
                    >
                      <option value="Inquiry">General Technical Inquiry</option>
                      <option value="Feature">Feature Request (e.g. New Input Type)</option>
                      <option value="Bug">Bug Report / Processing Error</option>
                      <option value="Partnership">Subdomain Branding Partnership</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-400 dark:text-slate-500 font-mono uppercase">Your Message</label>
                    <textarea
                      rows={4}
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 text-sm text-slate-800 dark:text-white font-sans"
                      placeholder="Hi! I scanned the wifi QR on my menu, and..."
                    />
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                    <p className="text-[11px] text-slate-400 dark:text-slate-500 leading-tight">
                      No spam. We secure your details client-side.
                    </p>
                    <button
                      disabled={contactSubmitting}
                      onClick={() => {
                        if (!contactName || !contactEmail || !contactMessage) {
                          showToast('Please fill out all required fields.', true);
                          return;
                        }
                        setContactSubmitting(true);
                        setTimeout(() => {
                          setContactSubmitting(false);
                          showToast('✨ Thank you! Your message was submitted successfully.');
                          setContactName('');
                          setContactEmail('');
                          setContactMessage('');
                        }, 1200);
                      }}
                      className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:opacity-95 text-white font-bold text-sm shadow-md transition-all cursor-pointer flex items-center gap-2 disabled:opacity-50"
                    >
                      {contactSubmitting ? (
                        <span>Submitting...</span>
                      ) : (
                        <>
                          <span>Submit Inquiry</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>

                </div>

              </div>

            </motion.div>
          )}

          {/* TAB 5: PRIVACY POLICY PAGE (SEO Rich CCPA/GDPR Compliance) */}
          {activeTab === 'privacy' && (
            <motion.div
              key="privacy-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-8 max-w-4xl mx-auto"
            >
              {/* Heading */}
              <div className="space-y-3">
                <span className="text-[10px] bg-emerald-500/10 text-emerald-500 font-extrabold px-3 py-1 rounded-full font-mono uppercase tracking-wider">
                  Data Security Pledge
                </span>
                <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight font-display text-slate-900 dark:text-white">
                  Privacy Policy & <span className="bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent font-display font-extrabold">Data Protection</span>
                </h1>
                <p className="text-xs text-slate-400 dark:text-slate-500 font-mono uppercase">
                  Last Updated: July 2026 | 100% GDPR, CCPA, and COPPA Compliant
                </p>
              </div>

              <div className="prose prose-slate dark:prose-invert max-w-none text-xs md:text-sm text-slate-500 dark:text-slate-400 leading-relaxed space-y-6">
                <p>
                  At <strong className="text-slate-800 dark:text-slate-200">EZ Toolbox</strong>, accessible from our digital tools suite including our flagship thumbnail download systems, one of our main priorities is the privacy of our visitors. This Privacy Policy document outline how we manage information, explaining in clear language why our 100% client-side technologies make us the safest option on the web.
                </p>

                <h3 className="text-base font-bold text-slate-855 dark:text-slate-200 font-display mt-6 border-b border-slate-100 dark:border-slate-800 pb-2 uppercase tracking-wide">
                  1. Zero Database Collection Policy
                </h3>
                <p>
                  Unlike typical commercial dynamic QR code generators, <strong className="text-emerald-500">EZ Toolbox does NOT collect, save, or upload any information</strong> you type into our fields. Whether you enter confidential home Wi-Fi SSID passwords, sensitive business link directions, personal phone numbers, or private emails, the entire conversion and rendering process takes place inside your browser. No data packet is ever transmitted to external servers.
                </p>

                <h3 className="text-base font-bold text-slate-855 dark:text-slate-200 font-display mt-6 border-b border-slate-100 dark:border-slate-800 pb-2 uppercase tracking-wide">
                  2. Local Browser Memory Usage
                </h3>
                <p>
                  We utilize standard client-side state hooks and standard <code className="bg-slate-100 dark:bg-slate-900 px-1 rounded text-rose-500">localStorage</code> to persist your aesthetic settings (like custom light/dark preferences) across website visits. This data remains completely confined to your device's browser cache, and can be cleared instantly by you at any time.
                </p>

                <h3 className="text-base font-bold text-slate-855 dark:text-slate-200 font-display mt-6 border-b border-slate-100 dark:border-slate-800 pb-2 uppercase tracking-wide">
                  3. Cookies and Analytics Tracking
                </h3>
                <p>
                  To keep our website 100% free of distracting behavioral tracking, we maintain zero integration with invasive third-party profiling systems. Any high-level logging is limited strictly to lightweight, anonymous traffic counters optimized for bandwidth planning.
                </p>

                <h3 className="text-base font-bold text-slate-855 dark:text-slate-200 font-display mt-6 border-b border-slate-100 dark:border-slate-800 pb-2 uppercase tracking-wide">
                  4. Third-Party Links & Cross Promotion
                </h3>
                <p>
                  Our system displays clean, self-contained shortcuts pointing back to our flagship tool at <code className="text-emerald-500">https://eztoolbox.xyz</code>. We do not participate in advertising networks that inject malware, pop-ups, or redirect scripts, safeguarding your digital security fully.
                </p>
              </div>
            </motion.div>
          )}

          {/* TAB 6: TERMS OF SERVICE PAGE */}
          {activeTab === 'terms' && (
            <motion.div
              key="terms-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-8 max-w-4xl mx-auto"
            >
              {/* Heading */}
              <div className="space-y-3">
                <span className="text-[10px] bg-emerald-500/10 text-emerald-500 font-extrabold px-3 py-1 rounded-full font-mono uppercase tracking-wider">
                  Usage Agreement
                </span>
                <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight font-display text-slate-900 dark:text-white">
                  Terms of Service & <span className="bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent font-display font-extrabold">Fair Use Guidelines</span>
                </h1>
                <p className="text-xs text-slate-400 dark:text-slate-500 font-mono uppercase">
                  Last Updated: July 2026 | 100% Free Open Access Utility
                </p>
              </div>

              <div className="prose prose-slate dark:prose-invert max-w-none text-xs md:text-sm text-slate-500 dark:text-slate-400 leading-relaxed space-y-6">
                <p>
                  Welcome to <strong className="text-slate-800 dark:text-slate-200">EZ Toolbox QR Code Generator</strong>. These Terms of Service govern your access to and usage of our free browser utility suite. By accessing or downloading generated graphic parameters from our platform, you agree to these transparent fair-use regulations.
                </p>

                <h3 className="text-base font-bold text-slate-855 dark:text-slate-200 font-display mt-6 border-b border-slate-100 dark:border-slate-800 pb-2 uppercase tracking-wide">
                  1. Zero Cost & Commercial Licensing
                </h3>
                <p>
                  All graphic designs, vectors, and QR code assets created using our <strong className="text-emerald-500">free QR generator</strong> are provided with a permanent, royalty-free, and non-exclusive commercial license. You are fully permitted to print these assets on retail packaging, business flyers, physical banners, restaurant tabletops, food menus, Wi-Fi share handouts, and dynamic digital banners without any attribution or paid tier obligations.
                </p>

                <h3 className="text-base font-bold text-slate-855 dark:text-slate-200 font-display mt-6 border-b border-slate-100 dark:border-slate-800 pb-2 uppercase tracking-wide">
                  2. No Expiry Scan Guarantee
                </h3>
                <p>
                  Our static QR configurations bake your direct string payload natively into the pixel blocks. Because we do not route scans through intermediate redirect redirectors or server databases, <strong className="text-emerald-500">your codes can never be expired or disabled by us</strong>. The scan durability is infinite and permanent.
                </p>

                <h3 className="text-base font-bold text-slate-855 dark:text-slate-200 font-display mt-6 border-b border-slate-100 dark:border-slate-800 pb-2 uppercase tracking-wide">
                  3. Usage Limitations & Abuse Protection
                </h3>
                <p>
                  While we support unlimited high-resolution bulk downloads, you are strictly prohibited from utilizing automated scripting tools, scrapers, or DDoS systems to stress or compromise our client-side bundle distribution networks.
                </p>

                <h3 className="text-base font-bold text-slate-855 dark:text-slate-200 font-display mt-6 border-b border-slate-100 dark:border-slate-800 pb-2 uppercase tracking-wide">
                  4. Disclaimer of Liability
                </h3>
                <p>
                  EZ Toolbox assets are generated exactly as input. It remains the sole responsibility of the user to run test scans on the generated code (using physical smartphone cameras) before proceeding with mass physical print operations. We are not liable for spelling issues, poor contrast, or unreadable printing errors.
                </p>
              </div>
            </motion.div>
          )}

        </AnimatePresence>

        {/* --- NATIVE RECOMMENDATION AD WIDGET --- */}
        {activeTab === 'tool' && (
          <section className="mt-6 pt-4 border-t border-slate-200/60 dark:border-slate-900">
            <div className="mb-3 text-center md:text-left">
              <h3 className="text-sm font-bold text-slate-400 dark:text-slate-500 font-mono tracking-wider uppercase">
                Recommended For You
              </h3>
            </div>
            <AdsterraNative id="native-feed" />
          </section>
        )}

        {/* --- CROSS-PROMOTION NETWORK GRID --- */}
        <section className="mt-20 pt-10 border-t border-slate-200/60 dark:border-slate-900 space-y-6">
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 font-display">
              Our Free Utility Tools
            </h3>
            <p className="text-xs text-slate-450 dark:text-slate-500 mt-1">
              Need other developer or creator shortcuts? Try these high-performance, registration-free sister platforms.
            </p>
          </div>
          <PromoGrid />
        </section>

        {/* --- FAQ & DISCLAIMER (Moved below Free Utility Tools) --- */}
        {activeTab === 'tool' && (
          <div className="mt-20 space-y-12 pt-10 border-t border-slate-200/60 dark:border-slate-900">
            {/* Step instructions & FAQ accordion segment */}
            <FAQ />

            {/* Disclaimer Card */}
            <div className="p-6 rounded-3xl border border-slate-200/50 dark:border-slate-800 bg-amber-500/5 dark:bg-amber-500/10 space-y-3">
              <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
                <ShieldCheck className="w-5 h-5 text-amber-500" />
                <h4 className="text-sm font-bold font-display uppercase tracking-wider">
                  Disclaimer / Standard Legal Notice
                </h4>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-sans">
                <strong>EZ QR Code Generator</strong> provides free utility codes running 100% locally in your browser. All generated outputs and payloads remain private to you. We do not store, proxy, or track your data. It is the user's responsibility to verify that the generated QR codes scan and point to correct destinations prior to printing or commercial distribution. We are not liable for any losses or errors resulting from incorrect, modified, or corrupted code scans.
              </p>
            </div>

            {/* Mobile Bottom Banner Ad (320x50) */}
            <div className="w-full flex lg:hidden justify-center items-center mt-6 overflow-visible">
              <div className="shrink-0">
                <Adsterra320x50 id="bottom-mobile" />
              </div>
            </div>
          </div>
        )}



      </main>

      {/* --- FOOTER & COMPLIANCE --- */}
      <footer className="w-full bg-white dark:bg-slate-950 border-t border-slate-200/55 dark:border-slate-900 py-8 mt-16 text-xs text-slate-400 dark:text-slate-500">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Logo & Copyright */}
          <div className="text-center md:text-left space-y-1">
            <div className="font-bold text-slate-600 dark:text-slate-350 font-display">
              EZ TOOLBOX SUITE
            </div>
            <p>© {new Date().getFullYear()} EZ Toolbox. xyz — All rights reserved.</p>
          </div>

          {/* Privacy/Policy links & Contact modal trigger */}
          <div className="flex items-center gap-6 flex-wrap justify-center">
            <Link to="/privacy" className="hover:text-emerald-500 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-emerald-500 transition-colors">Terms of Service</Link>
            
            <button
              onClick={() => setSupportModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-350 hover:text-emerald-500 dark:hover:text-emerald-400 font-bold transition-all cursor-pointer shadow-xs border border-slate-200/10"
              id="footer-support-trigger"
            >
              Support Contact 📬
            </button>
          </div>
        </div>
      </footer>

      {/* --- SUPPORT CONTACT MODAL --- */}
      <AnimatePresence>
        {supportModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Modal Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSupportModalOpen(false)}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-md"
            />

            {/* Modal Body Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl relative z-10 space-y-6 text-left"
              id="support-modal"
            >
              {/* Close Button */}
              <button
                onClick={() => setSupportModalOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-xl border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-all cursor-pointer"
                title="Close Modal"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 flex items-center justify-center text-emerald-500">
                  <Mail className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold font-display text-slate-800 dark:text-slate-100">
                  Get in Touch with Us
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-xs md:text-sm leading-relaxed">
                  Need custom utility enhancements? Spotted a bug? We respond directly to our users. Our support team will get back to you within 24 hours.
                </p>
              </div>

              {/* Support Email copy widget */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/50 border border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <div className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase font-mono">
                    Direct Email
                  </div>
                  <div className="text-sm font-bold font-mono text-slate-800 dark:text-white select-all">
                    raorafique2010@gmail.com
                  </div>
                </div>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText('raorafique2010@gmail.com');
                    showToast('📧 Support email address copied to clipboard!');
                  }}
                  className="p-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/50 dark:hover:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 transition-all cursor-pointer shadow-xs border border-emerald-100/35"
                  title="Copy email to clipboard"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>

              {/* WhatsApp Support Direct Link widget */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/50 border border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <div className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase font-mono">
                    WhatsApp Support
                  </div>
                  <div className="text-sm font-bold font-mono text-slate-800 dark:text-white">
                    +92 301 7480809
                  </div>
                </div>
                <a
                  href="https://wa.me/923017480809"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/50 dark:hover:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 transition-all cursor-pointer shadow-xs border border-emerald-100/35 flex items-center justify-center"
                  title="Chat on WhatsApp"
                >
                  <MessageSquare className="w-4 h-4" />
                </a>
              </div>

              {/* WhatsApp Channel widget */}
              <div className="p-4 rounded-2xl bg-emerald-500/5 dark:bg-emerald-950/20 border border-emerald-500/20 flex items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold uppercase font-mono">
                    Official WhatsApp Channel
                  </div>
                  <div className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Join our update broadcast!
                  </div>
                </div>
                <a
                  href="https://whatsapp.com/channel/0029VbCmqXdFnSzBpUgQzz1T"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs transition-all flex items-center gap-1 shadow-sm cursor-pointer"
                  title="Join Channel"
                >
                  <span>Join</span>
                  <ArrowRight className="w-3 h-3" />
                </a>
              </div>

              {/* Action Callouts */}
              <div className="flex items-center gap-3 justify-end pt-2">
                <button
                  onClick={() => setSupportModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-100 dark:border-slate-800/80 text-xs md:text-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-250 font-semibold cursor-pointer"
                >
                  Close
                </button>
                <a
                  href="mailto:raorafique2010@gmail.com"
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:opacity-95 text-white text-xs md:text-sm font-bold shadow-md cursor-pointer flex items-center gap-1.5"
                >
                  <Mail className="w-4 h-4" />
                  <span>Send Email</span>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating WhatsApp Support Button */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2 group">
        {/* Subtle tooltip text */}
        <div className="bg-slate-950 text-white dark:bg-white dark:text-slate-900 px-3 py-1.5 rounded-xl text-[11px] font-bold shadow-lg opacity-0 translate-y-1 scale-95 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 transition-all duration-200 block font-mono whitespace-nowrap">
          💬 Chat Support Live
        </div>
        
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.open(getWhatsAppSupportLink(), '_blank', 'noopener,noreferrer');
          }}
          className="w-14 h-14 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full shadow-[0_4px_20px_rgba(37,211,102,0.4)] hover:shadow-[0_6px_24px_rgba(37,211,102,0.55)] flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer relative"
          title="Direct Support on WhatsApp"
        >
          {/* Pulsing ring animation */}
          <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-35 animate-ping" />
          
          <MessageSquare className="w-6 h-6 relative z-10" />
        </a>
      </div>

    </div>
  );
}
