export const isPro: boolean = process.env.NODE_ENV === 'production';

export const isHttps: boolean = window.document.location.protocol === 'https:';
