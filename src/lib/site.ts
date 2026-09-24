export const SITE_URL = 'https://connectologyia.pages.dev';
export const SITE_NAME = 'ConnectologyIA';
export const EMAIL = 'connectologyaia@gmail.com';
export const PHONE = '+51970430127';
export const PHONE_DISPLAY = '+51 970 430 127';
export const WHATSAPP_URL = 'https://wa.me/51970430127';
export const absoluteUrl = (path = '/') => new URL(path, SITE_URL).href;
export const jsonLd = (data: unknown) => JSON.stringify(data).replace(/</g, '\\u003c');
export const formatDate = (date: Date) => date.toLocaleDateString('es-PE', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
