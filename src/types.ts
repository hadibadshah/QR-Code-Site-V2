/**
 * Type declarations for the QR Code Generator application.
 */

export type QRInputType = 
  | 'website' 
  | 'text' 
  | 'wifi' 
  | 'whatsapp' 
  | 'email' 
  | 'map' 
  | 'social' 
  | 'product' 
  | 'payment' 
  | 'vcard'
  | 'phone'
  | 'sms'
  | 'facebook'
  | 'instagram'
  | 'linkedin'
  | 'youtube'
  | 'tiktok'
  | 'twitter'
  | 'bitcoin'
  | 'ethereum'
  | 'paypal'
  | 'event'
  | 'zoom'
  | 'spotify'
  | 'appstore'
  | 'googleplay';

export type WiFiSecurityType = 'WPA' | 'WEP' | 'nopass';

export interface WiFiForm {
  ssid: string;
  password?: string;
  security: WiFiSecurityType;
}

export interface WhatsAppForm {
  phone: string;
  message: string;
}

export interface EmailForm {
  recipient: string;
  subject: string;
  body: string;
}

export interface MapForm {
  address: string;
  useCoordinates: boolean;
  latitude: string;
  longitude: string;
}

export interface SocialForm {
  platform: 'twitter' | 'instagram' | 'youtube' | 'tiktok' | 'linkedin' | 'facebook';
  username: string;
}

export interface ProductForm {
  name: string;
  sku: string;
  price: string;
  description: string;
}

export interface PaymentForm {
  type: 'upi' | 'paypal' | 'custom';
  payeeId: string;
  payeeName: string;
  amount: string;
  note: string;
}

export interface VCardForm {
  firstName: string;
  lastName: string;
  mobile: string;
  phone: string;
  email: string;
  company: string;
  title: string;
  url: string;
}

export interface QRStyleOptions {
  foreground: string;
  background: string;
  resolution: number;
  quietZone: number;
  errorCorrectionLevel: 'L' | 'M' | 'Q' | 'H';
  logoType: 'none' | 'auto' | 'website' | 'text' | 'wifi' | 'whatsapp' | 'email' | 'map' | 'social' | 'product' | 'payment' | 'vcard' | 'custom';
  customLogoData: string | null;
  customLogoScale?: number;
  customLogoRadius?: number;
}

export interface PromoTool {
  id: string;
  name: string;
  bgSymbol: string;
  url: string;
  title: string;
  description: string;
  bgColorClass: string;
  textColorClass: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}
