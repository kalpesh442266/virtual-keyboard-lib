/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    basePath: '/virtual-keyboard-lib',
    images: { unoptimized: true },
    transpilePackages: ['reactjs-virtual-keyboard'],
    webpack: (config) => {
        config.resolve.symlinks = false;
        return config;
    },
};

export default nextConfig;

