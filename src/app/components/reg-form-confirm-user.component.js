import Controller from "./reg-form-confirm-user.controller";
import template from "./reg-form-confirm-user.template.html";

export default {
    template: template,
    bindings: {
		isContentVisible: '=',
        isExternalConfirmed: '<',
        isReconfirmed: '<'
    },

    controller: ['$controller', '$scope', '$rootScope', '$http', '$q', '$timeout', '$ngRedux', 'xhrService', 'messageService', 'configService', 'socketService', Controller]

}