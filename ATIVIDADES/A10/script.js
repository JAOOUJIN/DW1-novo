document.addEventListener("DOMContentLoaded", function () {
    const cpfInput = document.getElementById("cpf");
    const telefoneInput = document.getElementById("telefone");
    const pisInput = document.getElementById("pis");
    const cepInput = document.getElementById("cep");
    const cnpjInput = document.getElementById("cnpj");
    const form = document.getElementById("meuFormulario");

    function aplicarMascara(input, mascara) {
        input.addEventListener("input", (event) => {
            let valor = input.value.replace(/\D/g, ""); // Remove tudo que não for número
            let resultado = "";
            let indice = 0;

            // Aplica a máscara conforme o usuário digita
            for (let i = 0; i < mascara.length; i++) {
                if (mascara[i] === "#") {
                    if (indice < valor.length) {
                        resultado += valor[indice++];
                    } else {
                        break; // Para de aplicar a máscara se não houver mais dígitos
                    }
                } else {
                    resultado += mascara[i];
                }
            }

            input.value = resultado;

            // Permite apagar caracteres de forma contínua
            if (event.inputType === "deleteContentBackward") {
                let lastChar = input.value.slice(-1);
                if (lastChar === "." || lastChar === "-" || lastChar === "/" || lastChar === "(" || lastChar === ")") {
                    input.value = input.value.slice(0, -1);
                }
            }
        });

        // Permite apagar parênteses e espaços no telefone de forma contínua
        if (input === telefoneInput) {
            input.addEventListener("keydown", (event) => {
                if (event.key === "Backspace") {
                    let valorAtual = input.value;
                    if (valorAtual.endsWith(")") || valorAtual.endsWith(" ") || valorAtual.endsWith("(")) {
                        event.preventDefault(); // Impede o comportamento padrão do Backspace
                        input.value = valorAtual.slice(0, -1); // Remove o último caractere
                    }
                }
            });
        }
    }

    aplicarMascara(cpfInput, "###.###.###-##");
    aplicarMascara(telefoneInput, "(##) #####-####");
    aplicarMascara(pisInput, "###.#####.##-#");
    aplicarMascara(cepInput, "#####-###");
    aplicarMascara(cnpjInput, "##.###.###/####-##");

    // Validação de CPF
    function validarCPF(cpf) {
        cpf = cpf.replace(/\D/g, "");

        if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

        let soma = 0, resto;
        for (let i = 0; i < 9; i++) soma += parseInt(cpf[i]) * (10 - i);
        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(cpf[9])) return false;

        soma = 0;
        for (let i = 0; i < 10; i++) soma += parseInt(cpf[i]) * (11 - i);
        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(cpf[10])) return false;

        return true;
    }

    cpfInput.addEventListener("blur", function () {
        if (!validarCPF(cpfInput.value)) {
            cpfInput.style.border = "2px solid red";
            alert("CPF inválido!");
        } else {
            cpfInput.style.border = "2px solid green";
        }
    });

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Impede o envio padrão do formulário

        if (!validarCPF(cpfInput.value)) {
            alert("Por favor, insira um CPF válido antes de enviar.");
        } else {
            // Exibe a mensagem de sucesso
            alert("Cadastro realizado com sucesso!");

            // Limpa o formulário (opcional)
            form.reset();

            // Remove a borda verde do CPF (opcional)
            cpfInput.style.border = "1px solid #ccc";
        }
    });
});