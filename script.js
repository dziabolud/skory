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

function updateResult() {
    const value1 = select1.value;
    const value2 = select2.value;

    if (value1 && value2) {
        output.textContent = `Wybrano: ${value1} i ${value2}`;
    } else {
        output.textContent = "Brak danych";
    }
}

select1.addEventListener('change', updateResult);
select2.addEventListener('change', updateResult);
