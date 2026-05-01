// Product Data
const products = [
    {
        id: 1,
        name: "Premium Smartwatch",
        price: 199.99,
        image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=600&q=80",
        description: "Stay connected with style. Health tracking, GPS, and smart notifications."
    },
    {
        id: 2,
        name: "Minimalist Sneakers",
        price: 89.50,
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=600&q=80",
        description: "Comfortable, stylish, and perfect for everyday wear. Made with sustainable materials."
    },
    {
        id: 3,
        name: "Wireless Headphones",
        price: 149.00,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
        description: "Noise-cancelling over-ear headphones with 30-hour battery life."
    },
    {
        id: 4,
        name: "Leather Wallet",
        price: 49.99,
        image: "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=600&q=80",
        description: "Genuine leather bifold wallet with RFID protection and sleek design."
    },
    {
        id: 5,
        name: "Designer Sunglasses",
        price: 129.99,
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80",
        description: "UV400 protection with a timeless vintage frame."
    },
    {
        id: 6,
        name: "Organic Skincare Set",
        price: 79.00,
        image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=600&q=80",
        description: "Rejuvenate your skin with our 100% natural, cruelty-free skincare bundle."
    },
    {
        id: 7,
        name: "Classic DSLR Camera",
        price: 499.99,
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=80",
        description: "Capture the perfect moments with high resolution and stunning clarity."
    },
    {
        id: 8,
        name: "Gaming Mechanical Keyboard",
        price: 129.50,
        image: "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=600&q=80",
        description: "RGB backlit mechanical keyboard with responsive switches for gamers."
    },
    {
        id: 9,
        name: "Men's Classic Watch",
        price: 249.00,
        image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=600&q=80",
        description: "Elegant mechanical watch with a premium leather strap."
    },
    {
        id: 10,
        name: "Travel Backpack",
        price: 89.99,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80",
        description: "Durable and waterproof backpack designed for your everyday adventures."
    },
    {
        id: 11,
        name: "Aesthetic Coffee Mug",
        price: 19.99,
        image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=600&q=80",
        description: "Start your morning right with this minimalist ceramic coffee mug."
    },
    {
        id: 12,
        name: "Premium Yoga Mat",
        price: 29.00,
        image: "https://images.unsplash.com/photo-1592432678016-e910b452f9a2?auto=format&fit=crop&w=600&q=80",
        description: "Non-slip, eco-friendly yoga mat for your daily workouts and meditation."
    }
];

// Cart State
let cart = [];

// DOM Elements
const productsGrid = document.getElementById('products-grid');
const cartBtn = document.getElementById('cart-btn');
const closeCartBtn = document.getElementById('close-cart');
const cartModal = document.getElementById('cart-modal');
const cartItemsContainer = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const totalPriceEl = document.getElementById('total-price');
const checkoutBtn = document.getElementById('checkout-btn');
const orderModal = document.getElementById('order-modal');
const closeOrderBtn = document.getElementById('close-order-btn');
const contactForm = document.getElementById('contact-form');
const checkoutFormModal = document.getElementById('checkout-form-modal');
const closeCheckoutFormBtn = document.getElementById('close-checkout-form');
const deliveryForm = document.getElementById('delivery-form');
const confirmedPaymentMethod = document.getElementById('confirmed-payment-method');

// Initialize App
function init() {
    renderProducts();
    updateCartUI();
    setupEventListeners();
    initScrollReveal();
}

// Intersection Observer for animations
function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });
    
    reveals.forEach(reveal => {
        observer.observe(reveal);
    });
}

// Render Products to DOM
function renderProducts() {
    productsGrid.innerHTML = products.map((product, index) => `
        <div class="product-card reveal delay-${(index % 3) + 1}">
            <div class="product-img-container">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-desc">${product.description}</p>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <button class="btn btn-primary w-100" onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        </div>
    `).join('');
}

// Add Item to Cart
window.addToCart = function(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartUI();
    
    // Optional: Show brief feedback (could use toast notification)
    cartBtn.style.transform = "scale(1.2)";
    setTimeout(() => cartBtn.style.transform = "scale(1)", 200);
}

// Remove Item from Cart
window.removeFromCart = function(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
}

// Update Quantity
window.updateQuantity = function(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCartUI();
        }
    }
}

// Update Cart UI
function updateCartUI() {
    // Update count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.innerText = totalItems;

    // Update items list
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart-msg">Your cart is empty.</p>';
        checkoutBtn.disabled = true;
        checkoutBtn.style.opacity = '0.5';
        checkoutBtn.style.cursor = 'not-allowed';
    } else {
        checkoutBtn.disabled = false;
        checkoutBtn.style.opacity = '1';
        checkoutBtn.style.cursor = 'pointer';
        cartItemsContainer.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-info">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                    <div>
                        <div class="cart-item-title">${item.name}</div>
                        <div class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
                    </div>
                </div>
                <div class="cart-item-controls">
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span class="cart-item-qty">${item.quantity}</span>
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                    <button class="remove-btn" onclick="removeFromCart(${item.id})"><i class="fas fa-trash"></i></button>
                </div>
            </div>
        `).join('');
    }

    // Update total price
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    totalPriceEl.innerText = `$${total.toFixed(2)}`;
}

// Event Listeners
function setupEventListeners() {
    // Modal controls
    cartBtn.addEventListener('click', () => {
        cartModal.classList.add('active');
    });

    closeCartBtn.addEventListener('click', () => {
        cartModal.classList.remove('active');
    });

    // Close modal on outside click
    cartModal.addEventListener('click', (e) => {
        if (e.target === cartModal) {
            cartModal.classList.remove('active');
        }
    });

    // Checkout process
    checkoutBtn.addEventListener('click', () => {
        if (cart.length > 0) {
            // Close cart, show checkout form modal
            cartModal.classList.remove('active');
            checkoutFormModal.classList.add('active');
        }
    });

    closeCheckoutFormBtn.addEventListener('click', () => {
        checkoutFormModal.classList.remove('active');
    });

    checkoutFormModal.addEventListener('click', (e) => {
        if (e.target === checkoutFormModal) {
            checkoutFormModal.classList.remove('active');
        }
    });

    // Delivery form submission
    deliveryForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get selected payment method
        const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
        confirmedPaymentMethod.innerText = paymentMethod;

        // Close checkout form, show success modal, clear cart
        checkoutFormModal.classList.remove('active');
        orderModal.classList.add('active');
        cart = [];
        updateCartUI();
        deliveryForm.reset();
    });

    // Close order modal
    closeOrderBtn.addEventListener('click', () => {
        orderModal.classList.remove('active');
    });

    // Form submission
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });
}

// Run app
document.addEventListener('DOMContentLoaded', init);
