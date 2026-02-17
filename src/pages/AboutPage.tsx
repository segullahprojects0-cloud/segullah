import { Building2, Target, Users } from 'lucide-react';
import Footer from '../components/Footer';

const AboutPage = () => {
  return (
    <>
      <section className="pt-32 pb-24 bg-gray-900 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-6 animate-slide-in-left">
              <div>
                <div className="h-1 w-20 bg-orange-500 mb-6"></div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  About Segullah
                  <br />
                  Projects & Designs
                </h1>
              </div>
            
             <div className="relative animate-slide-in-right">
              <img
                src="/bill3.jpg"
                alt="Modern Billboards"
                className="aspect-square w-full object-cover rounded-lg"
              />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-orange-500 opacity-20 rounded-lg -z-10"></div>
            </div>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p className="text-lg">
                  Segullah Projects is a dynamic and innovative branding company dedicated to helping businesses build powerful, memorable brands. Headquartered <span className="text-orange-500 font-medium">Randfontein, South Africa</span>, we proudly extend our services across regions with offices in Pretoria, South Africa, and Lusaka, Zambia.
                </p>
                <p>
                 We specialize in delivering creative and strategic solutions that elevate your company’s visibility and professional image. 
                </p>
                <p>
                 Our expertise includes: 
                </p>
                <p>
                 Web Development – Designing and developing modern, responsive, and user-friendly websites tailored to your business goals. 
                </p>
                <p>
                 App Development – Creating functional, scalable, and innovative mobile applications for Android and iOS platforms. 
                </p>
                <p>
                 Billboard Installations – Professional design, production, and installation of high-impact outdoor advertising solutions. 
                </p>
                <p>
                 Graphic Design – Creative branding materials including logos, company profiles, marketing materials, and promotional graphics. 
                </p>
                <p>
                 Vehicle Wrapping – High-quality vehicle branding that turns your cars, trucks, and fleet into moving advertisements.
                </p>
                <p>
                 Corporate Branding – Complete branding solutions including signage, uniforms, promotional products, and brand identity development.
                </p>
                <p>
                 At Segullah Projects, we combine creativity, technology, and strategy to deliver results that not only look good but drive real business growth. Our presence in multiple locations allows us to serve clients efficiently while maintaining high standards of quality, innovation, and customer satisfaction.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Building2 size={24} className="text-white" />
                  </div>
                  <p className="text-sm text-gray-400">Professional</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Target size={24} className="text-white" />
                  </div>
                  <p className="text-sm text-gray-400">Strategic</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Users size={24} className="text-white" />
                  </div>
                  <p className="text-sm text-gray-400">Collaborative</p>
                </div>
              </div>
            </div>

            <div className="relative animate-slide-in-right">
              <img
                src="/graphic.PNG"
                alt="Modern office workspace"
                className="aspect-square w-full object-cover rounded-lg"
              />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-orange-500 opacity-20 rounded-lg -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default AboutPage;
