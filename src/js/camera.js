const btnCapturar = document.getElementById("btnCapturar");
const overlayIA = document.getElementById("overlayIA");
const statusMensagem = document.getElementById("statusMensagem");
const cameraPreview = document.getElementById("cameraPreview");
const cameraInfo = document.getElementById("cameraInfo");
const modos = document.querySelectorAll(".modo");
const video = document.getElementById("cameraVideo");


// ============================
// CAMERA REAL
// ============================

async function iniciarCamera() {

    try {

        const stream =
            await navigator.mediaDevices.getUserMedia({
                video: true
            });

        video.srcObject = stream;

    } catch (erro) {

        statusMensagem.innerText =
            "Permita acesso à câmera.";

        console.log(erro);
    }
}

iniciarCamera();


// ============================
// IA
// ============================

const mensagensIA = {

    retrato: [
        "Rosto detectado",
        "Objeto centralizado",
        "Iluminação equilibrada"
    ],

    noturno: [
        "Pouca luz detectada",
        "Ativando brilho inteligente",
        "Modo noturno ativo"
    ],

    iahd: [
        "Qualidade HD ativada",
        "Melhorando nitidez",
        "IA ajustando foco"
    ]
};

let modoAtual = "retrato";


// ============================
// TROCAR MODOS
// ============================

modos.forEach((botao) => {

    botao.addEventListener("click", () => {

        modos.forEach((m) => {
            m.classList.remove("ativo");
        });

        botao.classList.add("ativo");

        modoAtual = botao.dataset.mode;

        cameraPreview.classList.remove(
            "retrato-mode",
            "noturno-mode",
            "iahd-mode"
        );

        if (modoAtual === "retrato") {

            cameraPreview.classList.add("retrato-mode");

            cameraInfo.innerText =
                "Modo atual: Retrato";
        }

        if (modoAtual === "noturno") {

            cameraPreview.classList.add("noturno-mode");

            cameraInfo.innerText =
                "Modo atual: Noturno";
        }

        if (modoAtual === "iahd") {

            cameraPreview.classList.add("iahd-mode");

            cameraInfo.innerText =
                "Modo atual: IA HD";
        }

        statusMensagem.innerText =
            `Modo ${botao.innerText} ativado`;

        atualizarIA();

    });

});


// ============================
// IA AUTOMÁTICA
// ============================

function atualizarIA() {

    const lista = mensagensIA[modoAtual];

    const mensagem =
        lista[Math.floor(Math.random() * lista.length)];

    overlayIA.innerText = mensagem;
}

setInterval(atualizarIA, 2500);


// ============================
// CAPTURA
// ============================

btnCapturar.addEventListener("click", () => {

    statusMensagem.innerText =
        "Capturando imagem...";

    cameraPreview.classList.add("flash");

    video.pause();

    overlayIA.innerText =
        "Processando imagem com IA...";

    setTimeout(() => {

        statusMensagem.innerText =
            "Foto capturada com sucesso!";

        overlayIA.innerText =
            "Imagem otimizada pela IA";

    }, 800);

    setTimeout(() => {

        cameraPreview.classList.remove("flash");

        video.play();

        atualizarIA();

    }, 2000);

});