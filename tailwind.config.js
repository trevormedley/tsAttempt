module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        backgroundgrey: "#E8E8E3",
        googleRed: "#EA4335",
        blue: "#1055BB",
        grey: "#C4C4C4",
        gradientB1: "#1352AF",
        gradientB2: "#0566E8",
        green: "#19A91E",
        pressedGrey: "#BDBDBD",
        borderGrey: "#6c6c6d"
      },
      boxShadow: {
        inner:
          "inset -4px -4px 0px rgba(0, 0, 0, 0.45), inset 4px 4px 0px rgba(255, 255, 255, 0.95);",
      },
      fontFamily: {
        "press-start": ['"Press Start 2P"', "cursive"],
      },
      gridTemplateColumns: {
        // Simple 16 column grid
        '16': "repeat(16, minmax(0, 1fr))",
      },
    },
  },
  plugins: [],
};