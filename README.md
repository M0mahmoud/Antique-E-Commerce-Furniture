# 🪑 Antique E-Commerce Furniture

A modern, multilingual e-commerce platform built with Next.js 15, featuring Arabic and English language support, comprehensive user management, and a full-featured shopping experience for furniture and antique items.

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)

## 🔗 Related Repositories

- **Backend API**: [Antique Backend](https://github.com/Rewan-Adel/Online-Shop) - Node.js/Express API server
- **Frontend**: This repository - Next.js 15 client application

## 👥 Development Team

| Role                      | Developer | Contact                                                                                                                            |
| ------------------------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| 🎨 **Frontend Developer** | Mahmoud   | [![Email](https://img.shields.io/badge/Email-devmahmoud.me%40gmail.com-red?style=flat&logo=gmail)](mailto:devmahmoud.me@gmail.com) |
| ⚙️ **Backend Developer**  | Rewan     | [![Email](https://img.shields.io/badge/Email-rewanadel1266%40gmail.com-red?style=flat&logo=gmail)](mailto:rewanadel1266@gmail.com) |

## 🌟 Features

### 🌍 Internationalization (i18n)

- **Bilingual Support**: Full Arabic (RTL) and English (LTR) language support
- **Dynamic Language Switching**: Users can switch languages seamlessly
- **Localized Content**: All UI elements, product descriptions, and user messages are fully translated
- **RTL Layout Support**: Proper right-to-left layout for Arabic users

### 🛒 E-Commerce Functionality

- **Product Catalog**: Browse furniture and antique items with advanced filtering
- **Shopping Cart**: Add, remove, and manage items with persistent storage
- **Wishlist**: Save favorite products for later
- **Product Search**: Advanced search with filters by category, brand, and price range
- **Pagination**: Efficient product browsing with server-side pagination

### 👤 User Management

- **Authentication**: Secure user registration and login system
- **Profile Management**: Users can update personal information, avatar, and location
- **Email Verification**: OTP-based email verification system
- **Password Management**: Secure password change functionality with visibility toggles
- **Account Settings**: Comprehensive account management interface

### 🏪 Shop Features

- **Product Details**: Comprehensive product pages with images, descriptions, and specifications
- **Category Browsing**: Organized product categories for easy navigation
- **Price Filtering**: Filter products by price range using interactive sliders
- **Brand Filtering**: Filter products by manufacturer/brand
- **Order Tracking**: Track order status and delivery progress

### 📱 User Interface

- **Responsive Design**: Mobile-first design that works on all devices
- **Modern UI Components**: Built with Radix UI and Tailwind CSS
- **Loading States**: Smooth loading indicators and skeleton screens
- **Toast Notifications**: User-friendly success and error messages
- **Testimonials Carousel**: Customer reviews with auto-play functionality

## 🛠️ Technology Stack

### Frontend

- **Next.js 15**: React framework with App Router
- **React 19**: Latest React features and optimizations
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI**: Accessible component primitives
- **next-intl**: Internationalization library
- **Lucide React**: Modern icon library
- **Embla Carousel**: Touch-friendly carousels

### State Management & Data Fetching

- **TanStack Query**: Server state management and caching
- **React Hook Form**: Form handling and validation
- **Sonner**: Toast notifications
- **js-cookie**: Cookie management

### Authentication & Security

- **JWT Tokens**: Secure authentication
- **Middleware Protection**: Route-based authentication
- **Form Validation**: Client and server-side validation

## 📁 Project Structure

```
├── app/                          # Next.js App Router
│   ├── [locale]/                # Internationalized routes
│   │   ├── (site)/              # Public website routes
│   │   │   ├── shop/            # Product catalog with filters
│   │   │   ├── product/         # Product detail pages
│   │   │   ├── user/            # User dashboard
│   │   │   │   ├── orders/      # Order management
│   │   │   │   ├── wishlist/    # User wishlist
│   │   │   │   ├── account/     # Account settings
│   │   │   │   └── track/       # Order tracking
│   │   │   ├── contact/         # Contact page
│   │   │   └── services/        # Services page
│   │   └── auth/                # Authentication pages
│   │       ├── login/           # Login page
│   │       └── signup/          # Registration page
│   ├── api/                     # API routes
│   └── globals.css              # Global styles
├── components/                  # Reusable components
│   ├── (HomeSections)/         # Homepage sections
│   │   ├── Hero.tsx            # Hero section
│   │   ├── PopularProducts.tsx # Featured products
│   │   ├── Services.tsx        # Services showcase
│   │   └── Testimonials.tsx    # Customer testimonials
│   ├── auth/                   # Authentication components
│   │   ├── ChangePasswordForm.tsx
│   │   ├── DeleteAccount.tsx
│   │   ├── UpdateEmail.tsx
│   │   └── OTPForm.tsx
│   ├── layout/                 # Layout components
│   │   ├── navbar/             # Navigation components
│   │   └── product/            # Product components
│   ├── ui/                     # UI primitives (Radix UI)
│   └── UserSidebar.tsx         # User dashboard sidebar
├── hooks/                      # Custom React hooks
│   ├── auth/                   # Authentication hooks
│   ├── products/               # Product-related hooks
│   └── user/                   # User management hooks
├── i18n/                       # Internationalization config
├── language/                   # Translation files
│   ├── ar.json                 # Arabic translations
│   └── en.json                 # English translations
├── lib/                        # Utility libraries
├── types/                      # TypeScript type definitions
└── middleware.ts               # Next.js middleware
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18 or later
- npm, yarn, or pnpm package manager
- Git

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/antique-e-commerce-furniture.git
cd antique-e-commerce-furniture
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:

```env
# API Configuration
NEXT_PUBLIC_API_URL=your_api_url
PRIVATE_KEY=your_private_key

# Database (if using)
MONGODB_URI=your_mongodb_connection_string

# Image Upload (if using ImageKit)
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
```

4. **Run the development server**

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🌐 API Integration

The application integrates with a REST API backend. Key endpoints include:

### Authentication

```
POST /auth/login          # User login
POST /auth/signup         # User registration
POST /auth/verify-email   # Email verification
POST /auth/resend-code    # Resend verification code
```

### Products

```
GET /product/all?page=${page}&brand=${brand}&name=${name}&categoryName=${category}&min=${min}&max=${max}
GET /products/{slug}      # Get product details
GET /categories           # Get product categories
```

### User Management

```
GET /user/profile         # Get user profile
PUT /user/profile         # Update user profile
PUT /user/avatar          # Update user avatar
PUT /user/change-email    # Change user email
PUT /user/change-password # Change password
DELETE /user/profile      # Delete account
```

### Wishlist

```
GET /product/wishlist/get              # Get user wishlist
POST /product/wishlist/{slug}          # Add to wishlist
DELETE /product/wishlist/remove/{slug} # Remove from wishlist
```

## 🎨 Design System

### Colors

- **Primary**: Green (`#16a356`)
- **Secondary**: Gray shades
- **Destructive**: Red for warnings and deletions
- **Muted**: Light gray for secondary text

### Typography

- **English**: Poppins font family
- **Arabic**: Cairo font family
- **Responsive sizes**: Mobile-first approach

### Components

- **Buttons**: Multiple variants (primary, secondary, outline, destructive)
- **Forms**: Comprehensive form components with validation
- **Cards**: Product cards, information cards, testimonial cards
- **Navigation**: Responsive navbar with mobile menu
- **Modals**: Accessible dialog and alert components

## 🌍 Internationalization

### Supported Languages

- **English (en)**: Left-to-right layout
- **Arabic (ar)**: Right-to-left layout with proper text direction

### Translation Structure

```json
{
  "navigation": {
    "home": "Home | الرئيسية",
    "shop": "Shop | المتجر",
    "contact": "Contact | اتصل بنا"
  },
  "products": {
    "addToCart": "Add to Cart | أضف إلى السلة",
    "addToWishlist": "Add to Wishlist | أضف إلى المفضلة"
  }
}
```

### Adding New Languages

1. Add locale to `i18n/routing.ts`
2. Create translation file in `language/` directory
3. Update middleware configuration
4. Test RTL layout if applicable

## 🔒 Authentication & Security

### Features

- **JWT-based authentication**: Secure token-based auth
- **Email verification**: OTP verification system
- **Password security**: Strong password requirements with visibility toggles
- **Protected routes**: Middleware-based route protection
- **Account management**: Secure profile updates and account deletion

### Security Measures

- Input validation and sanitization
- CSRF protection
- Secure headers
- Rate limiting (API-side)
- Error message sanitization

## 📊 SEO & Performance

### SEO Features

- **Dynamic Sitemap**: Auto-generated sitemaps for products and pages
- **Meta Tags**: Dynamic meta descriptions and Open Graph tags
- **Internationalized URLs**: Proper locale-based routing
- **Structured Data**: Product schema markup

### Performance Optimizations

- **Image Optimization**: Next.js Image component with lazy loading
- **Code Splitting**: Automatic route-based code splitting
- **Caching**: TanStack Query for efficient data caching
- **Bundle Optimization**: Tree shaking and dead code elimination

## 🧪 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Type checking
npm run type-check   # TypeScript type checking
```

## 📈 Key Features Breakdown

### Homepage Sections

- **Hero Section**: Multilingual welcome with call-to-action
- **Popular Products**: Featured products carousel
- **Services**: Company services showcase
- **Testimonials**: Customer reviews with auto-rotating carousel

### User Dashboard

- **Profile Management**: Update personal information and avatar
- **Order Management**: View and track order history
- **Wishlist**: Manage saved products
- **Account Settings**: Email and password management

### Shop Features

- **Advanced Filtering**: Filter by category, brand, and price range
- **Search Functionality**: Real-time product search
- **Pagination**: Efficient browsing with URL state management
- **Product Details**: Comprehensive product information pages

## 🚀 Deployment

### Build Process

```bash
npm run build
```

### Environment Variables

Ensure all required environment variables are configured for production.

### Recommended Platforms

- **Vercel**: Optimal for Next.js applications
- **Netlify**: Good alternative with i18n support
- **AWS Amplify**: Full-featured deployment platform

## 🤝 Contributing

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Standards

- TypeScript for type safety
- ESLint for code quality
- Prettier for code formatting
- Conventional commits

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js Team**: For the amazing React framework
- **Radix UI**: For accessible component primitives
- **Tailwind CSS**: For the utility-first CSS framework
- **Lucide**: For the beautiful icon library

## 📞 Support

For support and questions:

- **GitHub Issues**: [Create an issue](https://github.com/yourusername/antique-e-commerce-furniture/issues)
- **Email**: devmahmoud.me@gmail.com

---

**Built with ❤️ using Next.js 15 and modern web technologies**

This project represents a modern approach to e-commerce development, combining the latest web technologies with thoughtful internationalization and user experience design.
