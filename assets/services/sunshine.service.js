(function () {
  "use strict";

  blocoDeNotas.service("sunshineService", [
    "$q",
    function ($q) {
      var client = ZAFClient.init();

      return {
        consultarObjetoDeRegistroPorTipo: function (baseUrl) {
          var deferred = $q.defer();
          let options = {
            url: baseUrl + "/api/sunshine/objects/records?type=blocodenotas",
            type: "GET",
            contentType: "application/json",
          };
          client
            .request(options)
            .then(function (data) {
              deferred.resolve(data);
            })
            .catch(function (error) {
              deferred.reject(error);
            });
          return deferred.promise;
        },

        criarObjetoDeRegistroPorTipo: function (baseUrl) {
          var deferred = $q.defer();
          var dataObjetoDeRegistroPorTipo = {
            data: {
              type: "blocodenotas",
              attributes: {
                dados: "",
              },
            },
          };

          let options = {
            url: baseUrl + "/api/sunshine/objects/records",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(dataObjetoDeRegistroPorTipo),
          };
          client
            .request(options)
            .then(function (data) {
              deferred.resolve(data);
            })
            .catch(function (error) {
              deferred.reject(error);
            });
          return deferred.promise;
        },

        consultarObjetoDeRegistroPorRelacionamento: function (
          baseUrl,
          idUsuario
        ) {
          var deferred = $q.defer();
          let options = {
            url:
              baseUrl +
              "/api/sunshine/objects/records/zen:user:" +
              idUsuario +
              "/related/user_nota",
            type: "GET",
            contentType: "application/json",
          };
          client
            .request(options)
            .then(function (data) {
              deferred.resolve(data);
            })
            .catch(function (error) {
              deferred.reject(error);
            });
          return deferred.promise;
        },

        criarObjetoDeRegistro: function (
          baseUrl,
          idObjetoDeRegistro,
          idUsuario
        ) {
          var dataObjetoDeRegistro = {
            data: {
              relationship_type: "user_nota",
              source: "zen:user:" + idUsuario,
              target: idObjetoDeRegistro
            }
          };

          var deferred = $q.defer();
          let options = {
            url: baseUrl + "/api/sunshine/relationships/records?type=user_nota",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(dataObjetoDeRegistro),
          };
          client
            .request(options)
            .then(function (data) {
              deferred.resolve(data);
            })
            .catch(function (error) {
              deferred.reject(error);
            });
          return deferred.promise;
        },

        atualizarObjetoDeRegistro: function (
          baseUrl,
          idObjetoDeRegistro,
          data
        ) {
          var dataObjetoDeRegistro = {
            data: {
              attributes: {
                dados: data,
              },
            },
          };

          var deferred = $q.defer();
          let options = {
            url:
              baseUrl + "/api/sunshine/objects/records/" + idObjetoDeRegistro,
            type: "PATCH",
            contentType: "application/merge-patch+json",
            data: JSON.stringify(dataObjetoDeRegistro),
          };
          client
            .request(options)
            .then(function (data) {
              deferred.resolve(JSON.parse(data));
            })
            .catch(function (error) {
              deferred.reject(error);
            });
          return deferred.promise;
        },

        consultarObjetoDeTipo: function (baseUrl) {
          var deferred = $q.defer();
          let options = {
            url: baseUrl + "/api/sunshine/objects/types/blocodenotas",
            type: "GET",
            contentType: "application/json",
          };
          client
            .request(options)
            .then(function (data) {
              deferred.resolve(data);
            })
            .catch(function (error) {
              deferred.reject(error);
            });
          return deferred.promise;
        },

        criarObjetoDeTipo: function (baseUrl) {
          var deferred = $q.defer();
          var dataObjetoDeTipo = {
            data: {
              key: "blocodenotas",
              schema: {
                properties: {
                  dados: {
                    type: "string",
                    description: "dados anotados",
                  },
                },
              },
            },
          };

          let options = {
            url: baseUrl + "/api/sunshine/objects/types",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(dataObjetoDeTipo),
          };
          client
            .request(options)
            .then(function (data) {
              deferred.resolve(data);
            })
            .catch(function (error) {
              deferred.reject(error);
            });
          return deferred.promise;
        },

        consultarTipoDeRelacionamento: function (baseUrl) {
          var deferred = $q.defer();
          let options = {
            url: baseUrl + "/api/sunshine/relationships/types/user_nota",
            type: "GET",
            contentType: "application/json",
          };
          client
            .request(options)
            .then(function (data) {
              deferred.resolve(data);
            })
            .catch(function (error) {
              deferred.reject(error);
            });
          return deferred.promise;
        },

        criarTipoDeRelacionamento: function (baseUrl) {
          var deferred = $q.defer();
          var dataTipoDeRelacionamento = {
            data: {
              key: "user_nota",
              source: "zen:user",
              target: "blocodenotas",
            },
          };

          let options = {
            url: baseUrl + "/api/sunshine/relationships/types",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(dataTipoDeRelacionamento),
          };
          client
            .request(options)
            .then(function (data) {
              deferred.resolve(data);
            })
            .catch(function (error) {
              deferred.reject(error);
            });
          return deferred.promise;
        },
      };
    },
  ]);
})();
