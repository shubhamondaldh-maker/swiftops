// SwiftOps Realistic Mock Data
// Products and Orders for Ecommerce Operations

export const initialProducts = [
  {
    id: "PROD-101",
    name: "Cyberdeck Mechanical Keyboard (RGB)",
    category: "Gaming",
    price: 189.99,
    stock: 24,
    sku: "KB-RGB-01",
    rating: 4.9,
    description: "Hot-swappable tactile switches with custom jet black casing and chartreuse keycaps."
  },
  {
    id: "PROD-102",
    name: "Aura Noise-Cancelling Headphones",
    category: "Audio",
    price: 249.50,
    stock: 6, // Low stock (< 10)
    sku: "AUD-ANC-02",
    rating: 4.8,
    description: "40mm beryllium drivers with hybrid active noise cancellation and 35hr battery."
  },
  {
    id: "PROD-103",
    name: "Neo-Tokyo Oversized Cyber Hoodie",
    category: "Apparel",
    price: 95.00,
    stock: 4, // Low stock (< 10)
    sku: "APP-HD-03",
    rating: 4.7,
    description: "Heavyweight 450GSM cotton with reflective hot pink graphics and waterproof pocket."
  },
  {
    id: "PROD-104",
    name: "Hyperion OLED Ultra-Wide Monitor 34\"",
    category: "Electronics",
    price: 849.00,
    stock: 18,
    sku: "DSP-34-OLED",
    rating: 4.9,
    description: "240Hz refresh rate, 0.03ms response time, quantum dot HDR1000 display."
  },
  {
    id: "PROD-105",
    name: "VoltSpeed 100W GaN Fast Charger",
    category: "Accessories",
    price: 49.99,
    stock: 58,
    sku: "ACC-CHG-100",
    rating: 4.6,
    description: "Ultra-compact dual USB-C and USB-A smart PD charger with LED telemetry."
  },
  {
    id: "PROD-106",
    name: "Pulse Gaming Mouse (Ultralight 52g)",
    category: "Gaming",
    price: 79.99,
    stock: 3, // Low stock (< 10)
    sku: "MSE-PLS-52",
    rating: 4.7,
    description: "PAW3395 sensor, 26,000 DPI, optical microswitches with zero debounce delay."
  },
  {
    id: "PROD-107",
    name: "Matte Black Thermal EDC Water Bottle",
    category: "Accessories",
    price: 38.00,
    stock: 42,
    sku: "ACC-BTL-750",
    rating: 4.5,
    description: "750ml vacuum insulated stainless steel with chartreuse paracord loop."
  },
  {
    id: "PROD-108",
    name: "Phantom Desk Mat (900x400mm)",
    category: "Gaming",
    price: 34.99,
    stock: 8, // Low stock (< 10)
    sku: "ACC-MAT-900",
    rating: 4.8,
    description: "Micro-woven cloth surface with stitched anti-fray borders in electric yellow."
  },
  {
    id: "PROD-109",
    name: "Strata Ergonomic Mesh Task Chair",
    category: "Furniture",
    price: 420.00,
    stock: 12,
    sku: "FUR-STR-01",
    rating: 4.8,
    description: "Dynamic lumbar support with 4D armrests and breathable elastomeric mesh."
  },
  {
    id: "PROD-110",
    name: "Neon Glow Coiled Aviator Cable (Pink)",
    category: "Accessories",
    price: 29.99,
    stock: 2, // Low stock (< 10)
    sku: "CAB-AV-PNK",
    rating: 4.6,
    description: "Double-sleeved PET mesh with GX16 5-pin detachable aviator connector."
  },
  {
    id: "PROD-111",
    name: "Quantum Soundbar w/ Subwoofer",
    category: "Audio",
    price: 299.00,
    stock: 15,
    sku: "AUD-SND-111",
    rating: 4.7,
    description: "Dolby Atmos 3.1.2 channel soundbar with wireless down-firing subwoofer."
  },
  {
    id: "PROD-112",
    name: "Titanium Carabiner Keychain Tool",
    category: "Accessories",
    price: 24.50,
    stock: 65,
    sku: "ACC-CRB-TI",
    rating: 4.4,
    description: "Grade 5 titanium bottle opener, pry bar, and hex wrench multi-tool."
  }
];

