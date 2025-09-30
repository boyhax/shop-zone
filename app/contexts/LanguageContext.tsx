import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

// Language types
export type Language = 'en' | 'ar';

// Translation interface
export interface Translations {
  // Header
  brandName: string;
  cart: string;
  
  // Search and categories
  searchPlaceholder: string;
  all: string;
  electronics: string;
  fashion: string;
  home: string;
  books: string;
  sports: string;
  beauty: string;
  
  // Products
  discoverProducts: string;
  collection: string;
  addToCart: string;
  noProductsFound: string;
  noProductsDescription: string;
  
  // Cart
  yourCart: string;
  cartEmpty: string;
  remove: string;
  total: string;
  checkout: string;
  
  // Common
  rating: string;
}
type TranslationRecords = Record<Language, Translations>;
// Translations data
const translations: TranslationRecords = {
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

// Context interface
interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (text: keyof Translations, trans?: TranslationRecords) => string;
  isRTL: boolean;
}

// Create context
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Provider component
export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (text: keyof Translations, trans?: TranslationRecords) => (trans || translations)[language][text];
  const isRTL = language === 'ar';

  const value = {
    language,
    setLanguage,
    t,
    isRTL
  };

  return (
    <LanguageContext.Provider value={value}>
      <div dir={isRTL ? 'rtl' : 'ltr'} style={{ fontFamily: isRTL ? 'Tahoma, Arial, sans-serif' : 'Inter, system-ui, sans-serif' }}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

// Custom hook to use language context
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
