# DGS Learning Platform - Codebase Architecture

## 🏗️ **Project Architecture Overview**

The DGS (Deutsche Gebärdensprache) Learning Platform is a modern Next.js 13+ application built with TypeScript, featuring a database-driven architecture for teaching German Sign Language through interactive vocabulary and testing systems.

## 📁 **Directory Structure**

```
dgs-platform/
├── 📄 Configuration Files
├── 📄 Development Tools
├── 📄 Documentation
├── 📄 Database Layer
├── 📄 Source Code
├── 📄 Testing Suite
├── 📄 Static Assets
└── 📄 Dependencies
```

---

## 🎯 **Core Architecture Components**

### **1. Application Framework (`src/app/`)**

#### **App Router Structure**
```
src/app/
├── layout.tsx              # Root layout with providers
├── page.tsx                # Landing page
├── globals.css             # Global styles
├── vocabulary/
│   └── page.tsx           # Vocabulary dictionary page
├── tests/
│   ├── page.tsx           # Tests listing
│   └── [id]/
│       └── page.tsx       # Individual test page
├── suggest/
│   └── page.tsx           # Suggestion system
├── impressum/
│   └── page.tsx           # Legal compliance page
└── api/                   # API routes
    ├── tests/
    │   ├── route.ts       # Tests API
    │   └── [id]/route.ts  # Individual test API
    ├── vocabulary/
    │   ├── level/route.ts # Vocabulary by level
    │   └── search/route.ts # Vocabulary search
    └── translations/
        └── route.ts       # UI translations API
```

**Key Features:**
- ✅ **Next.js 13+ App Router** - Modern routing with server components
- ✅ **Server-Side Rendering** - Optimized performance and SEO
- ✅ **API Routes** - Backend functionality within the app
- ✅ **Dynamic Routes** - `[id]` for individual resources
- ✅ **Edge Runtime** - Performance optimization for API routes

---

### **2. Component Architecture (`src/components/`)**

#### **Component Hierarchy**
```
src/components/
├── ui/                     # shadcn/ui base components
│   ├── button.tsx
│   ├── card.tsx
│   ├── badge.tsx
│   ├── progress.tsx
│   └── tabs.tsx
├── footer.tsx              # Site footer
├── theme-provider.tsx      # Dark theme context
├── language-provider.tsx   # Internationalization context
├── language-toggle.tsx     # Language switcher
├── level/
│   └── LevelSystem.tsx     # Level progression component
├── stats/
│   └── StatsDashboard.tsx  # Statistics dashboard
└── test/
    └── MultipleChoiceTest.tsx # Test interface
```

**Design Patterns:**
- ✅ **Compound Components** - Reusable UI patterns
- ✅ **Context Providers** - Global state management
- ✅ **Server/Client Components** - Optimal rendering strategy
- ✅ **Composition over Inheritance** - Flexible component design

---

### **3. Data Layer (`prisma/`)**

#### **Database Schema**
```prisma
// Core Models
model User              # Authentication framework
model Test              # Test containers
model Question          # Test questions
model Option            # Multiple choice answers
model Level             # Learning levels (1-10)
model Category          # Content organization
model Word              # Vocabulary items
model UserAchievement   # User progress tracking
model Translation       # UI internationalization
```

**Database Features:**
- ✅ **SQLite Database** - File-based, simple deployment
- ✅ **Prisma ORM** - Type-safe database access
- ✅ **Seeded Content** - 421 words, 31 tests, 78 translations
- ✅ **Relationships** - Proper foreign key constraints
- ✅ **Indexes** - Optimized query performance

---

### **4. State Management**

#### **Global State**
```typescript
// Language Context
const { language, t, setLanguage } = useLanguage()

// Theme Context  
const { theme, setTheme } = useTheme()

// Local Component State
const [selectedLevel, setSelectedLevel] = useState<number | null>(null)
const [searchResults, setSearchResults] = useState<any[]>([])
```

**State Patterns:**
- ✅ **React Context** - Language and theme management
- ✅ **Local State** - Component-specific data
- ✅ **Server State** - Database-driven via API routes
- ✅ **URL State** - Search params and routing

---

### **5. API Architecture**

#### **RESTful Endpoints**
```typescript
GET  /api/tests              # List all tests
GET  /api/tests/[id]         # Get specific test
GET  /api/vocabulary/level/[level]  # Vocabulary by level
GET  /api/vocabulary/search?q=query   # Search vocabulary
GET  /api/translations?lang=de        # UI translations
```

**API Features:**
- ✅ **TypeScript Types** - Full type safety
- ✅ **Error Handling** - Proper HTTP status codes
- ✅ **Data Validation** - Input sanitization
- ✅ **Performance** - Optimized queries with caching
- ✅ **Edge Runtime** - Fast global deployment

---

## 🎨 **UI/UX Architecture**

### **Design System**
- ✅ **Tailwind CSS** - Utility-first styling
- ✅ **shadcn/ui** - Professional component library
- ✅ **Dark Theme** - Complete dark mode support
- ✅ **Responsive Design** - Mobile-first approach
- ✅ **Accessibility** - ARIA labels and semantic HTML

