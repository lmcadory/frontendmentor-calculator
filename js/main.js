const html = document.querySelector("html");
html.dataset.theme = "blue";

const changeTheme = (input) => {
  html.dataset.theme = input;
};

const calculator = {
  displayValue: "0",
  firstOperand: null,
  waiting: false,
  operator: null,
};

const updateDisplay = () => {
  const display = document.querySelector("#calculations");
  display.value = calculator.displayValue;
};

updateDisplay();

const btnGrp = document.querySelector(".btn-group");

btnGrp.onclick = (event) => {
  const { target } = event;
  const { textContent } = target;

  if (!target.matches("button")) {
    return;
  }

  switch (textContent) {
    case "del":
      del();
      break;
    case "+":
    case "-":
    case "*":
    case "/":
    case "=":
      handleOperator(textContent);
      break;
    case ".":
      inputDecimal(textContent);
      break;
    case "reset":
      resetCalculator();
      break;
    default:
      // check if the key is an integer
      if (Number.isInteger(parseFloat(textContent))) {
        inputDigit(textContent);
      }
  }

  updateDisplay();
};

const inputDigit = (digit) => {
  const { displayValue, waiting } = calculator;

  if (waiting) {
    calculator.displayValue = digit;
    calculator.waiting = false;
  } else {
    calculator.displayValue =
      displayValue === "0" ? digit : displayValue + digit;
  }
  console.log(calculator);
};

const inputDecimal = (dot) => {
  const { displayValue, waiting } = calculator;

  if (waiting) {
    calculator.displayValue = "0.";
    calculator.waitingForSecondOperand = false;
    return;
  }

  if (!displayValue.includes(dot)) {
    calculator.displayValue += dot;
  }
};

const handleOperator = (nextOperator) => {
  const { firstOperand, displayValue, operator } = calculator;

  const inputValue = parseFloat(displayValue);

  if (operator && calculator.waiting) {
    calculator.operator = nextOperator;
    console.log(calculator);
    return;
  }

  if (firstOperand === null && !isNaN(inputValue)) {
    calculator.firstOperand = inputValue;
  } else if (operator) {
    const result = calculate(firstOperand, inputValue, operator);

    calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
    calculator.firstOperand = result;
  }

  calculator.waiting = true;
  calculator.operator = nextOperator;

  console.log(calculator);
};

const del = () => {
  const { displayValue } = calculator;

  if (displayValue.length > 1) {
    calculator.displayValue = displayValue.slice(0, -1);
  } else {
    calculator.displayValue = "0";
  }

  console.log(calculator);
};

const calculate = (firstOperand, secondOperand, operator) => {
  if (operator === "+") {
    return firstOperand + secondOperand;
  } else if (operator === "-") {
    return firstOperand - secondOperand;
  } else if (operator === "x") {
    return firstOperand * secondOperand;
  } else if (operator === "/") {
    return firstOperand / secondOperand;
  }

  return secondOperand;
};

const resetCalculator = () => {
  calculator.displayValue = "0";
  calculator.firstOperand = null;
  calculator.waitingForSecondOperand = false;
  calculator.operator = null;
  console.log(calculator);
};
