// Language switching functionality
document.addEventListener('DOMContentLoaded', function() {
    const languageDropdown = document.getElementById('languageDropdown');
    const downloadBtn = document.getElementById('downloadPdf');
    
    if (languageDropdown) {
        languageDropdown.addEventListener('change', function(e) {
            const selectedLanguage = e.target.value;
            const currentUrl = window.location.pathname;
            const baseUrl = currentUrl.replace(/\/[^/]*$/, '');
            window.location.href = baseUrl + '/index-' + selectedLanguage + '.html';
        });
    }
    
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            window.print();
        });
    }
});

// Print optimization
window.addEventListener('beforeprint', function() {
    document.body.classList.add('printing');
});

window.addEventListener('afterprint', function() {
    document.body.classList.remove('printing');
});