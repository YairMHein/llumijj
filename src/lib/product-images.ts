import e1 from "@/assets/earring-1.jpg";
import n1 from "@/assets/necklace-1.jpg";
import r1 from "@/assets/ring-1.jpg";
import b1 from "@/assets/bracelet-1.jpg";

const map: Record<string, string> = {
  "earring-1.jpg": e1,
  "necklace-1.jpg": n1,
  "ring-1.jpg": r1,
  "bracelet-1.jpg": b1,
};

export function resolveProductImage(key: string): string {
  return map[key] ?? e1;
}