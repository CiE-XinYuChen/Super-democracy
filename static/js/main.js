// Super-Democracy 主要 JavaScript 文件

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 自动隐藏 Flash 消息
    const alerts = document.querySelectorAll('.alert');
    alerts.forEach(alert => {
        setTimeout(() => {
            alert.style.transition = 'opacity 0.5s ease';
            alert.style.opacity = '0';
            setTimeout(() => {
                alert.remove();
            }, 500);
        }, 5000);
    });
    
    // 添加表单验证
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                    field.addEventListener('input', function() {
                        this.classList.remove('error');
                    });
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                showMessage('请填写所有必填字段', 'error');
            }
        });
    });
});

// 显示消息函数
function showMessage(message, type = 'info') {
    const flashContainer = document.querySelector('.flash-messages') || createFlashContainer();
    
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.innerHTML = `
        <i class="fas ${getIconClass(type)}"></i>
        ${message}
        <button class="alert-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    flashContainer.appendChild(alert);
    
    // 自动隐藏
    setTimeout(() => {
        alert.style.transition = 'opacity 0.5s ease';
        alert.style.opacity = '0';
        setTimeout(() => {
            alert.remove();
        }, 500);
    }, 5000);
}

// 创建 Flash 消息容器
function createFlashContainer() {
    const container = document.createElement('div');
    container.className = 'flash-messages';
    const navbar = document.querySelector('.navbar');
    navbar.insertAdjacentElement('afterend', container);
    return container;
}

// 获取图标类名
function getIconClass(type) {
    const iconMap = {
        'success': 'fa-check-circle',
        'error': 'fa-exclamation-circle',
        'warning': 'fa-exclamation-triangle',
        'info': 'fa-info-circle'
    };
    return iconMap[type] || 'fa-info-circle';
}

// 确认删除操作
function confirmDelete(message) {
    return confirm(message || '确定要删除吗？此操作不可恢复。');
}

// 表单输入错误样式
document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        .form-control.error {
            border-color: var(--danger-color);
        }
        .form-control.error:focus {
            box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
        }
    `;
    document.head.appendChild(style);
});

// 增强模态框功能
window.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (modal.style.display === 'block') {
                modal.style.display = 'none';
            }
        });
    }
});

// 添加加载状态
function setLoading(element, isLoading) {
    if (isLoading) {
        element.disabled = true;
        element.dataset.originalText = element.innerHTML;
        element.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 处理中...';
    } else {
        element.disabled = false;
        element.innerHTML = element.dataset.originalText;
    }
}

// 文件上传验证
document.addEventListener('change', function(e) {
    if (e.target.type === 'file') {
        const file = e.target.files[0];
        if (file) {
            const maxSize = 16 * 1024 * 1024; // 16MB
            if (file.size > maxSize) {
                e.target.value = '';
                showMessage('文件大小不能超过 16MB', 'error');
                return;
            }
            
            const allowedTypes = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 
                                'application/vnd.ms-excel'];
            if (!allowedTypes.includes(file.type)) {
                e.target.value = '';
                showMessage('只支持 Excel 文件格式', 'error');
                return;
            }
        }
    }
});

// 为管理员页面添加快捷键
if (window.location.pathname.includes('/admin')) {
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + K 打开搜索
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            // 可以添加搜索功能
        }
        
        // Ctrl/Cmd + N 新建
        if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
            e.preventDefault();
            const addButton = document.querySelector('.btn-primary');
            if (addButton) {
                addButton.click();
            }
        }
    });
}

// 添加平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});