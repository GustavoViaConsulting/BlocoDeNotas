blocoDeNotas.controller("blocoDeNotas", [
  "$scope",
  "sunshineService",
  function ($scope, sunshineService) {
    var cliente = ZAFClient.init();
    var baseUrl;
    var idUsuario;
    var idObjetoDeRegistro;

    $scope.dados;

    var errors = {
      criarObjetoDeTipo: "Erro ao criar um objeto",
      criarTipoDeRelacionamento: "Erri ao criar relacionamento",
      criarObjetoDeRegistroPorTipo: "Erro ao criar relacionamento por tipo",
      criarObjetoDeRegistro: "Erro ao criar objeto de registro",
      atualizarObjetoDeRegistro: "Erro ao atualizar o bloco de notas",
    };

    var success = {
      atualizarBlocoDeNotas: "Bloco de notas atualizado!",
      criarObjetoDeRegistro: "Novo bloco de notas criado com sucesso",
    };

    cliente.metadata().then(function (parameters) {
      baseUrl = parameters.settings.baseUrl;
      idUsuario = parameters.settings.userId;
      nomeRelacionamento = parameters.settings.nomeRelacionamento;
      nomeTipoObjeto = parameters.settings.nomeTipoObjeto;

      if (baseUrl && idUsuario && nomeRelacionamento && nomeTipoObjeto) {
        consultarBlocoDeNotas();
      }
    });

    function consultarBlocoDeNotas() {
      sunshineService
        .consultarObjetoDeRegistroPorRelacionamento(
          baseUrl,
          idUsuario,
          nomeRelacionamento
        )
        .then(function ({ data }) {
          idObjetoDeRegistro = data[0].id;
          $scope.dados = data[0].attributes.dados;
        })
        .catch(function (error) {
          console.log(error);
          if (error.status == 404) {
            criarObjetoDeTipo(baseUrl, nomeTipoObjeto);
          }
        });
    }

    function criarObjetoDeTipo(baseUrl, nomeTipoObjeto) {
      sunshineService
        .criarObjetoDeTipo(baseUrl, nomeTipoObjeto)
        .then(function (dados) {
          criarTipoDeRelacionamento(
            baseUrl,
            nomeRelacionamento,
            nomeTipoObjeto
          );
        })
        .catch(function (error) {
          console.log(error);
          mensagem(errors.criarObjetoDeTipo, "error");
        });
    }

    function criarTipoDeRelacionamento(
      baseUrl,
      nomeRelacionamento,
      nomeTipoObjeto
    ) {
      sunshineService
        .criarTipoDeRelacionamento(baseUrl, nomeRelacionamento, nomeTipoObjeto)
        .then(function (dados) {
          criarObjetoDeRegistroPorTipo(baseUrl, nomeTipoObjeto);
        })
        .catch(function (error) {
          console.log(error);
          mensagem(errors.criarTipoDeRelacionamento, "error");
        });
    }

    function criarObjetoDeRegistroPorTipo(baseUrl, nomeTipoObjeto) {
      sunshineService
        .criarObjetoDeRegistroPorTipo(baseUrl, nomeTipoObjeto)
        .then(function ({ data }) {
          idObjetoDeRegistro = data.id;
          criarObjetoDeRegistro(
            baseUrl,
            idObjetoDeRegistro,
            idUsuario,
            nomeRelacionamento
          );
        })
        .catch(function (error) {
          console.log(error);
          mensagem(errors.criarObjetoDeRegistroPorTipo, "error");
        });
    }

    function criarObjetoDeRegistro(
      baseUrl,
      idObjetoDeRegistro,
      idUsuario,
      nomeRelacionamento
    ) {
      sunshineService
        .criarObjetoDeRegistro(
          baseUrl,
          idObjetoDeRegistro,
          idUsuario,
          nomeRelacionamento
        )
        .then(function (data) {
          mensagem(success.criarObjetoDeRegistro, "success");
        })
        .catch(function (error) {
          console.log(error);
          mensagem(errors.criarObjetoDeRegistro, "error");
        });
    }

    $scope.atualizarBlocoDeNotas = function () {
      sunshineService
        .atualizarObjetoDeRegistro(baseUrl, idObjetoDeRegistro, $scope.dados)
        .then(function (data) {
          mensagem(success.atualizarBlocoDeNotas, "success");
        })
        .catch(function (error) {
          console.log(error);
          mensagem(errors.atualizarObjetoDeRegistro, "error");
        });
    };

    function mensagem(mensagem, tipo) {
      cliente.invoke("notify", "<b>" + mensagem + "</b>", tipo, 3000);
    }
  },
]);
