let total = 0;
let buffer = "0";
let operator = null;
let resultOp = false;
const screen = document.querySelector(".screen");

document.querySelector(".keyboard").addEventListener("click", function(event) {
  buttonClick(event.target.innerText);
});

function buttonClick(value) {
  if(isNaN(parseInt(value))){
    handleSymbol(value);
  }else{
    handleNumber(value);
  }
  rerender();
}

function handleSymbol(value) {
  switch(value){
    case "c":
      buffer = "0"
      total = 0;
      operator = null;
      break;
    case "del":
      if (buffer.length === 1){
        buffer = "0"
      } else {
        buffer = buffer.substr(0,buffer.length-1);
      }
      break;
    case "=":
      if(operator === null){
        return;
      }
      handleMath(parseInt(buffer));
      operator = null;
      buffer = "" + total;
      total = 0;
      break;
    default:
      handleOperation(value);
      break;
  }
}

function handleNumber(value) {
  if(buffer === "0"){
    buffer = value;
  } else if(resultOp) {
    buffer = "0";
    rerender();
    total = 0;
    operator = null;
    resultOp = false;
    buffer = value;
  } else {
    buffer += value;
  }
}

function handleOperation(value) {
  const intBuffer = parseInt(buffer);
  if (total === 0){
    total = intBuffer;
  } else {
    handleMath(intBuffer);
  }
  operator = value;

  buffer = "0";
}

function handleMath(value) {
  if(operator === "+"){
    total += value;
  }else if(operator === "-"){
    total -= value;
  }else if(operator === "*"){
    total *= value;
  }else {
    total /= value;
  }
  resultOp = true;
}

function rerender() {
  screen.innerText = buffer;
}