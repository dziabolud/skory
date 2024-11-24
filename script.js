// Funkcja ładująca opcje z pliku JSON
function loadOptions() {
    fetch('options.json') // Wczytanie pliku JSON
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json(); // Parsowanie odpowiedzi jako JSON
        })
        .then(data => {
            populateSelect('select1', data.select1); // Wypełnienie pierwszej listy
            populateSelect('select2', data.select2); // Wypełnienie drugiej listy
        })
        .catch(error => console.error('Błąd podczas ładowania opcji:', error));
}

// Funkcja wypełniająca element <select> opcjami
function populateSelect(selectId, options) {
    const selectElement = document.getElementById(selectId);

    // Dodanie opcji do select
    options.forEach(option => {
        const optElement = document.createElement('option');
        optElement.value = option.value;
        optElement.textContent = option.text;
        selectElement.appendChild(optElement);
    });
}

// Wywołanie funkcji ładowania opcji po załadowaniu strony
document.addEventListener('DOMContentLoaded', loadOptions);

// Obsługa zmiany wyboru i wyświetlanie wyniku
const select1 = document.getElementById('select1');
const select2 = document.getElementById('select2');
const output = document.getElementById('output');
const quantityInput = document.getElementById('quantity');

function updateResult() {
    const value1 = select1.value;  // Cena z selecta 1
    const value2 = select2.value;  // Wartość współczynnika z selecta 2
    const quantity = quantityInput.value; // Ilość

    if (value1 && value2 && quantity) {
        // Obliczanie ceny: cena * współczynnik * ilość
        const price = parseFloat(value1) * parseFloat(value2) * parseInt(quantity);
        output.textContent = `${price} $`;  // Wyświetlanie ceny z dwoma miejscami po przecinku
    } else {
        output.textContent = "Brak danych";
    }
}

// Nasłuchiwanie na zmiany w selectach oraz polu ilości
select1.addEventListener('change', updateResult);
select2.addEventListener('change', updateResult);
quantityInput.addEventListener('input', updateResult); // Monitorowanie zmiany ilości
