import { MenuItem, Testimonial, Offer, CloudSuite } from './types';

export const MENU_ITEMS: MenuItem[] = [
  // Indian Cuisine
  {
    id: 'i1',
    name: 'Paneer Tikka Cloud Haze',
    description: 'Fresh artisanal cottage cheese cubes marinated in cloud-aerated stoneground tandoori masala and natural yogurt, char-grilled with rolling rosewood smoke.',
    price: 380,
    category: 'Indian',
    image: 'https://images.unsplash.com/photo-1567184109411-47a757ee29d4?q=80&w=600&auto=format&fit=crop',
    rating: 4.88,
    tags: ['Veg', 'Starter', 'Tandoor Smoked', 'Spicy'],
    calories: 320,
    prepTime: '12-15 min'
  },
  {
    id: 'i2',
    name: 'Aslam Butter Chicken Tikka',
    description: 'Smoked, boneless succulent claypot chicken bites drenched in an exquisite stream of rich butter gravy, fresh cream, and secret aromatic spices.',
    price: 480,
    category: 'Indian',
    image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=600&auto=format&fit=crop',
    rating: 4.92,
    tags: ['Non-Veg', 'Starter', 'Smoked Glaze', 'Chef Special'],
    calories: 490,
    prepTime: '15 min',
    isSpecial: true
  },
  {
    id: 'i3',
    name: 'Shahi Paneer Kofta Orbit',
    description: 'Royal cottage cheese dumplings stuffed with pistachio-saffron centers, gently simmered in a velvet cascade of rich tomato, cashew, and melon seed cream.',
    price: 520,
    category: 'Indian',
    image: 'https://images.unsplash.com/photo-1601050690597-df056fb4ce78?q=80&w=600&auto=format&fit=crop',
    rating: 4.85,
    tags: ['Veg', 'Main Course', 'Royal Saffron'],
    calories: 510,
    prepTime: '18 min'
  },
  {
    id: 'i4',
    name: 'Aether 36h Dal Makhani',
    description: 'Premium baby black lentils slow-cooked over wood ash for 36 hours, finished with churned white butter, organic cream, and dynamic mist smoke.',
    price: 420,
    category: 'Indian',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=600&auto=format&fit=crop',
    rating: 4.96,
    tags: ['Veg', 'Main Course', 'Best Seller', '36h Slow Cook'],
    calories: 440,
    prepTime: '10 min',
    isSpecial: true,
    discountPrice: 380
  },
  {
    id: 'i5',
    name: 'Ethereal Mutton Rogan Josh',
    description: 'Tender Himalayan lamb cooked slow-simmered in a vibrant crimson saffron-infused broth with a complex blend of Kashmiri mild chilis and flower extracts.',
    price: 690,
    category: 'Indian',
    image: 'https://images.unsplash.com/photo-1545247181-516773cae76d?q=80&w=600&auto=format&fit=crop',
    rating: 4.9,
    tags: ['Non-Veg', 'Main Course', 'Kashmiri Spice', 'Traditional'],
    calories: 680,
    prepTime: '22 min'
  },
  {
    id: 'i6',
    name: 'Grand Cloud Butter Chicken',
    description: 'Tender tandoor-roasted chicken shredded and tossed in a velvety, creamy butter tomato sauce sweetened with fresh forest dark honey.',
    price: 580,
    category: 'Indian',
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=600&auto=format&fit=crop',
    rating: 4.95,
    tags: ['Non-Veg', 'Main Course', 'Butter Gravy', 'Popular'],
    calories: 620,
    prepTime: '15 min'
  },

  // Chinese Cuisine
  {
    id: 'c1',
    name: 'Atmospheric Dim Sum Basket',
    description: 'Translucent steamed crystal dumplings packed with mineral-rich shiitake mountain mushrooms, water chestnut, and raw black truffle paste.',
    price: 350,
    category: 'Chinese',
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=600&auto=format&fit=crop',
    rating: 4.8,
    tags: ['Veg', 'Starter', 'Truffle Blend', 'Handmade'],
    calories: 210,
    prepTime: '10-12 min'
  },
  {
    id: 'c2',
    name: 'Szechuan Chili Crispy Lamb',
    description: 'Shredded grass-fed lamb fried crisp, tossed with toasted sesame, wok-charred dry peppers, and a high-heat tongue-numbing Szechuan oil glaze.',
    price: 465,
    category: 'Chinese',
    image: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?q=80&w=600&auto=format&fit=crop',
    rating: 4.87,
    tags: ['Non-Veg', 'Starter', 'Spicy Crisp', 'Peppercorn Flavour'],
    calories: 450,
    prepTime: '12 min'
  },
  {
    id: 'c3',
    name: 'Zen Mapo Golden Tofu',
    description: 'Silken, organic tofu cubes simmered with fresh bamboo shoot bits, spring scallion, and fermented broad bean chili broth, served bubbling hot.',
    price: 390,
    category: 'Chinese',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=600&auto=format&fit=crop',
    rating: 4.75,
    tags: ['Veg', 'Main Course', 'Claypot Style', 'Comfort Food'],
    calories: 310,
    prepTime: '14 min'
  },
  {
    id: 'c4',
    name: 'Nebula Kung Pao Chicken',
    description: 'Stir-fried breast pieces with tender lotus root cubes, glazed in garlic sweet-soy, scattered with crunchy tandoori cashews and charred dry chilies.',
    price: 490,
    category: 'Chinese',
    image: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?q=80&w=600&auto=format&fit=crop',
    rating: 4.83,
    tags: ['Non-Veg', 'Main Course', 'Cashews & Chili'],
    calories: 520,
    prepTime: '15 min'
  },

  // Italian Cuisine
  {
    id: 'it1',
    name: 'Truffle Mushroom Arancini',
    description: 'Crisp-fried premium arborio rice spheres laced with wild porcini mushrooms and a heart of melt-in-mouth fresh mozzarella cheese, served with safe organic garlic aioli.',
    price: 360,
    category: 'Italian',
    image: 'https://images.unsplash.com/photo-1541532713592-79a0317b6b77?q=80&w=600&auto=format&fit=crop',
    rating: 4.84,
    tags: ['Veg', 'Starter', 'Forest Mushroom', 'Cheese Core'],
    calories: 340,
    prepTime: '12 min'
  },
  {
    id: 'it2',
    name: 'Dynamic Parma Ham Bruschetta',
    description: 'Tuscan wood-fired garlic sourdough planks, layered with light whipped ricotta cream, 24-month aged Parma meat, and wild honey forest drizzles.',
    price: 450,
    category: 'Italian',
    image: 'https://images.unsplash.com/photo-1572656631137-7935297eff55?q=80&w=600&auto=format&fit=crop',
    rating: 4.86,
    tags: ['Non-Veg', 'Starter', 'Aged Parma', 'Gourmet Cold-Cut'],
    calories: 320,
    prepTime: '10 min'
  },
  {
    id: 'it3',
    name: 'Pesto Cloud Gnocchi',
    description: 'Floating potato pasta pillows tossed gently in a creamy emulsion of high-mountain pine-nut basil pesto, layered with a baby burrata cheese orb.',
    price: 520,
    category: 'Italian',
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=600&auto=format&fit=crop',
    rating: 4.91,
    tags: ['Veg', 'Main Course', 'Creamy Pesto', 'Signature Dinner'],
    isSpecial: true,
    discountPrice: 470,
    calories: 480,
    prepTime: '15 min'
  },
  {
    id: 'it4',
    name: 'Aether Carbonara Classica',
    description: 'Locally hand-spun spaghetti pulled hot through fresh organic egg yolk sauce, crispy direct dry-cured pork cheeks, and a massive shower of Pecorino Romano.',
    price: 620,
    category: 'Italian',
    image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?q=80&w=600&auto=format&fit=crop',
    rating: 4.94,
    tags: ['Non-Veg', 'Main Course', 'Handmade Pasta', 'Traditional Roman'],
    calories: 710,
    prepTime: '16 min'
  },

  // Burgers
  {
    id: 'b1',
    name: 'Nimbus Wagyu Truffle Burger',
    description: 'Double custom-ground Wagyu beef patty cooked to a juicy medium, layered with melted black truffle cheddar, crispy golden onion rings, and a dollop of white-truffle aioli, served in a cloud-soft brioche bun.',
    price: 850,
    category: 'Burgers',
    image: '/src/assets/images/dreamy_cloud_burger_1781081427320.png',
    rating: 4.9,
    tags: ['Chef Special', 'A5 Wagyu', 'Best Seller', 'Non-Veg', 'Main Course'],
    calories: 780,
    prepTime: '15-20 min',
    isSpecial: true,
    discountPrice: 750
  },
  {
    id: 'b2',
    name: 'Golden Sunrise Halloumi Burger',
    description: 'Thick grilled Cypriot halloumi glazed with hot chili honey, charred organic heirloom tomato slices, fresh crisp microgreens, and dynamic citrus-infused avocado smash, loaded in high-rise cloud bun.',
    price: 680,
    category: 'Burgers',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=600&auto=format&fit=crop',
    rating: 4.7,
    tags: ['Vegetarian', 'Chili Honey', 'Veg', 'Main Course'],
    calories: 550,
    prepTime: '12 min'
  },
  
  // Pizza
  {
    id: 'p1',
    name: 'Truffle & Burrata Cloud Pizza',
    description: 'Sourdough crust fermented with wild natural yeasts for 72 hours, baked at 900 degrees to produce a bubbly cloud-like crust, topped with velvet burrata hearts, fresh summer truffle slices, wild chanterelle mushrooms, and drizzles of luxury white-truffle hot oil.',
    price: 1250,
    category: 'Pizza',
    image: '/src/assets/images/cloud_gourmet_pizza_1781081443601.png',
    rating: 4.95,
    tags: ['Award Winning', '72h Fermentation', 'Veg', 'Main Course'],
    calories: 890,
    prepTime: '18-22 min',
    isSpecial: true,
    discountPrice: 1100
  },
  {
    id: 'p2',
    name: 'Pistachio Honey Fromage Pizza',
    description: 'Artisanal cloud crust topped with soft-ripened goat cheese, creamy fontina, fresh mozzarella, chopped Sicilian pistachios, and a majestic drizzle of raw orange-blossom honey.',
    price: 950,
    category: 'Pizza',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=600&auto=format&fit=crop',
    rating: 4.8,
    tags: ['Locally Sourced', 'Sweet & Savory', 'Veg', 'Main Course'],
    calories: 820,
    prepTime: '15 min'
  },

  // Asian Cuisine
  {
    id: 'a1',
    name: 'Twilight Dragon Sushi Platter',
    description: 'Curated box of gourmet premium sushi: crispy tempura shrimp and spicy blue-fin tuna inside, crowned with caramelized premium freshwater eel, creamy avocado fan, edible 24k gold leaf flakes, and a mysterious sweet soy glaze.',
    price: 1650,
    category: 'Asian Cuisine',
    image: '/src/assets/images/cloud_gourmet_asian_1781081490239.png',
    rating: 4.9,
    tags: ['24k Edible Gold', 'Premium Seafood', 'Non-Veg', 'Main Course'],
    calories: 610,
    prepTime: '20-25 min'
  },
  {
    id: 'a2',
    name: 'Sacred Smoke Szechuan Ramen',
    description: 'Silky rich 24-hour slow-cooked pork bone tonkotsu broth spiced with roasted fiery Szechuan peppercorns, handmade wave noodles, tender melt-in-your-mouth Kurobuta pork chashu, dynamic soft-boiled tea egg, and bamboo shoots.',
    price: 850,
    category: 'Asian Cuisine',
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?q=80&w=600&auto=format&fit=crop',
    rating: 4.85,
    tags: ['Best Seller', 'Spicy', 'Comfort Food', 'Non-Veg', 'Main Course'],
    calories: 910,
    prepTime: '16 min'
  },

  // Desserts
  {
    id: 'd1',
    name: 'Deconstructed Lavender Berry Mousse',
    description: 'Organic lavender-hinted Valrhona white chocolate mousse, served with a vibrant reduction of forest wildberries, delicate meringue clouds, crystal sugar shards, and a buttery shortbread crust crumble base.',
    price: 550,
    category: 'Desserts',
    image: '/src/assets/images/cloud_berry_mousse_1781081457983.png',
    rating: 4.98,
    tags: ['Organic Lavender', 'Signature Dessert', 'Veg', 'Dessert'],
    calories: 420,
    prepTime: '10 min',
    isSpecial: true,
    discountPrice: 480
  },
  {
    id: 'd2',
    name: 'Salted Caramel Halo Crepe Flambé',
    description: 'Thin delicate hand-spun french crepes stuffed with Tahitian vanilla pastry cream, flambéed tableside with high-end Cognac, then lavishly drenched in house-crafted salted amber caramel.',
    price: 480,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1528975604071-b4dc52a2d18c?q=80&w=600&auto=format&fit=crop',
    rating: 4.75,
    tags: ['Flambé', 'Decadent', 'Veg', 'Dessert'],
    calories: 480,
    prepTime: '10 min'
  },

  // Beverages
  {
    id: 'v1',
    name: 'Sparkling Lavender Mist Cocktail',
    description: 'Refreshing sparkling blend of premium botanical-infused ginned draft (or premium spirit-free seedlip craft cordial), fresh-muddled organic blueberries, squeezed Meyer lemon, standard tonic water, infused with a sprig of fresh French rosemary.',
    price: 420,
    category: 'Beverages',
    image: '/src/assets/images/dreamy_lavender_drink_1781081474509.png',
    rating: 4.92,
    tags: ['Refreshment', 'Mocktail Available', 'Veg', 'Beverage'],
    calories: 140,
    prepTime: '5 min'
  },
  {
    id: 'v2',
    name: 'Golden Hour Citrus Elixir',
    description: 'Symphony of cold-pressed Sicilian mandarin oranges, sun-kissed grapefruit juice, ginger-root nectar, and a touch of organic yellow turmeric root, topped with bubbly mineral spring water and rosemary oil vapor smoke mist.',
    price: 320,
    category: 'Beverages',
    image: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?q=80&w=600&auto=format&fit=crop',
    rating: 4.8,
    tags: ['Cold Pressed', 'Antioxidant Rich', 'Veg', 'Beverage'],
    calories: 90,
    prepTime: '5 min'
  }
];

