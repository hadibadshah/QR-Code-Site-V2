import { 
  WiFiForm, 
  WhatsAppForm, 
  EmailForm, 
  QRInputType,
  MapForm,
  SocialForm,
  ProductForm,
  PaymentForm,
  VCardForm
} from '../types';

/**
 * Generates the correct standard protocol payload for each input type.
 */
export function generateQRPayload(
  type: QRInputType,
  data: {
    website: string;
    text: string;
    wifi: WiFiForm;
    whatsapp: WhatsAppForm;
    email: EmailForm;
    map: MapForm;
    social: SocialForm;
    product: ProductForm;
    payment: PaymentForm;
    vcard: VCardForm;
    phone: string;
    sms: { phone: string; message: string };
    facebook: string;
    instagram: string;
    linkedin: string;
    youtube: string;
    tiktok: string;
    twitter: string;
    bitcoin: { address: string; amount: string; message: string };
    ethereum: { address: string; amount: string };
    paypal: { email: string; amount: string; memo: string };
    event: { title: string; location: string; start: string; end: string; description: string };
    zoom: { meetingId: string; password: string };
    spotify: string;
    appstore: string;
    googleplay: string;
  }
): string {
  switch (type) {
    case 'website': {
      let url = data.website.trim();
      if (!url) return '';
      // Ensure URL has a protocol if not present
      if (!/^https?:\/\//i.test(url)) {
        url = 'https://' + url;
      }
      return url;
    }
    case 'text':
      return data.text;
    case 'wifi': {
      const { ssid, password, security } = data.wifi;
      if (!ssid.trim()) return '';
      if (security === 'nopass') {
        return `WIFI:T:nopass;S:${ssid};;`;
      }
      return `WIFI:T:${security};S:${ssid};P:${password || ''};;`;
    }
    case 'whatsapp': {
      const { phone, message } = data.whatsapp;
      // Clean phone number (leave only digits, but allow a leading plus)
      const cleanPhone = phone.replace(/[^\d+]/g, '');
      if (!cleanPhone) return '';
      const encodedMsg = encodeURIComponent(message);
      return `https://wa.me/${cleanPhone}${encodedMsg ? `?text=${encodedMsg}` : ''}`;
    }
    case 'email': {
      const { recipient, subject, body } = data.email;
      if (!recipient.trim()) return '';
      const params: string[] = [];
      if (subject.trim()) {
        params.push(`subject=${encodeURIComponent(subject.trim())}`);
      }
      if (body.trim()) {
        params.push(`body=${encodeURIComponent(body.trim())}`);
      }
      const queryString = params.length > 0 ? `?${params.join('&')}` : '';
      return `mailto:${recipient.trim()}${queryString}`;
    }
    case 'map': {
      const { address, useCoordinates, latitude, longitude } = data.map;
      if (useCoordinates) {
        const lat = latitude.trim();
        const lng = longitude.trim();
        if (!lat || !lng) return '';
        return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
      } else {
        const q = address.trim();
        if (!q) return '';
        return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
      }
    }
    case 'social': {
      const { platform, username } = data.social;
      const user = username.trim();
      if (!user) return '';
      const cleanUser = user.startsWith('@') ? user.substring(1) : user;
      switch (platform) {
        case 'twitter':
          return `https://x.com/${cleanUser}`;
        case 'instagram':
          return `https://instagram.com/${cleanUser}`;
        case 'youtube':
          return `https://youtube.com/@${cleanUser}`;
        case 'tiktok':
          return `https://tiktok.com/@${cleanUser}`;
        case 'linkedin':
          return `https://linkedin.com/in/${cleanUser}`;
        case 'facebook':
          return `https://facebook.com/${cleanUser}`;
        default:
          return '';
      }
    }
    case 'product': {
      const { name, sku, price, description } = data.product;
      if (!name.trim()) return '';
      const parts = [
        `📦 PRODUCT INFO`,
        `──────────────`,
        `Name: ${name.trim()}`
      ];
      if (sku.trim()) parts.push(`SKU: ${sku.trim()}`);
      if (price.trim()) parts.push(`Price: ${price.trim()}`);
      if (description.trim()) parts.push(`Notes: ${description.trim()}`);
      return parts.join('\n');
    }
    case 'payment': {
      const { type: payType, payeeId, payeeName, amount, note } = data.payment;
      const id = payeeId.trim();
      if (!id) return '';
      const amt = amount.trim();
      const nt = note.trim();
      const name = payeeName.trim();
      if (payType === 'upi') {
        const params: string[] = [`pa=${id}`];
        if (name) params.push(`pn=${encodeURIComponent(name)}`);
        if (amt) params.push(`am=${encodeURIComponent(amt)}`);
        if (nt) params.push(`tn=${encodeURIComponent(nt)}`);
        params.push('cu=INR');
        return `upi://pay?${params.join('&')}`;
      } else if (payType === 'paypal') {
        let url = `https://paypal.me/${id}`;
        if (amt) url += `/${amt}`;
        return url;
      } else {
        const invoiceParts = [
          `💳 PAYMENT INVOICE`,
          `Payee Address: ${id}`
        ];
        if (name) invoiceParts.push(`Payee Name: ${name}`);
        if (amt) invoiceParts.push(`Amount: ${amt}`);
        if (nt) invoiceParts.push(`Memo: ${nt}`);
        return invoiceParts.join('\n');
      }
    }
    case 'vcard': {
      const { firstName, lastName, mobile, phone, email, company, title, url } = data.vcard;
      const fn = firstName.trim();
      const ln = lastName.trim();
      if (!fn && !ln) return '';
      const vcardParts = [
        'BEGIN:VCARD',
        'VERSION:3.0'
      ];
      vcardParts.push(`N:${ln};${fn};;;`);
      vcardParts.push(`FN:${fn} ${ln}`.trim());
      if (company.trim()) vcardParts.push(`ORG:${company.trim()}`);
      if (title.trim()) vcardParts.push(`TITLE:${title.trim()}`);
      if (mobile.trim()) vcardParts.push(`TEL;TYPE=CELL:${mobile.trim()}`);
      if (phone.trim()) vcardParts.push(`TEL;TYPE=WORK:${phone.trim()}`);
      if (email.trim()) vcardParts.push(`EMAIL;TYPE=PREF,INTERNET:${email.trim()}`);
      if (url.trim()) {
        let cleanUrl = url.trim();
        if (!/^https?:\/\//i.test(cleanUrl)) {
          cleanUrl = 'https://' + cleanUrl;
        }
        vcardParts.push(`URL:${cleanUrl}`);
      }
      vcardParts.push('END:VCARD');
      return vcardParts.join('\n');
    }
    case 'phone': {
      const p = data.phone.trim();
      return p ? `tel:${p}` : '';
    }
    case 'sms': {
      const { phone, message } = data.sms;
      const p = phone.trim();
      if (!p) return '';
      return `SMSTO:${p}:${message.trim()}`;
    }
    case 'facebook': {
      const user = data.facebook.trim();
      if (!user) return '';
      return /^https?:\/\//i.test(user) ? user : `https://facebook.com/${user.startsWith('@') ? user.slice(1) : user}`;
    }
    case 'instagram': {
      const user = data.instagram.trim();
      if (!user) return '';
      return /^https?:\/\//i.test(user) ? user : `https://instagram.com/${user.startsWith('@') ? user.slice(1) : user}`;
    }
    case 'linkedin': {
      const user = data.linkedin.trim();
      if (!user) return '';
      return /^https?:\/\//i.test(user) ? user : `https://linkedin.com/in/${user.startsWith('@') ? user.slice(1) : user}`;
    }
    case 'youtube': {
      const user = data.youtube.trim();
      if (!user) return '';
      return /^https?:\/\//i.test(user) ? user : `https://youtube.com/@${user.startsWith('@') ? user.slice(1) : user}`;
    }
    case 'tiktok': {
      const user = data.tiktok.trim();
      if (!user) return '';
      return /^https?:\/\//i.test(user) ? user : `https://tiktok.com/@${user.startsWith('@') ? user.slice(1) : user}`;
    }
    case 'twitter': {
      const user = data.twitter.trim();
      if (!user) return '';
      return /^https?:\/\//i.test(user) ? user : `https://x.com/${user.startsWith('@') ? user.slice(1) : user}`;
    }
    case 'bitcoin': {
      const { address, amount, message } = data.bitcoin;
      const addr = address.trim();
      if (!addr) return '';
      const params: string[] = [];
      if (amount.trim()) params.push(`amount=${encodeURIComponent(amount.trim())}`);
      if (message.trim()) params.push(`message=${encodeURIComponent(message.trim())}`);
      return `bitcoin:${addr}${params.length > 0 ? `?${params.join('&')}` : ''}`;
    }
    case 'ethereum': {
      const { address, amount } = data.ethereum;
      const addr = address.trim();
      if (!addr) return '';
      return `ethereum:${addr}${amount.trim() ? `?value=${encodeURIComponent(amount.trim())}` : ''}`;
    }
    case 'paypal': {
      const { email, amount, memo } = data.paypal;
      const emailOrUser = email.trim();
      if (!emailOrUser) return '';
      if (/^https?:\/\//i.test(emailOrUser)) return emailOrUser;
      let url = `https://paypal.me/${emailOrUser}`;
      if (amount.trim()) url += `/${amount.trim()}`;
      if (memo.trim()) {
        url += `?item_name=${encodeURIComponent(memo.trim())}`;
      }
      return url;
    }
    case 'event': {
      const { title, location, start, end, description } = data.event;
      if (!title.trim()) return '';
      const parts = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'BEGIN:VEVENT',
        `SUMMARY:${title.trim()}`
      ];
      if (location.trim()) parts.push(`LOCATION:${location.trim()}`);
      if (description.trim()) parts.push(`DESCRIPTION:${description.trim()}`);
      if (start.trim()) parts.push(`DTSTART:${start.trim().replace(/[-:]/g, '')}`);
      if (end.trim()) parts.push(`DTEND:${end.trim().replace(/[-:]/g, '')}`);
      parts.push('END:VEVENT');
      parts.push('END:VCALENDAR');
      return parts.join('\n');
    }
    case 'zoom': {
      const { meetingId, password } = data.zoom;
      const id = meetingId.trim();
      if (!id) return '';
      if (/^https?:\/\//i.test(id)) return id;
      return `https://zoom.us/j/${id}${password.trim() ? `?pwd=${encodeURIComponent(password.trim())}` : ''}`;
    }
    case 'spotify': {
      const url = data.spotify.trim();
      if (!url) return '';
      return /^https?:\/\//i.test(url) ? url : `https://open.spotify.com/search/${encodeURIComponent(url)}`;
    }
    case 'appstore': {
      const url = data.appstore.trim();
      if (!url) return '';
      return /^https?:\/\//i.test(url) ? url : `https://apps.apple.com/app/${encodeURIComponent(url)}`;
    }
    case 'googleplay': {
      const url = data.googleplay.trim();
      if (!url) return '';
      return /^https?:\/\//i.test(url) ? url : `https://play.google.com/store/apps/details?id=${encodeURIComponent(url)}`;
    }
    default:
      return '';
  }
}
