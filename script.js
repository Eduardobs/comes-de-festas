const form = document.querySelector("#party-form");
const result = document.querySelector("#result");
const errorMessage = document.querySelector("#form-error");

const fields = {
  adults: document.querySelector("#adults"),
  children: document.querySelector("#children"),
  savoryPerAdult: document.querySelector("#savory-per-adult"),
  savoryPerChild: document.querySelector("#savory-per-child"),
  sweetPerAdult: document.querySelector("#sweet-per-adult"),
  sweetPerChild: document.querySelector("#sweet-per-child"),
};

const output = {
  guests: document.querySelector("#guest-total"),
  guestLabel: document.querySelector("#guest-label"),
  savory: document.querySelector("#savory-total"),
  sweet: document.querySelector("#sweet-total"),
};

const numberFormatter = new Intl.NumberFormat("pt-BR");

function readValues() {
  return Object.fromEntries(
    Object.entries(fields).map(([name, field]) => [name, Number(field.value)]),
  );
}

function valuesAreValid(values) {
  return Object.values(values).every(
    (value) => Number.isInteger(value) && value >= 0,
  );
}

function calculate(values) {
  return {
    guests: values.adults + values.children,
    savory:
      values.adults * values.savoryPerAdult +
      values.children * values.savoryPerChild,
    sweet:
      values.adults * values.sweetPerAdult +
      values.children * values.sweetPerChild,
  };
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const values = readValues();

  if (!valuesAreValid(values)) {
    errorMessage.textContent =
      "Preencha todos os campos com números inteiros iguais ou maiores que zero.";
    errorMessage.hidden = false;
    result.hidden = true;
    return;
  }

  errorMessage.hidden = true;
  const totals = calculate(values);

  output.guests.textContent = numberFormatter.format(totals.guests);
  output.guestLabel.textContent = totals.guests === 1 ? "convidado" : "convidados";
  output.savory.textContent = numberFormatter.format(totals.savory);
  output.sweet.textContent = numberFormatter.format(totals.sweet);

  result.hidden = false;
  result.scrollIntoView({ behavior: "smooth", block: "nearest" });
});
