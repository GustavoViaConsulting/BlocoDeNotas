(function () {
  "use strict";

  blocoDeNotas.service("sunshineService", [
    "$q",
    function ($q) {
      var client = ZAFClient.init();

      return {
        consultarObjetoDeRegistroPorRelacionamento: function (
          baseUrl,
          idUsuario,
          nomeRelacionamento
        ) {
          var deferred = $q.defer();
          let options = {
            url:
              baseUrl +
              "/api/sunshine/objects/records/zen:user:" +
              idUsuario +
              "/related/" +
              nomeRelacionamento,
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

        criarObjetoDeTipo: function (baseUrl, nomeTipoObjeto) {
          var deferred = $q.defer();
          var dataObjetoDeTipo = {
            data: {
              key: nomeTipoObjeto,
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

        criarTipoDeRelacionamento: function (
          baseUrl,
          nomeRelacionamento,
          nomeTipoObjeto
        ) {
          var deferred = $q.defer();
          var dataTipoDeRelacionamento = {
            data: {
              key: nomeRelacionamento,
              source: "zen:user",
              target: nomeTipoObjeto,
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

        criarObjetoDeRegistroPorTipo: function (baseUrl, nomeTipoObjeto) {
          var deferred = $q.defer();
          var dataObjetoDeRegistroPorTipo = {
            data: {
              type: nomeTipoObjeto,
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

        criarObjetoDeRegistro: function (
          baseUrl,
          idObjetoDeRegistro,
          idUsuario,
          nomeRelacionamento
        ) {
          var dataObjetoDeRegistro = {
            data: {
              relationship_type: nomeRelacionamento,
              source: "zen:user:" + idUsuario,
              target: idObjetoDeRegistro,
            },
          };

          var deferred = $q.defer();
          let options = {
            url:
              baseUrl +
              "/api/sunshine/relationships/records?type=" +
              nomeRelacionamento,
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
