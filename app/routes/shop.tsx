import type { Route } from "./+types/shop";
import { Welcome } from "../welcome/welcome";
import type { Translations } from "../contexts/LanguageContext";
import React, { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Welcome to ShopZone" },
    { name: "description", content: "Welcome to ShopZone!" },
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
  { id: 1, name: "iPhone 15 Pro", category: "Electronics", img: "https://picsum.photos/200/300", price: 999, rating: 4.8 },
  { id: 2, name: "MacBook Air", category: "Electronics", img: "https://picsum.photos/200/300", price: 1299, rating: 4.9 },
  { id: 3, name: "AirPods Pro", category: "Electronics", img: "https://picsum.photos/200/300", price: 249, rating: 4.7 },
  { id: 4, name: "Nike Air Max", category: "Fashion", img: "https://picsum.photos/200/300", price: 120, rating: 4.6 },
  { id: 5, name: "Designer T-Shirt", category: "Fashion", img: "https://picsum.photos/200/300", price: 45, rating: 4.4 },
  { id: 6, name: "Leather Jacket", category: "Fashion", img: "https://picsum.photos/200/300", price: 299, rating: 4.8 },
  { id: 7, name: "Smart TV 55\"", category: "Home", img: "https://picsum.photos/200/300", price: 699, rating: 4.5 },
  { id: 8, name: "Coffee Machine", category: "Home", img: "https://picsum.photos/200/300", price: 199, rating: 4.3 },
  { id: 9, name: "React Guide", category: "Books", img: "https://picsum.photos/200/300", price: 29, rating: 4.9 },
  { id: 10, name: "Basketball", category: "Sports", img: "https://picsum.photos/200/300", price: 35, rating: 4.2 },
  { id: 11, name: "Makeup Kit", category: "Beauty", img: "https://picsum.photos/200/300", price: 89, rating: 4.6 },
  { id: 12, name: "Wireless Mouse", category: "Electronics", img: "https://picsum.photos/200/300", price: 59, rating: 4.4 },
];

