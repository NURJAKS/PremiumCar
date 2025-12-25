// Главный JavaScript файл

// Загрузить популярные автомобили на главной странице
document.addEventListener('DOMContentLoaded', () => {
    const popularCarsContainer = document.getElementById('popularCars');
    
    if (popularCarsContainer) {
        const popularCars = getPopularCars();
        popularCarsContainer.innerHTML = popularCars.map(car => createCarCard(car)).join('');
    }

    // Обработка форм
    setupForms();
});

// Настройка обработчиков форм
function setupForms() {
    // Форма обратной связи на странице контактов
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }

    // Форма заявки на услугу
    const serviceForm = document.getElementById('serviceForm');
    if (serviceForm) {
        serviceForm.addEventListener('submit', handleFormSubmit);
    }

    // Форма Trade-in
    const tradeinForm = document.getElementById('tradeinForm');
    if (tradeinForm) {
        tradeinForm.addEventListener('submit', handleFormSubmit);
    }
}

// Обработка отправки формы
function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // В реальном приложении здесь был бы запрос к серверу
    console.log('Form submitted:', data);
    
    // Показываем сообщение об успехе
    alert('Спасибо! Ваша заявка принята. Мы свяжемся с вами в ближайшее время.');
    
    // Очищаем форму
    form.reset();
}

