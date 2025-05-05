/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // تكوين الصور لـ Vercel
  images: {
    domains: ['se7eneyes.netlify.app', 'se7eneyes.vercel.app'],
    unoptimized: false, // تعيين إلى false لأن Vercel يدعم تحسين الصور
    deviceSizes: [320, 420, 768, 1024, 1200, 1600], // أحجام الأجهزة المختلفة للصور المستجيبة
    imageSizes: [16, 32, 48, 64, 96, 128, 256], // أحجام الصور المختلفة
  },
  // إصلاح مشكلة WebSocket
  webpack: (config, { isServer, dev }) => {
    // تكوين WebSocket للتحديث التلقائي
    if (!isServer && dev) {
      config.watchOptions = {
        poll: 1000, // التحقق كل ثانية
        aggregateTimeout: 300, // تأخير بعد التغييرات
      };
    }
    return config;
  },
  // تحسين الأداء
  poweredByHeader: false,
  generateEtags: false,
  // تحسينات إضافية للأداء والتوافق
  compress: true, // ضغط محتوى HTTP
  crossOrigin: 'anonymous', // تعيين CORS لتحسين الأمان
  optimizeFonts: true, // تحسين الخطوط
}

module.exports = nextConfig
