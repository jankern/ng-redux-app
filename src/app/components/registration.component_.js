import Controller from "./registration.controller";
import template from "./registration.template.html";

export default {
    template: template,
//    template: '<div>{{$ctrl.test}}</div><div>{{$ctrl.test2}}</div>',

    bindings: {
		// applicant: '<',
		// index: '<',
		// next: '&',
		// exitApp: '&'
    },

    controller: ['$controller', '$scope', '$rootScope', '$http', '$q', '$timeout', '$ngRedux', 'xhrService', 'configService', Controller]

}