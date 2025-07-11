# 📷 Unsplash Gallery

Интерактивная галерея изображений с поиском по API Unsplash, модальным окном просмотра и бесконечной прокруткой.

## 🚀 Функции

- 🔎 Поиск изображений по ключевым словам
- ♾️ Бесконечная прокрутка (Intersection Observer + React Query)
- 🖼️ Модальное окно с увеличенным просмотром изображения
- 🧭 Адаптивный дизайн (брейкпоинты: 390px, 768px, 1024px, 1440px)
- 💡 Плавная анимация и загрузка изображений

## 🛠️ Используемые технологии

- **React + TypeScript**
- **TailwindCSS** — стилизация и адаптивность
- **@tanstack/react-query** — кэширование и управление данными
- **Unsplash API** — получение изображений
- **IntersectionObserver API** — реализация бесконечного скролла
- **classNames** — управление классами
- **jotai** — управление состоянием

## 📁 Cтруктура проекта

Код организован с использованием простой модульной архитектуры

```
src/
│
├── modules/
│ └── Gallery/ # Модуль галереи (логика + UI)
│ ├── components/ # Компоненты модуля
│ ├── requests/ # API запросы модуля
│ └── store/ # Хранилище данных состояний модуля
│
├── libs/ # Переиспользуемые UI компоненты, хуки и утилиты
│
├── api/ # Типы и конфигурация API
│
├── index.css # Глобальные стили
└── App.tsx # Точка входа
```
