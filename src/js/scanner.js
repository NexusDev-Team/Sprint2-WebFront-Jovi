
const botaoScan   = document.getElementById("scan-btn");
const statusScan  = document.getElementById("scan-status");
const scannerArea = document.getElementById("scannerArea");
const scannerVideo = document.getElementById("scannerVideo");


let streamAtivo = null;
let escaneando  = false;

async function iniciarScanner() {
    statusScan.innerText = "Iniciando câmera...";

    try {
        // Tenta primeiro a câmera traseira (ambiente)
        streamAtivo = await navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: { ideal: "environment" },
                width:  { ideal: 1920 },
                height: { ideal: 1080 }
            }
        });

    } catch (erroTraseira) {
        console.warn("Câmera traseira indisponível, tentando câmera padrão...", erroTraseira);

        try {
            // Fallback: qualquer câmera disponível
            streamAtivo = await navigator.mediaDevices.getUserMedia({
                video: true
            });

        } catch (erroFallback) {
            statusScan.innerText = "❌ Permita o acesso à câmera.";
            botaoScan.disabled = true;
            console.error("Nenhuma câmera encontrada:", erroFallback);
            return;
        }
    }

    scannerVideo.srcObject = streamAtivo;

    scannerVideo.onloadedmetadata = () => {
        scannerVideo.play();
        statusScan.innerText = "📷 Posicione o documento na área";
        botaoScan.disabled = false;
    };
}

function capturarFrame() {
    const canvas = document.createElement("canvas");
    canvas.width  = scannerVideo.videoWidth  || 1280;
    canvas.height = scannerVideo.videoHeight || 720;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(scannerVideo, 0, 0, canvas.width, canvas.height);

    return canvas.toDataURL("image/jpeg", 0.92);
}


function ativarAnimacaoScan() {
    scannerArea.classList.add("scanner-active");
}

function desativarAnimacaoScan() {
    scannerArea.classList.remove("scanner-active");
}



function salvarDocumento(imagemBase64) {
    // Cria um link de download com a imagem capturada
    const link = document.createElement("a");
    link.href     = imagemBase64;
    link.download = `documento_${Date.now()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}


async function executarScan() {
    if (escaneando) return;
    escaneando = true;
    botaoScan.disabled = true;

    // Passo 1 — Aviso inicial
    statusScan.innerText = "🔍 Escaneando documento...";
    ativarAnimacaoScan();

    await esperar(800);

   
    const imagemCapturada = capturarFrame();
    scannerVideo.pause();

    await esperar(600);

    // Passo 3 — "IA detectando"
    statusScan.innerText = "🤖 Detectando documento com IA...";

    await esperar(1200);

    // Passo 4 — Processando
    statusScan.innerText = "⚙️ Processando imagem...";

    await esperar(800);

    // Passo 5 — Salva e informa
    salvarDocumento(imagemCapturada);
    statusScan.innerText = "✅ Documento salvo com sucesso!";
    desativarAnimacaoScan();

    await esperar(2000);

    // Passo 6 — Volta ao estado inicial
    statusScan.innerText = "📷 Posicione o documento na área";
    scannerVideo.play();
    botaoScan.disabled = false;
    escaneando = false;
}


function esperar(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


botaoScan.addEventListener("click", executarScan);

// Libera a câmera ao sair da página
window.addEventListener("beforeunload", () => {
    if (streamAtivo) {
        streamAtivo.getTracks().forEach(track => track.stop());
    }
});


iniciarScanner();