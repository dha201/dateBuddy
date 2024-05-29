/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
        ],
    },
    env: {
        OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    },
};

export default nextConfig;
