/// <reference types="cypress" />
// ***********************************************************
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
            const adicionarProdutoAoCarrinho = (produtoSelector, tamanho, cor, quantidade) => {
            cy.get(produtoSelector).should('exist').and('be.visible').click();
            cy.get(`.button-variable-item-${tamanho}`).should('exist').click();
            cy.get(`.button-variable-item-${cor}`).should('exist').click();
            cy.get('.input-text').clear().type(quantidade);
            cy.get('.single_add_to_cart_button').should('be.visible').click();
        };
            cy.visit('produtos/');
            adicionarProdutoAoCarrinho('.post-3111 > .product-block > .block-inner > .image > .product-image > .image-hover', 'XS', 'Brown', '5');  
            adicionarProdutoAoCarrinho('.post-3528 > .product-block > .block-inner > .image > .product-image > .image-hover', 'S', 'Red', '5');
            adicionarProdutoAoCarrinho('.post-2559 > .product-block > .block-inner > .image > .product-image > .image-hover', 'M', 'Green', '5'); // Corrigindo tamanho
            adicionarProdutoAoCarrinho('.post-3964 > .product-block > .block-inner > .image > .product-image > .image-hover', 'XS', 'Green', '5');
        });


        it('Finalizar compra', () => {
            cy.visit('carrinho/');
            cy.get('.checkout-button button alt wc-forward').click();
            cy.get('.woocommerce-message > .button').click();
            cy.get('.checkout-button').click();
            cy.get('#billing_first_name').clear().type('Marco');
            cy.get('#billing_last_name').clear().type('Suelio');
            cy.get('#billing_city').clear().type('São Paulo');
            cy.get('#billing_address_1').clear().type('Rua Teste');
            cy.get('#billing_postcode').clear().type('12345678');
            cy.get('#billing_phone').clear().type('11999999999');
            cy.get('#payment_method_cod').click();
            cy.get('#terms').check();
            cy.get('#place_order').click();

            cy.get('.page-title').should('contain', 'Pedido recebido');
        });
    });


});
