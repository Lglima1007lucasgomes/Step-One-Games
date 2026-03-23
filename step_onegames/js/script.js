let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

function toggleTema(){
    document.body.classList.toggle("light");
}

function filtrar(categoria){
    let jogos = document.querySelectorAll(".jogo");

    jogos.forEach(jogo =>{
        if(categoria === "todos"){
            jogo.style.display = "";
        } 
        else if(jogo.classList.contains(categoria)){
            jogo.style.display = "";
        } 
        else{
            jogo.style.display = "none";
        }
    });
}

function adicionarCarrinho(nome, preco, imagem){
    carrinho.push({nome, preco, imagem});
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    atualizarCarrinho();
    alert("🛒 " + nome + " adicionado ao carrinho!");
}

function atualizarCarrinho(){
    let qtd = document.getElementById("qtd");
    if(qtd){
        qtd.innerText = carrinho.length;
    }
}

function finalizarCompra(){
    if(carrinho.length === 0){
        alert("Carrinho vazio!");
        return;
    }

    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    window.location.href = "finalizar.html";
}

function carregarCarrinho(){
    let lista = document.getElementById("lista");
    let totalElemento = document.getElementById("total");

    if(!lista) return;

    let total = 0;
    lista.innerHTML = ""; // limpa antes de adicionar

    carrinho.forEach((item, index) => {
        total += item.preco;

        lista.innerHTML += `
            <div class="item-carrinho">
                <img src="${item.imagem}">
                <div class="item-info">
                    <p>${item.nome}</p>
                    <strong>R$ ${item.preco}</strong>
                </div>
                <button onclick="removerItem(${index})">❌</button>
            </div>
        `;
    });

    if(totalElemento){
        totalElemento.innerHTML = `<h2>Total: R$ ${total}</h2>`;
    }
}
function limparCarrinho(){
	if(confirm("tem certeza que quer limpar o carrinho?")){
		carrinho = [];
		localStorage.setItem("carrinho",JSON.stringify(carrinho));
		
		document.getElementById("lista").innerHTML = "";
        document.getElementById("total").innerHTML = "<h2>Total: R$ 0</h2>";
        atualizarCarrinho();	
	}
}
function removerItem(index){
    carrinho.splice(index, 1);
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    location.reload();
}

function confirmarCompra(){
	let nome = document.getElementById("nomeCliente").value;
	let endereco = document.getElementById("enderecoCliente").value;
    let email = document.getElementById("emailCliente").value;
    let cpf = document.getElementById("cpfCliente").value;
    let cep = document.getElementById("cepCliente").value;
    let nascimento = document.getElementById("nascimentoCliente").value;
    let cartao = document.getElementById("cartaoCliente").value;

    let pagamento = document.querySelector('input[name="pagamento"]:checked');
	
    if(nome === "" || endereco === "" || email === "" || cpf === "" || cep === "" || nascimento === ""){
        alert("⚠️ Preencha todos os campos!");
        return;
}
	if(!pagamento){
		alert("⚠️ Escolha uma forma de pagamento!");
		return;
}
    if(cpf.length < 11){
        alert("CPF inválido!");
        return;
}

    if(cep.length < 8){
        alert("CEP inválido!");
        return;
}
    if(pagamento.value === "cartao" && cartao === ""){
        alert("Preencha os dados do cartão!");
        return;
}
    alert("✅ Compra finalizada com sucesso!\nObrigado, " + nome + " 🎮");

    localStorage.removeItem("carrinho");
    window.location.href = "index.html";
}

carregarCarrinho();
atualizarCarrinho();

function enviar(event){
    event.preventDefault();

    let nome = document.getElementById("nome").value;
    let email = document.getElementById("email").value;
    let nivel = document.getElementById("nivel").value;

    let plataforma = document.querySelector('input[name="plataforma"]:checked');
    let resultado = document.getElementById("resultado");

    if(!plataforma){
        resultado.innerText = "⚠️ Escolha uma plataforma!";
        resultado.className = "erro";
        return;
    }

    let jogos = [];
    document.querySelectorAll('input[type="checkbox"]:checked')
        .forEach(el => jogos.push(el.value));

    resultado.innerHTML =
        "🎮 Jogador: " + nome + "<br>" +
        "📧 Email: " + email + "<br>" +
        "🔥 Jogos: " + jogos.join(", ") + "<br>" +
        "⭐ Nível: " + nivel;

    resultado.className = "sucesso";
}