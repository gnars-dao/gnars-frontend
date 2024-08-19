export default {
  semi: true,
  printWidth: 120,
  importOrder: ["^react$", "<THIRD_PARTY_MODULES>", "^@/utils/(.*)$", "^@/components/(.*)$", "^[./]"],
  importOrderSortSpecifiers: true,
  plugins: [require('@trivago/prettier-plugin-sort-imports')]
}