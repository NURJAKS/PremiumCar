// JavaScript для страницы кредита

document.addEventListener('DOMContentLoaded', () => {
    const calculateBtn = document.getElementById('calculateCredit');
    if (calculateBtn) {
        calculateBtn.addEventListener('click', calculateCredit);
    }

    const creditForm = document.getElementById('creditForm');
    if (creditForm) {
        creditForm.addEventListener('submit', handleCreditFormSubmit);
    }
});

// Расчет кредита
function calculateCredit() {
    const carPrice = parseFloat(document.getElementById('carPrice').value) || 0;
    const initialPayment = parseFloat(document.getElementById('initialPayment').value) || 0;
    const creditTerm = parseFloat(document.getElementById('creditTerm').value) || 1;
    const interestRate = parseFloat(document.getElementById('interestRate').value) || 0;

    if (carPrice <= 0 || initialPayment < 0 || creditTerm <= 0 || interestRate < 0) {
        alert('Пожалуйста, заполните все поля корректно');
        return;
    }

    if (initialPayment >= carPrice) {
        alert('Первоначальный взнос не может быть больше стоимости автомобиля');
        return;
    }

    const creditAmount = carPrice - initialPayment;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = creditTerm * 12;

    // Формула аннуитетного платежа
    const monthlyPayment = creditAmount * 
        (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    const totalPayment = monthlyPayment * numberOfPayments;
    const overpayment = totalPayment - creditAmount;

    // Отображение результатов
    const resultDiv = document.getElementById('calculationResult');
    const creditAmountSpan = document.getElementById('creditAmount');
    const monthlyPaymentSpan = document.getElementById('monthlyPayment');
    const overpaymentSpan = document.getElementById('overpayment');

    if (resultDiv && creditAmountSpan && monthlyPaymentSpan && overpaymentSpan) {
        creditAmountSpan.textContent = formatPrice(creditAmount);
        monthlyPaymentSpan.textContent = formatPrice(Math.round(monthlyPayment));
        overpaymentSpan.textContent = formatPrice(Math.round(overpayment));
        resultDiv.style.display = 'block';
    }
}

// Обработка формы заявки на кредит
function handleCreditFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    console.log('Credit form submitted:', data);
    alert('Спасибо! Ваша заявка на кредит принята. Мы свяжемся с вами в ближайшее время.');
    e.target.reset();
}

