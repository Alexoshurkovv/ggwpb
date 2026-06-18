// ====================== БУРГЕР МЕНЮ ======================
const burger = document.querySelector('.burger');
const mobileMenu = document.getElementById('mobileMenu');

if (burger && mobileMenu) {
    burger.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        burger.textContent = mobileMenu.classList.contains('active') ? '✕' : '☰';
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            burger.textContent = '☰';
        });
    });
}

// ====================== МОДАЛЬНОЕ ОКНО ======================
function openModal() {
    const modal = document.getElementById('modal');
    if (modal) modal.style.display = 'block';
}

function closeModal() {
    const modal = document.getElementById('modal');
    if (modal) modal.style.display = 'none';
}

window.onclick = function(event) {
    const modal = document.getElementById('modal');
    if (event.target === modal) {
        closeModal();
    }
};

// ====================== EMAILJS (исправленная версия) ======================
window.addEventListener('load', function() {
    
    // Инициализация EmailJS
    emailjs.init({
        publicKey: "Jmd3xlGbPGGENbwZ5"   // Твой Public Key
    });

    // Обработка формы
    const form = document.getElementById('diagnostikaForm');

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;

            submitBtn.textContent = 'Отправляем...';
            submitBtn.disabled = true;

            emailjs.sendForm('service_ijvlh9o', 'template_14ae8lj', form)
                .then(() => {
                    alert('✅ Спасибо! Ваша заявка успешно отправлена.\nМы свяжемся с вами в течение 48 часов.');
                    closeModal();
                    form.reset();
                })
                .catch((error) => {
                    console.error('Ошибка отправки:', error);
                    alert('⚠️ Произошла ошибка при отправке. Попробуйте позже или позвоните нам.');
                })
                .finally(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                });
        });
    }
});