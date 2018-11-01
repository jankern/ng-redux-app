import registrationActions from '../model/model.actions';

export
default class {

    constructor($controller, $scope, $rootScope, $compile, $ngRedux, $translate, configService, messageService, socketService) {

        this.messageService = messageService;
        this.progressStatus = false;
        this.app = {};
        this.isContentVisible = true;
        this.isExternalConfirmed = false;
        this.isReconfirmed = false;
        this.$translate = $translate;
        this.socketService = socketService;
        this.$scope = $scope;

        let disconnect = $ngRedux.connect(
            state => this.onUpdate(state), // What we want to map to our target
            registrationActions // Actions we want to map to our target
        )(this); // Our target

        $scope.$on('$destroy', disconnect); // Cleaning house

    }


    changeLocale() {
        this.$translate.use(this.localeLanguage);
    }

    $onInit() {
        // Redux store initialisation
        console.log('Start redux action ADD');

        this.add();
        this.progressStatus = this.messageService.progressStatus;
        // template Var
        let d = new Date();
        this.templateCopyright = 'Copyright © ' + d.getFullYear() + ' ';
        // Language settings
        this.localeLanguage = "";
        this.locales = ('de en').split(' ').map((lang) => {
            return {
                lang: lang
            };
        });
        this.localesKeys = {
            de: "Deutsch",
            en: "English"
        };

        this.st = true;

    }

    onUpdate(state) {
        return {
            selectedState: state.registrationReducer
        };
    }

    $onDestroy() {
        console.log('destroyed');
    }

};