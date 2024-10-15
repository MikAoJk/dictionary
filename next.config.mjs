/** @type {import('next').NextConfig} */
const nextConfig = {
    basePath: process.env.NEXT_PUBLIC_BASE_PATH,
    reactStrictMode: true,
    swcMinify: true,
    output: 'export',
    images: {
        loader: 'akamai',
        path: '/'
    },
};

export default nextConfig;
