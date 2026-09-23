export function withoutFinalStop(value) {
  return value.replace(/[.。।۔։]+\s*$/u, '');
}
