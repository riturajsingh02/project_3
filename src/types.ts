export interface Product {
  id: string;
  title: string;
  category: 'juice' | 'pickle' | 'herbal';
  categoryLabel: string;
  price: number;
  originalPrice?: number;
  stock: number;
  badge?: 'Bestseller' | 'Sale' | 'Organic' | 'New' | 'Popular' | 'Top Pick';
  rating: number;
  reviewsCount: number;
  img: string;
  shortDesc: string;
  descPara1: string;
  descPara2: string;
  benefits: string[];
  pros: string[];
  cons: string[];
  specials: string[];
  keywords?: string[];
  size?: string;
}

export interface CartItem {
  id: string;
  title: string;
  price: number;
  img: string;
  quantity: number;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  badge?: string;
  image: string;
  excerpt: string;
  fullContent?: {
    lead: string;
    subheading?: string;
    sections: {
      heading?: string;
      paragraphs: string[];
      quote?: string;
    }[];
  };
}

export interface OrderFormState {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}
