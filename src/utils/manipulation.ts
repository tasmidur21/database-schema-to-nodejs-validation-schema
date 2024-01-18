export function arrayIntersection<T>(arr1: T[], arr2: T[]): T[] {
    const set1 = new Set(arr1);
    const set2 = new Set(arr2);
    return [...set1].filter(value => set2.has(value));
}
 
  