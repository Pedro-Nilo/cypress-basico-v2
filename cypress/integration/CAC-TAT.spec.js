/// <reference types="Cypress" />

const { it } = require("mocha");

describe("Central de Atendimento ao Cliente TAT", function () {
    this.beforeEach(function () {
        cy.visit("./src/index.html");
    });

    it("verifica o título da aplicação", function () {
        cy.title()
            .should("be.equal", "Central de Atendimento ao Cliente TAT");
    });

    it("preenche os campos obrigatórios e envia o formulário", function () {
        const longText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc convallis erat a bibendum vehicula. Quisque eu condimentum odio. Ut nec orci cursus, tempor felis a, pretium justo. Sed at ante et urna sodales rutrum vel eu neque. Nunc fringilla lacus mauris, eget volutpat purus feugiat a. Donec in velit luctus, lobortis odio sollicitudin, hendrerit enim. Vivamus lobortis commodo orci non pellentesque. Morbi in tortor egestas, dapibus turpis maximus, sodales felis. In ut consectetur erat, at efficitur urna. Curabitur ultrices metus id tellus vestibulum, sit amet ultrices sem blandit.";

        cy.get("#firstName")
            .should("be.visible")
            .type("Pedro Nilo")
            .should("have.value", "Pedro Nilo");

        cy.get("#lastName")
            .should("be.visible")
            .type("Zonderico Nicola")
            .should("have.value", "Zonderico Nicola");

        cy.get("#email")
            .should("be.visible")
            .type("pedroniloz.nicola@gmail.com")
            .should("have.value", "pedroniloz.nicola@gmail.com");

        cy.get("#open-text-area")
            .should("be.visible")
            .type(longText, { delay: 0 })
            .should("have.value", longText);

        cy.get("button[type='submit']")
            .should("be.visible")
            .click();

        cy.get(".success")
            .should("be.visible");
    });

    it("exibe mensagem de erro ao submeter o formulário com um email com formatação inválida", function () {
        cy.get("#firstName")
            .type("Pedro Nilo");

        cy.get("#lastName")
            .type("Zonderico Nicola");

        cy.get("#email")
            .type("pedroniloz.nicola");

        cy.get("#open-text-area")
            .type("Teste com e-mail inválido");

        cy.get("button[type='submit']")
            .click();

        cy.get(".error")
            .should("be.visible");
    });

    it("preenche campo telefone com valor não-númerico", function () {
        cy.get("#phone")
            .type("Teste")
            .should("have.value", "");
    });

    it.only("exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário", function () {
        cy.get("#firstName")
            .type("Pedro Nilo");

        cy.get("#lastName")
            .type("Zonderico Nicola");

        cy.get("#email")
            .type("pedroniloz.nicola@gmail.com");

        cy.get("#phone-checkbox").check();

        cy.get("#open-text-area")
            .type("Teste colocando telefone como obrigatório e não preenchendo");

        cy.get("button[type='submit']")
            .click();

        cy.get(".error")
            .should("be.visible");
    });
});
