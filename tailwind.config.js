module.exports = {
content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
],
theme: {
    extend: {
    fontFamily: {
        sans: ['Space Grotesk', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
    },
    colors: {
        crypto: {
        neon: '#00FFB2',
        cyan: '#00F0FF',
        purple: '#9D00FF',
        magenta: '#FF00FF',
        dark: {
            DEFAULT: '#0A0B0E',
            deeper: '#050607',
        },
        light: '#E6E7EB',
        },
        legacy: {
        'robinhood-green': '#00C805',
        'robinhood-dark': '#1E1F25',
        'robinhood-light': '#F5F5F5',
        }
    },
    backgroundImage: {
        'glow-conic': 'conic-gradient(from 180deg at 50% 50%, #00FFB2 0deg, #00F0FF 90deg, #9D00FF 180deg, #FF00FF 270deg, #00FFB2 360deg)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-neon': 'linear-gradient(to right, #00FFB2, #00F0FF)',
    },
    boxShadow: {
        'neon': '0 0 20px rgba(0, 255, 178, 0.5)',
        'neon-strong': '0 0 30px rgba(0, 255, 178, 0.8)',
    },
    },
},
plugins: [],
};
