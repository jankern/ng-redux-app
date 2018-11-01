/*
*   OXS app
*   Team: OXS.eco
*/

import angular from 'angular';

/* Import FE component lib ngMaterial */

import angularAnimate from 'angular-animate';
import angularAria from 'angular-aria';
import ngMessages from 'angular-messages';
import ngMaterial from 'angular-material';
import translation from 'angular-translate';
import 'angular-translate-loader-static-files';

import '../../node_modules/angular-material/angular-material.css';
import '../assets/scss/styles.scss'; 

// Import angular components and services
import * as components from './app.components';
import * as directives from './app.directives';
import * as services from './app.services';

import registrationReducer from './model/model.reducer';
import logger from './model/redux.middleware.js';
import ngRedux from 'ng-redux'; 

// Websocket client and bundle import
import bb from '../assets/js/browser-bundle';
import * as wss from '../assets/js/websocket-service';

window.MaasWssClient = bb;
window.WebsocketService = wss.WebsocketService;

// define angular module
const MID = "oxs-registration";
angular.module(MID, [ngRedux, ngMaterial, ngMessages, translation]); 

console.log('test');

class AppCtrl{
    constructor(){
        console.info('App has been started!');
    }
}

// Iterates through all exported components and registers them
angular.module(MID).controller('appCtrl', AppCtrl);

for (let id in components) {
    angular.module(MID).component(id, components[id]);
}

// Iterates through all exported directives and registers them
for (let id in directives) {
    angular.module(MID).directive(id, directives[id]);
}

// Iterates through all exported services and registers them
for (let id in services) {
    angular.module(MID).service(id, services[id]);
}

// angular module config
angular.module(MID).config(['$httpProvider', '$ngReduxProvider', '$translateProvider', ($httpProvider, $ngReduxProvider, $translateProvider)=>{
    // http interceptor service 
    $httpProvider.interceptors.push('xhrInterceptor');
    // redux store initialization
    $ngReduxProvider.createStoreWith({
        registrationReducer: registrationReducer
    }, [logger]);
    // set default language
    $translateProvider.useStaticFilesLoader({
        prefix: 'i18n/locale-',
        suffix: '.json'
    });
    $translateProvider.preferredLanguage('de');
    $translateProvider.useSanitizeValueStrategy('sce');
    
}]);

export default MID;