tailwind.config = {
    theme: {
        extend: {
            fontFamily: {
                syne: ['Syne', 'sans-serif'],
                grotesk: ['Space Grotesk', 'sans-serif'],
            },
            colors: {
                gray: {
                    50: '#FAFAFA', 100: '#F5F5F5', 200: '#E5E5E5',
                    300: '#D4D4D4', 400: '#A3A3A3', 500: '#737373',
                    600: '#525252', 700: '#404040', 800: '#262626',
                    900: '#171717', 950: '#0A0A0A',
                },
                kroma: {
                    bg: '#FFFFFF',
                    ink: '#121212',
                    charcoal: '#404040',
                    silver: '#E5E5E5',
                    cobalt: '#1D4ED8',
                    vermilion: '#FF4D2D'
                }
            },
            boxShadow: {
                'brutal': '6px 6px 0px 0px rgba(18, 18, 18, 1)',
                'brutal-hover': '2px 2px 0px 0px rgba(18, 18, 18, 1)',
            },

        }
    }
};