export const SPECIAL_OFFERS: Offer[] = [
  {
    id: 'off1',
    code: 'CLOUD9',
    title: 'The Sky High Indulgence Combo',
    description: 'Elevate your senses! Order any 2 premium Burgers or Pizzas and receive a complimentary Sparkling Lavender Mist drink + Deconstructed Mousse.',
    discount: 25,
    badge: 'Limited-Time Combo',
    bannerBg: 'bg-gradient-to-r from-sky-400 via-pink-100 to-indigo-100 dark:from-slate-800 dark:via-purple-950 dark:to-slate-900'
  },
  {
    id: 'off2',
    code: 'DREAMY15',
    title: 'First Flight Discount',
    description: 'Embark on your gourmet dream journey. Unlock a 15% discount across our entire artisan cloud-concept menu on your very first order.',
    discount: 15,
    badge: 'Welcome Special',
    bannerBg: 'bg-gradient-to-r from-amber-100 via-sky-100 to-violet-100 dark:from-slate-900 dark:via-cyan-950 dark:to-slate-800'
  },
  {
    id: 'off3',
    code: 'NEPTUNE',
    title: 'Midweek Cloud Feast',
    description: 'Order between 2 PM and 5 PM on weekdays to enjoy 20% off all artisanal wood-fired Pizzas and custom hand-rolled Sushi.',
    discount: 20,
    badge: 'Weekday Happy Hour',
    bannerBg: 'bg-gradient-to-r from-purple-100 via-indigo-100 to-sky-100 dark:from-zinc-900 dark:via-slate-900 dark:to-purple-950'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Julianne Vane',
    role: 'Michelin Culinary critic, Paris',
    review: 'Cloud Kitchen is an outstanding revelation of modern dining. The Truffle & Burrata Cloud Pizza tasted exactly as if we took a bite out of a warm, wood-fired Mediterranean cloud. The packaging was beautifully vacuum-sealed, arriving incredibly hot and fresh!',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
    dishReviewed: 'Truffle & Burrata Cloud Pizza'
  },
  {
    id: 't2',
    name: 'Alexander Sterling',
    role: 'Food Tech Specialist & Connoisseur',
    review: 'The Wagyu Truffle Burger has the cloud-soft bun textured precisely to retain its shape. Simply legendary. Combined with their real-time order progression simulator, it changes how gourmet delivery should feel.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
    dishReviewed: 'Nimbus Wagyu Truffle Burger'
  },
  {
    id: 't3',
    name: 'Serena Vance',
    role: 'Lifestyle Writer & Host',
    review: 'The deconstructed lavender dessert looked like a modern work of art when unboxed. Perfect pastel delivery boxes, enchanting aroma, and the glass sugar shards made me feel like I was dining in a stellar sky lounge.',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
    dishReviewed: 'Deconstructed Lavender Berry Mousse'
  }
];

