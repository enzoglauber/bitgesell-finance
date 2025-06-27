function mean(arr) {
  if (!Array.isArray(arr) || arr.length === 0) return 0;
  return arr.reduce((sum, val) => sum + val, 0) / arr.length;
}

module.exports = { mean };