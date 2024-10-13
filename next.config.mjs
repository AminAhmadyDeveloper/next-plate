/** @type {import('next').NextConfig} */
import withPWAInit from '@ducanh2912/next-pwa';

const withPWA = withPWAInit({
  dest: 'public',
});

const nextConfig = withPWA({
  api: {
    bodyParser: false,
    externalResolver: true,
  },
  regions: ['iad1'],
});

export default nextConfig;
