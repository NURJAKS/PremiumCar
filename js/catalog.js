// JavaScript для страницы каталога

let allCars = [];
let filteredCars = [];

document.addEventListener('DOMContentLoaded', () => {
    allCars = getAllCars();
    filteredCars = [...allCars];
    
    initializeFilters();
    renderCars();
    setupSorting();
});

// Инициализация фильтров
function initializeFilters() {
    // Загрузка марок
    const brandFilter = document.getElementById('brandFilter');
    if (brandFilter) {
        const brands = getUniqueBrands();
        brandFilter.innerHTML = brands.map(brand => 
            `<label><input type="checkbox" value="${brand}" data-filter="brand"> ${brand}</label>`
        ).join('');
        
        // Автоматическое применение при изменении чекбоксов марок
        brandFilter.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            checkbox.addEventListener('change', applyFilters);
        });
    }

    // Настройка слайдеров цены
    setupPriceRange();
    
    // Настройка слайдеров года
    setupYearRange();

    // Автоматическое применение при изменении типа кузова
    const bodyTypeFilter = document.getElementById('bodyTypeFilter');
    if (bodyTypeFilter) {
        bodyTypeFilter.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            checkbox.addEventListener('change', applyFilters);
        });
    }

    // Кнопка применения фильтров (для явного применения)
    const applyFiltersBtn = document.getElementById('applyFilters');
    if (applyFiltersBtn) {
        applyFiltersBtn.addEventListener('click', applyFilters);
    }

    // Кнопка сброса фильтров
    const resetFiltersBtn = document.getElementById('resetFilters');
    if (resetFiltersBtn) {
        resetFiltersBtn.addEventListener('click', resetFilters);
    }
}

// Настройка диапазона цены
function setupPriceRange() {
    const priceMin = document.getElementById('priceMin');
    const priceMax = document.getElementById('priceMax');
    const priceMinInput = document.getElementById('priceMinInput');
    const priceMaxInput = document.getElementById('priceMaxInput');

    if (priceMin && priceMax && priceMinInput && priceMaxInput && allCars.length > 0) {
        const maxPrice = Math.max(...allCars.map(car => car.price));
        const minPrice = Math.min(...allCars.map(car => car.price));
        
        priceMin.min = 0;
        priceMin.max = maxPrice;
        priceMax.min = 0;
        priceMax.max = maxPrice;
        
        priceMin.value = minPrice;
        priceMax.value = maxPrice;
        priceMinInput.value = minPrice;
        priceMaxInput.value = maxPrice;

        priceMin.addEventListener('input', (e) => {
            priceMinInput.value = e.target.value;
            if (parseInt(priceMin.value) > parseInt(priceMax.value)) {
                priceMax.value = priceMin.value;
                priceMaxInput.value = priceMin.value;
            }
            applyFilters();
        });

        priceMax.addEventListener('input', (e) => {
            priceMaxInput.value = e.target.value;
            if (parseInt(priceMax.value) < parseInt(priceMin.value)) {
                priceMin.value = priceMax.value;
                priceMinInput.value = priceMax.value;
            }
            applyFilters();
        });

        priceMinInput.addEventListener('input', (e) => {
            const value = parseInt(e.target.value) || 0;
            priceMin.value = Math.min(value, parseInt(priceMax.value));
            applyFilters();
        });

        priceMaxInput.addEventListener('input', (e) => {
            const value = parseInt(e.target.value) || maxPrice;
            priceMax.value = Math.max(value, parseInt(priceMin.value));
            applyFilters();
        });
    }
}

// Настройка диапазона года
function setupYearRange() {
    const yearMin = document.getElementById('yearMin');
    const yearMax = document.getElementById('yearMax');
    const yearMinInput = document.getElementById('yearMinInput');
    const yearMaxInput = document.getElementById('yearMaxInput');

    if (yearMin && yearMax && yearMinInput && yearMaxInput && allCars.length > 0) {
        const minYear = Math.min(...allCars.map(car => car.year));
        const maxYear = Math.max(...allCars.map(car => car.year));
        
        yearMin.min = minYear;
        yearMin.max = maxYear;
        yearMax.min = minYear;
        yearMax.max = maxYear;
        
        yearMin.value = minYear;
        yearMax.value = maxYear;
        yearMinInput.value = minYear;
        yearMaxInput.value = maxYear;
        yearMin.addEventListener('input', (e) => {
            yearMinInput.value = e.target.value;
            if (parseInt(yearMin.value) > parseInt(yearMax.value)) {
                yearMax.value = yearMin.value;
                yearMaxInput.value = yearMin.value;
            }
            applyFilters();
        });

        yearMax.addEventListener('input', (e) => {
            yearMaxInput.value = e.target.value;
            if (parseInt(yearMax.value) < parseInt(yearMin.value)) {
                yearMin.value = yearMax.value;
                yearMinInput.value = yearMax.value;
            }
            applyFilters();
        });

        yearMinInput.addEventListener('input', (e) => {
            const value = parseInt(e.target.value) || 2000;
            yearMin.value = Math.min(Math.max(value, 2000), parseInt(yearMax.value));
            applyFilters();
        });

        yearMaxInput.addEventListener('input', (e) => {
            const value = parseInt(e.target.value) || 2024;
            yearMax.value = Math.max(Math.min(value, 2024), parseInt(yearMin.value));
            applyFilters();
        });
    }
}

