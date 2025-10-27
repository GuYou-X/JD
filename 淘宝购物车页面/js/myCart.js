// 全选功能
document.getElementById('allCheckBox').addEventListener('click', function() {
    var checkboxes = document.getElementsByName('cartCheckBox');
    var isChecked = this.checked;
    checkboxes.forEach(function(checkbox) {
        checkbox.checked = isChecked;
    });
    updateTotal();
});

// 单选框点击事件：更新全选框状态
var checkboxes = document.getElementsByName('cartCheckBox');
checkboxes.forEach(function(checkbox) {
    checkbox.addEventListener('click', function() {
        var allChecked = true;
        checkboxes.forEach(function(box) {
            if (!box.checked) {
                allChecked = false;
            }
        });
        document.getElementById('allCheckBox').checked = allChecked;
        updateTotal();
    });
});

// 删除所选商品
document.querySelectorAll('.cart_td_8 a').forEach(function(deleteBtn) {
    deleteBtn.addEventListener('click', function() {
        var row = this.closest('tr');
        var checkBox = row.querySelector('input[type="checkbox"]');
        if (checkBox.checked) {
            row.remove();
            updateTotal();
        } else {
            alert('请先选择要删除的商品');
        }
    });
});

// 商品数量 +/- 增减
document.querySelectorAll('.cart_td_6 .hand').forEach(function(button) {
    button.addEventListener('click', function() {
        var inputField = this.closest('td').querySelector('.num_input');
        var currentValue = parseInt(inputField.value);
        if (this.src.includes('minus') && currentValue > 1) {
            inputField.value = currentValue - 1;
        } else if (this.src.includes('adding')) {
            inputField.value = currentValue + 1;
        }
        updateTotal();
    });
});

// 商品数量输入框更新
document.querySelectorAll('.num_input').forEach(function(input) {
    input.addEventListener('input', function() {
        if (isNaN(this.value) || this.value < 1) {
            this.value = 1; // 防止输入非法数值
        }
        updateTotal();
    });
});

// 计算并更新总金额
function updateTotal() {
    var totalAmount = 0;
    var selectedProducts = document.querySelectorAll('input[name="cartCheckBox"]:checked');
    selectedProducts.forEach(function(checkbox) {
        var row = checkbox.closest('tr');
        var price = parseFloat(row.querySelector('.cart_td_5').innerText);
        var quantity = parseInt(row.querySelector('.num_input').value);
        totalAmount += price * quantity;
    });

    // 更新总金额显示
    var totalDisplay = document.getElementById('total');
    if (totalDisplay) {
        totalDisplay.innerText = totalAmount.toFixed(2); // 更新总金额，保留两位小数
    }

    // 如果需要显示积分，根据总金额（假设1元=1积分）
    var integralDisplay = document.getElementById('integral');
    if (integralDisplay) {
        integralDisplay.innerText = totalAmount.toFixed(0); // 显示积分（四舍五入）
    }
}

// 删除已选商品
document.getElementById('deleteAll').addEventListener('click', function() {
    var selectedProducts = document.querySelectorAll('input[name="cartCheckBox"]:checked');
    if (selectedProducts.length > 0) {
        selectedProducts.forEach(function(checkbox) {
            var row = checkbox.closest('tr');
            row.remove();
        });
        updateTotal();
    } else {
        alert('请先选择要删除的商品');
    }
});

// 结算功能
document.getElementById('checkout').addEventListener('click', function() {
    var selectedProducts = document.querySelectorAll('input[name="cartCheckBox"]:checked');
    if (selectedProducts.length > 0) {
        var totalAmount = 0;
        selectedProducts.forEach(function(checkbox) {
            var row = checkbox.closest('tr');
            var price = parseFloat(row.querySelector('.cart_td_5').innerText);
            var quantity = parseInt(row.querySelector('.num_input').value);
            totalAmount += price * quantity;
        });
        alert('结算金额：' + totalAmount.toFixed(2) + ' 元');
    } else {
        alert('请先选择要结算的商品');
    }
});
