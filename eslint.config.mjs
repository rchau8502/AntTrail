import nextConfig from "eslint-config-next";

const eslintConfig = [
  ...nextConfig,
  {
    rules: {
      "react-hooks/set-state-in-effect": "off",
      "react-hooks/purity": "off",
      "react/no-unescaped-entities": "off",
      "@next/next/no-img-element": "warn",
    },
  },
  {
    ignores: [
      ".next/**",
      "dist/**",
      "node_modules/**",
      "apps/**",
      "public/**",
      "tsconfig.tsbuildinfo",
    ],
  },
];

export default eslintConfig;
