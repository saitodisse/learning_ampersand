'use strict';
var View = require('ampersand-view');
var templates = require('../templates');

module.exports = View.extend({

    template: templates.pages.um_dois_tres,

    autoRender: true,

    initialize: function () {
        this.listenTo(window.app.router, 'page', this.handleNewPage);
    },

    handleNewPage: function () {
        this.updateActiveNav();
    },

    updateActiveNav: function () {
        var current_pathname = window.location.pathname,
            i,
            aTag,
            aTags,
            linkApontaPaginaAtual;

        // pego todos os links do menu de tráz pra frente, assim o home,
        // que é o menos especifico fica por último
        aTags = this.getAll('a');
        for (i = aTags.length - 1; i >= 0; i -= 1) {
            aTag = aTags[i];

            linkApontaPaginaAtual = current_pathname.indexOf(aTag.pathname) >= 0;
            if (linkApontaPaginaAtual) {
                $(aTag).css('font-weight', 'bold');
            } else {
                $(aTag).css('font-weight', 'normal');
            }
        }
    },
});