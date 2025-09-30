import type { Route } from "./+types/_index";
import { Welcome } from "../welcome/welcome";
import type { Translations } from "../contexts/LanguageContext";
import * as React from "react";
import { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { useCart } from "../contexts/CartContext";
import { Link, useSearchParams } from "react-router";



export function meta({}: Route.MetaArgs) {
  return [
    { title: "Shop Zone" },
    { name: "description", content: "Welcome to Shop Zone!" },
  ];
}

const translations = {
  en: {
    brandName: "✨ ShopZone",
    cart: "Cart",
    searchPlaceholder: "🔍 Search for amazing products...",
    all: "All",
    electronics: "Electronics",
    fashion: "Fashion",
    home: "Home",
    books: "Books",
    sports: "Sports",
    beauty: "Beauty",
    discoverProducts: "✨ Discover Amazing Products",
    collection: "Collection",
    addToCart: "🛒 Add to Cart",
    noProductsFound: "No products found",
    noProductsDescription: "Try adjusting your search or category filter",
    yourCart: "🛒 Your Cart",
    cartEmpty: "Your cart is empty",
    remove: "Remove",
    total: "Total:",
    checkout: "💳 Checkout",
    rating: "Rating"
  },
  ar: {
    brandName: "✨ منطقة التسوق",
    cart: "السلة",
    searchPlaceholder: "🔍 ابحث عن منتجات رائعة...",
    all: "الكل",
    electronics: "إلكترونيات",
    fashion: "أزياء",
    home: "منزل",
    books: "كتب",
    sports: "رياضة",
    beauty: "جمال",
    discoverProducts: "✨ اكتشف منتجات رائعة",
    collection: "مجموعة",
    addToCart: "🛒 أضف إلى السلة",
    noProductsFound: "لم يتم العثور على منتجات",
    noProductsDescription: "حاول تعديل البحث أو فلتر الفئة",
    yourCart: "🛒 سلتك",
    cartEmpty: "سلتك فارغة",
    remove: "إزالة",
    total: "الإجمالي:",
    checkout: "💳 الدفع",
    rating: "التقييم"
  }
};



const categories = [
  { name: "Electronics", icon: "📱", color: "#007bff" },
  { name: "Fashion", icon: "👕", color: "#28a745" },
  { name: "Home", icon: "🏠", color: "#ffc107" },
  { name: "Books", icon: "📚", color: "#6f42c1" },
  { name: "Sports", icon: "⚽", color: "#fd7e14" },
  { name: "Beauty", icon: "💄", color: "#e83e8c" },
];

const allProducts = [
  { 
    id: 1, 
    name: "iPhone 15 Pro", 
    category: "Electronics", 
    media: [
      { type: "image", url: "https://picsum.photos/400/600?random=1" },
      { type: "image", url: "https://picsum.photos/400/600?random=11" },
      { type: "video", url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" },
      { type: "image", url: "https://picsum.photos/400/600?random=21" }
    ],
    price: 999, 
    rating: 4.8, 
    featured: true, 
    size: "large" 
  },
  { 
    id: 2, 
    name: "MacBook Air", 
    category: "Electronics", 
    media: [
      { type: "image", url: "https://picsum.photos/400/400?random=2" },
      { type: "image", url: "https://picsum.photos/400/400?random=12" },
      { type: "image", url: "https://picsum.photos/400/400?random=22" }
    ],
    price: 1299, 
    rating: 4.9, 
    featured: true, 
    size: "wide" 
  },
  { 
    id: 3, 
    name: "AirPods Pro", 
    category: "Electronics", 
    media: [
      { type: "image", url: "https://picsum.photos/300/300?random=3" },
      { type: "video", url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" }
    ],
    price: 249, 
    rating: 4.7, 
    size: "small" 
  },
  { 
    id: 4, 
    name: "Nike Air Max", 
    category: "Fashion", 
    media: [
      { type: "image", url: "https://picsum.photos/300/400?random=4" },
      { type: "image", url: "https://picsum.photos/300/400?random=14" },
      { type: "image", url: "https://picsum.photos/300/400?random=24" }
    ],
    price: 120, 
    rating: 4.6, 
    size: "medium" 
  },
  { 
    id: 5, 
    name: "Designer T-Shirt", 
    category: "Fashion", 
    media: [
      { type: "image", url: "https://picsum.photos/300/300?random=5" }
    ],
    price: 45, 
    rating: 4.4, 
    size: "small" 
  },
  { 
    id: 6, 
    name: "Leather Jacket", 
    category: "Fashion", 
    media: [
      { type: "image", url: "https://picsum.photos/400/500?random=6" },
      { type: "image", url: "https://picsum.photos/400/500?random=16" },
      { type: "video", url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" }
    ],
    price: 299, 
    rating: 4.8, 
    featured: true, 
    size: "tall" 
  },
  { 
    id: 7, 
    name: "Smart TV 55\"", 
    category: "Home", 
    media: [
      { type: "image", url: "https://picsum.photos/500/300?random=7" },
      { type: "image", url: "https://picsum.photos/500/300?random=17" }
    ],
    price: 699, 
    rating: 4.5, 
    size: "wide" 
  },
  { 
    id: 8, 
    name: "Coffee Machine", 
    category: "Home", 
    media: [
      { type: "image", url: "https://picsum.photos/300/400?random=8" },
      { type: "image", url: "https://picsum.photos/300/400?random=18" }
    ],
    price: 199, 
    rating: 4.3, 
    size: "medium" 
  },
  { 
    id: 9, 
    name: "React Guide", 
    category: "Books", 
    media: [
      { type: "image", url: "https://picsum.photos/300/300?random=9" }
    ],
    price: 29, 
    rating: 4.9, 
    size: "small" 
  },
  { 
    id: 10, 
    name: "Basketball", 
    category: "Sports", 
    media: [
      { type: "image", url: "https://picsum.photos/300/300?random=10" },
      { type: "image", url: "https://picsum.photos/300/300?random=20" }
    ],
    price: 35, 
    rating: 4.2, 
    size: "small" 
  },
  { 
    id: 11, 
    name: "Makeup Kit", 
    category: "Beauty", 
    media: [
      { type: "image", url: "https://picsum.photos/300/400?random=11" },
      { type: "image", url: "https://picsum.photos/300/400?random=31" },
      { type: "image", url: "https://picsum.photos/300/400?random=41" }
    ],
    price: 89, 
    rating: 4.6, 
    size: "medium" 
  },
  { 
    id: 12, 
    name: "Wireless Mouse", 
    category: "Electronics", 
    media: [
      { type: "image", url: "https://picsum.photos/300/300?random=12" }
    ],
    price: 59, 
    rating: 4.4, 
    size: "small" 
  },
];

// Mock API data for custom components
const mockComponentsData = [
  {
    id: 1,
    title: "تسوق حسب الفئة",
    size: "large",
    items: [
      { name: "أجهزة الكمبيوتر والألعاب", image: "https://picsum.photos/150/150?random=1", link: "/electronics" },
      { name: "الألعاب", image: "https://picsum.photos/150/150?random=2", link: "/games" },
      { name: "جهاز التحكم", image: "https://picsum.photos/150/150?random=3", link: "/controllers" },
      { name: "أجهزة الكمبيوتر المحمولة", image: "https://picsum.photos/150/150?random=4", link: "/laptops" }
    ]
  },
  {
    id: 2,
    title: "٩.٩ يوم التسوق الكبير",
    size: "medium",
    items: [
      { name: "عروض خاصة", image: "https://picsum.photos/200/200?random=5", link: "/sale" }
    ],
    backgroundColor: "bg-red-400"
  },
  {
    id: 3,
    title: "توصيل دون مجان",
    size: "medium",
    items: [
      { name: "شحن مجاني", image: "https://picsum.photos/200/200?random=6", link: "/free-shipping" }
    ],
    backgroundColor: "bg-blue-400"
  },
  {
    id: 4,
    title: "إكسسوارات الأطفال",
    size: "medium",
    items: [
      { name: "سماعات", image: "https://picsum.photos/120/120?random=7", link: "/headphones" },
      { name: "لوحة مفاتيح", image: "https://picsum.photos/120/120?random=8", link: "/keyboards" },
      { name: "ماوس", image: "https://picsum.photos/120/120?random=9", link: "/mouse" },
      { name: "كراسي", image: "https://picsum.photos/120/120?random=10", link: "/chairs" }
    ]
  },
  {
    id: 5,
    title: "تسوق لشراء احتياجات منزلك",
    size: "large",
    items: [
      { name: "أدوات المطبخ", image: "https://picsum.photos/140/140?random=11", link: "/kitchen" },
      { name: "وسائد وسجاد مريح", image: "https://picsum.photos/140/140?random=12", link: "/comfort" },
      { name: "ديكور المنزل", image: "https://picsum.photos/140/140?random=13", link: "/decor" },
      { name: "المناشف", image: "https://picsum.photos/140/140?random=14", link: "/towels" }
    ]
  },
  {
    id: 6,
    title: "المنتجات المنزلية التي وصلت جديداً بسعر أقل من ٥٠$",
    size: "medium",
    items: [
      { name: "أدوات المطبخ وتنظيف الطعام", image: "https://picsum.photos/160/160?random=15", link: "/kitchen-tools" }
    ]
  },
  {
    id: 7,
    title: "ايدا لمدرستك",
    size: "medium",
    items: [
      { name: "ألعاب الكمبيوتر", image: "https://picsum.photos/180/180?random=16", link: "/computer-games" }
    ],
    backgroundColor: "bg-gray-800"
  },
  {
    id: 8,
    title: "العب أطفال من فلاش تخزين الصناعي",
    size: "large",
    items: [
      { name: "ألعاب متنوعة", image: "https://picsum.photos/150/150?random=17", link: "/toys" },
      { name: "ألعاب تعليمية", image: "https://picsum.photos/150/150?random=18", link: "/educational" },
      { name: "ألعاب إلكترونية", image: "https://picsum.photos/150/150?random=19", link: "/electronic-toys" }
    ]
  }
];

// Mock API function
const fetchCustomComponents = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockComponentsData;
};

export default function Home() {
  const { t, language, setLanguage, isRTL } = useLanguage();
  const { cartItems, addToCart, removeFromCart, getTotalPrice, isCartOpen, setIsCartOpen } = useCart();
  const [searchParams, setSearchParams] = useSearchParams();
  const [customComponents, setCustomComponents] = useState<any[]>([]);
  const [isLoadingComponents, setIsLoadingComponents] = useState(true);
  const [currentMediaIndex, setCurrentMediaIndex] = useState<{[key: number]: number}>({});
  const [isSearchSticky, setIsSearchSticky] = useState(false);

  // Get search term and category from URL params
  const searchTerm = searchParams.get('search') || '';
  const selectedCategory = searchParams.get('category') || 'All';

  // Update search params when search term changes
  const handleSearchChange = (value: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    if (value) {
      newSearchParams.set('search', value);
    } else {
      newSearchParams.delete('search');
    }
    setSearchParams(newSearchParams);
  };

  // Update search params when category changes
  const handleCategoryChange = (category: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    if (category && category !== 'All') {
      newSearchParams.set('category', category);
    } else {
      newSearchParams.delete('category');
    }
    setSearchParams(newSearchParams);
  };

  // Fetch custom components on mount
  React.useEffect(() => {
    const loadComponents = async () => {
      try {
        const data = await fetchCustomComponents();
        setCustomComponents(data);
      } catch (error) {
        console.error('Failed to fetch custom components:', error);
      } finally {
        setIsLoadingComponents(false);
      }
    };
    loadComponents();
  }, []);

  // Add scroll listener for sticky search bar
  React.useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsSearchSticky(scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredProducts = allProducts.filter(product => {
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getSizeClasses = (size: string) => {
    switch (size) {
      case 'large':
        return 'flex-1 min-w-[300px] max-w-[400px] min-h-[280px]';
      case 'medium':
        return 'flex-1 min-w-[200px] max-w-[280px] min-h-[200px]';
      default:
        return 'flex-1 min-w-[150px] max-w-[200px] min-h-[150px]';
    }
  };

  const getProductSizeClasses = (size: string) => {
    switch (size) {
      case 'large':
        return 'col-span-2 row-span-2 min-h-[400px]';
      case 'wide':
        return 'col-span-2 row-span-1 min-h-[200px]';
      case 'tall':
        return 'col-span-1 row-span-2 min-h-[400px]';
      case 'medium':
        return 'col-span-1 row-span-1 min-h-[250px]';
      default:
        return 'col-span-1 row-span-1 min-h-[200px]';
    }
  };

  const nextMedia = (productId: number, mediaLength: number) => {
    setCurrentMediaIndex(prev => ({
      ...prev,
      [productId]: ((prev[productId] || 0) + 1) % mediaLength
    }));
  };

  const prevMedia = (productId: number, mediaLength: number) => {
    setCurrentMediaIndex(prev => ({
      ...prev,
      [productId]: ((prev[productId] || 0) - 1 + mediaLength) % mediaLength
    }));
  };

  const setMediaIndex = (productId: number, index: number) => {
    setCurrentMediaIndex(prev => ({
      ...prev,
      [productId]: index
    }));
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-lg border-b border-gray-100 text-gray-900 p-4 lg:px-8 sticky top-0 z-50">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="font-medium text-xl lg:text-2xl tracking-tight">
            {t('brandName', translations)}
          </div>
          
          <div className="flex items-center gap-4">
            {/* Language Switcher */}
            <select 
              value={language}
              onChange={(e) => setLanguage(e.target.value as 'en' | 'ar')}
              className="bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200 rounded-lg px-3 py-2 text-sm cursor-pointer transition-colors"
            >
              <option value="en" className="text-gray-800">English</option>
              <option value="ar" className="text-gray-800">العربية</option>
            </select>
            
            {/* User Account Button */}
            <Link 
              to="/user"
              className="bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200 rounded-lg px-3 py-2 text-sm font-medium transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Account
            </Link>
            
            <button 
              onClick={() => setIsCartOpen(true)}
              className="bg-gray-900 hover:bg-gray-800 text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors flex items-center gap-2"
            >
              🛒 {t('cart', translations)} ({cartItems.length})
            </button>
          </div>
        </div>
      </header>

      {/* Search Bar Section */}
      <section className={`bg-white/80 backdrop-blur-sm border-b border-gray-100 sticky top-16 z-40 transition-all duration-300 ${
        isSearchSticky ? 'py-3 shadow-sm' : 'py-6'
      }`}>
        <div className="max-w-2xl mx-auto px-4">
          <div className="relative">
            <input 
              type="text"
              placeholder={t('searchPlaceholder', translations)}
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              className={`w-full bg-white border border-gray-200 rounded-xl shadow-sm transition-all duration-300 focus:ring-2 focus:ring-gray-200 focus:border-gray-300 text-gray-900 placeholder-gray-500 ${
                isSearchSticky ? 'py-2.5 px-4 text-sm' : 'py-3 px-5 text-base'
              } ${isRTL ? 'text-right' : 'text-left'}`}
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Custom Components Grid */}
      <section className="max-w-7xl mx-auto p-4 md:p-8">
        {isLoadingComponents ? (
          <div className="flex flex-wrap justify-center gap-4">
            {[...Array(8)].map((_, index) => (
              <div key={index} className={`${getSizeClasses(index % 3 === 0 ? 'large' : 'medium')} bg-gray-200 animate-pulse rounded-2xl p-4`}>
                <div className="h-6 bg-gray-300 rounded mb-4"></div>
                <div className="flex flex-wrap justify-center gap-2">
                  <div className="h-16 w-16 bg-gray-300 rounded"></div>
                  <div className="h-16 w-16 bg-gray-300 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-4">
            {customComponents.map((component) => (
              <div
                key={component.id}
                className={`${getSizeClasses(component.size)} ${component.backgroundColor || 'bg-white'} border border-gray-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group flex-shrink-0 relative`}
              >
                {/* Title overlay */}
                <div className="absolute top-0 left-0 right-0 z-10 p-3">
                  <h3 className={`text-sm md:text-base font-bold ${component.backgroundColor ? 'text-white' : 'text-white'} ${isRTL ? 'text-right' : 'text-left'} leading-tight drop-shadow-lg bg-black/30 backdrop-blur-sm rounded-lg px-3 py-2`}>
                    {component.title}
                  </h3>
                </div>
                
                <div className="flex flex-wrap h-full w-full relative">
                  {component.items.map((item: any, index: number) => (
                    <a
                      key={index}
                      href={item.link}
                      className={`group/item hover:scale-105 transition-transform duration-200 relative overflow-hidden ${
                        component.items.length === 1 
                          ? 'w-full h-full' 
                          : component.items.length === 2 
                          ? 'w-1/2 h-full' 
                          : component.items.length === 3
                          ? index === 0 ? 'w-full h-1/2' : 'w-1/2 h-1/2'
                          : 'w-1/2 h-1/2'
                      }`}
                    >
                      {/* Full size background image */}
                      <div className="absolute inset-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover/item:scale-110 transition-transform duration-300"
                        />
                        {/* Gradient overlay for better text readability */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                      </div>
                      
                      {/* Text overlay at bottom */}
                      <div className="absolute bottom-0 left-0 right-0 p-2 z-10">
                        <p className="text-xs font-semibold text-white leading-tight text-center drop-shadow-md bg-black/20 backdrop-blur-sm rounded px-2 py-1">
                          {item.name}
                        </p>
                      </div>
                    </a>
                  ))}
                  
                  {/* Fallback background for components without enough items */}
                  {component.items.length === 1 && (
                    <div className="absolute inset-0 -z-10">
                      <img
                        src={component.items[0].image}
                        alt="background"
                        className="w-full h-full object-cover opacity-20"
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Products Grid */}
      <main className="max-w-7xl mx-auto p-8">
        {/* Category Cards */}
        <div className="mb-12">
          {/* Category Text Cloud */}
          <div className="relative flex flex-wrap items-center justify-center gap-3 p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
            <button
              onClick={() => handleCategoryChange("All")}
              className={`${selectedCategory === "All" 
                ? 'bg-gray-900 text-white shadow-sm' 
                : 'bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200'
              } px-6 py-3 rounded-xl font-medium text-sm transition-all duration-200 cursor-pointer hover:shadow-sm`}
            >
              {t('all', translations)}
            </button>
            
            <button
              onClick={() => handleCategoryChange("Electronics")}
              className={`${selectedCategory === "Electronics" 
                ? 'bg-gray-900 text-white shadow-sm' 
                : 'bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200'
              } px-5 py-2.5 rounded-xl font-medium text-lg transition-all duration-200 cursor-pointer hover:shadow-sm`}
            >
              {t('electronics', translations)}
            </button>
            
            <button
              onClick={() => handleCategoryChange("Fashion")}
              className={`${selectedCategory === "Fashion" 
                ? 'bg-gray-900 text-white shadow-sm' 
                : 'bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200'
              } px-4 py-2 rounded-xl font-medium text-xs transition-all duration-200 cursor-pointer hover:shadow-sm`}
            >
              {t('fashion', translations)}
            </button>
            
            <button
              onClick={() => handleCategoryChange("Home")}
              className={`${selectedCategory === "Home" 
                ? 'bg-gray-900 text-white shadow-sm' 
                : 'bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200'
              } px-6 py-3.5 rounded-xl font-semibold text-base transition-all duration-200 cursor-pointer hover:shadow-sm`}
            >
              {t('home', translations)}
            </button>
            
            <button
              onClick={() => handleCategoryChange("Books")}
              className={`${selectedCategory === "Books" 
                ? 'bg-gray-900 text-white shadow-sm' 
                : 'bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200'
              } px-3 py-2 rounded-xl font-light text-sm transition-all duration-200 cursor-pointer hover:shadow-sm`}
            >
              {t('books', translations)}
            </button>
            
            <button
              onClick={() => handleCategoryChange("Sports")}
              className={`${selectedCategory === "Sports" 
                ? 'bg-gray-900 text-white shadow-sm' 
                : 'bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200'
              } px-5 py-2.5 rounded-xl font-medium text-base transition-all duration-200 cursor-pointer hover:shadow-sm`}
            >
              {t('sports', translations)}
            </button>
            
            <button
              onClick={() => handleCategoryChange("Beauty")}
              className={`${selectedCategory === "Beauty" 
                ? 'bg-gray-900 text-white shadow-sm' 
                : 'bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200'
              } px-4 py-2.5 rounded-xl font-medium text-xs transition-all duration-200 cursor-pointer hover:shadow-sm`}
            >
              {t('beauty', translations)}
            </button>
          </div>
        </div>

        <h2 className="text-2xl lg:text-4xl font-bold mb-8 text-gray-800 text-center">
          {selectedCategory === "All" ? t('discoverProducts', translations) : `${t(selectedCategory.toLowerCase() as keyof Translations, translations)} ${t('collection', translations)}`}
        </h2>
        
        {/* Updated Products Grid with carousel media */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 auto-rows-min">
          {filteredProducts.map((product) => {
            const currentIndex = currentMediaIndex[product.id] || 0;
            const currentMedia = product.media[currentIndex];
            
            return (
              <div 
                key={product.id} 
                className={`${getProductSizeClasses(product.size)} group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer hover:scale-[1.02]`}
              >
                {/* Media Carousel */}
                <div className="absolute inset-0">
                  {currentMedia.type === 'image' ? (
                    <img 
                      src={currentMedia.url} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <video 
                      src={currentMedia.url}
                      className="w-full h-full object-cover"
                      autoPlay
                      muted
                      loop
                      playsInline
                    />
                  )}
                  
                  {/* Gradient overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
                </div>

                {/* Carousel Navigation (only show if more than 1 media item) */}
                {product.media.length > 1 && (
                  <>
                    {/* Previous button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        prevMedia(product.id, product.media.length);
                      }}
                      className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-black/50 backdrop-blur-sm text-white rounded-full w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-black/70"
                    >
                      ‹
                    </button>
                    
                    {/* Next button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        nextMedia(product.id, product.media.length);
                      }}
                      className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-black/50 backdrop-blur-sm text-white rounded-full w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-black/70"
                    >
                      ›
                    </button>
                    
                    {/* Media indicators */}
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      {product.media.map((_, index) => (
                        <button
                          key={index}
                          onClick={(e) => {
                            e.stopPropagation();
                            setMediaIndex(product.id, index);
                          }}
                          className={`w-2 h-2 rounded-full transition-all duration-200 ${
                            index === currentIndex 
                              ? 'bg-white scale-125' 
                              : 'bg-white/50 hover:bg-white/75'
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}

                {/* Media type indicator */}
                {currentMedia.type === 'video' && (
                  <div className="absolute top-3 left-3 z-10">
                    <span className="bg-black/60 backdrop-blur-sm text-white text-xs font-medium px-2 py-1 rounded-lg border border-white/20 flex items-center gap-1">
                      ▶ Video
                    </span>
                  </div>
                )}

                {/* Featured badge */}
                {product.featured && (
                  <div className={`absolute ${currentMedia.type === 'video' ? 'top-12' : 'top-3'} left-3 z-10`}>
                    <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                      ⭐ Featured
                    </span>
                  </div>
                )}
                
                {/* Rating badge */}
                <div className="absolute top-3 right-3 z-10">
                  <span className="bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded-lg text-xs font-semibold border border-white/20">
                    ⭐ {product.rating}
                  </span>
                </div>

                {/* Content overlay at bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                  <div className="space-y-2">
                    {/* Category badge and media count */}
                    <div className="flex justify-between items-start">
                      <span className="bg-white/20 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-lg border border-white/30">
                        {product.category}
                      </span>
                      {product.media.length > 1 && (
                        <span className="bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-lg border border-white/20">
                          {currentIndex + 1}/{product.media.length}
                        </span>
                      )}
                    </div>
                    
                    {/* Product name */}
                    <h3 className="text-white font-bold text-lg leading-tight drop-shadow-lg">
                      {product.name}
                    </h3>
                    
                    {/* Price */}
                    <div className="text-white text-xl font-bold drop-shadow-lg">
                      ${product.price}
                    </div>
                    
                    {/* Add to cart button */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        addToCart({
                          id: product.id,
                          name: product.name,
                          price: product.price,
                          image: product.media[0]?.url,
                          category: product.category
                        });
                      }}
                      className="w-full bg-white/90 backdrop-blur-sm text-gray-900 border-0 rounded-xl py-2.5 px-4 cursor-pointer font-semibold text-sm transition-all duration-200 hover:bg-white hover:scale-105 shadow-lg border border-white/20"
                    >
                      {t('addToCart', translations)}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-2xl mb-2">{t('noProductsFound', translations)}</h3>
            <p>{t('noProductsDescription', translations)}</p>
          </div>
        )}
      </main>

      {/* Cart Sheet - updated to use context */}
      {isCartOpen && (
        <div className={`fixed inset-0 bg-black/50 z-50 flex ${isRTL ? 'justify-start' : 'justify-end'}`}>
          <div className={`bg-white w-96 h-full ${isRTL ? 'shadow-2xl shadow-black/20' : 'shadow-2xl shadow-black/20'} flex flex-col animate-slide-in`}>
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold">{t('yourCart', translations)}</h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="bg-transparent border-0 text-white text-2xl cursor-pointer hover:opacity-80"
              >
                ✕
              </button>
            </div>
            
            <div className="flex-1 p-6 overflow-y-auto">
              {cartItems.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <div className="text-5xl mb-4">🛒</div>
                  <p>{t('cartEmpty', translations)}</p>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-xl mb-4">
                    <div>
                      <div className="font-semibold mb-1">{item.name}</div>
                      <div className="text-indigo-600 font-semibold">${item.price} x {item.quantity}</div>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="bg-red-500 text-white border-0 rounded-lg px-3 py-2 cursor-pointer text-sm hover:bg-red-600 transition-colors"
                    >
                      {t('remove', translations)}
                    </button>
                  </div>
                ))
              )}
            </div>
            
            {cartItems.length > 0 && (
              <div className="p-6 border-t border-gray-200">
                <div className="flex justify-between text-xl font-bold mb-4 text-gray-800">
                  <span>{t('total', translations)}</span>
                  <span>${getTotalPrice().toFixed(2)}</span>
                </div>
                <Link to="/checkout" onClick={() => setIsCartOpen(false)}>
                  <button className="w-full bg-gradient-to-br from-green-500 to-emerald-600 text-white border-0 rounded-xl py-4 cursor-pointer font-bold text-lg shadow-lg shadow-green-300 hover:shadow-xl transition-all duration-200">
                    {t('checkout', translations)}
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}