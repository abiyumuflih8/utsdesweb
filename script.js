document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 1000,
        once: true
    });

    // Mobile Menu Toggle
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    mobileMenu.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    });

    // Navbar Scroll Effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255,255,255,0.95)';
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        } else {
            navbar.style.background = '#ffffff';
            navbar.style.boxShadow = 'none';
        }
    });

    // Order Form Handling
    const orderForm = document.getElementById('orderForm');
    if (orderForm) {
        orderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            updateOrderSummary();
        });
    }

    // Dynamic Order Summary Update
    function updateOrderSummary() {
        const tumpengType = document.getElementById('tumpengType').value;
        const size = document.getElementById('size').value;

        let basePrice = 0;
        switch(tumpengType) {
            case 'regular':
                basePrice = 500000;
                break;
            case 'special':
                basePrice = 750000;
                break;
            case 'premium':
                basePrice = 1000000;
                break;
        }

        const sizeMultiplier = {
            'small': 1,
            'medium': 1.5,
            'large': 2
        };

        const subtotal = basePrice * sizeMultiplier[size];
        const deliveryFee = 50000;
        const total = subtotal + deliveryFee;

        const currencyFormat = new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR'
        });

        document.getElementById('subtotal').textContent = currencyFormat.format(subtotal);
        document.getElementById('deliveryFee').textContent = currencyFormat.format(deliveryFee);
        document.getElementById('total').textContent = currencyFormat.format(total);
    }

    // Review Modal
    const modal = document.getElementById('reviewModal');
    const openReviewBtn = document.getElementById('openReviewForm');
    const closeModal = document.querySelector('.close-modal');

    if (openReviewBtn) {
        openReviewBtn.onclick = function() {
            modal.style.display = "block";
        };
    }

    if (closeModal) {
        closeModal.onclick = function() {
            modal.style.display = "none";
        };
    }

    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };

    // Review Form Handling
    const reviewForm = document.getElementById('reviewForm');
    if (reviewForm) {
        reviewForm.addEventListener('submit', function(e) {
            e.preventDefault();
            submitReview();
        });
    }

    // Load Testimonials
    const testimonials = [
        {
            name: "John Doe",
            rating: 5,
            review: "Tumpeng terbaik yang pernah saya pesan! Sangat merekomendasikan."
        },
        {
            name: "Jane Smith",
            rating: 4,
            review: "Pelayanan sangat baik dan tepat waktu."
        },
        // Add more testimonials here
    ];

    function createTestimonialCard(testimonial) {
        return `
            <div class="testimonial-card" data-aos="fade-up">
                <div class="rating">
                    ${'★'.repeat(testimonial.rating)}${'☆'.repeat(5 - testimonial.rating)}
                </div>
                <p>${testimonial.review}</p>
                <h4>${testimonial.name}</h4>
            </div>
        `;
    }

    function loadTestimonials() {
        const container = document.getElementById('reviewsCarousel');
        if (container) {
            container.innerHTML = testimonials.map(createTestimonialCard).join('');
        }
    }

    loadTestimonials();

    // Smooth Scroll for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Parallax Effect for Hero Section
    window.addEventListener('scroll', function() {
        const hero = document.querySelector('.hero');
        if (hero) {
            const scroll = window.pageYOffset;
            hero.style.backgroundPositionY = `${scroll * 0.5}px`;
        }
    });

    // Form Input Animation
    document.querySelectorAll('input, textarea, select').forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
    });

    let slideIndex = 1;
    showSlides(slideIndex);
    
    function plusSlides(n) {
      showSlides(slideIndex += n);
    }
    
    function currentSlide(n) {
      showSlides(slideIndex = n);
    }
    
    function showSlides(n) {
      let i;
      let slides = document.getElementsByClassName("mySlides");
      
      // Reset ke slide pertama jika mencapai akhir
      if (n > slides.length) {
        slideIndex = 1;
      }
      
      // Kembali ke slide terakhir jika mundur dari slide pertama
      if (n < 1) {
        slideIndex = slides.length;
      }
      
      // Sembunyikan semua slide
      for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
      }
      
      // Tampilkan slide yang aktif
      slides[slideIndex-1].style.display = "block";
    }
    
    // Auto slide setiap 5 detik (opsional)
    setInterval(function() {
      plusSlides(1);
    }, 5000);
});
