/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },

  headers: async () => {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },

  redirects: async () => {
    return [
      {
        source: '/auth/signin',
        destination: '/auth/login',
        permanent: false,
      },
    ];
  },

  webpack: (config, { isServer }) => {
    if (isServer) {
      config.optimization.minimize = false;
    }
    return config;
  },

  // Environment variables
  env: {
    NEXT_PUBLIC_APP_NAME: 'CyberHire AI',
    NEXT_PUBLIC_APP_DESCRIPTION: 'AI-powered Job Search and Application Tracking Platform',
  },

  // Experimental features
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['@radix-ui/react-icons'],
  },
};

module.exports = nextConfig;
