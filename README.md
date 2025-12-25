# Premium Cars - Автосалон

Многостраничный сайт для автосалона с каталогом автомобилей, фильтрацией и страницами отдельных предложений.

## Технологии

- HTML5
- CSS3 / SCSS
- JavaScript (Vanilla)
- Cloudflare Pages для деплоя

## Структура проекта

```
├── index.html          # Главная страница
├── catalog.html        # Каталог автомобилей
├── car.html           # Страница отдельного автомобиля
├── services.html       # Услуги
├── credit.html        # Кредит и лизинг
├── trade-in.html      # Trade-in
├── about.html         # О компании
├── faq.html           # FAQ
├── contacts.html      # Контакты
├── policy.html        # Политика конфиденциальности
├── css/
│   ├── main.scss      # Основные стили (SCSS)
│   └── main.css        # Скомпилированные стили
├── js/
│   ├── data.js        # Данные автомобилей
│   ├── components.js   # Переиспользуемые компоненты
│   ├── catalog.js      # Логика каталога
│   ├── car-detail.js   # Страница автомобиля
│   └── main.js         # Главная страница
└── images/            # Изображения
```

## Локальная разработка

1. Установите зависимости:
```bash
npm install
```

2. Компилируйте SCSS в CSS:
```bash
npm run build-css
```

3. Для автоматической компиляции при изменениях:
```bash
npm run watch-css
```

4. Откройте `index.html` в браузере или используйте локальный сервер.

## Деплой на Cloudflare Pages

### Автоматический деплой через GitHub

1. Подключите репозиторий к Cloudflare Pages:
   - Зайдите в Cloudflare Dashboard → Pages
   - Нажмите "Create a project"
   - Выберите "Connect to Git"
   - Выберите репозиторий `NURJAKS/PremiumCar`

2. Настройки сборки:
   - **Build command**: `npm run build`
   - **Build output directory**: `/` (корень проекта)
   - **Root directory**: `/` (корень проекта)
   - **Node version**: 18 или выше

3. Cloudflare Pages автоматически:
   - Установит зависимости (`npm install`)
   - Выполнит команду сборки (`npm run build`)
   - Задеплоит статические файлы

### Ручной деплой

```bash
# Скомпилируйте CSS
npm run build

# Загрузите файлы через Wrangler CLI
npx wrangler pages deploy .
```

## Особенности

- ✅ Каталог с фильтрацией (марка, цена, год, тип кузова)
- ✅ Страницы отдельных автомобилей
- ✅ Логика "подобных предложений"
- ✅ Формы обратной связи
- ✅ Адаптивный дизайн
- ✅ Оптимизация изображений
- ✅ SEO-friendly структура

## Лицензия

© 2024 Premium Cars. Все права защищены.
