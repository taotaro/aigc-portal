import { nextui } from '@nextui-org/react'
import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/layouts/**/*.{js,ts,jsx,tsx,mdx}',
        './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                'p-base': 'var(--e-primary-base)',
                'p-500': 'var(--e-primary-500)',
                'p-400': 'var(--e-primary-400)',
                'p-300': 'var(--e-primary-300)',
                'p-200': 'var(--e-primary-200)',
                'p-100': 'var(--e-primary-100)',
                'a-base': 'var(--e-accent-base)',
                't-base': 'var(--e-text-base)',
                't-300': 'var(--e-text-300)',
                't-200': 'var(--e-text-200)',
                't-100': 'var(--e-text-100)',
                'b-base': 'var(--e-bg-base)',
                'b-100': 'var(--e-bg-100)',
                'w-base': 'var(--e-warning-base)',
                'w-100': 'var(--e-warning-100)',
                'e-base': 'var(--e-error-base)'
            },
            keyframes: {
                "loading-word-bounce": {
                    '0%,20%, 50%, 80%, 100%': { transform: 'translateY(0)' },
                    '40%': { transform: 'translateY(-20px)' },
                    '60%': { transform: 'translateY(-10px)' },
                }
            },
            animation: {
                "loading-word-bounce": 'loading-word-bounce 2s ease-in-out infinite alternate'
            }
        },
    },
    plugins: [
        nextui()
    ],
}
export default config
