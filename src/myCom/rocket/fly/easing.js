export default {
  Linear: {
    None: function (n) {
      return n;
    },
  },
  Quadratic: {
    In: function (n) {
      return n * n;
    },
    Out: function (n) {
      return n * (2 - n);
    },
    InOut: function (n) {
      if ((n *= 2) < 1) {
        return 0.5 * n * n;
      }
      return -0.5 * (--n * (n - 2) - 1);
    },
  },
  Cubic: {
    In: function (n) {
      return n * n * n;
    },
    Out: function (n) {
      return --n * n * n + 1;
    },
    InOut: function (n) {
      if ((n *= 2) < 1) {
        return 0.5 * n * n * n;
      }
      return -0.5 * ((n -= 2) * n * n + 2);
    },
  },
};