// Применить фильтры
function applyFilters() {
    try {
        const brandFilterEl = document.getElementById('brandFilter');
        const selectedBrands = brandFilterEl 
            ? Array.from(brandFilterEl.querySelectorAll('input[type="checkbox"]:checked'))
                .map(cb => cb.value)
            : [];
        
        const priceMinInput = document.getElementById('priceMinInput');
        const priceMaxInput = document.getElementById('priceMaxInput');
        const priceMin = priceMinInput ? (parseInt(priceMinInput.value) || 0) : 0;
        const priceMax = priceMaxInput ? (parseInt(priceMaxInput.value) || 10000000) : 10000000;
        
        const yearMinInput = document.getElementById('yearMinInput');
        const yearMaxInput = document.getElementById('yearMaxInput');
        const yearMin = yearMinInput ? (parseInt(yearMinInput.value) || 2000) : 2000;
        const yearMax = yearMaxInput ? (parseInt(yearMaxInput.value) || 2024) : 2024;
        
        const bodyTypeFilterEl = document.getElementById('bodyTypeFilter');
        const selectedBodyTypes = bodyTypeFilterEl
            ? Array.from(bodyTypeFilterEl.querySelectorAll('input[type="checkbox"]:checked'))
                .map(cb => cb.value)
            : [];

        filteredCars = allCars.filter(car => {
            const brandMatch = selectedBrands.length === 0 || selectedBrands.includes(car.brand);
            const priceMatch = car.price >= priceMin && car.price <= priceMax;
            const yearMatch = car.year >= yearMin && car.year <= yearMax;
            const bodyTypeMatch = selectedBodyTypes.length === 0 || selectedBodyTypes.includes(car.bodyType);

            return brandMatch && priceMatch && yearMatch && bodyTypeMatch;
        });

        renderCars();
    } catch (error) {
        console.error('Ошибка при применении фильтров:', error);
    }
}

// Сбросить фильтры
function resetFilters() {
    // Сброс чекбоксов
    document.querySelectorAll('input[type="checkbox"]').forEach(cb => {
        cb.checked = false;
    });

    // Сброс цены
    const priceMin = document.getElementById('priceMin');
    const priceMax = document.getElementById('priceMax');
    const priceMinInput = document.getElementById('priceMinInput');
    const priceMaxInput = document.getElementById('priceMaxInput');
    
    if (priceMin && priceMax && priceMinInput && priceMaxInput && allCars.length > 0) {
        const maxPrice = Math.max(...allCars.map(car => car.price));
        const minPrice = Math.min(...allCars.map(car => car.price));
        priceMin.value = minPrice;
        priceMax.value = maxPrice;
        priceMinInput.value = minPrice;
        priceMaxInput.value = maxPrice;
    }

    // Сброс года
    const yearMin = document.getElementById('yearMin');
    const yearMax = document.getElementById('yearMax');
    const yearMinInput = document.getElementById('yearMinInput');
    const yearMaxInput = document.getElementById('yearMaxInput');
    
    if (yearMin && yearMax && yearMinInput && yearMaxInput && allCars.length > 0) {
        const minYear = Math.min(...allCars.map(car => car.year));
        const maxYear = Math.max(...allCars.map(car => car.year));
        yearMin.value = minYear;
        yearMax.value = maxYear;
        yearMinInput.value = minYear;
        yearMaxInput.value = maxYear;
    }

    filteredCars = [...allCars];
    renderCars();
}

// Отображение автомобилей
function renderCars() {
    const container = document.getElementById('catalogCars');
    const noResults = document.getElementById('noResults');
    const resultsCount = document.getElementById('resultsCount');

    if (!container) return;

    if (filteredCars.length === 0) {
        container.innerHTML = '';
        if (noResults) noResults.style.display = 'block';
    } else {
        container.innerHTML = filteredCars.map(car => createCarCard(car)).join('');
        if (noResults) noResults.style.display = 'none';
    }

    if (resultsCount) {
        resultsCount.textContent = filteredCars.length;
    }
}

// Настройка сортировки
function setupSorting() {
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            const sortValue = e.target.value;
            sortCars(sortValue);
            renderCars();
        });
    }
}

// Сортировка автомобилей
function sortCars(sortValue) {
    switch (sortValue) {
        case 'price-asc':
            filteredCars.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            filteredCars.sort((a, b) => b.price - a.price);
            break;
        case 'year-desc':
            filteredCars.sort((a, b) => b.year - a.year);
            break;
        case 'year-asc':
            filteredCars.sort((a, b) => a.year - b.year);
            break;
        default:
            break;
    }
}

