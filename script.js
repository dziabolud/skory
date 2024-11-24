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
        optElement.setAttribute('icon', option.icon); // Ustawienie atrybutu 'icon' na wartość ikony
        selectElement.appendChild(optElement);
    });
}

// Funkcja zmieniająca ikonę w zależności od wyboru w select1
function updateIcon() {
    const select1 = document.getElementById('select1');
    const selectedOption = select1.selectedOptions[0];  // Pobieramy aktualnie wybraną opcję
    const iconName = selectedOption ? selectedOption.getAttribute('icon') : null;  // Pobieramy nazwę ikony z atrybutu 'icon'
    const iconElement = document.getElementById('icon');

    // Jeśli ikona jest ustawiona
    if (iconName) {
        iconElement.src = `${iconName}`;  // Ustawiamy źródło ikony (zakładając, że obrazy są w folderze 'images')
        iconElement.alt = selectedOption.textContent;  // Ustawiamy tekst alternatywny na nazwę zwierzęcia
        iconElement.classList.remove('hidden');  // Pokazujemy ikonę
    } else {
        iconElement.classList.add('hidden');  // Ukrywamy ikonę
    }
}

// Wywołanie funkcji ładowania opcji po załadowaniu strony
document.addEventListener('DOMContentLoaded', () => {
    loadOptions();   // Wczytanie danych z JSON
    updateIcon();    // Ustawienie początkowej ikony (jeśli jakakolwiek opcja jest wybrana)
});

// Obsługa zmiany wyboru w select1 i zmiana ikony
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
        output.textContent = `${price} $`;  // Wyświetlanie ceny
    } else {
        output.textContent = "Brak danych";
    }
}

// Nasłuchiwanie na zmiany w selectach oraz polu ilości
select1.addEventListener('change', () => {
    updateResult();  // Obliczanie wyniku
    updateIcon();    // Zmiana ikony
});
select2.addEventListener('change', updateResult);
quantityInput.addEventListener('input', updateResult); // Monitorowanie zmiany ilości
