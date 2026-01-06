// 标签页切换功能
const navBtns = document.querySelectorAll('.nav-btn');
const tabPanes = document.querySelectorAll('.tab-pane');

navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // 获取目标标签页ID
        const targetTab = btn.dataset.tab;
        
        // 移除所有导航按钮的激活状态
        navBtns.forEach(b => b.classList.remove('active'));
        // 添加当前导航按钮的激活状态
        btn.classList.add('active');
        
        // 隐藏所有标签页内容
        tabPanes.forEach(pane => {
            pane.classList.remove('active');
        });
        
        // 显示目标标签页内容
        const targetPane = document.getElementById(targetTab);
        if (targetPane) {
            targetPane.classList.add('active');
        }
        
        console.log(`切换到标签页: ${targetTab}`);
    });
});

// 模式切换功能
const modeBtns = document.querySelectorAll('.mode-btn');

modeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        modeBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        console.log(`切换到模式: ${btn.textContent}`);
    });
});

// 控制按钮点击效果
const controlBtns = document.querySelectorAll('.control-btn, .tool-btn, .param-btn, .alert-btn');

controlBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // 添加点击动画效果
        btn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            btn.style.transform = 'scale(1)';
        }, 150);
        
        // 输出按钮点击信息
        console.log(`点击按钮: ${btn.textContent.trim()}`);
    });
});

// 模拟实时数据更新
function updateRealTimeData() {
    // 更新TCP坐标
    const tcpNums = document.querySelectorAll('.tcp-num');
    tcpNums.forEach((num, index) => {
        let value = parseFloat(num.textContent);
        // 模拟微小波动
        value += (Math.random() - 0.5) * 2;
        num.textContent = value.toFixed(2);
    });
    
    // 更新焊接参数
    const paramValues = document.querySelectorAll('.param-value');
    paramValues.forEach((value, index) => {
        if (index === 0) { // 电流
            let current = parseFloat(value.textContent);
            current += (Math.random() - 0.5) * 5;
            value.textContent = `${current.toFixed(0)} A`;
        } else if (index === 1) { // 电压
            let voltage = parseFloat(value.textContent);
            voltage += (Math.random() - 0.5) * 0.5;
            value.textContent = `${voltage.toFixed(1)} V`;
        } else if (index === 2) { // 送丝速度
            let speed = parseFloat(value.textContent);
            speed += (Math.random() - 0.5) * 0.2;
            value.textContent = `${speed.toFixed(1)} m/min`;
        }
    });
}

// 定时更新数据，每2秒一次
setInterval(updateRealTimeData, 2000);

// 平滑滚动日志到最新条目
function scrollLogToBottom() {
    const logContent = document.querySelector('.log-content');
    logContent.scrollTop = logContent.scrollHeight;
}

// 初始化滚动
scrollLogToBottom();

// 添加新日志条目（模拟）
function addNewLogEntry() {
    const logContent = document.querySelector('.log-content');
    const now = new Date();
    const timeString = `[${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}]`;
    
    const logLevels = ['INFO:', 'PROC:', 'TASK:', 'WELD:'];
    const logMessages = [
        '系统运行正常...',
        '焊缝检测中...',
        '焊接参数稳定',
        '机器人运动状态良好',
        '电弧稳定，焊接质量优良',
        '系统温度正常'
    ];
    
    const randomLevel = logLevels[Math.floor(Math.random() * logLevels.length)];
    const randomMessage = logMessages[Math.floor(Math.random() * logMessages.length)];
    
    const logItem = document.createElement('div');
    logItem.className = 'log-item';
    logItem.innerHTML = `
        <span class="log-time">${timeString}</span>
        <span class="log-level ${randomLevel.toLowerCase().replace(':', '')}">${randomLevel}</span>
        <span class="log-message">${randomMessage}</span>
    `;
    
    logContent.appendChild(logItem);
    
    // 保持最多显示10条日志
    const logItems = logContent.querySelectorAll('.log-item');
    if (logItems.length > 10) {
        logItems[0].remove();
    }
    
    scrollLogToBottom();
}

// 每5秒添加一条新日志
setInterval(addNewLogEntry, 5000);

// 响应式侧边栏处理
function handleResponsiveLayout() {
    const mainContent = document.querySelector('.main-content');
    const width = window.innerWidth;
    
    if (width <= 1200) {
        mainContent.style.gridTemplateColumns = '1fr';
        mainContent.style.gridTemplateRows = 'auto auto auto';
    } else {
        mainContent.style.gridTemplateColumns = '300px 1fr 300px';
        mainContent.style.gridTemplateRows = '1fr';
    }
}

// 初始化响应式布局
handleResponsiveLayout();

// 监听窗口大小变化
window.addEventListener('resize', handleResponsiveLayout);

// 紧急停止按钮功能（模拟）
const emergencyStop = () => {
    console.log('执行紧急停止操作！');
    // 这里可以添加实际的紧急停止逻辑
    alert('紧急停止已触发！');
};

// 为危险按钮添加紧急停止确认
const dangerBtns = document.querySelectorAll('.control-btn.danger');
dangerBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        if (!confirm('确定要执行此操作吗？这将强制终止当前任务！')) {
            e.preventDefault();
            return false;
        }
        // 执行紧急停止
        emergencyStop();
    });
});