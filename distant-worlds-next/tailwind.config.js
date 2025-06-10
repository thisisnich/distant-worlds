/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary-color)',
        secondary: 'var(--secondary-color)',
        accent: 'var(--accent-color)',
        'accent-dark': '#07b5bb',
        dark: 'var(--bg-dark)',
        darker: 'var(--bg-darker)',
        light: 'var(--text-light)',
        muted: 'var(--text-muted)',
        cardBg: 'var(--card-bg)',
        cardBorder: 'var(--card-border)',
        success: 'var(--success-color)',
        warning: 'var(--warning-color)',
        danger: 'var(--danger-color)',
      },
      fontFamily: {
        'orbitron': ['var(--font-orbitron)', 'monospace'],
        'inter': ['var(--font-inter)', 'sans-serif'],
      },
      animation: {
        'stars-move': 'stars-move 60s linear infinite',
        'fadeInUp': 'fadeInUp 0.6s ease-out',
      },
      keyframes: {
        'stars-move': {
          'from': { transform: 'translateY(0)' },
          'to': { transform: 'translateY(-100px)' },
        },
        fadeInUp: {
          'from': {
            opacity: '0',
            transform: 'translateY(30px)',
          },
          'to': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
      backgroundImage: {
        'stars-gradient': 'linear-gradient(180deg, var(--bg-dark) 0%, var(--bg-darker) 100%)',
        'hero-gradient': 'linear-gradient(135deg, var(--primary-color), var(--accent-color))',
        'planet-name-gradient': 'linear-gradient(135deg, var(--text-light), var(--accent-color))',
      },
    },
  },
  plugins: [],
} 