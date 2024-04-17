class LSystem {
  constructor(axiom, rules) {
    if (typeof axiom !== "string" || axiom.length === 0) {
      throw new Error("Axiom must be a non-empty string.");
    }

    if (
      !rules ||
      typeof rules !== "object" ||
      Object.keys(rules).length === 0
    ) {
      throw new Error("Rules must be a non-empty object.");
    }

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
    if (!Number.isInteger(iterations) || iterations < 0) {
      throw new Error("Iterations must be a non-negative integer.");
    }

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

// Example usage:
const axiom = "A";
const rules = {
  A: "ABA",
  B: "BBB",
};

try {
  const lSystem = new LSystem(axiom, rules);
  const result = lSystem.produce(3);
  console.log("Result:", result);
} catch (error) {
  console.error("Error:", error.message);
}
