blocoDeNotas.controller("blocoDeNotas", [
  "$scope",
  "sunshineService",
  function ($scope, sunshineService) {
    var cliente = ZAFClient.init();
    var baseUrl;
    var idUsuario;
    var idObjetoDeRegistro;

    $scope.dados;

    cliente.metadata().then(function (parameters) {
      baseUrl = parameters.settings.baseUrl;
      idUsuario = parameters.settings.userId;

      if (baseUrl && idUsuario) {
        consultarBlocoDeNotas();
      }
    });

    function consultarBlocoDeNotas() {
      sunshineService
        .consultarObjetoDeRegistroPorRelacionamento(baseUrl, idUsuario)
        .then(function ({ data }) {
          idObjetoDeRegistro = data[0].id;
          $scope.dados = data[0].attributes.dados;
        })
        .catch(function (error) {
          criarObjetoDeTipo(baseUrl, function (resultado) {
            if (resultado) {
              criarTipoDeRelacionamento(baseUrl, function (resultado) {
                if (resultado) {
                  criarObjetoDeRegistroPorTipo(baseUrl, function (resultado) {
                    if (resultado) {
                      console.log(idObjetoDeRegistro);
                      criarObjetoDeRegistro(
                        baseUrl,
                        idObjetoDeRegistro,
                        idUsuario,
                        function (resultado) {
                          if (resultado) {
                            console.log("Criado com sucesso!");
                          } else {
                            console.log("Erro ao criar Objeto de Registro");
                          }
                        }
                      );
                    } else {
                      console.log("Erro ao crir Objeto de Registro por Tipo");
                    }
                  });
                } else {
                  console.log(
                    "Consulte a aba de adminitração/Relacionamentos e exclua o relacionamento 'user_nota' para dar continuidade."
                  );
                }
              });
            } else {
              console.log(
                "Consulte a aba de adminitração/Objetos legados e exclua o objeto 'blocodenotas' para dar continuidade."
              );
            }
          });
        });
    }

    function criarObjetoDeTipo(baseUrl, callback) {
      sunshineService
        .criarObjetoDeTipo(baseUrl)
        .then(function (dados) {
          callback(true);
        })
        .catch(function (error) {
          console.log(error);
          callback(false);
        });
    }

    function criarTipoDeRelacionamento(baseUrl, callback) {
      sunshineService
        .criarTipoDeRelacionamento(baseUrl)
        .then(function (dados) {
          callback(true);
        })
        .catch(function (error) {
          console.log(error);
          callback(false);
        });
    }

    function criarObjetoDeRegistroPorTipo(baseUrl, callback) {
      sunshineService
        .criarObjetoDeRegistroPorTipo(baseUrl)
        .then(function ({ data }) {
          idObjetoDeRegistro = data.id;
          callback(true);
        })
        .catch(function (error) {
          console.log(error);
          callback(false);
        });
    }

    function criarObjetoDeRegistro(
      baseUrl,
      idObjetoDeRegistro,
      idUsuario,
      callback
    ) {
      sunshineService
        .criarObjetoDeRegistro(baseUrl, idObjetoDeRegistro, idUsuario)
        .then(function (data) {
          callback(true);
        })
        .catch(function (error) {
          console.log(error);
          callback(false);
        });
    }

    $scope.atualizarBlocoDeNotas = function () {
      sunshineService
        .atualizarObjetoDeRegistro(baseUrl, idObjetoDeRegistro, $scope.dados)
        .then(function (data) {
        })
        .catch(function (error) {
          console.log(error);
        });
    };
  },
]);