### **Theme System**
```typescript
// Global Theme Provider
<ThemeProvider>
  <div className="dark">
    {/* App content */}
  </div>
</ThemeProvider>

// Dark Mode Classes
bg-gray-50 dark:bg-gray-900
text-gray-900 dark:text-white
border-gray-200 dark:border-gray-700
```

---

## 🌍 **Internationalization Architecture**

### **Translation System**
```typescript
// Database-Driven Translations
model Translation {
  key: String      // Translation key
  language: String // 'en' | 'de'
  value: String    // Translated text
}

// Usage in Components
const { t } = useLanguage()
<h1>{t('page_title')}</h1>
```

**i18n Features:**
- ✅ **78 Translation Keys** - Complete UI coverage
- ✅ **Database Storage** - Dynamic translation management
- ✅ **Fallback System** - Graceful degradation
- ✅ **Language Toggle** - Instant language switching
- ✅ **SEO Friendly** - Proper lang attributes

---

## 🧪 **Testing Architecture**

### **Test Structure**
```
tests/
├── tests.test.tsx          # Tests page tests
├── vocabulary.test.tsx     # Vocabulary page tests
└── jest.setup.js          # Jest configuration
```

**Testing Strategy:**
- ✅ **Unit Tests** - Component testing
- ✅ **Integration Tests** - API testing
- ✅ **E2E Testing** - User flow testing
- ✅ **Type Checking** - TypeScript compilation

---

## 🔧 **Development Workflow**

### **Build Process**
```bash
# Development
npm run dev              # Start development server

# Production
npm run build            # Build for production
npm start               # Start production server

# Database
npx prisma generate      # Generate Prisma client
npx prisma db seed      # Seed database
```

### **Code Quality**
- ✅ **TypeScript** - Static type checking
- ✅ **ESLint** - Code linting
- ✅ **Prettier** - Code formatting
- ✅ **Husky** - Git hooks (optional)

---

## 🚀 **Deployment Architecture**

### **Production Setup**
```bash
# Environment Variables
DATABASE_URL="file:./dev.db"
NODE_ENV="production"

# Build Configuration
next.config.js          # Next.js configuration
tailwind.config.ts      # Tailwind configuration
```

**Deployment Features:**
- ✅ **Static Generation** - Optimized build
- ✅ **Edge Runtime** - Global CDN deployment
- ✅ **Database Seeding** - Automated content setup
- ✅ **Environment Config** - Production settings

---

## 📊 **Performance Optimizations**

### **Optimization Strategies**
- ✅ **Code Splitting** - Automatic with Next.js
- ✅ **Image Optimization** - Next.js Image component
- ✅ **Font Optimization** - Next.js Font optimization
- ✅ **Caching** - API response caching
- ✅ **Bundle Analysis** - Optimized dependencies

---

## 🔐 **Security Architecture**

### **Security Measures**
- ✅ **Input Validation** - API route validation
- ✅ **SQL Injection Prevention** - Prisma ORM
- ✅ **XSS Protection** - React auto-escaping
- ✅ **CSRF Protection** - Next.js built-in
- ✅ **Environment Variables** - Secure configuration

---

## 📈 **Scalability Considerations**

### **Scalability Features**
- ✅ **Database Indexing** - Optimized queries
- ✅ **API Rate Limiting** - Prevent abuse
- ✅ **Caching Strategy** - Redis ready
- ✅ **Load Balancing** - Edge deployment ready
- ✅ **Monitoring** - Error tracking ready

---

## 🔄 **Future Architecture Enhancements**

### **Planned Improvements**
- 🔄 **User Authentication** - NextAuth.js integration
- 🔄 **Progress Tracking** - User analytics
- 🔄 **Video Content** - Optional video demonstrations
- 🔄 **Mobile App** - React Native
- 🔄 **API Versioning** - v2 API endpoints

---

## 📝 **Architecture Principles**

### **Design Principles**
1. **Database-First** - All content managed via database
2. **Type Safety** - Full TypeScript coverage
3. **Performance First** - Optimized for speed
4. **Accessibility** - WCAG compliant
5. **Maintainability** - Clean, documented code
6. **Scalability** - Built for growth

### **Code Organization**
- **Separation of Concerns** - Clear module boundaries
- **DRY Principle** - No code duplication
- **SOLID Principles** - Object-oriented design
- **Functional Programming** - Immutable data patterns

---

## 🎯 **Architecture Summary**

The DGS Learning Platform represents a modern, scalable web application built with industry best practices. The architecture prioritizes:

- **Performance** - Fast loading and smooth interactions
- **Maintainability** - Clean, documented codebase
- **Scalability** - Built for future growth
- **User Experience** - Intuitive, accessible interface
- **Developer Experience** - Modern tooling and workflows

This architecture provides a solid foundation for a production-ready educational platform that can grow and evolve with user needs.
