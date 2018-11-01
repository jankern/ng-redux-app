import Controller from "./reg-content-text.controller";
import template from "./reg-content-text.template.html";

export default {
    template: template,

    bindings: {
		isContentVisible: '<',
    },

    controller: ['$controller', '$scope', '$ngRedux', 'configService', Controller]

}