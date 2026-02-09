# DGS Learning Platform - File Structure & Organization

## 📁 **Project File Structure**

### **🏗️ Core Configuration Files**

| File | Purpose | Status |
|------|---------|--------|
| `package.json` | Node.js dependencies and scripts | ✅ Essential |
| `next.config.js` | Next.js configuration | ✅ Essential |
| `tsconfig.json` | TypeScript configuration | ✅ Essential |
| `tailwind.config.ts` | Tailwind CSS configuration | ✅ Essential |
| `next-env.d.ts` | Next.js TypeScript definitions | ✅ Essential |
| `jest.config.js` | Jest testing configuration | ✅ Essential |
| `tsconfig.tsbuildinfo` | TypeScript build cache | ✅ Auto-generated |

### **🗃️ Database & Seeding Files**

| File | Purpose | Status |
|------|---------|--------|
| `prisma/schema.prisma` | Database schema definition | ✅ Essential |
| `prisma/dev.db` | SQLite database file | ✅ Essential |
| `prisma/seed.ts` | Main database seeding script | ✅ Essential |
| `prisma/seed_tests.js` | Test data seeding script | ✅ Essential |
| `prisma/seed_translations.js` | Translation data seeding | ✅ Essential |
| `prisma/add_suggestion_translations.js` | Additional translations | ✅ Essential |
| `prisma/smart_seed.js` | Enhanced seeding script | ✅ Essential |

### **🎨 Source Code Structure**

#### **📱 App Router Pages (`src/app/`)**
| File/Directory | Purpose | Status |
|----------------|---------|--------|
| `src/app/layout.tsx` | Root layout wrapper | ✅ Essential |
| `src/app/page.tsx` | Landing/home page | ✅ Essential |
| `src/app/globals.css` | Global styles | ✅ Essential |
| `src/app/vocabulary/page.tsx` | Vocabulary dictionary | ✅ Essential |
| `src/app/tests/page.tsx` | Tests listing page | ✅ Essential |
| `src/app/tests/[id]/page.tsx` | Individual test page | ✅ Essential |
| `src/app/suggest/page.tsx` | Suggestion system | ✅ Essential |
| `src/app/impressum/page.tsx` | Legal compliance page | ✅ Essential |

#### **🔌 API Routes (`src/app/api/`)**
| File/Directory | Purpose | Status |
|----------------|---------|--------|
| `src/app/api/tests/route.ts` | Tests API endpoint | ✅ Essential |
| `src/app/api/tests/[id]/route.ts` | Individual test API | ✅ Essential |
| `src/app/api/vocabulary/level/route.ts` | Vocabulary by level API | ✅ Essential |
| `src/app/api/vocabulary/search/route.ts` | Vocabulary search API | ✅ Essential |
| `src/app/api/translations/route.ts` | Translations API | ✅ Essential |

#### **🧩 Components (`src/components/`)**
| File/Directory | Purpose | Status |
|----------------|---------|--------|
| `src/components/footer.tsx` | Site footer component | ✅ Essential |
| `src/components/theme-provider.tsx` | Dark theme provider | ✅ Essential |
| `src/components/language-provider.tsx` | Language context provider | ✅ Essential |
| `src/components/language-toggle.tsx` | Language switcher | ✅ Essential |
| `src/components/ui/` | shadcn/ui components | ✅ Essential |
| `src/components/level/LevelSystem.tsx` | Level system component | ✅ Essential |
| `src/components/stats/StatsDashboard.tsx` | Statistics dashboard | ✅ Essential |
| `src/components/test/MultipleChoiceTest.tsx` | Test component | ✅ Essential |

#### **🔧 Utilities & Data (`src/`)**
| File/Directory | Purpose | Status |
|----------------|---------|--------|
| `src/lib/utils.ts` | Utility functions | ✅ Essential |
| `src/data/dgsVocabulary.ts` | Legacy vocabulary data | ⚠️ Legacy |

### **🧪 Testing Files**

| File/Directory | Purpose | Status |
|----------------|---------|--------|
| `tests/tests.test.tsx` | Tests page tests | ✅ Essential |
| `tests/vocabulary.test.tsx` | Vocabulary page tests | ✅ Essential |
| `tests/jest.setup.js` | Jest test setup | ✅ Essential |

### **📚 Documentation Files**

| File/Directory | Purpose | Status |
|----------------|---------|--------|
| `docs/done.md` | Completed features documentation | ✅ Essential |
| `docs/roadmap.md` | Project roadmap & progress | ✅ Essential |
| `docs/DATABASE_SETUP.md` | Database setup guide | ✅ Essential |
| `docs/IMPLEMENTATION.md` | Implementation details | ✅ Essential |
| `docs/NO_VIDEO_SETUP.md` | Text-based implementation guide | ✅ Essential |

### **🛠️ Development Tools**

| File/Directory | Purpose | Status |
|----------------|---------|--------|
| `service.sh` | Service management script | ✅ Essential |
| `SERVICE.md` | Service documentation | ✅ Essential |
| `check_missing_words.js` | Vocabulary analysis tool | ✅ Essential |
| `generate_comprehensive_vocabulary.py` | Vocabulary generation script | ✅ Essential |

### **🌐 Static Assets**

| File/Directory | Purpose | Status |
|----------------|---------|--------|
| `public/favicon.ico` | Site favicon | ✅ Essential |

---

## 🗑️ **Files & Directories to Delete**

### **❌ Empty Directories (Should be Deleted)**
```
data/                    # Empty - not used
scripts/                 # Empty - not used  
logs/                    # Empty - not used
src/backend/             # Empty - not used (Next.js app router)
src/frontend/            # Empty - not used (Next.js app router)
src/pages/               # Empty - not used (Next.js app router)
src/utils/               # Empty - not used
```

### **⚠️ Legacy Files (Should be Deleted)**
```
src/data/dgsVocabulary.ts  # Legacy - replaced by database-driven approach
```

### **🔄 Files in Wrong Location (Should be Moved)**

| Current Location | Should Move To | Reason |
|------------------|----------------|--------|
| `check_missing_words.js` | `scripts/check_missing_words.js` | Development scripts belong in scripts folder |
| `generate_comprehensive_vocabulary.py` | `scripts/generate_comprehensive_vocabulary.py` | Development scripts belong in scripts folder |
| `SERVICE.md` | `docs/SERVICE.md` | Documentation belongs in docs folder |

---

## 📋 **Recommended Actions**

### **1. Delete Empty Directories**
```bash
rmdir data scripts logs src/backend src/frontend src/pages src/utils
```

### **2. Delete Legacy Files**
```bash
rm src/data/dgsVocabulary.ts
```

### **3. Move Development Scripts**
```bash
mkdir -p scripts
mv check_missing_words.js scripts/
mv generate_comprehensive_vocabulary.py scripts/
```

### **4. Move Documentation**
```bash
mv SERVICE.md docs/
```

### **5. Update Import References**
- Update any imports referencing `src/data/dgsVocabulary.ts`
- Update script paths in package.json if referenced
- Update any documentation links to SERVICE.md

---

## 🎯 **Final Clean Structure**

After cleanup, the project will have:
- ✅ **No empty directories**
- ✅ **No legacy files**
- ✅ **Proper file organization**
- ✅ **Clear separation of concerns**
- ✅ **Maintainable structure**

The cleaned structure follows Next.js 13+ App Router best practices with proper separation between source code, configuration, documentation, and development tools.
