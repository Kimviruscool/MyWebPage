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

// 달력 관련 변수
let currentYear = 2025;
let currentMonth = 0; // 0 = January
let selectedDate = null;

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

const monthNames = [
    'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
    'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'
];

function renderCalendar() {
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const prevMonthDays = new Date(currentYear, currentMonth, 0).getDate();

    const calendarDays = document.getElementById('calendarDays');
    calendarDays.innerHTML = '';

    document.getElementById('currentMonth').textContent = `${monthNames[currentMonth]} ${currentYear}`;

    // 이전 달 날짜들
    for (let i = firstDay - 1; i >= 0; i--) {
        const day = document.createElement('div');
        day.className = 'day other-month';
        day.textContent = prevMonthDays - i;
        calendarDays.appendChild(day);
    }

    // 현재 달 날짜들
    for (let i = 1; i <= daysInMonth; i++) {
        const day = document.createElement('div');
        const date = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
        const dayOfWeek = new Date(currentYear, currentMonth, i).getDay();

        day.className = 'day';
        if (dayOfWeek === 0) day.classList.add('sunday');
        if (dayOfWeek === 6) day.classList.add('saturday');
        if (schedules[date]) day.classList.add('has-event');

        day.textContent = i;
        day.dataset.date = date;

        day.addEventListener('click', function() {
            document.querySelectorAll('.day').forEach(d => d.classList.remove('selected'));
            this.classList.add('selected');
            selectedDate = this.dataset.date;
            showSchedule(this.dataset.date);
        });

        calendarDays.appendChild(day);
    }

    // 다음 달 날짜들
    const totalCells = calendarDays.children.length;
    const remainingCells = 42 - totalCells; // 6주 * 7일
    for (let i = 1; i <= remainingCells; i++) {
        const day = document.createElement('div');
        day.className = 'day other-month';
        if ((totalCells + i - 1) % 7 === 6) day.classList.add('saturday');
        day.textContent = i;
        calendarDays.appendChild(day);
    }
}

function showSchedule(date) {
    const scheduleList = document.getElementById('scheduleList');
    const selectedDateHeader = document.getElementById('selectedDate');
    const daySchedules = schedules[date];

    const dateObj = new Date(date);
    const formatted = `${dateObj.getFullYear()}년 ${dateObj.getMonth() + 1}월 ${dateObj.getDate()}일`;
    selectedDateHeader.textContent = formatted;

    if (daySchedules && daySchedules.length > 0) {
        scheduleList.innerHTML = '';
        daySchedules.forEach(schedule => {
            const item = document.createElement('div');
            item.className = 'schedule-item';
            item.innerHTML = `
                <div class="schedule-time">${schedule.time}</div>
                <div class="schedule-title">${schedule.title}</div>
            `;
            scheduleList.appendChild(item);
        });
    } else {
        scheduleList.innerHTML = '<div class="schedule-empty">등록된 일정이 없습니다</div>';
    }
}

function prevMonth() {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    renderCalendar();
}

function nextMonth() {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    renderCalendar();
}

function showAddScheduleForm() {
    if (!selectedDate) {
        alert('먼저 날짜를 선택해주세요.');
        return;
    }
    document.getElementById('addScheduleForm').style.display = 'flex';
}

function hideAddScheduleForm() {
    document.getElementById('addScheduleForm').style.display = 'none';
    document.getElementById('scheduleTime').value = '';
    document.getElementById('scheduleTitle').value = '';
}

function saveSchedule() {
    if (!selectedDate) {
        alert('날짜를 선택해주세요.');
        return;
    }

    const time = document.getElementById('scheduleTime').value;
    const title = document.getElementById('scheduleTitle').value.trim();

    if (!time || !title) {
        alert('시간과 제목을 모두 입력해주세요.');
        return;
    }

    if (!schedules[selectedDate]) {
        schedules[selectedDate] = [];
    }

    schedules[selectedDate].push({ time, title });
    schedules[selectedDate].sort((a, b) => a.time.localeCompare(b.time));

    hideAddScheduleForm();
    renderCalendar();
    showSchedule(selectedDate);

    // 선택된 날짜 다시 표시
    document.querySelectorAll('.day').forEach(day => {
        if (day.dataset.date === selectedDate) {
            day.classList.add('selected');
        }
    });
}

// 초기 렌더링
renderCalendar();