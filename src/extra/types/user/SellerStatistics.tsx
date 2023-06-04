export type SellerStatistics = {
  balance: number;
  products_in_storage: number;
  products_sold: number;
};
export const emptySellerStatistics: SellerStatistics = {
  balance: 0,
  products_in_storage: 0,
  products_sold: 0,
};
