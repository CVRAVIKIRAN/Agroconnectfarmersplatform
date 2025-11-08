export interface Product {
  id: string;
  name: string;
  category: 'Organic' | 'Regular';
  quantity: number;
  price: number;
  description: string;
  image: string;
  farmerId: string;
  farmerName: string;
  location: {
    latitude: number;
    longitude: number;
    address: string;
  };
  status: 'Pending' | 'Verified' | 'Sold' | 'Rejected';
  distance?: number;
  rating: number;
  uploadDate: string;
}

export interface Order {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  totalPrice: number;
  buyerName: string;
  sellerName: string;
  status: 'Pending' | 'Confirmed' | 'Delivered';
  orderDate: string;
  paymentId: string;
}

// Mock GPS locations for different cities in India
export const mockLocations = [
  { latitude: 28.6139, longitude: 77.2090, address: 'New Delhi, Delhi' },
  { latitude: 19.0760, longitude: 72.8777, address: 'Mumbai, Maharashtra' },
  { latitude: 30.7333, longitude: 76.7794, address: 'Chandigarh, Punjab' },
  { latitude: 26.9124, longitude: 75.7873, address: 'Jaipur, Rajasthan' },
  { latitude: 23.0225, longitude: 72.5714, address: 'Ahmedabad, Gujarat' },
  { latitude: 17.3850, longitude: 78.4867, address: 'Hyderabad, Telangana' },
  { latitude: 12.9716, longitude: 77.5946, address: 'Bangalore, Karnataka' },
  { latitude: 13.0827, longitude: 80.2707, address: 'Chennai, Tamil Nadu' },
];

export const mockProducts: Product[] = [
  {
    id: 'p1',
    name: 'Fresh Tomatoes',
    category: 'Organic',
    quantity: 50,
    price: 45,
    description: 'Fresh organic tomatoes grown without pesticides. Rich in vitamins and perfect for salads.',
    image: 'https://images.unsplash.com/photo-1745791562822-7ac21012bbb2?w=400',
    farmerId: 'f1',
    farmerName: 'Ramesh Kumar',
    location: mockLocations[2],
    status: 'Verified',
    rating: 4.5,
    uploadDate: '2025-10-20',
  },
  {
    id: 'p2',
    name: 'Basmati Rice',
    category: 'Regular',
    quantity: 200,
    price: 120,
    description: 'Premium quality basmati rice from Punjab. Aged for perfect aroma and taste.',
    image: 'https://images.unsplash.com/photo-1595360584848-6404da6fe097?w=400',
    farmerId: 'f2',
    farmerName: 'Suresh Patel',
    location: mockLocations[2],
    status: 'Verified',
    rating: 4.8,
    uploadDate: '2025-10-19',
  },
  {
    id: 'p3',
    name: 'Organic Wheat',
    category: 'Organic',
    quantity: 500,
    price: 35,
    description: 'Certified organic wheat flour, stone ground for maximum nutrition.',
    image: 'https://images.unsplash.com/photo-1595360584848-6404da6fe097?w=400',
    farmerId: 'f3',
    farmerName: 'Vijay Singh',
    location: mockLocations[3],
    status: 'Verified',
    rating: 4.6,
    uploadDate: '2025-10-18',
  },
  {
    id: 'p4',
    name: 'Fresh Potatoes',
    category: 'Regular',
    quantity: 300,
    price: 25,
    description: 'Farm fresh potatoes, perfect for all your cooking needs.',
    image: 'https://images.unsplash.com/photo-1665315302321-46989ca7829a?w=400',
    farmerId: 'f4',
    farmerName: 'Anil Sharma',
    location: mockLocations[4],
    status: 'Pending',
    rating: 4.2,
    uploadDate: '2025-10-25',
  },
  {
    id: 'p5',
    name: 'Organic Onions',
    category: 'Organic',
    quantity: 150,
    price: 40,
    description: 'Organic red onions, grown with natural fertilizers.',
    image: 'https://images.unsplash.com/photo-1665315302321-46989ca7829a?w=400',
    farmerId: 'f5',
    farmerName: 'Mohan Das',
    location: mockLocations[1],
    status: 'Verified',
    rating: 4.7,
    uploadDate: '2025-10-22',
  },
  {
    id: 'p6',
    name: 'Green Chillies',
    category: 'Organic',
    quantity: 25,
    price: 80,
    description: 'Fresh organic green chillies, perfect spice level.',
    image: 'https://images.unsplash.com/photo-1665315302321-46989ca7829a?w=400',
    farmerId: 'f1',
    farmerName: 'Ramesh Kumar',
    location: mockLocations[2],
    status: 'Verified',
    rating: 4.4,
    uploadDate: '2025-10-21',
  },
];

export const mockOrders: Order[] = [
  {
    id: 'o1',
    productId: 'p1',
    productName: 'Fresh Tomatoes',
    quantity: 10,
    totalPrice: 450,
    buyerName: 'Priya Sharma',
    sellerName: 'Ramesh Kumar',
    status: 'Confirmed',
    orderDate: '2025-10-24',
    paymentId: 'pay_abc123',
  },
  {
    id: 'o2',
    productId: 'p2',
    productName: 'Basmati Rice',
    quantity: 25,
    totalPrice: 3000,
    buyerName: 'Rohit Verma',
    sellerName: 'Suresh Patel',
    status: 'Delivered',
    orderDate: '2025-10-22',
    paymentId: 'pay_def456',
  },
];

// Calculate distance between two coordinates (in km)
export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return Math.round(d);
}

function deg2rad(deg: number): number {
  return deg * (Math.PI / 180);
}

export function getProductsWithDistance(userLocation: {
  latitude: number;
  longitude: number;
}): Product[] {
  return mockProducts.map(product => ({
    ...product,
    distance: calculateDistance(
      userLocation.latitude,
      userLocation.longitude,
      product.location.latitude,
      product.location.longitude
    ),
  }));
}
