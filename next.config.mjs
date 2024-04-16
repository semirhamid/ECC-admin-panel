/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['cdn.builder.io'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'vl367rxmlir7rzhv.public.blob.vercel-storage.com',
                port: '',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;
