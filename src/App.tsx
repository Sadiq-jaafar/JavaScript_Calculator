import { useState } from "react";
import "./App.css";

const App = () => {
  const [answer, setAnswer] = useState("0");
  const [expression, setExpression] = useState("");

  const isOperator = (symbol: string) => {
    return /[*/+-]/.test(symbol);
  };

  const buttonPress = (symbol: string) => {
    if (symbol === "clear") {
      setAnswer("");
      setExpression("0");
    } else if (symbol === "negative") {
      if (answer === "") return;
      setAnswer(
        answer.toString().charAt(0) === "-" ? answer.slice(1) : "-" + answer
      );
    } else if (symbol === "percentage") {
      if (answer === "") return;
      setAnswer((parseFloat(answer) / 100).toString());
    } else if (isOperator(symbol)) {
      if (expression === "" && answer !== "0") {
        setExpression(answer + " " + symbol + " ");
      } else {
        let newExpression = expression;
        while (isOperator(newExpression.slice(-1)) && symbol !== "-") {
          newExpression = newExpression.slice(0, -1);
        }
        setExpression(newExpression + " " + symbol + " ");
      }
    } else if (symbol === "=") {
      calculate();
    } else if (symbol === "0") {
      if (expression === "" || expression === "0") return;
      setExpression(expression + symbol);
    } else if (symbol === ".") {
      const lastNumber = expression.split(/[-+/*]/g).pop();
      if (!lastNumber?.includes(".")) {
        setExpression(expression + symbol);
      }
    } else {
      if (expression === "0") {
        setExpression(symbol);
      } else {
        setExpression(expression + symbol);
      }
    }
  };

  const calculate = () => {
    if (isOperator(expression.charAt(expression.length - 1))) return;

    const parts = expression.split(" ");
    const newParts = [];
    for (let i = 0; i < parts.length; i++) {
      if (isOperator(parts[i]) && isOperator(parts[i + 1])) {
        if (parts[i + 1] === "-") {
          newParts.push(parts[i + 1]);
          i++;
        } else {
          newParts.push(parts[i + 1]);
          i++;
        }
      } else {
        newParts.push(parts[i]);
      }
    }
    const newExpression = newParts.join(" ");
    setAnswer(eval(newExpression).toString());
    setExpression("");
  };

  return (
    <>
      <div className="container">
        <h1>Calculator Application</h1>
        <div className="calculator">
          <div id="display" style={{ textAlign: "right" }}>
            <div id="expression">{expression}</div>
            <div id="answer">{answer}</div>
          </div>
          <button
            id="clear"
            onClick={() => buttonPress("clear")}
            className="light-gray"
          >
            C
          </button>
          <button
            id="negative"
            onClick={() => buttonPress("negative")}
            className="light-gray"
          >
            +/-
          </button>
          <button
            id="percentage"
            onClick={() => buttonPress("percent")}
            className="light-gray"
          >
            %
          </button>
          <button id="divide" onClick={() => buttonPress("/")} className="gold">
            /
          </button>
          <button
            id="seven"
            onClick={() => buttonPress("7")}
            className="dark-gray"
          >
            7
          </button>
          <button
            id="eight"
            onClick={() => buttonPress("8")}
            className="dark-gray"
          >
            8
          </button>
          <button
            id="nine"
            onClick={() => buttonPress("9")}
            className="dark-gray"
          >
            9
          </button>
          <button
            id="multiply"
            onClick={() => buttonPress("*")}
            className="gold"
          >
            *
          </button>
          <button
            id="four"
            onClick={() => buttonPress("4")}
            className="dark-gray"
          >
            4
          </button>
          <button
            id="five"
            onClick={() => buttonPress("5")}
            className="dark-gray"
          >
            5
          </button>
          <button
            id="six"
            onClick={() => buttonPress("6")}
            className="dark-gray"
          >
            6
          </button>
          <button
            id="subtract"
            onClick={() => buttonPress("-")}
            className="gold"
          >
            -
          </button>
          <button
            id="one"
            onClick={() => buttonPress("1")}
            className="dark-gray"
          >
            1
          </button>
          <button
            id="two"
            onClick={() => buttonPress("2")}
            className="dark-gray"
          >
            2
          </button>
          <button
            id="three"
            onClick={() => buttonPress("3")}
            className="dark-gray"
          >
            3
          </button>
          <button id="add" onClick={() => buttonPress("+")} className="gold">
            +
          </button>
          <button
            id="zero"
            onClick={() => buttonPress("0")}
            className="dark-gray"
          >
            0
          </button>
          <button
            id="decimal"
            onClick={() => buttonPress(".")}
            className="dark-gray"
          >
            .
          </button>
          <button id="equals" onClick={() => buttonPress("=")} className="gold">
            =
          </button>
        </div>
      </div>
    </>
  );
};

export default App;
