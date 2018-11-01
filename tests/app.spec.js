import app from '../src/app/app';

describe('app', () => {

    let appCtrl;
    let registrationCtrl;
    
    describe('App Init Stage', () => {

        beforeEach(() => {
            angular.mock.module(app);

            angular.mock.inject(($controller) => {
                appCtrl = $controller('appCtrl', {});
            });

             angular.mock.inject(($componentController) => {
                 registrationCtrl = $componentController('registration');
             });

        });

        it('should contain the component string', () => {
            console.info(registrationCtrl.test);
            expect(registrationCtrl.test).toEqual('OXS.eco Registration App');
        });
    });

});