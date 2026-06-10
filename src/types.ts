export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  tags: string[];
  calories: number;
  prepTime: string;
  isSpecial?: boolean;
  discountPrice?: number;
}

export interface CartItem {
  id: string; // unique cart item id (e.g., menuId + instructionsHash)
  menuItem: MenuItem;
  quantity: number;
  customInstructions?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  review: string;
  rating: number;
  image: string;
  dishReviewed: string;
}

export interface Offer {
  id: string;
  code: string;
  title: string;
  description: string;
  discount: number;
  badge: string;
  bannerBg: string;
}

export interface CloudSuite {
  id: string;
  name: string;
  description: string;
  altitude: string;
  vibe: string;
  capacity: string;
}

export interface Reservation {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  cloudSuiteId: string;
  customRequests?: string;
}

export type OrderStatus = 'received' | 'preparing' | 'courier' | 'delivered';

export interface Order {
  id: string;
  name: string;
  email: string;
  address: string;
  phone: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  deliveryFee: number;
  tax: number;
  total: number;
  status: OrderStatus;
  timestamp: string;
}
