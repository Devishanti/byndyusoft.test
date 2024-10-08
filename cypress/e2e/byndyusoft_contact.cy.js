/// <reference types="cypress" />
describe('Проверка контактной информации на сайте Byndyusoft', () => {
    it('Проверяет ссылку на Telegram', () => {
        // Переход на главную страницу Google
        cy.visit('https://www.google.ru/');

        // Ждем 1 секунду
        cy.wait(1000);

        // Используем указанный селектор для поиска строки
        cy.get('textarea') // Поле поиска Google
            .first()
            .type('Byndyusoft{enter}');

        // Используем более простой селектор для нахождения результата поиска
        cy.get('a[href*="byndyusoft.com"]', { timeout: 10000 }) // Ищем ссылку на Byndyusoft
            .first()
            .click()
            .then(() => {
                // Логируем URL после клика
                cy.url().then((url) => {
                    cy.log(`Текущий URL: ${url}`);
                });
            });
    });

    it('Нажимает на кнопку "Заказать презентацию"', () => {
        // Переход на сайт Byndyusoft
        cy.visit('https://byndyusoft.com/', { timeout: 120000 });

        // Ищем кнопку по тексту и нажимаем на нее
        cy.contains('Заказать презентацию', { timeout: 10000 })
            .should('be.visible') // Проверяем, что кнопка видима
            .click(); // Нажимаем на кнопку

        // Ждем появления всплывающего окна
        cy.get('.popup-callback--visible', { timeout: 10000 })
            .should('be.visible'); // Проверяем, что всплывающее окно видно

        // Прокручиваем страницу вниз
        cy.scrollTo('bottom');

        // Проверяем ссылку на Telegram в всплывающем окне
        cy.get('a[href="http://t.me/alexanderbyndyu"]', { timeout: 3000 })
            .should('be.visible')
            .click();
    });
});