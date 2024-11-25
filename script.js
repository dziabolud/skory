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
            populateSelects(data.select1, data.select2); // Wypełnienie list select
        })
        .catch(error => console.error('Błąd podczas ładowania opcji:', error));

    // Ustawiamy domyślną ikonę na początku
    const defaultIcon = document.querySelector('#icon');
    defaultIcon.src = 'assets/basic.png'; // Ścieżka do domyślnej ikony
}

// Funkcja wypełniająca element <select> opcjami
function populateSelects(select1Options, select2Options) {
    const select1Elements = document.querySelectorAll('.select1');
    const select2Elements = document.querySelectorAll('.select2');

    // Wypełnienie wszystkich selectów
    select1Elements.forEach(selectElement => {
        select1Options.forEach(option => {
            const optElement = document.createElement('option');
            optElement.value = option.value;
            optElement.textContent = option.text;
            optElement.setAttribute('icon', option.icon); // Dodanie ikony
            selectElement.appendChild(optElement);
        });
    });

    select2Elements.forEach(selectElement => {
        select2Options.forEach(option => {
            const optElement = document.createElement('option');
            optElement.value = option.value;
            optElement.textContent = option.text;
            selectElement.appendChild(optElement);
        });
    });
}

// Funkcja zmieniająca ikonę w zależności od wyboru w select1
function updateIcon(select1Element, iconElement) {
    const selectedOption = select1Element.selectedOptions[0];  // Pobieramy aktualnie wybraną opcję
    const iconName = selectedOption ? selectedOption.getAttribute('icon') : null;  // Pobieramy nazwę ikony z atrybutu 'icon'

    // Jeśli ikona jest ustawiona
    if (iconName) {
        iconElement.src = `${iconName}`;  // Ustawiamy źródło ikony
        iconElement.alt = selectedOption.textContent;  // Ustawiamy tekst alternatywny na nazwę zwierzęcia
    } else {
        iconElement.src = 'assets/basic.png';  // Ustawiamy domyślną ikonę
    }
}

// Funkcja do obliczania wyniku
function updateResult(select1, select2, quantityInput, outputElement) {
    const value1 = select1.value;  // Cena z selecta 1
    const value2 = select2.value;  // Wartość współczynnika z selecta 2
    const quantity = quantityInput.value; // Ilość

    if (value1 && value2 && quantity) {
        // Obliczanie ceny: cena * współczynnik * ilość
        const price = parseFloat(value1) * parseFloat(value2) * parseInt(quantity);
        outputElement.textContent = `${price} $`;  // Wyświetlanie ceny
        return price;
    } else {
        outputElement.textContent = "Brak danych";
        return 0;
    }
}

// Funkcja do usuwania bieżącego wiersza
function removeRow(event) {
    const row = event.target.closest('.row');  // Znajdujemy najbliższy element o klasie "row"
    if (row && row !== document.getElementById('row1')) {  // Zapobiegamy usunięciu pierwszego wiersza
        row.remove();  // Usuwamy wiersz
    }
    updateTotalPrice();  // Po usunięciu wiersza aktualizujemy sumę
}

// Funkcja do dodawania nowego wiersza
function addNewRow() {
    const container = document.getElementById('container');
    const row = document.getElementById('row1'); // Pierwszy wiersz, który będzie klonowany
    const newRow = row.cloneNode(true); // Klonujemy cały wiersz

    // Zmieniamy wartości w nowym wierszu
    const newSelect1 = newRow.querySelector('.select1');
    const newSelect2 = newRow.querySelector('.select2');
    const newQuantityInput = newRow.querySelector('.quantity');
    const newOutput = newRow.querySelector('.output');
    const newIcon = newRow.querySelector('#icon');
    const newRemoveButton = newRow.querySelector('.remove-row-button'); // Przycisk usuwania

    // Zainicjalizuj nowe opcje dla selectów i ikonę
    newSelect1.value = '50';  // Ustawiamy na domyślny wybór
    newSelect2.value = '1'; // Domyślny współczynnik
    newQuantityInput.value = 1; // Domyślna ilość
    newOutput.textContent = "-";  // Początkowy wynik
    newIcon.src = 'assets/basic.png';  // Ustawiamy domyślną ikonę
    newIcon.alt = "Domyślna ikona";  // Alternatywny tekst ikony

    // Dodajemy nasłuchiwacze zdarzeń dla nowych wierszy
    newSelect1.addEventListener('change', () => {
        updateResult(newSelect1, newSelect2, newQuantityInput, newOutput);
        updateIcon(newSelect1, newIcon);
        updateTotalPrice();  // Aktualizujemy sumę po zmianie
    });
    newSelect2.addEventListener('change', () => {
        updateResult(newSelect1, newSelect2, newQuantityInput, newOutput);
        updateTotalPrice();  // Aktualizujemy sumę po zmianie
    });
    newQuantityInput.addEventListener('input', () => {
        updateResult(newSelect1, newSelect2, newQuantityInput, newOutput);
        updateTotalPrice();  // Aktualizujemy sumę po zmianie
    });

    // Nasłuchiwacz kliknięcia dla przycisku usuwania
    newRemoveButton.addEventListener('click', removeRow);

    // Nasłuchiwanie na kliknięcie przycisku dodawania wiersza w nowym wierszu
    const newButton = newRow.querySelector('.add-row-button');
    newButton.addEventListener('click', addNewRow);

    // Dodajemy klonowany wiersz do kontenera
    container.appendChild(newRow);

    updateTotalPrice();  // Aktualizujemy sumę po dodaniu nowego wiersza
}

// Funkcja do aktualizacji sumy cen
function updateTotalPrice() {
    const rows = document.querySelectorAll('.row');
    let total = 0;

    rows.forEach(row => {
        const select1 = row.querySelector('.select1');
        const select2 = row.querySelector('.select2');
        const quantityInput = row.querySelector('.quantity');
        const output = row.querySelector('.output');

        const price = updateResult(select1, select2, quantityInput, output);
        total += price; // Dodajemy cenę z tego wiersza
    });

    // Wyświetlamy zaktualizowaną sumę
    document.getElementById('total-price').textContent = `${total} $`;
}

// Wywołanie funkcji ładowania opcji po załadowaniu strony
document.addEventListener('DOMContentLoaded', loadOptions);

// Nasłuchiwanie na kliknięcie przycisku dodawania wiersza w początkowym wierszu
document.getElementById('row1').querySelector('.add-row-button').addEventListener('click', addNewRow);

// Nasłuchiwanie na zmiany w selectach oraz polu ilości w pierwszym wierszu
const select1 = document.querySelector('.select1');
const select2 = document.querySelector('.select2');
const quantityInput = document.querySelector('.quantity');
const output = document.querySelector('.output');
const iconElement = document.querySelector('#icon');

select1.addEventListener('change', () => {
    updateResult(select1, select2, quantityInput, output);
    updateIcon(select1, iconElement);
    updateTotalPrice();  // Aktualizujemy sumę po zmianie
});

select2.addEventListener('change', () => {
    updateResult(select1, select2, quantityInput, output);
    updateTotalPrice();  // Aktualizujemy sumę po zmianie
});

quantityInput.addEventListener('input', () => {
    updateResult(select1, select2, quantityInput, output);
    updateTotalPrice();  // Aktualizujemy sumę po zmianie
});
