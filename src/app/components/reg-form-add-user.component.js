import Controller from "./reg-form-add-user.controller";
import template from "./reg-form-add-user.template.html";

export default {
    template: template,
    bindings: {
        isContentVisible: '=',
        isExternalConfirmed: '='
    },
    controller: ['$controller', '$scope', '$element', '$ngRedux', 'configService', 'messageService', 'xhrService', Controller]
}