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
            const currentLang = document.documentElement.lang;
            const pdfUrl = './cv-' + currentLang + '.pdf';
            
            // Try to download PDF, with better fallback handling
            fetch(pdfUrl, { method: 'HEAD' })
                .then(response => {
                    if (response.ok) {
                        // PDF exists, open it
                        const link = document.createElement('a');
                        link.href = pdfUrl;
                        link.download = 'cv-' + currentLang + '.pdf';
                        link.target = '_blank';
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                    } else {
                        // PDF not found, fall back to print
                        console.log('PDF not found, falling back to print dialog');
                        window.print();
                    }
                })
                .catch(error => {
                    // Network error or other issue, fall back to print
                    console.log('Error checking for PDF, falling back to print dialog:', error);
                    window.print();
                });
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