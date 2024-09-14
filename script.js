// Mảng giá trị mặc định cho 50 thẻ
const defaultValues = Array(50).fill(null).map((_, i) => ({
    front: `Thẻ ${i + 1} (Mặt trước)`,
    back: `Thẻ ${i + 1} (Mặt sau)`
}));

// Lấy dữ liệu từ LocalStorage hoặc sử dụng giá trị mặc định
let values = JSON.parse(localStorage.getItem('cardValues')) || [...defaultValues];

// Hàm để render các thẻ
function renderCards() {
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = '';  // Xóa nội dung cũ trước khi render

    for (let i = 0; i < values.length; i++) {
        const frontValue = values[i].front;
        const backValue = values[i].back;

        // Thêm thẻ vào container
        cardContainer.innerHTML += `
            <div class="card" onclick="flipCard(this)">
                <div class="card-inner">
                    <div class="card-front">${frontValue}</div>
                    <div class="card-back">${backValue}</div>
                </div>
            </div>
        `;
    }
}

// Hàm lật thẻ
function flipCard(card) {
    card.classList.toggle('flipped');
}

// Hàm xáo trộn thẻ
function shuffleCards() {
    values.sort(() => Math.random() - 0.5);  // Xáo trộn mảng values
    saveToLocalStorage();  // Lưu lại sau khi xáo trộn
    renderCards();  // Render lại các thẻ sau khi xáo trộn
}

// Hàm cập nhật nội dung thẻ
function updateCard() {
    const index = document.getElementById("card-index").value - 1;
    const frontValue = document.getElementById("front-value").value;
    const backValue = document.getElementById("back-value").value;

    // Kiểm tra dữ liệu có hợp lệ không
    if (index >= 0 && index < values.length && frontValue && backValue) {
        // Cập nhật giá trị của thẻ
        values[index] = { front: frontValue, back: backValue };
        saveToLocalStorage();  // Lưu vào LocalStorage sau khi cập nhật
        renderCards();  // Render lại thẻ
    } else {
        alert("Vui lòng nhập chỉ số thẻ hợp lệ và cả hai giá trị mặt trước và mặt sau.");
    }
}

// Hàm lưu dữ liệu vào LocalStorage
function saveToLocalStorage() {
    localStorage.setItem('cardValues', JSON.stringify(values));
}

// Hàm xóa tất cả thẻ và khôi phục lại giá trị mặc định
function clearAllCards() {
    values = [...defaultValues];  // Khôi phục lại giá trị mặc định
    localStorage.removeItem('cardValues');  // Xóa khỏi LocalStorage
    renderCards();  // Render lại thẻ với giá trị mặc định
}

// Render các thẻ ban đầu khi trang tải
renderCards();
