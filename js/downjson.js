document.getElementById('jsonTextarea').addEventListener('input', function() {
    const jsonText = this.value.trim();
    const downloadLink = document.getElementById('downloadLink');
    if (jsonText !== '') {
        const blob = new Blob([jsonText], { type: 'application/json' });
        const fileName = generateFileName();
        const url = URL.createObjectURL(blob);
        downloadLink.href = url;
        downloadLink.download = fileName;
        downloadLink.style.display = 'block';
    } else {
        downloadLink.style.display = 'none';
    }
});

function generateFileName() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getSeconds()).padStart(2, '0');
    return `${year}${month}${day}${hours}${minutes}${seconds}_lora_lepi.json`;
}
