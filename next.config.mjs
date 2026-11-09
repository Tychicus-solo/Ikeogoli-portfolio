/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: "/AboutMe", destination: "/#about", permanent: true },
      { source: "/Contact", destination: "/#contact", permanent: true },
      ...["Experience", "HeroSection", "StackTools", "Testimonials", "UIGallery"].map(section => ({
        source: `/${section}`, destination: "/", permanent: true,
      })),
    ];
  },
  images: {
    qualities: [75, 85, 95, 100],
  },
};

export default nextConfig;
