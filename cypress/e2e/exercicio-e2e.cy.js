/// <reference types="cypress" />
// ***********************************************************
//import fixtures from "../fixtures/produtos.json ";
import produtosPages from "../support/page_objects/produtos-pages.js";

context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
    /*  Como cliente 
        Quero acessar a Loja EBAC 
        Para fazer um pedido de 4 produtos 
        Fazendo a escolha dos produtos
        Adicionando ao carrinho
        Preenchendo todas opções no checkout
        E validando minha compra ao final */

    describe('Fluxo de compra no e-commerce', () => {

        before(() => {
            cy.visit('/');
        });

        it('Realizar login', () => {

            cy.get('.icon-user-unfollow').click();
            cy.get('#username').type('marco.suelio@hotmail.com');
            cy.get('#password').type('123456'); { log: false }   // Não exibir o log da senha
            cy.get('.woocommerce-form > .button').click();
        });

        it('Adicionar produtos ao carrinho', () => {

            produtosPages.visitarUrl();

            produtosPages.buscarProduto('Abominable Hoodie');
            produtosPages.addProdutoCarrinho('L', 'Red', 1);

            produtosPages.buscarProduto('Aero Daily Fitness Tee');
            produtosPages.addProdutoCarrinho('S', 'Brown', 4);

            produtosPages.buscarProduto('Balboa Persistence Tee');
            produtosPages.addProdutoCarrinho('L', 'Gray ', 5);

            produtosPages.buscarProduto('Deion Long-Sleeve EverCool');
            produtosPages.addProdutoCarrinho('XL', 'White', 3);

            cy.get('.woocommerce-message > .button').click();
            cy.get('.checkout-button').click();
            cy.get('#billing_first_name').clear().type('Marco');
            cy.get('#billing_last_name').clear().type('Suelio');
            cy.get('#billing_city').clear().type('São Paulo');
            cy.get('#billing_address_1').clear().type('Rua Teste');
            cy.get('#billing_postcode').clear().type('12345678');
            cy.get('#billing_phone').clear().type('11999999999');
            cy.get('#billing_email').clear().type('marco.suelio@hotmail.com')
            cy.get('#payment_method_cod').click();
            cy.get('#terms').check();
            cy.get('#place_order').click();
            cy.get('.page-title').should('contain', 'Pedido recebido');

        });

    });


});
