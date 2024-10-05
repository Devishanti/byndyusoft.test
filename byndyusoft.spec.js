describe('Проверка контактной информации на сайте Byndyusoft', () => {
    it('Проверяет ссылку на Telegram', () => {
        // Переход на главную страницу Google
        cy.visit('https://www.google.ru/');
        
        // Ждем 3 секунды
        cy.wait(3000);

        // Используем указанный селектор для поиска строки
        cy.get('input[name="q"]') // Обычно поле поиска Google имеет имя "q"
            .type('Byndyusoft{enter}'); 

        // Увеличиваем время ожидания для нахождения элемента h3
        cy.get('h3', { timeout: 10000 })
            .first()
            .click()
            .then(() => {
                // Логируем URL после клика
                cy.url().then((url) => {
                    cy.log(`Текущий URL: ${url}`);
                });
            });

        // Проверяем, что кнопка "Заказать презентацию" присутствует на странице
        cy.get('body > section.knowMore > div > span', { timeout: 20000 })
            .should('be.visible')
              .click(); 

        // Проверяем ссылку на Telegram
        cy.get('a[href="http://t.me/alexanderbyndyu"]', { timeout: 10000 })
            .should('be.visible')
            .and('have.attr', 'href', 'http://t.me/alexanderbyndyu');
    });
});
