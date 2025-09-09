import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
<<<<<<< HEAD
=======
			fontFamily: {
				sans: ['Inter', 'system-ui', 'sans-serif'],
			},
>>>>>>> 6ae5ed6 (Sync changes to Lovable)
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
<<<<<<< HEAD
				background: {
					DEFAULT: 'hsl(var(--background))',
					secondary: 'hsl(var(--background-secondary))'
				},
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
					light: 'hsl(var(--primary-light))',
					glow: 'hsl(var(--primary-glow))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))',
					button: 'hsl(var(--secondary-button))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))',
					light: 'hsl(var(--accent-light))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))',
					light: 'hsl(var(--destructive-light))'
				},
				success: {
					DEFAULT: 'hsl(var(--success))',
					foreground: 'hsl(var(--success-foreground))',
					light: 'hsl(var(--success-light))'
				},
				warning: {
					DEFAULT: 'hsl(var(--warning))',
					foreground: 'hsl(var(--warning-foreground))',
					light: 'hsl(var(--warning-light))'
				},
				pending: {
					DEFAULT: 'hsl(var(--pending))',
					foreground: 'hsl(var(--pending-foreground))',
					light: 'hsl(var(--pending-light))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))',
					dark: 'hsl(var(--muted-dark))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))',
					header: 'hsl(var(--card-header))'
=======
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: '#3C50E0',
					foreground: '#FFFFFF',
					light: '#5B6FE8',
					dark: '#2A3BC7',
					glow: 'rgba(60, 80, 224, 0.1)'
				},
				secondary: {
					DEFAULT: '#38BDF8',
					foreground: '#FFFFFF',
					light: '#5CC9F9',
					dark: '#0EA5E9',
					button: '#E0F2FE'
				},
				accent: {
					DEFAULT: '#F97316',
					foreground: '#FFFFFF',
					light: '#FB8B3D',
					dark: '#EA580C'
				},
				destructive: {
					DEFAULT: '#EF4444',
					foreground: '#FFFFFF',
					light: '#F87171',
					dark: '#DC2626'
				},
				success: {
					DEFAULT: '#10B981',
					foreground: '#FFFFFF',
					light: '#34D399',
					dark: '#059669'
				},
				warning: {
					DEFAULT: '#F59E0B',
					foreground: '#FFFFFF',
					light: '#FBBF24',
					dark: '#D97706'
				},
				pending: {
					DEFAULT: '#8B5CF6',
					foreground: '#FFFFFF',
					light: '#A78BFA',
					dark: '#7C3AED'
				},
				muted: {
					DEFAULT: '#F1F5F9',
					foreground: '#64748B',
					dark: '#E2E8F0'
				},
				popover: {
					DEFAULT: '#FFFFFF',
					foreground: '#1E293B'
				},
				card: {
					DEFAULT: '#FFFFFF',
					foreground: '#1E293B',
					header: '#F8FAFC'
>>>>>>> 6ae5ed6 (Sync changes to Lovable)
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;