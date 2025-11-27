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

    const guestbookList = document.getElementById('guestbookList');
    const newCard = document.createElement('div');
    newCard.className = isPrivate ? 'guestbook-card private' : 'guestbook-card';

    // 현재 날짜
    const today = new Date();
    const dateStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

    // 이름의 첫 글자 (아바타용)
    const displayName = isPrivate ? '익명' : name;
    const avatarLetter = displayName.charAt(0);

    let html = `
        <div class="card-header">
            <div class="author-info">
                <div class="author-avatar">${avatarLetter}</div>
                <div class="author-details">
                    <div class="author-name">${displayName}</div>
    `;

    if (isPrivate) {
        html += `<div class="author-contact">🔒 비공개</div>`;
    } else {
        if (contact) {
            html += `<div class="author-contact">${contact}</div>`;
        }
    }

    html += `
                </div>
            </div>
            <div class="card-date">${dateStr}</div>
        </div>
        <div class="card-content">${content}</div>
    `;

    newCard.innerHTML = html;

    // 리스트 맨 위에 추가
    guestbookList.insertBefore(newCard, guestbookList.firstChild);

    // 총 개수 업데이트
    const totalCount = document.getElementById('totalCount');
    totalCount.textContent = parseInt(totalCount.textContent) + 1;

    // 입력 필드 초기화
    document.getElementById('gb-name').value = '';
    document.getElementById('gb-contact').value = '';
    document.getElementById('gb-content').value = '';
    document.getElementById('gb-private').checked = false;

    // 애니메이션 효과
    newCard.style.opacity = '0';
    newCard.style.transform = 'translateY(-20px)';
    setTimeout(() => {
        newCard.style.transition = 'all 0.3s';
        newCard.style.opacity = '1';
        newCard.style.transform = 'translateY(0)';
    }, 10);
}