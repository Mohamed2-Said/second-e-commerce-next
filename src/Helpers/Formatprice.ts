export function formatcurrint(num: number) {
  return new Intl.NumberFormat("en-Us", {
    style: "currency",
    currency: "EGP",
  }).format(num);
}
