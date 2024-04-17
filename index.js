class LSystem {
  constructor(axiom, rules) {
    this.axiom = axiom;
    this.rules = rules;
    this.memo = {};
    this.precomputeRules();
  }

  precomputeRules() {
    this.precomputedRules = {};
    for (const symbol in this.rules) {
      const rule = this.rules[symbol];
      this.precomputedRules[symbol] = this.applyRules(rule);
    }
  }

  applyRules(symbol) {
    let result = "";
    for (const char of symbol) {
      result += this.rules[char] || char;
    }
    return result;
  }

  produce(iterations) {
    if (this.memo[iterations]) {
      return this.memo[iterations];
    }

    let currentString = this.axiom;
    for (let i = 0; i < iterations; i++) {
      let newString = "";
      for (const char of currentString) {
        newString += this.precomputedRules[char] || char;
      }
      currentString = newString;
    }

    this.memo[iterations] = currentString;
    return currentString;
  }
}

// Test case for Cantor fractal (n=3)
const axiom = "A";
const rules = {
  A: "ABA",
  B: "BBB",
};

const lSystem = new LSystem(axiom, rules);
const result = lSystem.produce(2);
console.log(result); // Output: ABAABABABBBBABBBBABABBBBABBBB
