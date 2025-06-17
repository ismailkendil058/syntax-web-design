
const AboutSection = () => {
  return (
    <section id="about" className="py-32 bg-cream">
      <div className="container-luxury">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="animate-fade-in">
            <h2 className="heading-luxury text-5xl md:text-6xl text-charcoal mb-8">
              Crafting Digital
              <br />
              Excellence
            </h2>
            <div className="w-24 h-1 bg-charcoal mb-8"></div>
            <p className="text-luxury text-lg text-charcoal/80 mb-6 leading-relaxed">
              At Syntax Studio, we don't just build websites—we craft digital experiences that elevate your brand and captivate your audience.
            </p>
            <p className="text-luxury text-lg text-charcoal/80 mb-8 leading-relaxed">
              Every project is a collaboration between vision and execution, resulting in websites that are not only beautiful but strategically designed to achieve your business goals.
            </p>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="heading-luxury text-2xl text-charcoal mb-2">50+</h3>
                <p className="text-charcoal/60">Projects Delivered</p>
              </div>
              <div>
                <h3 className="heading-luxury text-2xl text-charcoal mb-2">100%</h3>
                <p className="text-charcoal/60">Client Satisfaction</p>
              </div>
            </div>
          </div>

          <div className="animate-slide-up">
            <div className="bg-charcoal/5 p-12 rounded-lg">
              <h3 className="heading-luxury text-2xl text-charcoal mb-6">Our Process</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-charcoal rounded-full flex items-center justify-center text-cream text-sm font-semibold">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-charcoal mb-2">Discovery</h4>
                    <p className="text-charcoal/70 text-sm">Understanding your brand, goals, and target audience</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-charcoal rounded-full flex items-center justify-center text-cream text-sm font-semibold">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-charcoal mb-2">Design</h4>
                    <p className="text-charcoal/70 text-sm">Creating stunning visuals that reflect your brand identity</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-charcoal rounded-full flex items-center justify-center text-cream text-sm font-semibold">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-charcoal mb-2">Development</h4>
                    <p className="text-charcoal/70 text-sm">Building with cutting-edge technology and best practices</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-charcoal rounded-full flex items-center justify-center text-cream text-sm font-semibold">
                    4
                  </div>
                  <div>
                    <h4 className="font-semibold text-charcoal mb-2">Launch</h4>
                    <p className="text-charcoal/70 text-sm">Delivering your website with ongoing support</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