export const CLOUD_SUITES: CloudSuite[] = [
  {
    id: 'cs1',
    name: 'Sunrise Cumulus Lounge',
    description: 'Bask in soft crimson rays! This physical dine-in immersive private dynamic room mimics real sunrises, styled with floating velvet clouds and high-altitude aesthetic screens.',
    altitude: '2,500 ft visual ambience',
    vibe: 'Warm, Uplifting & Golden-rimmed',
    capacity: '2 - 4 Guests'
  },
  {
    id: 'cs2',
    name: 'Golden Hour Cirrus Suite',
    description: 'Perfect for romantic dinners. Features a ceiling of sparkling warm gold fiber-optics, micro-mist aroma diffusers, and luxury floating loungers that mimic dining in the sky.',
    altitude: '5,000 ft visual ambience',
    vibe: 'Amber, Serene & Dreamy',
    capacity: '2 Guests'
  },
  {
    id: 'cs3',
    name: 'Midnight Nebula Terrace',
    description: 'Our most luxurious and cinematic experience. Surrounded by projected soft twilight mist, glowing neon violet star clusters, and customizable ambient cosmic soundscapes.',
    altitude: '8,000 ft visual ambience',
    vibe: 'Cosmic, High-Contrast & Luxurious',
    capacity: '2 - 8 Guests'
  }
];

export const GALLERY_ITEMS = [
  {
    id: 'g1',
    title: 'Dough rising in atmospheric humidity chambers',
    category: 'Behind the Scenes',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: 'g2',
    title: 'Handshaking direct cocktails with rosemary mist',
    category: 'Our Baristas',
    image: '/src/assets/images/dreamy_lavender_drink_1781081474509.png'
  },
  {
    id: 'g3',
    title: 'The perfect sear on our dry-aged Japanese Wagyu',
    category: 'Chef Masterclass',
    image: '/src/assets/images/dreamy_cloud_burger_1781081427320.png'
  },
  {
    id: 'g4',
    title: 'Delicate edible lavender details on pastry cream',
    category: 'Dessert Art',
    image: '/src/assets/images/cloud_berry_mousse_1781081457983.png'
  },
  {
    id: 'g5',
    title: 'Handcrafted fermentation of signature pizza base',
    category: 'Artisanal Bakery',
    image: '/src/assets/images/cloud_gourmet_pizza_1781081443601.png'
  },
  {
    id: 'g6',
    title: 'Premium plating of gold-infused sushi roll cuts',
    category: 'Asian Excellence',
    image: '/src/assets/images/cloud_gourmet_asian_1781081490239.png'
  }
];
