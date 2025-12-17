const mongoose = require('mongoose');
require('dotenv').config();

// Your Atlas connection
const ATLAS_URI = process.env.MONGODB_URI;

// All your products data
const products = [
  {
    name: "iPhone 15 Pro Max",
    description: "Latest iPhone with A17 Pro chip, titanium design, 48MP camera",
    price: 1999,
    category: "Electronics",
    image: "https://images.macrumors.com/t/oiWkxB5isnYn8BFbcgKsnDIUOdI=/800x0/smart/article-new/2023/09/iPhone-15-Pro-Lineup-Feature.jpg?lossy",
    stock: 50
  },
  {
    name: "MacBook Air M2",
    description: "Super fast laptop with Apple M2 chip, 13.6\" display",
    price: 1199,
    category: "Electronics",
    image: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/mba13-skyblue-select-202503?wid=904&hei=840&fmt=jpeg&qlt=90&.v=M2RyY09CWXlTQUp1KzEveHR6VXNxcTQ1bzN1SitYTU83Mm9wbk1xa1lWNC9UNzNvY2N5NXJTTDQ2YkVYYmVXakJkRlpCNVhYU3AwTldRQldlSnpRa0lIV0Fmdk9rUlVsZ3hnNXZ3K3lEVlk",
    stock: 30
  },
  {
    name: "Nike Air Max 270",
    description: "Comfortable running shoes with air cushion technology",
    price: 150,
    category: "Fashion",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQT7oNZH4isH3NfkNT9KEjS0FcXU9B6QMVFXg&s",
    stock: 200
  },
  {
    name: "Coffee Maker",
    description: "Automatic espresso machine with milk frother",
    price: 199,
    category: "Home",
    image: "https://www.suranasons.in/cdn/shop/files/61x2BKrHBKL._SL1000.jpg?v=1736500986",
    stock: 60
  },
  {
    name: "Apple Watch Series 9",
    description: "Always-On Retina display, GPS + Cellular",
    price: 429,
    category: "Electronics",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHkzz0ooE7b_sc2a7z8Jc6wUUACiRBSkav6Q&s",
    stock: 150
  },
  {
    name: "DJI Mini 3 Pro Drone",
    description: "4K/60fps video, 48MP photos, 34-min flight time",
    price: 759,
    category: "Electronics",
    image: "https://everse.in/_next/image?url=https%3A%2F%2Fapi.everse.in%2Fstorage%2F72e455a735e8e360664b2e5b92086639%2FMini%203%20Pro%20Standard.jpg&w=1920&q=75",
    stock: 30
  },
  {
    name: "Sonos Beam Soundbar",
    description: "Compact smart soundbar with Dolby Atmos",
    price: 449,
    category: "Electronics",
    image: "https://media.sonos.com/images/znqtjj88/production/c79156fe93547d1b0a993dc1fb7b381d8773737a-3000x1834.png?q=75&fit=clip&auto=format",
    stock: 65
  },
  {
    name: "Vans Old Skool",
    description: "A pair of round-toe black sneakers, has lace-up detail. Leather and canvas upper. Cushioned footbed. Textured and patterned outsole",
    price: 200,
    category: "Fashion",
    image: "https://www.iconsofsurf.com/cdn/shop/files/oldskoolblack_1.jpg?v=1692974211",
    stock: 200
  },
  {
    name: "Levi's 501 Original Jeans",
    description: "Classic straight fit, 100% cotton denim",
    price: 89,
    category: "Fashion",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRzVQmm52lGKTuHtHbXNXdDPbkoO_K8UPcVA&s",
    stock: 300
  },
  {
    name: "Nike Tech Fleece Hoodie",
    description: "Lightweight, warm fleece with zip pockets",
    price: 120,
    category: "Fashion",
    image: "https://static.nike.com/a/images/t_web_pdp_936_v2/f_auto/3c86702a-1f2b-424d-8876-b353f4b50833/AS+M+NK+TCH+FLC+HOODIE.png",
    stock: 180
  },
  {
    name: "Rolex Submariner",
    description: "Luxury dive watch, waterproof to 300m",
    price: 9999,
    category: "Fashion",
    image: "https://media.rolex.com/image/upload/q_auto:eco/f_auto/c_limit,w_1920/v1/rolexcom/model-page/gallery/m124060-0001/m124060-0001_v01.jpg",
    stock: 10
  },
  {
    name: "Adidas Ultraboost 22",
    description: "Running shoes with Boost cushioning",
    price: 180,
    category: "Fashion",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAiu_GvkdJurNarnmzB_jDDjRrLPqn-4YNQQ&s",
    stock: 220
  },
  {
    name: "Ray-Ban Aviator Classic",
    description: "Gold frame with green lenses, polarized",
    price: 159,
    category: "Fashion",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzanoA4aNO9CyBpbOlFlwtGcZm-BTFhBYh9w&s",
    stock: 150
  },
  {
    name: "Gucci GG Marmont Bag",
    description: "Leather shoulder bag with GG logo",
    price: 2280,
    category: "Fashion",
    image: "https://media.gucci.com/style/DarkGray_Center_0_0_490x490/1517399105/447632_DTD1T_1000_001_067_0038_Light-gg-marmont-small-camera-bag.jpg",
    stock: 15
  },
  {
    name: "GoPro HERO12 Black",
    description: "5.3K video, HyperSmooth 6.0 stabilization",
    price: 399,
    category: "Electronics",
    image: "https://m.media-amazon.com/images/I/51PkbK8wBUL.jpg",
    stock: 85
  },
  {
    name: "Lululemon ABC Pants",
    description: "Anti-Ball Crushing technology, stretchy fabric",
    price: 128,
    category: "Fashion",
    image: "https://images.lululemon.com/is/image/lululemon/LM5AQ9S_045739_1",
    stock: 160
  },
  {
    name: "Patagonia Nano Puff Jacket",
    description: "Lightweight insulated jacket, water-resistant",
    price: 229,
    category: "Fashion",
    image: "https://www.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dwbdabaa49/images/hi-res/84218_SMDB.jpg?sw=768&sh=768&sfrm=png&q=95&bgcolor=f3f4ef",
    stock: 90
  },
  {
    name: "Converse Chuck Taylor All Star",
    description: "Classic canvas high-top sneakers",
    price: 65,
    category: "Fashion",
    image: "https://www.converse.in/media/catalog/product/m/9/m9160c_a_107x1.jpg",
    stock: 400
  },
  {
    name: "Canada Goose Expedition Parka",
    description: "Arctic-grade down insulation, coyote fur trim",
    price: 1495,
    category: "Fashion",
    image: "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1736523638-vader-prod-s3-amazonaws-67813f4ec0050.png?crop=1xw:1xh;center,top&resize=980:*",
    stock: 25
  },
  {
    name: "Michael Kors Women's Watch",
    description: "Rose gold tone, mother of pearl dial",
    price: 295,
    category: "Fashion",
    image: "https://www.kamalwatch.com/cdn/shop/products/634831-michaelkorsanalogrosedialwomenswatchmk5896i.jpg?v=1685450685",
    stock: 75
  },
  {
    name: "Prada Sunglasses",
    description: "Sporty design with polarized lenses",
    price: 350,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800",
    stock: 40
  },
  {
    name: "Hermès Silk Scarf",
    description: "90x90cm, 100% silk, classic print",
    price: 450,
    category: "Fashion",
    image: "https://assets.hermes.com/is/image/hermesproduct/jungle-love-forever-scarf-90--001876S%2029-worn-1-0-0-320-320_g.jpg",
    stock: 30
  },
  {
    name: "Yeezy Boost 350 V2",
    description: "Primeknit upper, Boost midsole",
    price: 220,
    category: "Fashion",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjFqdmZl-LIiSIq6Elecbyt7D1N8l-7wEKYw&s",
    stock: 50
  },
  {
    name: "Sony PlayStation 5",
    description: "Next-gen gaming console with 4K/120fps support",
    price: 499,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&w=800",
    stock: 40
  },
  {
    name: "Samsung Galaxy Tab S9",
    description: "11' Dynamic AMOLED 2X, S Pen included",
    price: 849,
    category: "Electronics",
    image: "https://m.media-amazon.com/images/I/71O5U+2PKWL._AC_UF1000,1000_QL80_.jpg",
    stock: 45
  },
  {
    name: "Bose QuietComfort 45",
    description: "World-class noise cancelling headphones",
    price: 329,
    category: "Electronics",
    image: "https://assets.bose.com/content/dam/cloudassets/Bose_DAM/Web/consumer_electronics/global/products/headphones/qc45/product_silo_images/QC45-LE_Right-Angle_1200x1022_Midnight-Blue_RGB.jpg/jcr:content/renditions/cq5dam.web.1920.1920.jpeg",
    stock: 100
  },
  {
    name: "Nintendo Switch OLED",
    description: "7' OLED screen, 64GB internal storage",
    price: 349,
    category: "Electronics",
    image: "https://gameloot.in/wp-content/uploads/2025/06/Nintendo-Switch-2-Console-256GB.jpg",
    stock: 55
  },
  {
    name: "Logitech MX Master 3S",
    description: "Wireless mouse with ultra-fast scrolling",
    price: 99,
    category: "Electronics",
    image: "https://m.media-amazon.com/images/I/61jFSvCTfpL.jpg",
    stock: 200
  },
  {
    name: "Amazon Echo Show 15",
    description: "15.6' smart display with Alexa, family organizer",
    price: 249,
    category: "Electronics",
    image: "https://i.guim.co.uk/img/media/da519d24ae481e0cbd3e6423bc6daa6f9a7d6c3e/669_470_6645_3987/master/6645.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=f217c9a02502696ec0d1b9566c671b59",
    stock: 120
  },
  {
    name: "Canon EOS R6 Mark II",
    description: "24.2MP full-frame mirrorless camera",
    price: 2499,
    category: "Electronics",
    image: "https://www.justcanon.in/cdn/shop/products/0040770_canon-eos-r6-mark-ii-mirrorless-camera-with-24-105mm-f4-l-is-usm-lens_500.jpg?v=1718110493",
    stock: 20
  },
  {
    name: "Razer BlackWidow V4 Pro",
    description: "Mechanical gaming keyboard with RGB",
    price: 229,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?auto=format&fit=crop&w=800",
    stock: 80
  },
  {
    name: "iPhone 15 Pro",
    description: "Latest iPhone with A17 Pro chip, titanium design, 48MP camera",
    price: 999,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800",
    stock: 50
  },
  {
    name: "Samsung 65' 4K Smart TV",
    description: "Crystal Processor 4K, HDR, Smart Hub with Netflix",
    price: 699,
    category: "Electronics",
    image: "https://images-cdn.ubuy.co.in/6375688b5645724ebf4393e7-samsung-50-class-tu690t-crystal-uhd-4k.jpg",
    stock: 25
  },
  {
    name: "Samsung Galaxy S24 Ultra",
    description: "6.8' Dynamic AMOLED 2X, 200MP camera, S Pen included",
    price: 1299,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800",
    stock: 75
  },
  {
    name: "Apple iPad Pro 12.9'",
    description: "M2 chip, Liquid Retina XDR display, 1TB storage",
    price: 1099,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800",
    stock: 60
  },
  {
    name: "Vitamix 5200 Blender",
    description: "Professional-grade blender, 64oz container",
    price: 449,
    category: "Home",
    image: "https://images.unsplash.com/photo-1562240020-ce31e7fd94ea?auto=format&fit=crop&w=800",
    stock: 70
  },
  {
    name: "Nespresso VertuoPlus",
    description: "Coffee and espresso maker, 5 cup sizes",
    price: 199,
    category: "Home",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800",
    stock: 120
  },
  {
    name: "Dyson V15 Detect Vacuum",
    description: "Cordless vacuum with laser dust detection",
    price: 749,
    category: "Home",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800",
    stock: 45
  },
  {
    name: "Le Creuset Dutch Oven",
    description: "5.5qt enameled cast iron, ocean color",
    price: 380,
    category: "Home",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800",
    stock: 55
  },
  {
    name: "Tiffany & Co. Heart Tag Bracelet",
    description: "Sterling silver with heart charm",
    price: 275,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800",
    stock: 60
  },
  {
    name: "Instant Pot Duo 7-in-1",
    description: "Pressure cooker, slow cooker, rice cooker",
    price: 99,
    category: "Home",
    image: "https://images.unsplash.com/photo-1562240020-ce31e7fd94ea?auto=format&fit=crop&w=800",
    stock: 200
  },
  {
    name: "Philips Hue Starter Kit",
    description: "4 smart bulbs + bridge, 16 million colors",
    price: 199,
    category: "Home",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800",
    stock: 85
  },
  {
    name: "KitchenAid Stand Mixer",
    description: "5-quart bowl lift, 10 speeds, imperial black",
    price: 449,
    category: "Home",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800",
    stock: 65
  },
  {
    name: "West Elm Sofa",
    description: "84' modern sofa, velvet fabric, mid-century",
    price: 1999,
    category: "Home",
    image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&w=800",
    stock: 15
  },
  {
    name: "Atomic Habits",
    description: "An Easy & Proven Way to Build Good Habits & Break Bad Ones",
    price: 27,
    category: "Books",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800",
    stock: 500
  },
  {
    name: "Breville Barista Express",
    description: "Espresso machine with built-in grinder",
    price: 699,
    category: "Home",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800",
    stock: 40
  },
  {
    name: "Moleskine Classic Notebook",
    description: "Hard cover, ruled pages, black, large",
    price: 19,
    category: "Books",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800",
    stock: 800
  },
  {
    name: "Kindle Paperwhite",
    description: "6.8' display, adjustable warm light, waterproof",
    price: 149,
    category: "Books",
    image: "https://images.unsplash.com/photo-1544716278-e513176f20b5?auto=format&fit=crop&w=800",
    stock: 150
  },
  {
    name: "Harry Potter Complete Set",
    description: "All 7 books, hardcover box set",
    price: 225,
    category: "Books",
    image: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&w=800",
    stock: 100
  },
  {
    name: "Montblanc Meisterstück Pen",
    description: "Black precious resin, gold-plated details",
    price: 975,
    category: "Books",
    image: "https://images.unsplash.com/photo-1583484963886-cfe2bff2945f?auto=format&fit=crop&w=800",
    stock: 25
  },
  {
    name: "Yoga Mat",
    description: "Non-slip eco-friendly yoga mat",
    price: 49,
    category: "Sports",
    image: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?auto=format&fit=crop&w=800",
    stock: 150
  },
  {
    name: "The North Face Backpack",
    description: "28L capacity, laptop sleeve, rain cover",
    price: 99,
    category: "Sports",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800",
    stock: 200
  },
  {
    name: "Yeti Tundra 45 Cooler",
    description: "Rotomolded construction, holds 26 cans",
    price: 349,
    category: "Sports",
    image: "https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=800",
    stock: 80
  },
  {
    name: "Wilson Pro Staff Tennis Racket",
    description: "Roger Federer signature, 97sq inch head",
    price: 249,
    category: "Sports",
    image: "https://images.unsplash.com/photo-1595435934247-5d33b7f92c70?auto=format&fit=crop&w=800",
    stock: 60
  },
  {
    name: "Lululemon The Mat",
    description: "5mm thick, natural rubber, antimicrobial",
    price: 88,
    category: "Sports",
    image: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?auto=format&fit=crop&w=800",
    stock: 150
  },
  {
    name: "Coleman Sundome Tent",
    description: "4-person, weatherproof, easy setup",
    price: 89,
    category: "Sports",
    image: "https://images.unsplash.com/photo-1504851149312-7a075b496cc7?auto=format&fit=crop&w=800",
    stock: 120
  },
  {
    name: "Fitbit Charge 6",
    description: "Fitness tracker with ECG, GPS, heart rate",
    price: 159,
    category: "Sports",
    image: "https://images.unsplash.com/photo-1576243345690-4e4b79b63288?auto=format&fit=crop&w=800",
    stock: 180
  },
  {
    name: "La Mer Moisturizing Cream",
    description: "Luxury face cream, 1.7oz jar",
    price: 385,
    category: "Beauty",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800",
    stock: 40
  },
  {
    name: "Apple AirPods Pro (2nd Gen)",
    description: "Active noise cancellation, adaptive audio",
    price: 249,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?auto=format&fit=crop&w=800",
    stock: 300
  },
  {
    name: "Hydro Flask 32oz Water Bottle",
    description: "Double-wall vacuum insulation, wide mouth",
    price: 49,
    category: "Sports",
    image: "https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=800",
    stock: 300
  },
  {
    name: "Sony WH-1000XM5",
    description: "Industry-leading noise cancellation headphones",
    price: 399,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800",
    stock: 80
  },
  {
    name: "Oral-B iO Series 9",
    description: "Electric toothbrush with AI recognition",
    price: 299,
    category: "Beauty",
    image: "https://images.unsplash.com/photo-162179148a5b8-8f0a5c6c8b5e?auto=format&fit=crop&w=800",
    stock: 120
  },
  {
    name: "Casper Memory Foam Pillow",
    description: "Cooling gel layer, adjustable loft",
    price: 85,
    category: "Home",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800",
    stock: 300
  },
  {
    name: "Nike LeBron 21",
    description: "Basketball shoes with Zoom Air cushioning",
    price: 200,
    category: "Sports",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800",
    stock: 90
  },
  {
    name: "Chanel No. 5 Eau de Parfum",
    description: "Classic floral fragrance, 3.4oz",
    price: 165,
    category: "Beauty",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800",
    stock: 85
  },
  {
    name: "Wireless Mouse",
    description: "Ergonomic wireless mouse with silent click",
    price: 29,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=800",
    stock: 300
  },
  {
    name: "Patagonia Black Hole Duffel 55L",
    description: "Weather-resistant, multiple carry options",
    price: 149,
    category: "Sports",
    image: "https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=800",
    stock: 110
  },
  {
    name: "Foreo Luna 3",
    description: "Facial cleansing brush, silicone bristles",
    price: 199,
    category: "Beauty",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800",
    stock: 95
  },
  {
    name: "Desk Lamp",
    description: "LED desk lamp with adjustable brightness",
    price: 45,
    category: "Home",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800",
    stock: 90
  },
  {
    name: "Garmin Forerunner 265",
    description: "GPS running watch with training metrics",
    price: 449,
    category: "Sports",
    image: "https://images.unsplash.com/photo-1576243345690-4e4b79b63288?auto=format&fit=crop&w=800",
    stock: 75
  },
  {
    name: "Dyson Airwrap Styler",
    description: "Hair styling tool with multiple attachments",
    price: 599,
    category: "Beauty",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800",
    stock: 50
  },
  {
    name: "Bluetooth Speaker",
    description: "Portable waterproof Bluetooth speaker",
    price: 89,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800",
    stock: 70
  }
];

async function importAllProducts() {
  try {
    console.log('📦 Importing all products to Atlas...');
    
    // Connect to Atlas
    await mongoose.connect(ATLAS_URI);
    console.log('✅ Connected to Atlas');
    
    // Import Product model
    const Product = require('./models/Product');
    
    // Clear existing products
    await Product.deleteMany({});
    console.log('🗑️ Cleared existing products');
    
    // Insert all products
    const insertedProducts = await Product.insertMany(products);
    console.log(`✅ Imported ${insertedProducts.length} products`);
    
    // Group by category for summary
    const categories = {};
    insertedProducts.forEach(product => {
      if (!categories[product.category]) {
        categories[product.category] = 0;
      }
      categories[product.category]++;
    });
    
    console.log('\n🎉 All products imported successfully!');
    console.log('\n📊 Products by Category:');
    Object.entries(categories).forEach(([category, count]) => {
      console.log(`   ${category}: ${count} products`);
    });
    
    console.log(`\n📋 Total Products: ${insertedProducts.length}`);
    
    await mongoose.disconnect();
    
  } catch (error) {
    console.error('❌ Import failed:', error.message);
    process.exit(1);
  }
}

importAllProducts();