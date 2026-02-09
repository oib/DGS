# DGS Learning Platform

Eine moderne Lernplattform für Deutsche Gebärdensprache (DGS) mit interaktivem Vokabular, Tests und strukturiertem Lernfortschritt.

A modern learning platform for German Sign Language (DGS) with interactive vocabulary, tests, and structured learning progression.

## 🎯 **Features | Merkmale**

### **📚 Vocabulary Dictionary | Vokabular-Wörterbuch**
- **421 DGS Words** across 10 proficiency levels
- **48 Categories** organized by themes and difficulty
- **Real-time Search** with case-insensitive matching
- **Bilingual Support** (German/English)
- **Detailed Descriptions** Step-by-step sign explanations

### **🧪 Interactive Testing | Interaktive Tests**
- **31 Comprehensive Tests** covering all levels
- **245 Questions** with real vocabulary content
- **Multiple Choice** with immediate feedback
- **Performance Tracking** Score and progress analytics
- **Level-based Organization** Beginner to expert

### **🌍 Internationalization | Internationalisierung**
- **Database-driven Translations** with 78 UI keys
- **Language Toggle** Instant switching between EN/DE
- **Fallback System** Graceful degradation
- **SEO Friendly** Proper language attributes

### **🎨 Modern UI/UX | Moderne Benutzeroberfläche**
- **Dark Theme Support** Complete dark mode implementation
- **Responsive Design** Mobile-first approach
- **Accessibility** WCAG compliant with ARIA labels
- **Professional Components** shadcn/ui component library
- **Smooth Animations** Subtle micro-interactions

### **⚖️ Legal Compliance | Rechtliche Konformität**
- **Impressum Page** German legal requirements
- **Contact Information** Professional contact details
- **Privacy Policy** Data protection statement
- **Professional Footer** Company information and links

## 🚀 **Quick Start | Schnellstart**

### **🌐 Live Demo | Live-Demo**
- **Live Site**: [dgs.bubuit.net](https://dgs.bubuit.net)
- **GitHub**: [github.com/oib/DGS](https://github.com/oib/DGS)

### **Prerequisites | Voraussetzungen**
- Node.js 18+ 
- npm or yarn
- SQLite (included)

### **Installation | Installation**
```bash
# Clone the repository
git clone https://github.com/oib/DGS.git
cd DGS

# Install dependencies
npm install

# Setup database
npx prisma generate
npx prisma db seed

# Start development server
npm run dev
```

### **Access | Zugriff**
- **Development**: `http://localhost:3100`
- **Production**: Deploy to Vercel, Netlify, or any Node.js host

## 🏗️ **Technology Stack | Technologischer Stack**

### **Frontend**
- **Next.js 13+** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **shadcn/ui** component library
- **Lucide React** icons

### **Backend**
- **SQLite** database with Prisma ORM
- **API Routes** built into Next.js
- **Edge Runtime** for optimal performance
- **Database-driven architecture**

### **Development Tools**
- **ESLint** for code quality
- **Jest** for testing
- **Prisma** for database management
- **Service scripts** for deployment

## 📊 **Project Statistics | Projektstatistiken**

| Category | Amount | Status |
|----------|--------|--------|
| DGS Words | 421 | ✅ Complete |
| Learning Levels | 10 | ✅ Complete |
| Tests | 31 | ✅ Complete |
| Questions | 245 | ✅ Complete |
| Translation Keys | 78 | ✅ Complete |
| API Endpoints | 5 | ✅ Complete |
| UI Components | 15+ | ✅ Complete |

## 📁 **Project Structure | Projektstruktur**

```
dgs-platform/
├── src/app/                 # Next.js App Router pages
├── src/components/          # React components
├── src/lib/                # Utility functions
├── prisma/                 # Database schema and seeds
├── docs/                   # Documentation
├── tests/                  # Test files
├── public/                 # Static assets
└── scripts/                # Development tools
```

## 🎨 **Screenshots | Screenshots**

### **Landing Page | Startseite**
- Modern gradient design with dark theme support
- Navigation to vocabulary, tests, and suggestions
- Language toggle and professional footer

### **Vocabulary Dictionary | Vokabular-Wörterbuch**
- Level-based organization (1-10)
- Category filtering and search functionality
- Detailed word descriptions with bilingual support

### **Interactive Tests | Interaktive Tests**
- Multiple choice questions with real vocabulary
- Performance tracking and score display
- Level progression system

## 🔧 **Development | Entwicklung**

### **Available Scripts | Verfügbare Skripte**
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm test             # Run tests
npm run lint         # Run ESLint
```

### **Database Management | Datenbankverwaltung**
```bash
npx prisma generate   # Generate Prisma client
npx prisma db seed   # Seed database with content
npx prisma studio    # Open database GUI
```

### **Service Management | Dienstverwaltung**
```bash
./service.sh start    # Start development server
./service.sh stop     # Stop server
./service.sh restart  # Restart server
./service.sh status   # Check status
./service.sh logs     # View logs
```

## 🌐 **API Endpoints**

### **Vocabulary API**
- `GET /api/vocabulary/level/{level}` - Get vocabulary by level
- `GET /api/vocabulary/search?q={query}` - Search vocabulary

### **Tests API**
- `GET /api/tests` - List all tests
- `GET /api/tests/{id}` - Get specific test

### **Translations API**
- `GET /api/translations?lang={language}` - Get UI translations

## 🎯 **Learning Path | Lernpfad**

### **Level Progression | Level-Fortschritt**
1. **Level 1-2**: Basic communication foundation
2. **Level 3-4**: Everyday conversations
3. **Level 5-6**: Advanced vocabulary
4. **Level 7-8**: Professional terminology
5. **Level 9-10**: Expert level proficiency

### **Categories | Kategorien**
- **Basic Communication** | Grundlegende Kommunikation
- **Everyday Life** | Alltagssituationen
- **People & Family** | Menschen & Familie
- **Food & Drink** | Essen & Trinken
- **Time & Weather** | Zeit & Wetter
- **And 43 more categories** | Und 43 weitere Kategorien

## 🔐 **Security | Sicherheit**

- **Input Validation** on all API endpoints
- **SQL Injection Prevention** via Prisma ORM
- **XSS Protection** with React auto-escaping
- **Environment Variables** for sensitive data
- **TypeScript** for compile-time safety

## 📱 **Browser Support | Browser-Unterstützung**

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers

## 🤝 **Contributing | Mitwirken**

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 **License | Lizenz**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 **Contact | Kontakt**

- **Author**: Andreas Michael Fleckl
- **Email**: andreas.fleckl@bubuit.net
- **Website**: [bubuit.net](https://bubuit.net)
- **Address**: Johnstraße 7/6, 1140 Vienna, Austria

## 🙏 **Acknowledgments | Danksagungen**

- **Next.js Team** for the excellent framework
- **Prisma Team** for the amazing ORM
- **Tailwind CSS** for the utility-first CSS framework
- **shadcn/ui** for the beautiful component library
- **German Sign Language Community** for vocabulary and guidance

---

**Made with ❤️ and Windsurf | Mit ❤️ und Windsurf gemacht**

[![Built with Windsurf](https://windsurf.com/refer?referral_code=4j75hl1x7ibz3yj8)](https://windsurf.com/refer?referral_code=4j75hl1x7ibz3yj8)