export const initialOrders = [
  {
    id: "ORD-9401",
    customer: {
      name: "Tania Mukherjee",
      email: "tania.m@example.com",
      phone: "+91 98301 22345"
    },
    date: "2026-10-23",
    status: "pending",
    paymentMethod: "UPI / Google Pay",
    shippingAddress: {
      street: "Flat 4B, Silver Oak Heights",
      city: "Kolkata",
      state: "West Bengal",
      postalCode: "700029",
      country: "India"
    },
    items: [
      { productId: "PROD-101", name: "Cyberdeck Mechanical Keyboard (RGB)", price: 189.99, quantity: 1 },
      { productId: "PROD-108", name: "Phantom Desk Mat (900x400mm)", price: 34.99, quantity: 1 }
    ],
    total: 224.98
  },
  {
    id: "ORD-9402",
    customer: {
      name: "Rohan Verma",
      email: "rohan.v@techcorp.io",
      phone: "+91 98210 54321"
    },
    date: "2026-10-23",
    status: "shipped",
    paymentMethod: "Credit Card (Mastercard •••• 8821)",
    shippingAddress: {
      street: "Plot 12, Indiranagar 100ft Rd",
      city: "Bengaluru",
      state: "Karnataka",
      postalCode: "560038",
      country: "India"
    },
    items: [
      { productId: "PROD-104", name: "Hyperion OLED Ultra-Wide Monitor 34\"", price: 849.00, quantity: 1 },
      { productId: "PROD-105", name: "VoltSpeed 100W GaN Fast Charger", price: 49.99, quantity: 2 }
    ],
    total: 948.98
  },
  {
    id: "ORD-9403",
    customer: {
      name: "Aanya Sen",
      email: "aanya.sen@gmail.com",
      phone: "+91 97480 91823"
    },
    date: "2026-10-22",
    status: "delivered",
    paymentMethod: "Apple Pay",
    shippingAddress: {
      street: "24 Park Circus Avenue",
      city: "Kolkata",
      state: "West Bengal",
      postalCode: "700017",
      country: "India"
    },
    items: [
      { productId: "PROD-103", name: "Neo-Tokyo Oversized Cyber Hoodie", price: 95.00, quantity: 1 },
      { productId: "PROD-110", name: "Neon Glow Coiled Aviator Cable (Pink)", price: 29.99, quantity: 1 }
    ],
    total: 124.99
  },
  {
    id: "ORD-9404",
    customer: {
      name: "Marcus Vance",
      email: "mvance@cybernet.com",
      phone: "+1 (415) 892-0192"
    },
    date: "2026-10-22",
    status: "pending",
    paymentMethod: "Credit Card (Visa •••• 4242)",
    shippingAddress: {
      street: "742 Mission St, Apt 18",
      city: "San Francisco",
      state: "CA",
      postalCode: "94103",
      country: "United States"
    },
    items: [
      { productId: "PROD-102", name: "Aura Noise-Cancelling Headphones", price: 249.50, quantity: 1 }
    ],
    total: 249.50
  },
  {
    id: "ORD-9405",
    customer: {
      name: "Priyanka Roy",
      email: "priyanka.roy@designlab.co",
      phone: "+91 99031 44556"
    },
    date: "2026-10-21",
    status: "delivered",
    paymentMethod: "Net Banking (HDFC)",
    shippingAddress: {
      street: "Tower 2, Urbana Complex",
      city: "Kolkata",
      state: "West Bengal",
      postalCode: "700107",
      country: "India"
    },
    items: [
      { productId: "PROD-109", name: "Strata Ergonomic Mesh Task Chair", price: 420.00, quantity: 1 }
    ],
    total: 420.00
  },
  {
    id: "ORD-9406",
    customer: {
      name: "Liam O'Connor",
      email: "liam.oc@dublintech.ie",
      phone: "+353 87 234 5678"
    },
    date: "2026-10-21",
    status: "cancelled",
    paymentMethod: "PayPal",
    shippingAddress: {
      street: "14 Grafton Green",
      city: "Dublin",
      state: "Leinster",
      postalCode: "D02 XY45",
      country: "Ireland"
    },
    items: [
      { productId: "PROD-106", name: "Pulse Gaming Mouse (Ultralight 52g)", price: 79.99, quantity: 1 }
    ],
    total: 79.99
  },
  {
    id: "ORD-9407",
    customer: {
      name: "Debashis Banerjee",
      email: "debashis.b@cloudwave.in",
      phone: "+91 98311 77665"
    },
    date: "2026-10-20",
    status: "delivered",
    paymentMethod: "UPI / PhonePe",
    shippingAddress: {
      street: "Sector 5, Salt Lake City",
      city: "Kolkata",
      state: "West Bengal",
      postalCode: "700091",
      country: "India"
    },
    items: [
      { productId: "PROD-111", name: "Quantum Soundbar w/ Subwoofer", price: 299.00, quantity: 1 },
      { productId: "PROD-107", name: "Matte Black Thermal EDC Water Bottle", price: 38.00, quantity: 2 }
    ],
    total: 375.00
  },
  {
    id: "ORD-9408",
    customer: {
      name: "Sophia Chen",
      email: "sophia.chen@pacific.org",
      phone: "+1 (206) 555-0149"
    },
    date: "2026-10-20",
    status: "shipped",
    paymentMethod: "Apple Pay",
    shippingAddress: {
      street: "1208 Pine Street",
      city: "Seattle",
      state: "WA",
      postalCode: "98101",
      country: "United States"
    },
    items: [
      { productId: "PROD-101", name: "Cyberdeck Mechanical Keyboard (RGB)", price: 189.99, quantity: 1 },
      { productId: "PROD-106", name: "Pulse Gaming Mouse (Ultralight 52g)", price: 79.99, quantity: 1 }
    ],
    total: 269.98
  },
  {
    id: "ORD-9409",
    customer: {
      name: "Arjun Chakraborty",
      email: "arjun.c@kolkata.net",
      phone: "+91 98360 11223"
    },
    date: "2026-10-19",
    status: "pending",
    paymentMethod: "Cash on Delivery",
    shippingAddress: {
      street: "55 Ballygunge Circular Rd",
      city: "Kolkata",
      state: "West Bengal",
      postalCode: "700019",
      country: "India"
    },
    items: [
      { productId: "PROD-103", name: "Neo-Tokyo Oversized Cyber Hoodie", price: 95.00, quantity: 2 }
    ],
    total: 190.00
  },
  {
    id: "ORD-9410",
    customer: {
      name: "Elena Rostova",
      email: "elena.r@berlin-design.de",
      phone: "+49 30 8923411"
    },
    date: "2026-10-18",
    status: "delivered",
    paymentMethod: "Credit Card (Visa •••• 1093)",
    shippingAddress: {
      street: "Torstraße 44",
      city: "Berlin",
      state: "Berlin",
      postalCode: "10119",
      country: "Germany"
    },
    items: [
      { productId: "PROD-104", name: "Hyperion OLED Ultra-Wide Monitor 34\"", price: 849.00, quantity: 1 },
      { productId: "PROD-109", name: "Strata Ergonomic Mesh Task Chair", price: 420.00, quantity: 1 }
    ],
    total: 1269.00
  },
  {
    id: "ORD-9411",
    customer: {
      name: "Vikram Malhotra",
      email: "v.malhotra@mumbai.co",
      phone: "+91 98200 99887"
    },
    date: "2026-10-17",
    status: "delivered",
    paymentMethod: "UPI / Paytm",
    shippingAddress: {
      street: "Bandra Kurla Complex, Wing C",
      city: "Mumbai",
      state: "Maharashtra",
      postalCode: "400051",
      country: "India"
    },
    items: [
      { productId: "PROD-112", name: "Titanium Carabiner Keychain Tool", price: 24.50, quantity: 4 },
      { productId: "PROD-107", name: "Matte Black Thermal EDC Water Bottle", price: 38.00, quantity: 1 }
    ],
    total: 136.00
  },
  {
    id: "ORD-9412",
    customer: {
      name: "Sarah Jenkins",
      email: "sarah.j@londonmedia.uk",
      phone: "+44 20 7946 0912"
    },
    date: "2026-10-17",
    status: "delivered",
    paymentMethod: "Credit Card (Amex •••• 3004)",
    shippingAddress: {
      street: "82 Shoreditch High St",
      city: "London",
      state: "Greater London",
      postalCode: "E1 6JJ",
      country: "United Kingdom"
    },
    items: [
      { productId: "PROD-102", name: "Aura Noise-Cancelling Headphones", price: 249.50, quantity: 1 },
      { productId: "PROD-105", name: "VoltSpeed 100W GaN Fast Charger", price: 49.99, quantity: 1 }
    ],
    total: 299.49
  }
];

export const last7DaysStats = [
  { day: "Sat (Oct 17)", date: "2026-10-17", revenue: 435.49, orders: 2 },
  { day: "Sun (Oct 18)", date: "2026-10-18", revenue: 1269.00, orders: 1 },
  { day: "Mon (Oct 19)", date: "2026-10-19", revenue: 190.00, orders: 1 },
  { day: "Tue (Oct 20)", date: "2026-10-20", revenue: 644.98, orders: 2 },
  { day: "Wed (Oct 21)", date: "2026-10-21", revenue: 420.00, orders: 1 },
  { day: "Thu (Oct 22)", date: "2026-10-22", revenue: 374.49, orders: 2 },
  { day: "Fri (Oct 23)", date: "2026-10-23", revenue: 1173.96, orders: 2 }
];
