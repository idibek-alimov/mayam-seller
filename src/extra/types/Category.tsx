export interface Category {
  id?: number;
  name: string;
  size?: boolean;
  color?: boolean;
}
export const emptyCategory: Category = {
  name: "",
  size: false,
  color: false,
};
