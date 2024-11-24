// Pobranie elementów
const select1 = document.getElementById('select1');
const select2 = document.getElementById('select2');
const output = document.getElementById('output');

// Funkcja aktualizująca wynik
function updateResult() {
    const value1 = select1.value;
    const value2 = select2.value;

    if (value1 && value2) {
        output.textContent = `Wybrano: ${value1} i ${value2}`;
    } else {
        output.textContent = "Brak danych";
    }
}

// Dodanie nasłuchiwania zmian
select1.addEventListener('change', updateResult);
select2.addEventListener('change', updateResult);
