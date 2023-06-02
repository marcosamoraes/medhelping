/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.tsx", "./sources/**/*.tsx", "./app/**/*.tsx", "./app/index.tsx"],
  theme: {
    extend: {
      fontFamily:{
        300:'Catamaran_300Light',
        400:'Catamaran_400Regular',
        500:'Catamaran_500Medium',
        600:'Catamaran_600SemiBold',
        700:'Catamaran_700Bold',
        800:'Catamaran_800ExtraBold',
        900:'Catamaran_900Black',
      }
    },
  },
  plugins: [],
}