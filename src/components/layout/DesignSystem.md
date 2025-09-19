# Dashboard Design System

## Overview
Ce système de design unifie l'apparence et le comportement des dashboards principaux de l'application (Appointments, Messages, Business Search) avec une approche mobile-first.

## Composants Principaux

### DashboardLayout
Container principal qui définit la structure globale des dashboards.
- **Background**: `#F8FAFC` (gris très clair)
- **Responsive**: Mobile-first avec breakpoints sm/md/lg
- **Spacing**: Cohérent avec Tailwind CSS

### DashboardHeader
Header sticky avec titre, sous-titre et actions.
- **Background**: Blanc avec ombre subtile
- **Typography**: H1 pour le titre, Subtitle pour la description
- **Actions**: Flexbox avec gap cohérent
- **Mobile**: Stack vertical sur petits écrans

### DashboardSection
Sections modulaires avec variants flexibles.

#### Variants:
- **default**: Section avec fond blanc et bordure
- **card**: Card avec shadow et padding
- **minimal**: Section sans décoration

#### Padding Options:
- **none**: Pas de padding
- **sm**: `p-3`
- **md**: `p-4 sm:p-6` (défaut)
- **lg**: `p-6 sm:p-8`

### DashboardStats
Grille responsive pour afficher des métriques.
- **Grid**: 2 colonnes sur mobile, jusqu'à 5 sur desktop
- **Cards**: Blanc avec ombre subtile
- **Icons**: Support des couleurs personnalisées
- **Hover**: Effet shadow pour l'interactivité

### DashboardContent
Container principal pour le contenu avec espacement cohérent.
- **Padding**: `px-4 sm:px-6 py-4 sm:py-6`
- **Spacing**: `space-y-4 sm:space-y-6`

## Hiérarchie Typographique

### Titres
- **H1**: `text-2xl sm:text-3xl font-bold` - Titres de dashboard
- **H2**: `text-lg sm:text-xl font-semibold` - Titres de section
- **H3**: `text-base sm:text-lg font-semibold` - Sous-titres
- **H4**: `text-sm sm:text-base font-semibold` - Titres de cartes

### Corps de Texte
- **P**: `text-sm sm:text-base text-[#374151]` - Texte principal
- **Subtitle**: `text-sm sm:text-base text-[#64748B]` - Descriptions
- **Small**: `text-xs sm:text-sm text-[#64748B]` - Labels, captions
- **Muted**: `text-xs text-[#9CA3AF]` - Texte très discret

### Spécialisés
- **StatNumber**: `text-xl sm:text-2xl font-bold` - Chiffres/métriques
- **StatusText**: Texte avec couleurs selon le statut
- **Code**: Texte monospace avec fond gris

## Palette de Couleurs

### Couleurs Principales
- **Primary**: `#4B2AAD` - Violet de marque
- **Secondary**: `#38BDF8` - Bleu secondaire
- **Accent**: `#F97316` - Orange accent

### Couleurs Fonctionnelles
- **Success**: `#10B981` - Vert pour succès
- **Warning**: `#F59E0B` - Orange pour attention
- **Error**: `#EF4444` - Rouge pour erreurs
- **Info**: `#4B2AAD` - Violet pour informations

### Couleurs de Texte
- **Primary Text**: `#1A1A1A` - Noir principal
- **Secondary Text**: `#374151` - Gris foncé
- **Muted Text**: `#64748B` - Gris moyen
- **Light Text**: `#9CA3AF` - Gris clair

### Couleurs de Fond
- **Background**: `#F8FAFC` - Fond principal
- **Card**: `#FFFFFF` - Fond des cartes
- **Border**: `#E5E7EB` - Bordures

## Espacement et Layout

### Breakpoints
- **Mobile**: `< 640px`
- **Tablet**: `640px - 1024px`
- **Desktop**: `> 1024px`

### Espacements Standards
- **Micro**: `gap-1` (4px)
- **Small**: `gap-2` (8px)
- **Medium**: `gap-3` (12px) / `gap-4` (16px)
- **Large**: `gap-6` (24px)
- **XLarge**: `gap-8` (32px)

### Padding Cohérent
- **Cards**: `p-4 sm:p-6`
- **Sections**: `p-4 sm:p-6`
- **Content**: `px-4 sm:px-6 py-4 sm:py-6`

## Composants d'Interface

### Boutons
- **Primary**: `bg-[#4B2AAD] text-white`
- **Secondary**: `border-[#4B2AAD] text-[#4B2AAD]`
- **Ghost**: Transparent avec hover
- **Sizes**: sm, md (défaut), lg

### Cards
- **Shadow**: `shadow-sm` avec `hover:shadow-md`
- **Border**: `border-[#E5E7EB]`
- **Radius**: `rounded-lg`
- **Background**: `bg-white`

### Inputs
- **Border**: `border-[#E5E7EB]`
- **Focus**: `focus:border-[#4B2AAD]`
- **Height**: `h-10` (standard)
- **Padding**: `px-3 py-2`

## Patterns d'Interaction

### Hover Effects
- **Cards**: Scale légère `hover:scale-[1.01]`
- **Buttons**: Changement de couleur
- **Links**: Couleur et underline

### Focus States
- **Keyboard**: Ring visible `focus:ring-2 focus:ring-[#4B2AAD]`
- **Color**: Cohérent avec la marque

### Loading States
- **Spinner**: `animate-spin` avec couleur de marque
- **Skeleton**: Fond gris animé
- **Text**: Messages informatifs

## Responsive Design

### Mobile-First Approach
1. Design pour mobile d'abord
2. Progressive enhancement pour tablette
3. Optimisation desktop en dernier

### Grid Systems
- **Stats**: `grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5`
- **Cards**: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`
- **Layout**: Flexbox avec direction responsive

### Typography Scale
- **Mobile**: Tailles plus petites
- **Desktop**: Tailles plus grandes via `sm:` prefixes

## Accessibilité

### Contraste
- **WCAG AA**: Ratio minimum 4.5:1
- **Text**: Couleurs testées pour la lisibilité
- **Interactive**: Couleurs distinctes pour les états

### Navigation
- **Keyboard**: Tous les éléments accessibles
- **Screen Readers**: ARIA labels appropriés
- **Focus**: Indicateurs visibles

### Touch Targets
- **Minimum**: 44px x 44px
- **Spacing**: Gap suffisant entre éléments
- **Mobile**: Optimisé pour les doigts

## Usage

### Import
```tsx
import { 
  DashboardLayout, 
  DashboardHeader, 
  DashboardSection, 
  DashboardStats, 
  DashboardContent 
} from '@/components/layout/DashboardLayout';
```

### Structure Type
```tsx
<DashboardLayout>
  <DashboardHeader title="..." subtitle="..." actions={...} />
  <DashboardSection variant="minimal">
    <DashboardStats stats={...} />
  </DashboardSection>
  <DashboardContent>
    <DashboardSection title="..." variant="card">
      {/* Contenu */}
    </DashboardSection>
  </DashboardContent>
</DashboardLayout>
```

## Maintenance

### Cohérence
- Utiliser les composants du design system
- Respecter la hiérarchie typographique
- Maintenir les espacements standards

### Évolution
- Nouveaux composants basés sur les patterns existants
- Tests responsive systématiques
- Documentation mise à jour
