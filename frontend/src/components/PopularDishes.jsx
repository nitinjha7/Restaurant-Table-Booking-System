import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Leaf, Flame, Wheat, Sparkles } from "lucide-react";

const menuCategories = [
  {
    id: "starters",
    label: "Starters",
    items: [
      {
        name: "Tandoori Stuffed Mushrooms",
        desc: "Button mushrooms stuffed with spiced cheese and spinach, char-grilled in a clay oven.",
        price: "₹425",
        tags: ["Chef's Special", "GF"],
        image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      },
      {
        name: "Crispy Lotus Stem",
        desc: "Thinly sliced lotus stems tossed in a honey chilli glaze with toasted sesame seeds.",
        price: "₹395",
        tags: ["Spicy", "Crispy"],
        image: "https://images.unsplash.com/photo-1606471191009-63994c53433b?q=80&w=800&auto=format&fit=crop"
      }
    ]
  },
  {
    id: "mains",
    label: "Main Course",
    items: [
      {
        name: "Paneer Lababdar",
        desc: "Cottage cheese cubes simmered in a rich, creamy tomato and cashew gravy with fenugreek.",
        price: "₹645",
        tags: ["Bestseller"],
        image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=800&auto=format&fit=crop"
      },
      {
        name: "Smoked Dal Frontier",
        desc: "Black lentils slow-cooked overnight on a tandoor, finished with white butter and cream.",
        price: "₹595",
        tags: ["Signature"],
        image: "https://media.istockphoto.com/id/1170374719/photo/dal-makhani-at-dark-background.jpg?s=2048x2048&w=is&k=20&c=vj91C4Ra1LbxWsIojvR2Z-RqdC_YgfHnvNWatEtTk4U="
      }
    ]
  },
  {
    id: "desserts",
    label: "Desserts",
    items: [
      {
        name: "Rose Petal Kheer",
        desc: "Traditional rice pudding infused with rose water and garnished with pistachios.",
        price: "₹295",
        tags: ["Classic"],
        image: "https://media.istockphoto.com/id/980089086/photo/rice-pudding-or-kheer-from-india-called-also-called-firnee-served-in-a-bowl-selective-focus.jpg?s=2048x2048&w=is&k=20&c=3hqiq2gnPlo7MfQmzhpKx8AtyPcAIkEWqL0okkkpAsY="
      },
      {
        name: "Saffron Rasmalai",
        desc: "Soft cottage cheese dumplings soaked in sweetened saffron milk.",
        price: "₹345",
        tags: ["Sweet"],
        image: "https://media.istockphoto.com/id/515853026/photo/traditional-rasmalai-or-ras-malai-indian-dessert-bengali-sweet.jpg?s=2048x2048&w=is&k=20&c=cdQaU3LCpYobMxQkTUSX9NfQvGuQSjpShO3D0x9oQYQ="
      }
    ]
  }
];

const PopularDishes = () => {
  const [activeTab, setActiveTab] = useState("mains");

  const activeCategory = menuCategories.find(c => c.id === activeTab);

  return (
    <section className="w-full bg-stone-50 py-24" id="popularDishes">
      <div className="w-[90%] max-w-6xl mx-auto">
        
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="flex items-center justify-center gap-2 text-orange-600 font-bold tracking-widest text-xs uppercase">
              <span className="w-8 h-[1px] bg-orange-600"></span>
              <span>Pure Vegetarian</span>
              <span className="w-8 h-[1px] bg-orange-600"></span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-serif font-bold text-gray-900">
              Curated for the Senses
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              We don't just cook; we craft experiences. Explore our seasonal vegetarian menu designed to bring people together.
            </p>
          </motion.div>
        </div>

        <div className="flex justify-center mb-16 overflow-x-auto">
          <div className="flex gap-2 p-1 bg-white border border-gray-200 rounded-full shadow-sm">
            {menuCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveTab(category.id)}
                className={`px-8 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeTab === category.id
                    ? "bg-gray-900 text-white shadow-md"
                    : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16"
          >
            {activeCategory.items.map((item, index) => (
              <div key={index} className="group cursor-default">
                <div className="relative h-64 lg:h-80 w-full overflow-hidden rounded-2xl mb-6">
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors z-10" />
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-gray-900 shadow-sm z-20 flex items-center gap-1">
                     <Flame className="w-3 h-3 text-orange-500" />
                     {item.tags[0]}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-baseline border-b border-dashed border-gray-300 pb-2">
                    <h3 className="text-2xl font-serif font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
                      {item.name}
                    </h3>
                    <span className="text-lg font-semibold text-gray-900">{item.price}</span>
                  </div>
                  
                  <p className="text-gray-500 leading-relaxed text-sm lg:text-base">
                    {item.desc}
                  </p>

                  <div className="flex gap-3 pt-2">
                     <div className="flex items-center gap-1 text-xs text-gray-400 bg-white border border-gray-200 px-2 py-1 rounded-md">
                        <Leaf className="w-3 h-3 text-green-600" /> Vegetarian
                     </div>
                     <div className="flex items-center gap-1 text-xs text-gray-400 bg-white border border-gray-200 px-2 py-1 rounded-md">
                        <Wheat className="w-3 h-3 text-yellow-600" /> Fresh
                     </div>
                     <div className="flex items-center gap-1 text-xs text-gray-400 bg-white border border-gray-200 px-2 py-1 rounded-md">
                        <Sparkles className="w-3 h-3 text-purple-600" /> Premium
                     </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        <div className="mt-20 text-center">
            <div className="inline-block p-6 border border-gray-200 rounded-xl bg-white shadow-sm">
                <p className="text-gray-900 font-serif text-lg">
                    "The Dal Frontier is simply unmatched. Authentic Indian flavors."
                </p>
                <p className="text-orange-600 font-bold text-sm mt-2">- Delhi Food Guide</p>
            </div>
        </div>

      </div>
    </section>
  );
};

export default PopularDishes;