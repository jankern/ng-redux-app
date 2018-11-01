import registrationActions from '../model/model.actions';

export default class {

    constructor($controller, $scope, $ngRedux, configService) {
        
        this._configService = configService;
        
        let disconnect = $ngRedux.connect(
            state => this.onUpdate(state), // What we want to map to our target
            registrationActions // Actions we want to map to our target
        )(this); // Our target

        $scope.$on('$destroy', disconnect); // Cleaning house
    
    }
    
    onUpdate(state) {
        return {
            selectedState: state.registrationReducer
        };
    }
    
    $onDestroy(){
        console.log('destroyed');
    }

};