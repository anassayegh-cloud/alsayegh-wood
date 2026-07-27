const pdfButton = document.getElementById("pdfBtn");

pdfButton.addEventListener("click", createPDF);

function createPDF() {

    const orderData = {

        customerName: document.getElementById("customerName").value.trim(),

        responsibleName: document.getElementById("responsibleName").value.trim(),

        orderDate: document.getElementById("orderDate").value,

        orderNumber: document.getElementById("orderNumber").value.trim(),

        boardType: document.getElementById("boardType").value.trim(),

        phoneNumber: document.getElementById("phoneNumber").value.trim(),

        materialName: document.getElementById("materialName").value.trim(),

        rows: getTableRows()

    };

    if (!orderData.customerName) {
    alert("يرجى إدخال اسم العميل");
    return;
}

if (orderData.rows.length === 0) {
    alert("لا يوجد أي سطر داخل الجدول");
    return;
}

console.log(orderData);

generatePDF(orderData);


}

function getTableRows() {

    const rows = [];

    document.querySelectorAll("#tableBody tr").forEach((row) => {

        rows.push({

            number: row.querySelector(".row-number")?.textContent.trim(),

            specifications: row.querySelector(".spec-input")?.value.trim(),

            length: row.querySelector(".length-input")?.value,

            width: row.querySelector(".width-input")?.value,

            qty: row.querySelector(".qty-input")?.value,

            edgeTop: row.querySelectorAll("input[type='checkbox']")[0]?.checked,

            edgeBottom: row.querySelectorAll("input[type='checkbox']")[1]?.checked,

            edgeLeft: row.querySelectorAll("input[type='checkbox']")[2]?.checked,

            edgeRight: row.querySelectorAll("input[type='checkbox']")[3]?.checked

        });

    });

    return rows;0}

async function generatePDF(orderData) {

    const { jsPDF } = window.jspdf;

    const pdf = new jsPDF("p", "mm", "a4");
   const element = document.querySelector(".pdf-content");

document.getElementById("addRowBtn").style.display = "none";
document.getElementById("pdfBtn").style.display = "none";

const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    backgroundColor: null
}); 

    const imgData = canvas.toDataURL("image/png");

   const pageWidth = pdf.internal.pageSize.getWidth();
const pageHeight = pdf.internal.pageSize.getHeight();

const imgWidth = pageWidth;
const imgHeight = (canvas.height * imgWidth) / canvas.width;

let heightLeft = imgHeight;
let position = 0;

pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);

heightLeft -= pageHeight;

while (heightLeft > 0) {

    position = heightLeft - imgHeight;

    pdf.addPage();

    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);

    heightLeft -= pageHeight;
}

pdf.save("ALSAYEGH_ORDER.pdf");
    document.getElementById("addRowBtn").style.display = "inline-flex";
document.getElementById("pdfBtn").style.display = "inline-flex";
actions.style.display = "flex";
}
    
