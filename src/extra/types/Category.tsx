export interface Category {
  id?: number;
  name: string;
  size?: boolean;
  color?: boolean;
  gender?: boolean;
}
export const emptyCategory: Category = {
  name: "",
  size: false,
  color: false,
  gender: false,
};
