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

// 기록 필터 기능
function filterRecords(category) {
    const recordCards = document.querySelectorAll('.record-card');
    const filterBtns = document.querySelectorAll('.filter-btn');

    // 버튼 active 상태 변경
    filterBtns.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    // 기록 카드 필터링
    recordCards.forEach(card => {
        if (category === 'all') {
            card.style.display = 'flex';
        } else {
            if (card.dataset.category === category) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        }
    });
}

// 모달 열기
function showAddRecordModal() {
    const modal = document.getElementById('addRecordModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// 모달 닫기
function hideAddRecordModal() {
    const modal = document.getElementById('addRecordModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';

    // 폼 초기화
    document.getElementById('recordCategory').value = 'work';
    document.getElementById('recordTitle').value = '';
    document.getElementById('recordContent').value = '';
    document.getElementById('recordTags').value = '';
    document.getElementById('recordImportant').checked = false;
}

// 기록 저장
function saveRecord() {
    const category = document.getElementById('recordCategory').value;
    const title = document.getElementById('recordTitle').value.trim();
    const content = document.getElementById('recordContent').value.trim();
    const tags = document.getElementById('recordTags').value.trim();
    const isImportant = document.getElementById('recordImportant').checked;

    if (!title || !content) {
        alert('제목과 내용은 필수입니다.');
        return;
    }

    const recordsGrid = document.getElementById('recordsGrid');
    const newCard = document.createElement('div');
    newCard.className = isImportant ? 'record-card important' : 'record-card';
    newCard.dataset.category = category;

    // 현재 날짜
    const today = new Date();
    const dateStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

    // 카테고리 한글 변환
    const categoryNames = {
        work: '업무',
        study: '학습',
        life: '일상',
        idea: '아이디어'
    };

    let html = `
        <div class="record-card-header">
            <div class="record-category ${category}">${categoryNames[category]}</div>
            <div class="record-date">${dateStr}</div>
        </div>
        <div class="record-title">${title}${isImportant ? ' ⭐' : ''}</div>
        <div class="record-content">${content}</div>
    `;

    // 태그 추가
    if (tags) {
        const tagArray = tags.split(',').map(tag => tag.trim()).filter(tag => tag);
        if (tagArray.length > 0) {
            html += '<div class="record-tags">';
            tagArray.forEach(tag => {
                html += `<span class="tag">${tag}</span>`;
            });
            html += '</div>';
        }
    }

    newCard.innerHTML = html;

    // 리스트 맨 앞에 추가
    recordsGrid.insertBefore(newCard, recordsGrid.firstChild);

    // 애니메이션 효과
    newCard.style.opacity = '0';
    newCard.style.transform = 'scale(0.8)';
    setTimeout(() => {
        newCard.style.transition = 'all 0.3s';
        newCard.style.opacity = '1';
        newCard.style.transform = 'scale(1)';
    }, 10);

    // 모달 닫기
    hideAddRecordModal();
}

// 모달 외부 클릭시 닫기
document.getElementById('addRecordModal').addEventListener('click', function(e) {
    if (e.target === this) {
        hideAddRecordModal();
    }
});