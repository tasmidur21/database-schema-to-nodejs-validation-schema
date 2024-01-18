"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.arrayIntersection = void 0;
function arrayIntersection(arr1, arr2) {
    const set1 = new Set(arr1);
    const set2 = new Set(arr2);
    return [...set1].filter(value => set2.has(value));
}
exports.arrayIntersection = arrayIntersection;
