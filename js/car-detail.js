// JavaScript для страницы детальной информации об автомобиле

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const carId = urlParams.get('id');

    if (carId) {
        const car = getCarById(carId);
        if (car) {
            renderCarDetail(car);
            renderSimilarCars(car);
            setupInquiryForm(car);
        } else {
            document.getElementById('carDetailContent').innerHTML = 
                '<p>Автомобиль не найден</p>';
        }
    } else {
        document.getElementById('carDetailContent').innerHTML = 
            '<p>Автомобиль не указан</p>';
    }
});

// Отображение детальной информации об автомобиле
function renderCarDetail(car) {
    const container = document.getElementById('carDetailContent');
    if (!container) return;

    const imageUrl = car.imageUrl || `https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&h=600&fit=crop&auto=format`;
    container.innerHTML = `
        <div class="car-detail">
            <div class="car-detail-image">
                <img src="${imageUrl}" alt="${car.brand} ${car.model}">
            </div>
            <div class="car-detail-info">
                <h1>${car.brand} ${car.model}</h1>
                <div class="car-detail-price">${formatPrice(car.price)}</div>
                
                <div class="car-detail-specs">
                    <div class="spec-item">
                        <span>Год выпуска:</span>
                        <span>${car.year}</span>
                    </div>
                    <div class="spec-item">
                        <span>Пробег:</span>
                        <span>${formatMileage(car.mileage)}</span>
                    </div>
                    <div class="spec-item">
                        <span>Тип кузова:</span>
                        <span>${car.bodyType}</span>
                    </div>
                    <div class="spec-item">
                        <span>Двигатель:</span>
                        <span>${car.engine}</span>
                    </div>
                    <div class="spec-item">
                        <span>Коробка передач:</span>
                        <span>${car.transmission}</span>
                    </div>
                    <div class="spec-item">
                        <span>Привод:</span>
                        <span>${car.drive}</span>
                    </div>
                    <div class="spec-item">
                        <span>Цвет:</span>
                        <span>${car.color}</span>
                    </div>
                </div>

                <div class="car-detail-description">
                    <h3>Описание</h3>
                    <p>${car.description}</p>
                </div>

                <div class="car-detail-actions">
                    <a href="contacts.html" class="btn btn-primary">Связаться с нами</a>
                    <a href="credit.html" class="btn btn-outline">Оформить кредит</a>
                </div>
            </div>
        </div>
    `;
}

// Отображение похожих автомобилей
function renderSimilarCars(car) {
    const container = document.getElementById('similarCars');
    if (!container) return;

    const similarCars = getSimilarCars(car, 4);
    
    if (similarCars.length === 0) {
        container.innerHTML = '<p>Похожих автомобилей не найдено</p>';
        return;
    }

    container.innerHTML = similarCars.map(c => createCarCard(c)).join('');
}

// Настройка формы заявки
function setupInquiryForm(car) {
    const form = document.getElementById('carInquiryForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            data.carId = car.id;
            data.carName = `${car.brand} ${car.model}`;
            
            console.log('Inquiry submitted:', data);
            alert('Спасибо! Ваша заявка принята. Мы свяжемся с вами в ближайшее время.');
            form.reset();
        });
    }
}

