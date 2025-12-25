// Компоненты для переиспользования

// Создать header
function createHeader() {
    const header = document.getElementById('header');
    if (!header) return;

    // Определяем текущую страницу
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    const navItems = [
        { href: 'index.html', text: 'Главная' },
        { href: 'catalog.html', text: 'Каталог' },
        { href: 'services.html', text: 'Услуги' },
        { href: 'credit.html', text: 'Кредит' },
        { href: 'trade-in.html', text: 'Trade-in' },
        { href: 'about.html', text: 'О компании' },
        { href: 'faq.html', text: 'FAQ' },
        { href: 'contacts.html', text: 'Контакты' }
    ];

    const navHTML = navItems.map(item => {
        const isActive = item.href === currentPage ? 'active' : '';
        return `<li><a href="${item.href}" class="${isActive}">${item.text}</a></li>`;
    }).join('');

    header.innerHTML = `
        <div class="header-content">
            <a href="index.html" class="logo">Premium Cars</a>
            <nav>
                <ul class="nav">
                    ${navHTML}
                </ul>
            </nav>
            <button class="mobile-menu-toggle" id="mobileMenuToggle" aria-label="Меню">
                <span></span>
                <span></span>
                <span></span>
            </button>
        </div>
    `;

    // Мобильное меню
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const nav = header.querySelector('.nav');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });
    }
}

// Создать footer
function createFooter() {
    const footer = document.getElementById('footer');
    if (!footer) return;

    footer.innerHTML = `
        <div class="footer-content">
            <div class="footer-section">
                <h3>О компании</h3>
                <ul>
                    <li><a href="about.html">О нас</a></li>
                    <li><a href="services.html">Услуги</a></li>
                    <li><a href="contacts.html">Контакты</a></li>
                </ul>
            </div>
            <div class="footer-section">
                <h3>Покупателям</h3>
                <ul>
                    <li><a href="catalog.html">Каталог</a></li>
                    <li><a href="credit.html">Кредит и лизинг</a></li>
                    <li><a href="trade-in.html">Trade-in</a></li>
                </ul>
            </div>
            <div class="footer-section">
                <h3>Информация</h3>
                <ul>
                    <li><a href="faq.html">FAQ</a></li>
                    <li><a href="policy.html">Политика конфиденциальности</a></li>
                </ul>
            </div>
            <div class="footer-section">
                <h3>Контакты</h3>
                <ul>
                    <li>г. Москва, ул. Автомобильная, д. 15</li>
                    <li><a href="tel:+74951234567">+7 (495) 123-45-67</a></li>
                    <li><a href="mailto:info@premiumcars.ru">info@premiumcars.ru</a></li>
                </ul>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; 2024 Premium Cars. Все права защищены.</p>
        </div>
    `;
}

// Создать карточку автомобиля
function createCarCard(car) {
    const imageUrl = car.imageUrl || `https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600&h=400&fit=crop&auto=format`;
    return `
        <div class="car-card">
            <div class="car-image">
                <img src="${imageUrl}" alt="${car.brand} ${car.model}" loading="lazy">
            </div>
            <div class="car-info">
                <h3 class="car-title">${car.brand} ${car.model}</h3>
                <div class="car-details">
                    ${car.year} год • ${formatMileage(car.mileage)} • ${car.bodyType}
                </div>
                <div class="car-price">${formatPrice(car.price)}</div>
                <div class="car-actions">
                    <a href="car.html?id=${car.id}" class="btn btn-primary">Подробнее</a>
                </div>
            </div>
        </div>
    `;
}

// Инициализация компонентов
document.addEventListener('DOMContentLoaded', () => {
    createHeader();
    createFooter();
});

