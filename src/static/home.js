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

// 일정 데이터
const schedules = {
    '2025-01-03': [
        { time: '10:00', title: '팀 회의' },
        { time: '14:00', title: '프로젝트 발표' }
    ],
    '2025-01-15': [
        { time: '09:00', title: '고객 미팅' },
        { time: '15:30', title: '코드 리뷰' }
    ],
    '2025-01-20': [
        { time: '11:00', title: '점심 약속' },
        { time: '16:00', title: '개발 회의' },
        { time: '18:00', title: '저녁 모임' }
    ],
    '2025-01-25': [
        { time: '10:30', title: '디자인 리뷰' }
    ],
    '2025-01-31': [
        { time: '09:30', title: '월말 결산 회의' },
        { time: '14:00', title: '다음달 계획 수립' }
    ]
};

// 달력 날짜 클릭 이벤트
document.querySelectorAll('.day[data-date]').forEach(day => {
    day.addEventListener('click', function() {
        // 모든 날짜의 선택 상태 제거
        document.querySelectorAll('.day').forEach(d => d.classList.remove('selected'));

        // 클릭한 날짜 선택
        this.classList.add('selected');

        // 일정 표시
        const date = this.dataset.date;
        showSchedule(date);
    });
});

function showSchedule(date) {
    const scheduleList = document.getElementById('scheduleList');
    const daySchedules = schedules[date];

    if (daySchedules && daySchedules.length > 0) {
        scheduleList.innerHTML = '';
        daySchedules.forEach(schedule => {
            const item = document.createElement('div');
            item.className = 'schedule-item';
            item.innerHTML = `
                <div class="schedule-time">${schedule.time}</div>
                <div>${schedule.title}</div>
            `;
            scheduleList.appendChild(item);
        });
    } else {
        scheduleList.innerHTML = '<div class="schedule-empty">등록된 일정이 없습니다</div>';
    }
}

// 주식 자동 슬라이드
let currentStockIndex = 0;
const stockItems = document.querySelectorAll('.stock-item');
let stockInterval;

function showStock(index) {
    stockItems.forEach(item => item.classList.remove('active'));
    stockItems[index].classList.add('active');
    currentStockIndex = index;
}

function nextStock() {
    const nextIndex = (currentStockIndex + 1) % stockItems.length;
    showStock(nextIndex);
    resetStockInterval();
}

function prevStock() {
    const prevIndex = (currentStockIndex - 1 + stockItems.length) % stockItems.length;
    showStock(prevIndex);
    resetStockInterval();
}

function resetStockInterval() {
    clearInterval(stockInterval);
    stockInterval = setInterval(nextStock, 5000);
}

showStock(0);
stockInterval = setInterval(nextStock, 5000);

// 코인 자동 슬라이드
let currentCoinIndex = 0;
const coinItems = document.querySelectorAll('.coin-item');
let coinInterval;

function showCoin(index) {
    coinItems.forEach(item => item.classList.remove('active'));
    coinItems[index].classList.add('active');
    currentCoinIndex = index;
}

function nextCoin() {
    const nextIndex = (currentCoinIndex + 1) % coinItems.length;
    showCoin(nextIndex);
    resetCoinInterval();
}

function prevCoin() {
    const prevIndex = (currentCoinIndex - 1 + coinItems.length) % coinItems.length;
    showCoin(prevIndex);
    resetCoinInterval();
}

function resetCoinInterval() {
    clearInterval(coinInterval);
    coinInterval = setInterval(nextCoin, 5000);
}

showCoin(0);
coinInterval = setInterval(nextCoin, 5000);

// 방명록 추가 기능
function addGuestbook() {
    const name = document.getElementById('gb-name').value.trim();
    const contact = document.getElementById('gb-contact').value.trim();
    const content = document.getElementById('gb-content').value.trim();
    const isPrivate = document.getElementById('gb-private').checked;

    if (!name || !content) {
        alert('이름과 방명록 내용은 필수입니다.');
        return;
    }

    const display = document.querySelector('.guestbook-display');
    const newItem = document.createElement('div');
    newItem.className = 'guestbook-item';

    let html = `<div class="guestbook-item-name">${isPrivate ? '익명' : name}</div>`;
    html += `<div class="guestbook-item-content">${content}</div>`;
    html += `<div class="guestbook-item-meta">`;

    if (isPrivate) {
        html += `<span>🔒 비공개</span>`;
    } else {
        if (contact) html += `<span>${contact}</span>`;
    }

    html += `</div>`;
    newItem.innerHTML = html;

    display.appendChild(newItem);
    display.scrollTop = display.scrollHeight;

    // 입력 필드 초기화
    document.getElementById('gb-name').value = '';
    document.getElementById('gb-contact').value = '';
    document.getElementById('gb-content').value = '';
    document.getElementById('gb-private').checked = false;
}