const qrText = document.getElementById('qr-text');
const sizes = document.getElementById('size');
const generateBtn = document.getElementById('generateBtn');
const downloadBtn = document.getElementById('downloadBtn');
const qrContainer = document.querySelector('.qr-body');
let size = sizes.value;

generateBtn.addEventListener("click", (e) => {
    e.preventDefault();
    generateQRCode();
});


sizes.addEventListener("change", (e) => {
    size = e.target.value;
    generateQRCode();
})

function generateQRCode() {
    qrContainer.innerHTML = "";
    new QRCode(qrContainer, {
        text:qrText.value,
        height:size,
        width: size,
        colorLight:"#fff",
        colorDark:"#000",
    });
}