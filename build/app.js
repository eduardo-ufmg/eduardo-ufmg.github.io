// Language switching functionality
document.addEventListener('DOMContentLoaded', function() {
    const languageDropdown = document.getElementById('languageDropdown');
    const downloadBtn = document.getElementById('downloadPdf');
    
    // Enhanced language switching
    if (languageDropdown) {
        languageDropdown.addEventListener('change', function(e) {
            const selectedLanguage = e.target.value;
            const currentUrl = window.location.pathname;
            
            let newUrl;
            if (currentUrl.includes('index-')) {
                newUrl = currentUrl.replace(/index-[a-z]{2}\.html$/, 'index-' + selectedLanguage + '.html');
            } else {
                const baseUrl = currentUrl.replace(/\/[^/]*$/, '');
                newUrl = baseUrl + '/index-' + selectedLanguage + '.html';
            }
            
            // Add loading state
            this.disabled = true;
            window.location.href = newUrl;
        });
    }
    
    // Enhanced PDF download
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            // Check if PDFs are available
            const currentLang = document.documentElement.lang;
            const pdfUrl = './cv-' + currentLang + '.pdf';
            
            // Try to download PDF first, fallback to print
            fetch(pdfUrl, { method: 'HEAD' })
                .then(response => {
                    if (response.ok) {
                        window.open(pdfUrl, '_blank');
                    } else {
                        window.print();
                    }
                })
                .catch(() => window.print());
        });
    }
    
    // Add smooth scrolling for any internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});

// Print optimization
window.addEventListener('beforeprint', function() {
    document.body.classList.add('printing');
});

window.addEventListener('afterprint', function() {
    document.body.classList.remove('printing');
});