export type TargetModeInput = {
  tankCapacity: number;     // in gallons
  currentLevel: number;     // 0..1
  targetLevel: number;      // 0..1
  pricePerGallon: number;   // dollars
  taxesPct?: number;        // optional
  safetyBufferGallons?: number; // optional add-on
};

export type BudgetModeInput = {
  tankCapacity: number;
  currentLevel: number;
  budgetDollars: number;
  pricePerGallon: number;
  taxesPct?: number;
  safetyBufferGallons?: number;
};

export function calcTargetMode(input: TargetModeInput) {
  const { tankCapacity, currentLevel, targetLevel, pricePerGallon, taxesPct = 0, safetyBufferGallons = 0 } = input;
  const currentGallons = tankCapacity * currentLevel;
  const targetGallons = tankCapacity * targetLevel;
  const neededGallons = Math.max(targetGallons - currentGallons, 0) + safetyBufferGallons;
  const subtotal = neededGallons * pricePerGallon;
  const total = subtotal * (1 + taxesPct / 100);
  return {
    neededGallons,
    estimatedTotal: total,
    stopAtDollars: total,
  };
}

export function calcBudgetMode(input: BudgetModeInput) {
  const { tankCapacity, currentLevel, budgetDollars, pricePerGallon, taxesPct = 0, safetyBufferGallons = 0 } = input;
  const effectivePrice = pricePerGallon * (1 + taxesPct / 100);
  const gallonsAffordable = Math.max(budgetDollars / effectivePrice - safetyBufferGallons, 0);
  const currentGallons = tankCapacity * currentLevel;
  const newLevel = Math.min((currentGallons + gallonsAffordable) / tankCapacity, 1);
  return {
    gallonsAffordable,
    newLevel
  };
}
