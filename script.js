const addRowBtn = document.getElementById("addRowBtn");
const tableBody = document.getElementById("tableBody");

// إعادة ترقيم الصفوف
function updateRowNumbers() {
    const rows = tableBody.querySelectorAll("tr");

    rows.forEach((row, index) => {
        const numberCell = row.querySelector(".row-number");
        if (numberCell) {
            numberCell.textContent = index + 1;
        }
    });
}

// حساب إجمالي الألواح
function updateBoardsCount() {
    let total = 0;

    document.querySelectorAll(".qty-input").forEach(input => {
        total += Number(input.value) || 0;
    });

    const boardsCount = document.getElementById("boardsCount");
    if (boardsCount) {
        boardsCount.textContent = total;
    }
}

// ربط وظائف الصف
function setupRow(row) {

    // حذف الصف
    row.querySelector(".delete-btn").addEventListener("click", () => {
        row.remove();
        updateRowNumbers();
        updateBoardsCount();
    });

    // تحديث إجمالي الألواح
    const qtyInput = row.querySelector(".qty-input");
    if (qtyInput) {
        qtyInput.addEventListener("input", updateBoardsCount);
    }
}

// تجهيز الصف الأول
document.querySelectorAll("#tableBody tr").forEach(setupRow);

// إضافة صف جديد
addRowBtn.addEventListener("click", () => {

    const row = document.createElement("tr");

    row.innerHTML = `
        <td><button class="delete-btn">🗑</button></td>
        <td class="row-number"></td>
        <td><textarea class="spec-input" placeholder="اكتب المواصفات..."></textarea></td>
       <td><input type="text" class="length-input" inputmode="decimal"></td>
<td><input type="text" class="width-input" inputmode="decimal"></td>
<td><input type="text" class="qty-input" inputmode="decimal"></td>
        <td><input type="checkbox"></td>
        <td><input type="checkbox"></td>
        <td><input type="checkbox"></td>
        <td><input type="checkbox"></td>
    `;

    tableBody.appendChild(row);

    setupRow(row);

    updateRowNumbers();
    updateBoardsCount();

});

// تشغيل أولي
updateRowNumbers();
updateBoardsCount();
const orderDate = document.getElementById("orderDate");

if (orderDate) {
    orderDate.value = new Date().toISOString().split("T")[0];
}
const orderInput = document.getElementById("orderNumber");

let lastOrder = localStorage.getItem("lastOrder") || 0;

lastOrder = Number(lastOrder) + 1;

orderInput.value = String(lastOrder).padStart(4, "0");

localStorage.setItem("lastOrder", lastOrder);
// دعم الأرقام العربية والإنجليزية
function normalizeNumberInput(input) {

    input.addEventListener("input", function () {

        this.value = this.value
            .replace(/[٠-٩]/g, d => "٠١٢٣٤٥٦٧٨٩".indexOf(d))
            .replace(/٫/g, ".")
            .replace(/,/g, ".")
            .replace(/[^0-9.]/g, "");

        const parts = this.value.split(".");
        if (parts.length > 2) {
            this.value = parts[0] + "." + parts.slice(1).join("");
        }

    });

}

document.querySelectorAll(
'#boardWidth,#boardHeight,.length-input,.width-input,.qty-input'
).forEach(normalizeNumberInput);
document.querySelector(".hero-btn").addEventListener("click", function(e){
    e.preventDefault();

    document.querySelector("#order").scrollIntoView({
        behavior: "smooth"
    });
});