export default function Shop() {
  const { t, language, setLanguage, isRTL } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<Array<{ id: number, name: string, price: number, quantity: number }>>([]);

  const filteredProducts = allProducts.filter(product => {
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (product: typeof allProducts[0]) => {
    const existingItem = cartItems.find(item => item.id === product.id);
    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCartItems([...cartItems, { id: product.id, name: product.name, price: product.price, quantity: 1 }]);
    }
  };

  const removeFromCart = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <div style={{ background: '#fafafa', minHeight: '100vh' }}>
      {/* Header */}
      <header style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: '#fff',
        padding: '1rem 2rem',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 1000
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ fontWeight: 'bold', fontSize: '1.8rem', letterSpacing: '-0.5px' }}>{t('brandName', translations)}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {/* Language Switcher */}
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as 'en' | 'ar')}
              style={{
                background: 'rgba(255,255,255,0.2)',
                border: 'none',
                borderRadius: '8px',
                padding: '0.5rem',
                color: '#fff',
                cursor: 'pointer',
                backdropFilter: 'blur(10px)'
              }}
            >
              <option value="en" style={{ color: '#333' }}>English</option>
              <option value="ar" style={{ color: '#333' }}>العربية</option>
            </select>
            <button
              onClick={() => setIsCartOpen(true)}
              style={{
                background: 'rgba(255,255,255,0.2)',
                border: 'none',
                borderRadius: '12px',
                padding: '0.7rem 1.2rem',
                color: '#fff',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: '600',
                transition: 'all 0.2s',
                backdropFilter: 'blur(10px)'
              }}
            >
              🛒 {t('cart', translations)} ({cartItems.length})
            </button>
          </div>
        </div>
      </header>

      {/* Search Bar */}
      <section style={{ background: '#fff', padding: '2rem', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ position: 'relative', marginBottom: '2rem' }}>
            <input
              type="text"
              placeholder={t('searchPlaceholder', translations)}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '1rem 1.5rem',
                borderRadius: '16px',
                border: '2px solid #e0e0e0',
                fontSize: '1.1rem',
                boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
                transition: 'all 0.2s',
                textAlign: isRTL ? 'right' : 'left'
              }}
            />
          </div>

          {/* Category Cards */}
          <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
            <button
              onClick={() => setSelectedCategory("All")}
              style={{
                background: selectedCategory === "All" ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#f8f9fa',
                color: selectedCategory === "All" ? '#fff' : '#666',
                border: 'none',
                borderRadius: '16px',
                padding: '1rem 1.5rem',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '1rem',
                minWidth: 'fit-content',
                transition: 'all 0.2s',
                boxShadow: selectedCategory === "All" ? '0 4px 15px rgba(102, 126, 234, 0.3)' : '0 2px 8px rgba(0,0,0,0.05)'
              }}
            >
              🌟 {t('all', translations)}
            </button>
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                style={{
                  background: selectedCategory === category.name ? category.color : '#f8f9fa',
                  color: selectedCategory === category.name ? '#fff' : '#666',
                  border: 'none',
                  borderRadius: '16px',
                  padding: '1rem 1.5rem',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '1rem',
                  minWidth: 'fit-content',
                  transition: 'all 0.2s',
                  boxShadow: selectedCategory === category.name ? `0 4px 15px ${category.color}40` : '0 2px 8px rgba(0,0,0,0.05)'
                }}
              >
                {category.icon} {t(category.name.toLowerCase() as keyof Translations, translations)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '2rem', color: '#333', textAlign: 'center' }}>
          {selectedCategory === "All" ? t('discoverProducts', translations) : `${t(selectedCategory.toLowerCase() as keyof Translations, translations)} ${t('collection', translations)}`}
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem'
        }}>
          {filteredProducts.map((product) => (
            <div key={product.id} style={{
              background: '#fff',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}>
              <div style={{ position: 'relative', overflow: 'hidden' }}>
                <img
                  src={product.img}
                  alt={product.name}
                  style={{
                    width: '100%',
                    height: '200px',
                    objectFit: 'cover',
                    transition: 'transform 0.3s ease'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  background: 'rgba(0,0,0,0.7)',
                  color: '#fff',
                  padding: '0.3rem 0.6rem',
                  borderRadius: '8px',
                  fontSize: '0.8rem',
                  fontWeight: '600'
                }}>
                  ⭐ {product.rating}
                </div>
              </div>

              <div style={{ padding: '1.5rem' }}>
                <h3 style={{
                  fontSize: '1.2rem',
                  fontWeight: '600',
                  marginBottom: '0.5rem',
                  color: '#333',
                  lineHeight: '1.4'
                }}>
                  {product.name}
                </h3>

                <div style={{
                  fontSize: '1.4rem',
                  fontWeight: '700',
                  color: '#667eea',
                  marginBottom: '1rem'
                }}>
                  ${product.price}
                </div>

                <button
                  onClick={() => addToCart(product)}
                  style={{
                    width: '100%',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '12px',
                    padding: '0.8rem',
                    cursor: 'pointer',
                    fontWeight: '600',
                    fontSize: '1rem',
                    transition: 'all 0.2s',
                    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
                  }}
                >
                  {t('addToCart', translations)}
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#666' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{t('noProductsFound', translations)}</h3>
            <p>{t('noProductsDescription', translations)}</p>
          </div>
        )}
      </main>

      {/* Cart Sheet */}
      {isCartOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          zIndex: 2000,
          display: 'flex',
          justifyContent: isRTL ? 'flex-start' : 'flex-end'
        }}>
          <div style={{
            background: '#fff',
            width: '400px',
            height: '100vh',
            boxShadow: isRTL ? '10px 0 30px rgba(0,0,0,0.2)' : '-10px 0 30px rgba(0,0,0,0.2)',
            display: 'flex',
            flexDirection: 'column',
            animation: 'slideIn 0.3s ease'
          }}>
            <div style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: '#fff',
              padding: '1.5rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '700' }}>{t('yourCart', translations)}</h2>
              <button
                onClick={() => setIsCartOpen(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#fff',
                  fontSize: '1.5rem',
                  cursor: 'pointer'
                }}
              >
                ✕
              </button>
            </div>

            <div style={{ flex: 1, padding: '1.5rem', overflowY: 'auto' }}>
              {cartItems.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🛒</div>
                  <p>{t('cartEmpty', translations)}</p>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={item.id} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '1rem',
                    background: '#f8f9fa',
                    borderRadius: '12px',
                    marginBottom: '1rem'
                  }}>
                    <div>
                      <div style={{ fontWeight: '600', marginBottom: '0.3rem' }}>{item.name}</div>
                      <div style={{ color: '#667eea', fontWeight: '600' }}>${item.price} x {item.quantity}</div>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      style={{
                        background: '#dc3545',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '0.5rem',
                        cursor: 'pointer',
                        fontSize: '0.8rem'
                      }}
                    >
                      {t('remove', translations)}
                    </button>
                  </div>
                ))
              )}
            </div>

            {cartItems.length > 0 && (
              <div style={{ padding: '1.5rem', borderTop: '1px solid #eee' }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '1.3rem',
                  fontWeight: '700',
                  marginBottom: '1rem',
                  color: '#333'
                }}>
                  <span>{t('total', translations)}</span>
                  <span>${getTotalPrice()}</span>
                </div>
                <button style={{
                  width: '100%',
                  background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '1rem',
                  cursor: 'pointer',
                  fontWeight: '700',
                  fontSize: '1.1rem',
                  boxShadow: '0 4px 15px rgba(40, 167, 69, 0.3)'
                }}>
                  {t('checkout', translations)}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
