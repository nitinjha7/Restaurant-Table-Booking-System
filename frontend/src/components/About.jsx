import React from "react";
import aboutSectionImg from "/assets/aboutSectionImg.jpg";
import { motion } from "framer-motion";
import { ChefHat, Coffee, UtensilsCrossed, Star, ArrowUpRight } from "lucide-react";

const About = () => {
  const features = [
    {
      id: 1,
      icon: <ChefHat className="w-6 h-6" />,
      title: "Master Chefs",
      desc: "Led by Michelin-star experience, our kitchen is a studio of flavor."
    },
    {
      id: 2,
      icon: <UtensilsCrossed className="w-6 h-6" />,
      title: "Fresh Origins",
      desc: "We partner with local farms to ensure 100% organic ingredients."
    },
    {
      id: 3,
      icon: <Coffee className="w-6 h-6" />,
      title: "Curated Ambiance",
      desc: "Designed for conversation, comfort, and unforgettable memories."
    }
  ];

  return (
    <section className="relative w-full py-24 bg-stone-50 overflow-hidden" id="about">
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-orange-100 rounded-full blur-[100px] opacity-40 -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-orange-100 rounded-full blur-[80px] opacity-30 translate-x-1/3 translate-y-1/3 pointer-events-none"></div>

      <div className="w-[90%] max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <span className="text-orange-600 font-bold tracking-widest text-sm uppercase flex items-center gap-2 mb-4">
              <span className="w-8 h-[2px] bg-orange-600"></span>
              Since 2023
            </span>
            <h2 className="text-5xl lg:text-6xl font-serif font-bold text-gray-900 leading-[1.1]">
              More than just <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-400">
                a place to eat.
              </span>
            </h2>
          </motion.div>

          <motion.div
             initial={{ opacity: 0, x: 20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.6, delay: 0.2 }}
             className="hidden md:block"
          >
            <p className="text-gray-500 text-right font-serif italic text-lg">
              "Food is the ingredient that binds <br /> us together."
            </p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 relative group"
          >
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl shadow-gray-200 aspect-[4/3]">
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500 z-10"></div>
              <img 
                src={aboutSectionImg} 
                alt="The Social Spot Ambience" 
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000"
              />
            </div>

            <div className="absolute -bottom-8 -right-8 z-20 hidden md:block">
              <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center relative animate-[spin_10s_linear_infinite]">
                 <svg className="w-full h-full absolute inset-0 text-gray-900" viewBox="0 0 100 100">
                    <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="transparent" />
                    <text className="text-[11px] font-bold uppercase tracking-widest fill-current">
                      <textPath href="#circlePath" startOffset="0%">
                        The Social Spot • Est 2023 • Authentic •
                      </textPath>
                    </text>
                 </svg>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Star className="w-8 h-8 text-orange-600 fill-orange-600" />
              </div>
            </div>
          </motion.div>

          <div className="lg:col-span-5 space-y-10 lg:pl-8 pt-4">
            <motion.div
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Crafting Memories</h3>
              <p className="text-gray-600 leading-relaxed text-lg mb-6">
                Nestled in the heart of the city, <span className="text-gray-900 font-semibold">The Social Spot</span> isn't just about dining; it's about connection. We've stripped away the formalities of fine dining to create a space that feels like home, yet tastes like a culinary adventure.
              </p>
              <p className="text-gray-600 leading-relaxed text-lg">
                Whether it's a first date, a family reunion, or a solo coffee run, we believe every seat at our table tells a story.
              </p>
            </motion.div>

            <div className="space-y-6">
              {features.map((item, index) => (
                <motion.div 
                  key={item.id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + (index * 0.1) }}
                  className="flex gap-4 items-start group"
                >
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-colors duration-300 shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 font-serif">{item.title}</h4>
                    <p className="text-gray-500 text-sm mt-1">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.button
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 0.5, delay: 0.6 }}
               className="group flex items-center gap-2 text-gray-900 font-semibold border-b-2 border-gray-900 pb-1 hover:text-orange-600 hover:border-orange-600 transition-all"
            >
              Read Our Full Story <ArrowUpRight className="w-4 h-4 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
