// Получаем модальное окно по id.
const orderDialog = document.getElementById('order-dialog');

// Получаем все кнопки заказа в карточках товаров.
const orderButtons = document.querySelectorAll('.product-card__button');

// Получаем кнопку закрытия модального окна.
const closeDialogButton = document.getElementById('close-order-dialog');

// Получаем скрытое поле, в которое будет записан выбранный товар.
const selectedProductInput = document.getElementById('selected-product');

// Перебираем все кнопки «Заказать».
orderButtons.forEach((button) => {
  button.addEventListener('click', () => {
    // Получаем название товара из data-атрибута.
    const productName = button.dataset.product;

    // Записываем название товара в скрытое поле формы.
    selectedProductInput.value = productName;

    // Открываем модальное окно.
    orderDialog.showModal();
  });
});

// Закрываем модальное окно по кнопке «Закрыть».
closeDialogButton.addEventListener('click', () => {
  orderDialog.close();
}); 
// Получаем форму заявки.
const orderForm = document.getElementById('order-form');

// Получаем сообщение об успешной отправке.
const successMessage = document.getElementById('success-message');

// Обрабатываем отправку формы.
orderForm.addEventListener('submit', (event) => {
  // Отменяем стандартную отправку формы,
  // потому что backend пока не подключён.
  event.preventDefault();

  // Сбрасываем предыдущие признаки ошибок.
  const formElements = Array.from(orderForm.elements);

  formElements.forEach((element) => {
    if (element.willValidate) {
      element.removeAttribute('aria-invalid');
    }
  });

  // Проверяем встроенные HTML-ограничения формы.
  if (!orderForm.checkValidity()) {
    formElements.forEach((element) => {
      if (element.willValidate && !element.checkValidity()) {
        element.setAttribute('aria-invalid', 'true');
      }
    });

    // Показываем стандартные сообщения браузера.
    orderForm.reportValidity();
    return;
  }

  // Показываем сообщение об успешной отправке.
  successMessage.hidden = false;

  // Очищаем форму.
  orderForm.reset();

  // Закрываем модальное окно.
  orderDialog.close();
});
// ===============================
// Кнопка "Наверх"
// ===============================

// Создаём кнопку программно и добавляем её в body.
const scrollToTopButton = document.createElement('button');
scrollToTopButton.type = 'button';
scrollToTopButton.className = 'scroll-to-top';
scrollToTopButton.setAttribute('aria-label', 'Вернуться наверх');
scrollToTopButton.innerHTML = '&#8593;'; // стрелка вверх
document.body.appendChild(scrollToTopButton);

// Порог прокрутки в пикселях, после которого кнопка появляется.
const SCROLL_THRESHOLD = 300;

// Показываем или скрываем кнопку в зависимости от позиции скролла.
function toggleScrollToTopButton() {
  const shouldShow = window.scrollY > SCROLL_THRESHOLD;
  scrollToTopButton.classList.toggle('is-visible', shouldShow);
}

// Плавно прокручиваем страницу наверх.
function scrollToTop() {
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  window.scrollTo({
    top: 0,
    behavior: prefersReducedMotion ? 'auto' : 'smooth',
  });
}

// Слушаем прокрутку страницы.
window.addEventListener('scroll', toggleScrollToTopButton, { passive: true });

// Слушаем клик по кнопке.
scrollToTopButton.addEventListener('click', scrollToTop);

// Проверяем состояние кнопки при загрузке страницы
// (например, если браузер восстановил позицию скролла).
toggleScrollToTopButton();