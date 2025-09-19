// Couleurs standardisées pour tous les dashboards
export const DASHBOARD_COLORS = {
  // Couleurs principales BizliSolution
  primary: '#4B2AAD',
  primaryHover: '#3B1F8B',
  
  // Couleurs des sections (identiques Admin et Business)
  appointments: {
    bg: '#F59E0B',
    hover: '#D97706'
  },
  messages: {
    bg: '#8B5CF6', 
    hover: '#7C3AED'
  },
  notifications: {
    bg: '#EF4444',
    hover: '#DC2626'
  },
  
  // Couleurs des statuts (pour badges uniquement)
  status: {
    confirmed: '#10B981',
    pending: '#F59E0B', 
    cancelled: '#EF4444',
    completed: '#4B2AAD',
    active: '#10B981',
    suspended: '#EF4444'
  },
  
  // Couleurs neutres
  neutral: {
    bg: '#64748B',
    hover: '#475569',
    text: '#374151',
    muted: '#64748B',
    light: '#F8FAFC'
  }
};

// Classes Tailwind correspondantes
export const DASHBOARD_CLASSES = {
  appointments: {
    button: 'bg-[#F59E0B] hover:bg-[#D97706]',
    status: 'bg-[#F59E0B] text-white'
  },
  messages: {
    button: 'bg-[#8B5CF6] hover:bg-[#7C3AED]', 
    status: 'bg-[#8B5CF6] text-white'
  },
  notifications: {
    button: 'bg-[#EF4444] hover:bg-[#DC2626]',
    status: 'bg-[#EF4444] text-white'
  },
  
  // Statuts standardisés
  confirmed: 'bg-[#10B981] text-white',
  pending: 'bg-[#F59E0B] text-white',
  cancelled: 'bg-[#EF4444] text-white', 
  completed: 'bg-[#4B2AAD] text-white',
  active: 'bg-[#10B981] text-white',
  suspended: 'bg-[#EF4444] text-white'
};
