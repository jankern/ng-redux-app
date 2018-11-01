import Controller from "./reg-form-reconfirm-user.controller";
import template from "./reg-form-reconfirm-user.template.html";

export default {
    template: template,
    bindings: {
		isContentVisible: '=',
        isReconfirmed: '='
    },

    controller: ['$controller', '$scope', '$rootScope', '$http', '$q', '$timeout', '$ngRedux', 'xhrService', 'messageService', 'configService', Controller]

}