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

// 커밋 필터 기능
function filterCommits(type) {
    const commitItems = document.querySelectorAll('.commit-item');
    const filterBtns = document.querySelectorAll('.filter-btn');

    // 버튼 active 상태 변경
    filterBtns.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    // 커밋 아이템 필터링
    commitItems.forEach(item => {
        if (type === 'all') {
            item.style.display = 'flex';
        } else {
            if (item.dataset.type === type) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        }
    });
}

// 커밋 아이템 클릭 시 상세 정보 표시
document.querySelectorAll('.commit-item').forEach(item => {
    item.addEventListener('click', function() {
        const message = this.querySelector('.commit-message').textContent;
        const author = this.querySelector('.commit-author').textContent;
        const date = this.querySelector('.commit-date').textContent;
        const hash = this.querySelector('.commit-hash').textContent;

        alert(`커밋 상세 정보\n\n메시지: ${message}\n작성자: ${author}\n날짜: ${date}\n해시: ${hash}`);
    });
});