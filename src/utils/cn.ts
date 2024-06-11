import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
// import { fontSize } from '../../tailwind.config.cjs';

// const twMerge = extendTailwindMerge({
//   extend: {
//     classGroups: {
//       'font-size': Object.keys(fontSize).map((key) => `text-${key}`)
//     }
//   }
// });
export const cn = (...args: ClassValue[]) => twMerge(clsx(...args));
