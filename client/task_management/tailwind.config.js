/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bgColor': "#350D36",
        'bgColor2': "#0E1630",
        'bgColor3': "#F8F8F8",
        'bgColor4': "#392467",
        'bgColor5': "#5D3587",
        'bgColor6': "#A367B1",
        'bgColor7': "#FFD1E3",
        'bgColor8': "#163020",  //j
        'bgColor9': "#EEF0E5",
        'jText': "#304D30",
        'fLetter': "#05CF93",
        'primary': "#ECEEFF",
        "coral-red": "#FF6452",
        "slate-gray": "#6D6D6D",
        "pale-blue": "#F5F6FF",
        "white-400": "rgba(255, 255, 255, 0.80)"
      },

    },
  },
  plugins: [],
}

