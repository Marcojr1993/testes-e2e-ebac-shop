class produtosPage {

    visitarUrl() {

        cy.visit('produtos/')
    }

    buscarProduto(nomeProduto) {
        cy.get('[name="s"]').eq(1).type(nomeProduto)
        cy.get('.button-search').eq(1).click()
        

    }

    buscarProdutoLista(nomeProduto) {
        cy.get('.product-block')
            .contains(nomeProduto)
            .click()

    }

    visitarProduto(nomeProduto) {
        const urlFormatada = nomeProduto.replace(/ /g, '-')
       cy.visit(`produtos/${urlFormatada}`)


    }

    addProdutoCarrinho(tamanho, cor, quantidade){
        cy.get(`.button-variable-item-${tamanho}`).click()
        cy.get(`.button-variable-item-${cor}`).click()
        cy.get('.input-text').clear().type(quantidade)
        cy.get('.single_add_to_cart_button').click();
        //cy.get('.woocommerce-message').should('contain', 'adicionados no seu carrinho')

    }


}

export default new produtosPage()