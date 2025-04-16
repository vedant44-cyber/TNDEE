export function calculateTND(Vnom, Dsheath, Dcore, n) {
  const R = Dsheath / 2;
  const r = Dcore / 2;

  const alpha = Math.pow(R / r, 1 / (n + 1));

  const radii = [r];
  for (let i = 1; i <= n; i++) {
    radii.push(r * Math.pow(alpha, i));
  }

  const voltages = [];
  const logRatio = Math.log(R / r);

  for (let i = 1; i <= n; i++) {
    const Vi = (Vnom * Math.log(radii[i] / r)) / logRatio;
    voltages.push(Vi);
  }

  const gMaxWith = (Vnom - voltages[0]) / (r * Math.log(alpha));
  const gMaxWithout = Vnom / (r * Math.log(R / r));

  return {
    alpha: alpha,
    radii: radii.slice(1),
    voltages: voltages,
    gMaxWith: gMaxWith,
    gMaxWithout: gMaxWithout,
  };
}
