const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");
const delBtn = document.getElementById("del");
const clearBtn = document.getElementById("clear");

let currentInput = "0";
display.textContent = currentInput;

// Fungsi update tampilan
function updateDisplay() {
  display.textContent = currentInput;
}

// Fungsi input angka/operator
function handleInput(value) {
  if (value === "=") {
    try {
      currentInput = eval(currentInput).toString();
    } catch {
      currentInput = "Error";
    }
  } else if (value === "AC") {
    currentInput = "0";
  } else if (value === "DEL") {
    currentInput = currentInput.length > 1 ? currentInput.slice(0, -1) : "0";
  } else {
    if (currentInput === "0" || currentInput === "Error") {
      currentInput = value;
    } else {
      currentInput += value;
    }
  }
  updateDisplay();
}

// Event klik tombol kalkulator
buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    const value = btn.getAttribute("data-value");
    handleInput(value);
  });
});

delBtn.addEventListener("click", () => handleInput("DEL"));
clearBtn.addEventListener("click", () => handleInput("AC"));

// Event keyboard (termasuk numpad)
document.addEventListener("keydown", (event) => {
  const key = event.key;

  if ((key >= "0" && key <= "9") || ["+", "-", "*", "/", "."].includes(key)) {
    handleInput(key);
  } else if (key === "Enter") {
    handleInput("=");
  } else if (key === "Backspace") {
    handleInput("DEL");
  } else if (key === "Escape") {
    handleInput("AC");
  }
});

// Navigasi tab kalkulator ↔ konverter
const btnKalkulator = document.getElementById("btnKalkulator");
const btnKonverter = document.getElementById("btnKonverter");
const kalkulator = document.querySelector(".buttons");
const konverter = document.getElementById("konverter");

btnKalkulator.addEventListener("click", () => {
  kalkulator.style.display = "grid";
  konverter.style.display = "none";
});

btnKonverter.addEventListener("click", () => {
  kalkulator.style.display = "none";
  konverter.style.display = "block";
});

// Konversi suhu
const inputSuhu = document.getElementById("inputSuhu");
const convertBtn = document.getElementById("convertSuhu");
const hasilSuhu = document.getElementById("hasilSuhu");

convertBtn.addEventListener("click", () => {
  const celcius = parseFloat(inputSuhu.value);
  if (isNaN(celcius)) {
    hasilSuhu.textContent = "Hasil: Input tidak valid";
  } else {
    const fahrenheit = (celcius * 9 / 5) + 32;
    hasilSuhu.textContent = `Hasil: ${fahrenheit.toFixed(2)} °F`;
  }
});