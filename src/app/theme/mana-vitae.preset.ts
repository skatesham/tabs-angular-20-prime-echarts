import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

/**
 * Mana Vitae Theme Preset
 * Baseado na frequência 528 Hz (Amor/Motivação)
 * Cor base: #8effb8 (Verde Esmeralda)
 */
export const ManaVitaePreset = definePreset(Aura, {
  semantic: {
    // Cores primárias - Verde Esmeralda
    primary: {
      50: '#f0fdf7',
      100: '#ecfdf5',
      200: '#d1fae5',
      300: '#a7f3d0',
      400: '#6ee7b7',
      500: '#34d399',
      600: '#10b981',
      700: '#059669',
      800: '#047857',
      900: '#065f46',
      950: '#064e3b'
    },
    
    // Color Scheme - Light & Dark
    colorScheme: {
      light: {
        // Superfícies
        surface: {
          0: '#ffffff',
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
          950: '#030712'
        },
        
        // Cores primárias no contexto light
        primary: {
          color: '#10b981',
          contrastColor: '#ffffff',
          hoverColor: '#059669',
          activeColor: '#047857'
        },
        
        // Highlight (destaques)
        highlight: {
          background: '#ecfdf5',
          focusBackground: '#d1fae5',
          color: '#065f46',
          focusColor: '#047857'
        },
        
        // Form fields
        formField: {
          background: '#ffffff',
          disabledBackground: '#f3f4f6',
          filledBackground: '#f9fafb',
          filledFocusBackground: '#ffffff',
          borderColor: '#a7f3d0',
          hoverBorderColor: '#6ee7b7',
          focusBorderColor: '#10b981',
          invalidBorderColor: '#ef4444',
          color: '#374151',
          disabledColor: '#9ca3af',
          placeholderColor: '#6b7280',
          floatLabelColor: '#6b7280',
          floatLabelFocusColor: '#10b981',
          floatLabelInvalidColor: '#ef4444',
          iconColor: '#6b7280',
          shadow: '0 0 0 0.2rem rgba(16, 185, 129, 0.2)'
        },
        
        // Text colors
        text: {
          color: '#374151',
          hoverColor: '#1f2937',
          mutedColor: '#6b7280',
          hoverMutedColor: '#4b5563'
        }
      },
      
      dark: {
        // Superfícies dark mode
        surface: {
          0: '#ffffff',
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617'
        },
        
        // Cores primárias no contexto dark
        primary: {
          color: '#34d399',
          contrastColor: '#0f172a',
          hoverColor: '#6ee7b7',
          activeColor: '#8effb8'
        },
        
        // Highlight dark mode
        highlight: {
          background: 'rgba(52, 211, 153, 0.16)',
          focusBackground: 'rgba(110, 231, 183, 0.24)',
          color: '#8effb8',
          focusColor: '#a7f3d0'
        },
        
        // Form fields dark mode
        formField: {
          background: '#1e293b',
          disabledBackground: '#0f172a',
          filledBackground: '#1e293b',
          filledFocusBackground: '#334155',
          borderColor: '#475569',
          hoverBorderColor: '#64748b',
          focusBorderColor: '#34d399',
          invalidBorderColor: '#ef4444',
          color: '#d1d5db',
          disabledColor: '#64748b',
          placeholderColor: '#94a3b8',
          floatLabelColor: '#94a3b8',
          floatLabelFocusColor: '#34d399',
          floatLabelInvalidColor: '#ef4444',
          iconColor: '#94a3b8',
          shadow: '0 0 0 0.2rem rgba(52, 211, 153, 0.2)'
        },
        
        // Text colors dark mode
        text: {
          color: '#d1d5db',
          hoverColor: '#f3f4f6',
          mutedColor: '#9ca3af',
          hoverMutedColor: '#d1d5db'
        }
      }
    }
  },
  
  // Componentes específicos - Configurações simplificadas
  components: {
    // Cards - Estilos básicos (glassmorphism está no SCSS)
    card: {
      colorScheme: {
        light: {
          root: {
            background: 'rgba(255, 255, 255, 0.85)',
            color: '{surface.700}'
          },
          subtitle: {
            color: '{surface.500}'
          }
        },
        dark: {
          root: {
            background: 'rgba(30, 41, 59, 0.75)',
            color: '{surface.0}'
          },
          subtitle: {
            color: '{surface.400}'
          }
        }
      }
    }
  }
});
