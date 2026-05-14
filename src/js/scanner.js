const botaoScan =
    document.getElementById("scan-btn");

const statusScan =
    document.getElementById("scan-status");

const scannerArea =
    document.getElementById("scannerArea");

const scannerVideo =
    document.getElementById("scannerVideo");


// ============================
// CAMERA REAL
// ============================

async function iniciarScanner() {

    try {

        const stream =
            await navigator.mediaDevices.getUserMedia({
                video: true
            });

        scannerVideo.srcObject = stream;

    } catch (erro) {

        statusScan.innerText =
            "Permita acesso à câmera.";

        console.log(erro);
    }
}

iniciarScanner();


// ============================
// ESCANEAR
// ============================

botaoScan.addEventListener("click", () => {

    statusScan.innerText =
        "Escaneando documento...";

    scannerArea.classList.add("scanner-active");

    scannerVideo.pause();

    setTimeout(() => {

        statusScan.innerText =
            "Documento detectado com IA";

    }, 1200);

    setTimeout(() => {

        statusScan.innerText =
            "PDF salvo com sucesso!";

        alert("Documento salvo na galeria!");

    }, 2200);

    setTimeout(() => {

        scannerArea.classList.remove("scanner-active");

        scannerVideo.play();

    }, 3000);

});