import e1 from "@/assets/earring-1.jpg";
import e2 from "@/assets/earring-2.jpg";
import e3 from "@/assets/earring-3.jpg";
import n1 from "@/assets/necklace-1.jpg";
import n2 from "@/assets/necklace-2.jpg";
import n3 from "@/assets/necklace-3.jpg";
import r1 from "@/assets/ring-1.jpg";
import r2 from "@/assets/ring-2.jpg";
import r3 from "@/assets/ring-3.jpg";
import b1 from "@/assets/bracelet-1.jpg";
import b2 from "@/assets/bracelet-2.jpg";
import b3 from "@/assets/bracelet-3.jpg";
import wornEarring from "@/assets/worn-earring.jpg";
import wornNecklace from "@/assets/worn-necklace.jpg";
import wornRing from "@/assets/worn-ring.jpg";
import wornBracelet from "@/assets/worn-bracelet.jpg";

const map: Record<string, string> = {
  "earring-1.jpg": e1,
  "earring-2.jpg": e2,
  "earring-3.jpg": e3,
  "necklace-1.jpg": n1,
  "necklace-2.jpg": n2,
  "necklace-3.jpg": n3,
  "ring-1.jpg": r1,
  "ring-2.jpg": r2,
  "ring-3.jpg": r3,
  "bracelet-1.jpg": b1,
  "bracelet-2.jpg": b2,
  "bracelet-3.jpg": b3,
};

export function resolveProductImage(key: string): string {
  return map[key] ?? e1;
}

const wornMap: Record<string, string> = {
  earrings: wornEarring,
  necklaces: wornNecklace,
  rings: wornRing,
  bracelets: wornBracelet,
};

export function resolveWornImage(category: string): string {
  return wornMap[category] ?? wornEarring;
}
