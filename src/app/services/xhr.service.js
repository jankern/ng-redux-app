/**
 * XHR Service Class
 */

import globals from '../app.constants';

export
default class {

    constructor($http, $q, $timeout /*, CacheFactory*/ ) {
        this._$http = $http;
        this._$q = $q;
        this._$timeout = $timeout;
        this._cache = false;

        this._onGoingCalls = {};
    }

    /**
     *	Method to handle service retrieves
     *  @param      endPoint        Url, parameter and request type
     *  @param      requestData     Payload data for post and push calls
     *  @param      requestheader   Optional additional header
     *  @return     data            The xhr promise data
     */

    callEndpoint( /*Object*/ endPoint, /*Object|String*/ requestData, /*Object*/ requestHeader) {

        let _self = this;
        let xhrArgs = {};

        for (var i in endPoint) {
            if (endPoint.hasOwnProperty(i)) {
                xhrArgs[i] = endPoint[i];
            }
        }

        if (requestHeader) {
            for (var j in requestHeader) {
                if (requestHeader.hasOwnProperty(j)) {
                    xhrArgs[j] = requestHeader[j];
                }
            }
        }


        let defer = this._$q.defer();
        let promise;

        if (xhrArgs.doubleCallPolicy !== 'reuse') {
            if (xhrArgs.doubleCallPolicy === 'reject') {
                defer.reject();
                promise = defer.promise;
            } else {
                this.call(xhrArgs, requestData).then(
                    (response) => {
                        defer.resolve(response);
                    }, (error) => {
                        defer.reject(error);
                    }
                )
                promise = defer.promise;
            }
        } else {
            if (this._onGoingCalls[xhrArgs.url] === undefined) {
                this._onGoingCalls[xhrArgs.url] = defer;
                this.call(xhrArgs, requestData).then(
                    (response) => {
                        this.deleteOnGoingCall(xhrArgs);
                        defer.resolve(response);
                    }, (error) => {
                        this.deleteOnGoingCall(xhrArgs);
                        defer.reject(error);
                    }
                )
                promise = defer.promise;
            } else {
                promise = this._onGoingCalls[endPoint.url].promise;
            }
        }

        return promise;


    }

    /**
     *	Method to fetch server data and handle request caching
     *  @param      endPoint        Url, parameter and request type
     *  @param      payLoad         Payload data for post and push calls
     *  @return     data            The xhr promise data
     */
    call(xhrArgs, payLoad) {

        let defer = this._$q.defer();

        this._$http({
            method: xhrArgs.type,
            url: xhrArgs.url,
            data: payLoad,
            headers: xhrArgs.contentType,
            cache: this._cache

        }).then(
            (success) => {

                defer.resolve(success);
            }, (error) => {
                // remove request cache for 40x and 50x requests

                defer.reject(error);
            }
        );

        return defer.promise;

    }


    deleteOnGoingCall(xhrArgs) {
        if (this._onGoingCalls[xhrArgs.url])
            delete this._onGoingCalls[xhrArgs.url];
    }


    static get $inject() {
        return ['$http', '$q', '$timeout' /*, 'CacheFactory'*/ ];
    }
}