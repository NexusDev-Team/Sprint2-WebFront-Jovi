const filtros = document.querySelectorAll(".filter-btn");
const cards = document.querySelectorAll(".card");

filtros.forEach((botao) => {

    botao.addEventListener("click", () => {

        filtros.forEach((btn) => {
            btn.classList.remove("ativo");
        });

        botao.classList.add("ativo");

        const categoria = botao.dataset.filter;

        cards.forEach((card) => {

            if (
                categoria === "all" ||
                card.dataset.category === categoria
            ) {

                card.style.display = "block";

            } else {

                card.style.display = "none";

            }

        });

    });

});