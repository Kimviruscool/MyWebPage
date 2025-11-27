// 인증 상태
let isLoggedIn = false;

function toggleAuth() {
    const authBtn = document.getElementById('authBtn');
    const statusDot = document.querySelector('.status-dot-header');
    const statusText = document.querySelector('.status-text');

    isLoggedIn = !isLoggedIn;

    if (isLoggedIn) {
        authBtn.textContent = '로그아웃';
        authBtn.classList.add('logout');
        statusDot.style.background = '#28a745';
        statusDot.style.boxShadow = '0 0 8px #28a745';
        statusText.style.color = '#155724';
        statusText.textContent = '온라인';
    } else {
        authBtn.textContent = '로그인';
        authBtn.classList.remove('logout');
        statusDot.style.background = '#dc3545';
        statusDot.style.boxShadow = '0 0 8px #dc3545';
        statusText.style.color = '#721c24';
        statusText.textContent = '오프라인';
    }
}

// 주식 가격 실시간 업데이트 시뮬레이션
function updateStockPrices() {
    const stockCards = document.querySelectorAll('.stock-card');

    stockCards.forEach(card => {
        const priceElement = card.querySelector('.stock-price-large');
        const changeElement = card.querySelector('.stock-change');

        // 랜덤하게 가격 변동 (-2% ~ +2%)
        const changePercent = (Math.random() - 0.5) * 4;
        const currentPrice = parseInt(priceElement.textContent.replace(/[^0-9]/g, ''));
        const newPrice = Math.round(currentPrice * (1 + changePercent / 100));
        const priceDiff = newPrice - currentPrice;

        // 가격 업데이트
        priceElement.textContent = newPrice.toLocaleString() + '원';

        // 변동 정보 업데이트
        const changeValue = changeElement.querySelector('.change-value');
        const changePercentElem = changeElement.querySelector('.change-percent');

        changeValue.textContent = Math.abs(priceDiff).toLocaleString() + '원';
        changePercentElem.textContent = (changePercent > 0 ? '+' : '') + changePercent.toFixed(1) + '%';

        // 클래스 업데이트
        if (changePercent >= 0) {
            changeElement.classList.remove('negative');
            changeElement.classList.add('positive');
        } else {
            changeElement.classList.remove('positive');
            changeElement.classList.add('negative');
        }

        // 가격 변동 애니메이션
        priceElement.style.transform = 'scale(1.1)';
        priceElement.style.color = changePercent >= 0 ? '#e74c3c' : '#3498db';

        setTimeout(() => {
            priceElement.style.transform = 'scale(1)';
            priceElement.style.color = '#333';
        }, 300);
    });
}

// 10초마다 주식 가격 업데이트
setInterval(updateStockPrices, 10000);