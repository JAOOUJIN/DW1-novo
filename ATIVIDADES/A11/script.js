document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("formCep");
    const cepInput = document.getElementById("cep");
    const logradouroInput = document.getElementById("logradouro");
    const bairroInput = document.getElementById("bairro");
    const localidadeInput = document.getElementById("localidade");
    const ufInput = document.getElementById("uf");

    // Função para consultar o CEP
    async function consultarCEP(cep) {
        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const data = await response.json();

            if (data.erro) {
                alert("CEP não encontrado.");
                return;
            }

            // Preenche os campos com os dados da API
            logradouroInput.value = data.logradouro;
            bairroInput.value = data.bairro;
            localidadeInput.value = data.localidade;
            ufInput.value = data.uf;
        } catch (error) {
            console.error("Erro ao consultar CEP:", error);
            alert("Erro ao consultar CEP. Tente novamente.");
        }
    }

    // Evento de submit do formulário
    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Impede o envio do formulário

        const cep = cepInput.value.replace(/\D/g, ""); // Remove caracteres não numéricos

        if (cep.length !== 8) {
            alert("CEP inválido. Digite um CEP com 8 dígitos.");
            return;
        }

        consultarCEP(cep);
    });

    // Máscara para o campo CEP
    cepInput.addEventListener("input", function () {
        let valor = cepInput.value.replace(/\D/g, ""); // Remove tudo que não for número
        valor = valor.slice(0, 8); // Limita a 8 caracteres

        if (valor.length > 5) {
            valor = valor.replace(/^(\d{5})(\d{3})$/, "$1-$2"); // Aplica a máscara
        }

        cepInput.value = valor;
    });
});