export function calculateTND(Vnom, Dsheath, Dcore, n) {
  const R = Dsheath / 2;
  const r = Dcore / 2;

  const alpha = Math.pow(R / r, 1 / (n + 1));

  const radii = [r];
  for (let i = 1; i <= n; i++) {
    radii.push(r * Math.pow(alpha, i));
  }

 function solveVoltages(alpha, n, Vnom) {
  const voltages = [];
  let currentVoltage = Vnom;

  for (let k = n; k >= 1; k--) {
    const nextVoltage = ((Math.pow(alpha, k + 1) - alpha) / (Math.pow(alpha, k + 1) - 1)) * currentVoltage;
    voltages.unshift(nextVoltage);  
    currentVoltage = nextVoltage;
  }

   return voltages;
   
 }
  
 const voltages = solveVoltages(alpha, n, Vnom);
for (let i = 0; i < n; i++) { console.log("Voltage " + i + ": " + voltages[i]); }

    const gMaxWith = ((alpha - 1) * Vnom) / ((Math.pow(alpha, n + 1) - 1) * (r * Math.log(alpha)));


  const gMaxWithout = Vnom / (r * Math.log(R / r));

  return {
    alpha: alpha,
    radii: radii.slice(1),
    voltages: voltages,
    gMaxWith: gMaxWith,
    gMaxWithout: gMaxWithout,
  };
}
