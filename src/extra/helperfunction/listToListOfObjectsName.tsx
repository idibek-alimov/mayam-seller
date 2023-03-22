interface ObjectName {
  name: string;
}
export const ListToListOfObjectNames = (array: string[]) => {
  let objectList: ObjectName[] = [];
  for (let i = 0; i < array.length; i++) {
    objectList.push({ name: array[i] });
  }
  return objectList;
};
