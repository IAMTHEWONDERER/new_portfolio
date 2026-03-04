// tailwind.config.js — Apollo Monochrome Theme
import { fontFamily } from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // --- Neutrals ---
        abyss:   '#080808',
        deep:    '#111111',
        surface: '#1A1A1A',
        ridge:   '#262626',
        muted:   '#404040',
        smoke:   '#8A8A8A',
        ash:     '#C2C2C2',
        stellar: '#F0F0F0',

        // --- Gold ---
        gold: {
          deep:   '#7A5C1E',
          DEFAULT:'#C9921A',
          mid:    '#D4A843',
          bright: '#E8C56A',
        },

        // --- Signal Red ---
        signal: {
          DEFAULT:'#C0392B',
          bright: '#E74C3C',
        },
      },

      fontFamily: {
        display: ['"Cormorant Garamond"', ...fontFamily.serif],
        ui:      ['"Barlow Condensed"',  ...fontFamily.sans],
        body:    ['"Lato"',              ...fontFamily.sans],
        mono:    ['"IBM Plex Mono"',     ...fontFamily.mono],
      },

      fontSize: {
        hero:    ['6rem',   { lineHeight: '1',    letterSpacing: '-0.02em', fontWeight: '700' }],
        display: ['3.5rem', { lineHeight: '1.1',  letterSpacing: '-0.01em', fontWeight: '600' }],
        h1:      ['2.5rem', { lineHeight: '1.15', letterSpacing: '0.04em',  fontWeight: '700' }],
        h2:      ['1.75rem',{ lineHeight: '1.2',  letterSpacing: '0.04em',  fontWeight: '600' }],
        h3:      ['1.25rem',{ lineHeight: '1.3',  fontWeight: '600' }],
        label:   ['0.7rem', { lineHeight: '1',    letterSpacing: '0.1em',   fontWeight: '700' }],
      },

      borderRadius: {
        sharp: '2px',
        sm:    '4px',
        md:    '6px',
        lg:    '10px',
        xl:    '16px',
        full:  '9999px',
      },

      boxShadow: {
        'gold':        '0 0 24px rgba(201, 146, 26, 0.25)',
        'gold-lg':     '0 0 48px rgba(201, 146, 26, 0.35)',
        'signal':      '0 0 20px rgba(231, 76, 60, 0.3)',
        'panel':       '0 2px 16px rgba(0,0,0,0.6)',
        'panel-gold':  '0 0 32px rgba(201,146,26,0.08), inset 0 1px 0 rgba(232,197,106,0.05)',
      },

      animation: {
        'float':       'float 7s ease-in-out infinite',
        'twinkle':     'twinkle 4s ease-in-out infinite',
        'gold-pulse':  'goldPulse 3s ease-in-out infinite',
        'fade-up':     'fadeUp 0.5s cubic-bezier(0.25, 0, 0, 1) forwards',
        'gold-wipe':   'goldWipe 0.8s cubic-bezier(0.25, 0, 0, 1) forwards',
        'scan-line':   'scanLine 3s linear infinite',
      },

      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%':      { transform: 'translateY(-18px) rotate(1deg)' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.9' },
          '50%':      { opacity: '0.2' },
        },
        goldPulse: {
          '0%, 100%': { boxShadow: '0 0 16px rgba(201,146,26,0.2)' },
          '50%':      { boxShadow: '0 0 36px rgba(201,146,26,0.5)' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        goldWipe: {
          from: { width: '0%', opacity: '0' },
          to:   { width: '100%', opacity: '1' },
        },
        scanLine: {
          '0%':   { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
      },
    },
  },
  plugins: [],
}
