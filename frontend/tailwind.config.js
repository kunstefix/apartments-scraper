/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

const round = num =>
  num
    .toFixed(7)
    .replace(/(\.[0-9]+?)0+$/, '$1')
    .replace(/\.0$/, '')

const rem = px => `${round(px / 16)}rem`
const unitless = (lineHeight, fontSize) => `${lineHeight / fontSize}/* ${lineHeight}px */`

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#FFFFFF',
      black: '#000000',
      orange: {
        DEFAULT: '#F7643B',
        50: '#FEFFEB',
        100: '#FDE0D8',
        150: '#FDD1C4',
        200: '#FCC1B1',
        300: '#FAA289',
        400: '#F98362',
        600: '#F7643B'
      },
      purple: {
        DEFAULT: '#7B5DD4',
        50: '#F6F3FD',
        100: '#EDE8FC',
        200: '#DAD0F8',
        300: '#C8B9F5',
        400: '#B5A1F1',
        500: '#A38AEE',
        600: '#7B5DD4',
        700: '#433863'
      },
      neutral: {
        50: '#F4F4F3',
        100: '#EDEDEB',
        150: '#E4E4E1',
        200: '#DBDBD7',
        300: '#C8C8C3',
        400: '#B6B6AF',
        500: '#A4A49B',
        600: '#85857E',
        700: '#676761',
        800: '#494945',
        850: '#2A2A28',
        900: '#1B1B19'
      },
      green: '#0A8906',
      yellow: '#FFC700',
      red: '#EA0001',
      blue: '#0077CE'
    },
    container: {
      center: true,
      screens: {
        ...defaultTheme.container.screens,
        '2xl': '1728px',
        '3xl': '1728px'
      }
    },
    fontFamily: {
      sans: ['Denim', 'ui-sans-serif', 'system-ui']
    },
    fontSize: {
      xs: [rem(12), { lineHeight: unitless(16, 12) }],
      sm: [rem(14), { lineHeight: unitless(20, 14) }],
      base: [rem(16), { lineHeight: unitless(24, 16) }],
      lg: [rem(18), { lineHeight: unitless(28, 18) }],
      xl: [rem(20), { lineHeight: unitless(28, 20) }],
      '2xl': [rem(24), { lineHeight: unitless(32, 24) }],
      '3xl': [rem(30), { lineHeight: unitless(36, 30) }],
      '4xl': [rem(36), { lineHeight: unitless(48, 36) }],
      '5xl': [rem(48), { lineHeight: unitless(48, 48) }],
      '6xl': [rem(60), { lineHeight: unitless(60, 60) }],
      '7xl': [rem(72), { lineHeight: unitless(72, 72) }],
      '8xl': [rem(96), { lineHeight: unitless(96, 96) }],
      '9xl': [rem(128), { lineHeight: unitless(128, 128) }]
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1366px',
      '3xl': '1728px'
    },
    extend: {
      backgroundImage: {
        'auth-layout': "url('/src/assets/images/backgrounds/sign-in.png')"
      },
      typography: theme => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': theme('colors.neutral.700'),
            '--tw-prose-headings': theme('colors.black'),
            '--tw-prose-lead': theme('colors.neutral.700'),
            '--tw-prose-links': theme('colors.black'),
            '--tw-prose-bold': theme('colors.black'),
            '--tw-prose-counters': theme('colors.black'),
            '--tw-prose-bullets': theme('colors.neutral.700'),
            '--tw-prose-hr': theme('colors.neutral.150'),
            '--tw-prose-quotes': theme('colors.black'),
            '--tw-prose-quote-borders': theme('colors.neutral.150'),
            fontSize: rem(16),
            lineHeight: unitless(24, 16),
            fontFamily: theme('fontFamily.sans').toString(),
            a: {
              textDecoration: 'underline',
              '&:hover': {
                textDecoration: 'none'
              }
            },
            strong: {
              color: theme('colors.black')
            },
            h1: {
              fontSize: theme('fontSize.2xl.[0]'),
              fontWeight: 500,
              lineHeight: unitless(32, 24),
              marginTop: 0,
              marginBottom: theme('spacing.8')
            },
            h2: {
              fontSize: theme('fontSize.lg.[0]'),
              fontWeight: 500,
              lineHeight: unitless(28, 18),
              marginTop: theme('spacing.8'),
              marginBottom: theme('spacing.2')
            },
            h3: {
              fontSize: theme('fontSize.base.[0]'),
              fontWeight: 500,
              lineHeight: unitless(24, 16),
              marginTop: theme('spacing.6'),
              marginBottom: theme('spacing.2')
            },
            p: {
              marginTop: theme('spacing.6'),
              marginBottom: theme('spacing.6')
            },
            'ul > li::marker': {
              color: 'var(--tw-prose-bullets)',
              fontSize: '10px'
            },
            'ul > li > p': {
              marginTop: theme('spacing.0'),
              marginBottom: theme('spacing.0'),
              paddingLeft: theme('spacing.6')
            },
            li: {
              marginTop: theme('spacing.0'),
              marginBottom: theme('spacing.0')
            },
            blockquote: {
              fontSize: theme('fontSize.2xl.[0]'),
              lineHeight: theme('fontSize.2xl.lineHeight'),
              marginTop: theme('spacing.8'),
              marginBottom: theme('spacing.8'),
              paddingLeft: theme('spacing.0')
            },
            hr: {
              marginTop: 0,
              marginBottom: theme('spacing.5')
            },
            img: {
              marginTop: theme('spacing.6'),
              marginBottom: theme('spacing.6')
            },
            small: {
              fontSize: theme('fontSize.base.[0]'),
              color: theme('colors.neutral.600')
            }
          }
        },
        lg: {
          css: {
            fontSize: rem(16),
            lineHeight: unitless(24, 16),
            p: {
              marginTop: theme('spacing.6'),
              marginBottom: theme('spacing.6')
            },
            h1: {
              fontSize: theme('fontSize.4xl.[0]'),
              lineHeight: unitless(48, 36),
              marginBottom: theme('spacing.4')
            },
            h2: {
              fontSize: theme('fontSize.2xl.[0]'),
              fontWeight: 500,
              lineHeight: unitless(28, 18),
              marginTop: theme('spacing.12'),
              marginBottom: theme('spacing.2')
            },
            h3: {
              fontSize: theme('fontSize.lg.[0]'),
              lineHeight: unitless(28, 18),
              marginTop: theme('spacing.6'),
              marginBottom: theme('spacing.2')
            },
            li: {
              marginTop: theme('spacing.0'),
              marginBottom: theme('spacing.0')
            },
            img: {
              marginTop: theme('spacing.12'),
              marginBottom: theme('spacing.12')
            }
          }
        }
      }),
      borderRadius: {
        box: '20px',
        '4xl': '36px'
      },
      gridTemplateColumns: {
        app: '224px 1fr',
        'app-menu-icons': '64px 1fr',
        'app-widgets': '64px 1fr 379px',
        'app-widgets-xl': '224px 1fr 475px'
      },
      spacing: {
        6.5: '1.625rem',
        15: '3.75rem',
        18: '4.5rem',
        22: '5.5rem',
        30: rem(120)
      }
    }
  },
  corePlugins: {
    aspectRatio: false
  },
  plugins: [require('@tailwindcss/aspect-ratio'), require('@tailwindcss/typography')]
}
