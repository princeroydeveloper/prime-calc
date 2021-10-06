const input = document.querySelector("#inputField");
const answerArea = document.querySelector("#answerArea");
const answerDiv = document.querySelector("#answerDiv");
const computeBtn = document.querySelector("#computeBtn");

function primeFactors(number) {
  let factorsArr = [];
  for(var i = 2; i <= number; i++) {
    while(number % i === 0) {
      number = number / i;
      factorsArr.push(i);
    }
  }
  return factorsArr;
}

function lock() {
  $(answerDiv).fadeOut();
  $(computeBtn).attr('disabled', 'disabled');
  $(computeBtn).html("Computing Answer...");
}

function unlock() {
  setTimeout(() => {
    $(computeBtn).removeAttr('disabled', 'disabled');
    $(computeBtn).html("Analyze Number");
    $(answerDiv).fadeIn();
  }, 300);
}

function computePrimeFactors() {
  // Creating a variable for the answer type: String
  var ansStr;
  // Lock Controls of User
  lock();
  // Searching for NaN
  if (isNaN(parseInt(input.value))) {
    unlock();
    return answerArea.innerText = `Please enter a valid number`;
  }
  // Checking Decimal Value
  if (input.value.includes(".")) {
    unlock();
    return answerArea.innerText = `Points are not allowed in the number`;
  }
  // Check for MAX_SAFE_INTEGER
  if (parseInt(input.value) < 2 || parseInt(input.value) > 9007199254740991) {
    unlock();
    return answerArea.innerText = `Please enter a number between 1 & 9007199254740992`;
  }
  // Factors Array
  let ansArr = primeFactors(parseInt(input.value));
  // Identifying the number as prime or not
  if (ansArr[0] == parseInt(input.value)) {
    unlock();
    ansStr = `${parseInt(input.value)} is a prime number`;
    return answerArea.innerHTML = ansStr;
  } else {
    ansStr = `${parseInt(input.value)} = ${ansArr[0]}`;
  }
  // Forming in Exponential Form
  let c = 0;
  let a = 0;
  let expoAnsStr = ``;
  for(i = 0; i < ansArr.length; i++) {
    if (ansArr[a] == ansArr[i]) {
      c = c + 1;
      if (ansArr[0] == ansArr[ansArr.length - 1]) {
        expoAnsStr = `${ansArr[a]} ^ ${c}`;
      } else if (i == ansArr.length - 1) {
        expoAnsStr = `${expoAnsStr} ${ansArr[a]} ^ ${c}`;
      }
    } else {
      expoAnsStr = `${expoAnsStr} ${ansArr[a]} ^ ${c} x`;
      a = i;
      c = 1;
      if (i == ansArr.length - 1) {
        expoAnsStr = `${expoAnsStr} ${ansArr[a]} ^ ${c}`;
      }
    }
  }
  // Finalizing the answer and assigning it to (ansStr) variable
  let cutArr = ansArr.slice(1, ansArr.length);
  cutArr.forEach(item => {
    ansStr = `${ansStr} x ${item}`;
  });
  // Showing the answer to user
  answerArea.innerHTML = `${ansStr}<br><hr><center>Exponential Form</center>${expoAnsStr}`;
  // Unlock User Controls
  unlock();
}

input.addEventListener("input", () => {
  $(answerDiv).fadeOut();
});