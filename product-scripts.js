// Image gallery functionality
function changeImage(src) {
    document.getElementById('main-product-image').src = src;
    
    // Update active thumbnail
    document.querySelectorAll('.product-thumbnail').forEach(thumb => {
        if(thumb.src === src) {
            thumb.classList.add('active');
        } else {
            thumb.classList.remove('active');
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    // Scroll to inquiry form when request button is clicked
    const inquiryBtn = document.getElementById('product-inquiry-btn');
    if (inquiryBtn) {
        inquiryBtn.addEventListener('click', function() {
            document.getElementById('product-contact-form').scrollIntoView({behavior: 'smooth'});
        });
    }
    
    // Add scroll handler for kontakti link
    document.querySelectorAll('a[href="#kontakti"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector('#kontakti').scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Set copyright year
    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.innerHTML = new Date().getFullYear();
    }
    
    // Mobile menu functionality
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const primaryNav = document.getElementById('primary-nav');
    const catalogDropdown = document.getElementById('catalog-dropdown');
    
    if(mobileMenuToggle && primaryNav) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenuToggle.classList.toggle('active');
            primaryNav.classList.toggle('active');
        });
        
        if(catalogDropdown) {
            const dropdownLink = catalogDropdown.querySelector('a');
            if(dropdownLink) {
                dropdownLink.addEventListener('click', function(e) {
                    if(window.innerWidth <= 768) {
                        e.preventDefault();
                        catalogDropdown.classList.toggle('active');
                    }
                });
            }
        }
        
        document.querySelectorAll('.primary_nav a').forEach(link => {
            link.addEventListener('click', function() {
                if(!this.parentElement.classList.contains('dropdown')) {
                    primaryNav.classList.remove('active');
                    mobileMenuToggle.classList.remove('active');
                }
            });
        });
    }
});
