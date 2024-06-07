export const GetEnumLatinKeyByValue = (currentEnum: any, value: string) =>
    Object.keys(currentEnum)[Object.values(currentEnum).indexOf(value)] as typeof currentEnum