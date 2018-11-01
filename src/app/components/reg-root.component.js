import Controller from "./reg-root.controller";
import template from "./reg-root.template.html";

export default {
    template: template,
    bindings: {},
    controller: ['$controller', '$scope', '$rootScope', '$compile', '$ngRedux', '$translate', 'configService', 'messageService', 'socketService', Controller]

}