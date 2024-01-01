const display = document.getElementById("display");

function clearDisplay() {
  display.value = "";
}

function calculate() {
  const expression = display.value;

  if (!expression) {
    display.value = "";
    return;
  }

  const result = evaluateExpression(expression);

  if (isNaN(result) || !isFinite(result)) {
    display.value = "Error";
  } else {
    display.value = result.toString();
  }
}

function evaluateExpression(expression) {
  const operators = ["+", "-", "*", "/"];
  const symbols = expression
    //\D non digit characters
    .split(/(\D)/)
    .filter((symbol) => symbol.trim() !== "");

  for (let i = 0; i < operators.length; i++) {
    const operator = operators[i];
    for (let j = 1; j < symbols.length - 1; j += 2) {
      if (symbols[j] === operator) {
        const leftOperand = parseFloat(symbols[j - 1]);
        const rightOperand = parseFloat(symbols[j + 1]);
        let result;

        switch (operator) {
          case "+":
            result = leftOperand + rightOperand;
            break;
          case "-":
            result = leftOperand - rightOperand;
            break;
          case "*":
            result = leftOperand * rightOperand;
            break;
          case "/":
            if (rightOperand === 0) {
              return "Error: Division by zero";
            }
            result = leftOperand / rightOperand;
            break;
        }

        symbols.splice(j - 1, 3, result);
        j = j - 2;
      }
    }
  }

  let result = parseFloat(symbols[0]);
  for (let i = 1; i < symbols.length; i += 2) {
    const operator = symbols[i];
    const operand = parseFloat(symbols[i + 1]);

    switch (operator) {
      case "+":
        result += operand;
        break;
      case "-":
        result -= operand;
        break;
    }
  }

  return result.toString();
}
