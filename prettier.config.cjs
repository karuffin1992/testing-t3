/** @type {import("prettier").Config} */
module.exports = {
  plugins: [require.resolve("prettier-plugin-tailwindcss")],
  printWidth: 90,
  trailingComma: "es5",
  tabWidth: 2,
  semi: true,
  singleQuote: true,
};
