/** @type {import('next').NextConfig} */
const nextConfig = {
  
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'www.adobe.com',
            port: '',
            pathname: '/**',
          },
          {
            protocol: 'https',
            hostname: 'photoscissors.com',
            port: '',
            pathname: '/**',
          },
          {
            protocol: 'https',
            hostname: 'encrypted-tbn0.gstatic.com',
            port: '',
            pathname: '/**',
          },
          {
            protocol: 'https',
            hostname: 'photokit.com',
            port: '',
            pathname: '/**',
          }
        ]
      },
      
    
};

export default nextConfig;
