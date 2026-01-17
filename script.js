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
    
    // 更新模板管理界面的实时位姿
    const jogInputs = document.querySelectorAll('.jog-input');
    if (jogInputs.length > 0) {
        // 更新笛卡尔坐标
        let x = 123.45 + (Math.random() - 0.5) * 0.2;
        let y = -67.89 + (Math.random() - 0.5) * 0.2;
        let z = 234.56 + (Math.random() - 0.5) * 0.2;
        let rx = 12.34 + (Math.random() - 0.5) * 0.1;
        let ry = -5.67 + (Math.random() - 0.5) * 0.1;
        let rz = 89.01 + (Math.random() - 0.5) * 0.1;
        
        // 更新输入框
        const xInput = document.querySelector('.jog-axis:nth-child(1) input.jog-input');
        const yInput = document.querySelector('.jog-axis:nth-child(2) input.jog-input');
        const zInput = document.querySelector('.jog-axis:nth-child(3) input.jog-input');
        const rxInput = document.querySelector('.jog-axis:nth-child(4) input.jog-input');
        const ryInput = document.querySelector('.jog-axis:nth-child(5) input.jog-input');
        const rzInput = document.querySelector('.jog-axis:nth-child(6) input.jog-input');
        
        if (xInput) xInput.value = x.toFixed(2);
        if (yInput) yInput.value = y.toFixed(2);
        if (zInput) zInput.value = z.toFixed(2);
        if (rxInput) rxInput.value = rx.toFixed(2);
        if (ryInput) ryInput.value = ry.toFixed(2);
        if (rzInput) rzInput.value = rz.toFixed(2);
        
        // 更新运动控制界面的点动输入框
        const jogInputs = document.querySelectorAll('.jog-input');
        jogInputs.forEach((input, index) => {
            let value = parseFloat(input.value);
            // 模拟微小波动
            value += (Math.random() - 0.5) * 0.1;
            input.value = value.toFixed(2);
        });
    }
}

// 速度滑块联动功能
function initSpeedControl() {
    const speedSlider = document.getElementById('speedSlider');
    const speedValue = document.getElementById('speedValue');
    
    if (speedSlider && speedValue) {
        // 初始化显示
        speedValue.textContent = `当前速度: ${speedSlider.value}%`;
        
        // 添加滑块事件监听
        speedSlider.addEventListener('input', () => {
            speedValue.textContent = `当前速度: ${speedSlider.value}%`;
        });
    }
}

// 初始化速度控制
initSpeedControl();

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

// 等待DOM加载完成后执行
window.addEventListener('DOMContentLoaded', () => {
    // 权限管理 - 三级权限：technician（技术人员）、engineer（工程师）、developer（开发者）
    let currentRole = localStorage.getItem('userRole') || 'technician';

    // 密码配置
    const passwords = {
        engineer: 'XG',
        developer: 'XG123456'
    };

    // 获取DOM元素
    const adminBtn = document.getElementById('adminBtn');
    const adminMenu = document.getElementById('adminMenu');
    const developerOption = document.getElementById('developerOption');
    const logoutBtn = document.getElementById('logoutBtn');
    const passwordModal = document.getElementById('passwordModal');
    const closeModal = document.getElementById('closeModal');
    const cancelBtn = document.getElementById('cancelBtn');
    const confirmBtn = document.getElementById('confirmBtn');
    const passwordInput = document.getElementById('passwordInput');
    const togglePassword = document.getElementById('togglePassword');
    const errorMessage = document.getElementById('errorMessage');
    const roleBtns = document.querySelectorAll('.role-btn');
    const navBtns = document.querySelectorAll('.nav-btn');

    // 初始化角色
    function initRole() {
        updateNavigationVisibility();
    }

    // 更新导航标签页可见性
    function updateNavigationVisibility() {
        // 移除所有角色类
        document.body.classList.remove('technician', 'engineer', 'developer');
        // 添加当前角色类
        document.body.classList.add(currentRole);
    }

    // 切换下拉菜单
    adminBtn.addEventListener('click', () => {
        adminMenu.classList.toggle('show');
    });

    // 角色选择功能
    roleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            roleBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    // 点击开发者选项，显示密码弹窗
    developerOption.addEventListener('click', () => {
        adminMenu.classList.remove('show');
        passwordModal.classList.add('show');
        passwordInput.focus();
    });

    // 关闭模态框
    function closePasswordModal() {
        passwordModal.classList.remove('show');
        passwordInput.value = '';
        errorMessage.textContent = '';
        // 重置角色选择
        roleBtns.forEach(b => b.classList.remove('active'));
        roleBtns[0].classList.add('active');
    }

    closeModal.addEventListener('click', closePasswordModal);
    cancelBtn.addEventListener('click', closePasswordModal);

    // 点击模态框外部关闭
    window.addEventListener('click', (e) => {
        if (e.target === passwordModal) {
            closePasswordModal();
        }
    });

    // 密码验证
    confirmBtn.addEventListener('click', () => {
        const password = passwordInput.value;
        const selectedRole = document.querySelector('.role-btn.active').dataset.role;
        
        if (password === passwords[selectedRole]) {
            // 密码正确，设置角色
            currentRole = selectedRole;
            localStorage.setItem('userRole', currentRole);
            updateNavigationVisibility();
            closePasswordModal();
            alert(`${selectedRole === 'engineer' ? '工程师' : '开发者'}权限已启用！`);
        } else {
            // 密码错误
            errorMessage.textContent = '密码错误，请重试！';
            passwordInput.value = '';
            passwordInput.focus();
        }
    });

    // 回车键验证密码
    passwordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            confirmBtn.click();
        }
    });

    // 密码显示/隐藏切换功能
    togglePassword.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        // 切换眼睛图标
        const icon = togglePassword.querySelector('i');
        if (type === 'password') {
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        } else {
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        }
    });

    // 退出登录功能
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            currentRole = 'technician';
            localStorage.removeItem('userRole');
            updateNavigationVisibility();
            adminMenu.classList.remove('show');
            alert('已退出登录，切换到技术人员权限！');
        });
    }

    // 点击页面其他地方关闭下拉菜单
    window.addEventListener('click', (e) => {
        if (!e.target.closest('.user-profile')) {
            adminMenu.classList.remove('show');
        }
    });

    // 版本切换功能
    const switchToMobileBtn = document.getElementById('switchToMobile');
    const switchToDesktopBtn = document.getElementById('switchToDesktop');
    
    // 初始化版本
    function initVersion() {
        const savedVersion = localStorage.getItem('appVersion') || 'desktop';
        document.body.classList.add(savedVersion + '-version');
    }
    
    // 切换到手机版
    switchToMobileBtn.addEventListener('click', () => {
        document.body.classList.remove('desktop-version');
        document.body.classList.add('mobile-version');
        localStorage.setItem('appVersion', 'mobile');
        adminMenu.classList.remove('show');
        alert('已切换到手机版！');
    });
    
    // 切换到电脑版
    switchToDesktopBtn.addEventListener('click', () => {
        document.body.classList.remove('mobile-version');
        document.body.classList.add('desktop-version');
        localStorage.setItem('appVersion', 'desktop');
        adminMenu.classList.remove('show');
        alert('已切换到电脑版！');
    });
    
    // 初始化
    initRole();
    initVersion();
});