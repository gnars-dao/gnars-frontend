import sortImportsPlugin from '@trivago/prettier-plugin-sort-imports';


export default {
  semi: true,
  printWidth: 120,
  trailingComma: "none",
  importOrder: ["^react$", "<THIRD_PARTY_MODULES>", "^@/utils/(.*)$", "^@*/(.*)$", ".*"],
  importOrderSortSpecifiers: true,
  plugins: [sortImportsPlugin]
}