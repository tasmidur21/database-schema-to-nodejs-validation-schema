export function arrayIntersection<T>(arr1: T[], arr2: T[]): T[] {
    const set1 = new Set(arr1);
    const set2 = new Set(arr2);
    return [...set1].filter(value => set2.has(value));
}

export function snakeToCamel(str: string) {
    return str.replace(/_([a-z])/g, (match, letter) => letter.toUpperCase());
}

export function getClassName(value:any,format:string){
      
      const rawClassName= format.replace(/\{\{(\w+)\}\}/g, (match, key) => {
        // Check if the key exists in dynamic replacements
        return value[key] !== undefined ? value[key] : match;
      });
}
 
  