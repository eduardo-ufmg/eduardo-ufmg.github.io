// Language switching functionality
document.addEventListener('DOMContentLoaded', function() {
    const languageDropdown = document.getElementById('languageDropdown');
    const downloadBtn = document.getElementById('downloadPdf');
    
    if (languageDropdown) {
        languageDropdown.addEventListener('change', function(e) {
            const selectedLanguage = e.target.value;
            const currentUrl = window.location.pathname;
            
            // Handle both local and GitHub Pages URLs
            let newUrl;
            if (currentUrl.includes('index-')) {
                // Replace the current language file with the new one
                newUrl = currentUrl.replace(/index-[a-z]{2}\.html$/, 'index-' + selectedLanguage + '.html');
            } else {
                // We're on index.html, redirect to the language-specific page
                const baseUrl = currentUrl.replace(/\/[^/]*$/, '');
                newUrl = baseUrl + '/index-' + selectedLanguage + '.html';
            }
            
            window.location.href = newUrl;
        });
    }
    
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            // Add a small delay to ensure print dialog opens properly
            setTimeout(function() {
                window.print();
            }, 100);
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