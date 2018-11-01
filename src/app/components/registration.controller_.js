import selectActions from '../model/select.actions';

export default class {

    constructor($controller, $scope, $rootScope, $http, $q, $timeout, $ngRedux, xhrService, configService) {
        this.test = 'OXS.eco Registration App';
        this.test2 = '';
        this._xhrService = xhrService;
        this._configService = configService;
        

        let disconnect = $ngRedux.connect(
            state => this.onUpdate(state), // What we want to map to our target
            selectActions // Actions we want to map to our target
        )(this); // Our target

        $scope.$on('$destroy', disconnect); // Cleaning house

        
//        this._xhrService.callEndpoint(
//            this._configService.getXhrServices().addTenant, 
//            {param:1}, 
//            this._configService.getXhrServices().headers.default
//        ).then(
//            (success)=>{
//                
//                this.test2 = success.data.message;
//            },
//            (error)=>{
//                 
//            }
//        );
    
    }
    
    onUpdate(state) {
//         console.log('================ on UPDATE ==================');
//         console.log(state);
        return {
            selectedState: state.selectReducer
        };
    }

};