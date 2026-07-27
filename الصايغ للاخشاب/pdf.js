const pdfButton = document.getElementById("pdfBtn");
const shareButton = document.getElementById("shareBtn");

shareButton.addEventListener("click", sharePDF);


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

    return rows;}

async function generatePDF(orderData) {

    const { jsPDF } = window.jspdf;

    const pdf = new jsPDF("p", "mm", "a4");
   const element = document.querySelector(".pdf-content");

document.getElementById("addRowBtn").style.display = "none";
document.getElementById("pdfBtn").style.display = "none";

const canvas = await html2canvas(element, {
    scale: 1.3,
    useCORS: true,
    backgroundColor: "#F8F5EE",
    scrollX: 0,
    scrollY: -window.scrollY,
    windowWidth: document.documentElement.scrollWidth,
    windowHeight: document.documentElement.scrollHeight
});

    const imgData = canvas.toDataURL("image/jpeg",0.8);

   const pageWidth = pdf.internal.pageSize.getWidth();
const pageHeight = pdf.internal.pageSize.getHeight();

const imgWidth = pageWidth;
const imgHeight = (canvas.height * imgWidth) / canvas.width;

let heightLeft = imgHeight;
let position = 0;

pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);

heightLeft -= pageHeight;

while (heightLeft > 0) {

    position = heightLeft - imgHeight;

    pdf.addPage();

    pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);

    heightLeft -= pageHeight;
}



pdf.save(`الصايغ لتشكيل الألواح الخشبية - ${customerName}.pdf`);
    document.getElementById("addRowBtn").style.display = "inline-flex";
document.getElementById("pdfBtn").style.display = "inline-flex";

}
async function sharePDF() {
   
const customerName = document.getElementById("customerName").value.trim();

if (!customerName) {
    alert("يرجى إدخال اسم العميل أولاً");
    return;
}
    if (!navigator.share) {
        alert("المشاركة غير مدعومة على هذا الجهاز.");
        return;
    }
    
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

 


const fileName = `الصايغ لتشكيل الألواح الخشبية - ${customerName}.pdf`;
    const { jsPDF } = window.jspdf;

const pdf = new jsPDF("p", "mm", "a4");

const element = document.querySelector(".pdf-content");
document.getElementById("addRowBtn").style.display = "none";
document.getElementById("pdfBtn").style.display = "none";
document.getElementById("shareBtn").style.display = "none";
const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    backgroundColor: null
});
const imgData = canvas.toDataURL("image/jpeg",0.82);

const pageWidth = pdf.internal.pageSize.getWidth();
const pageHeight = pdf.internal.pageSize.getHeight();

const imgWidth = pageWidth;
const imgHeight = (canvas.height * imgWidth) / canvas.width;

let heightLeft = imgHeight;
let position = 0;

pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);

heightLeft -= pageHeight;

while (heightLeft > 0) {

    position = heightLeft - imgHeight;

    pdf.addPage();

    pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);

    heightLeft -= pageHeight;
}
const pdfBlob = pdf.output("blob");

const file = new File(
    [pdfBlob],
    fileName,
    { type: "application/pdf" }
)
try {
    await navigator.share({
        files: [file],
        title: "طلب الصايغ",
        text: "طلب جديد من الصايغ لتشكيل الألواح الخشبية"
    });

} catch (error) {

    if (error.name !== "AbortError") {
        alert("تعذر مشاركة الملف. قد يكون حجم ملف الـ PDF كبيرًا جدًا.");
        console.error(error);
    }

} finally {

    document.getElementById("addRowBtn").style.display = "inline-flex";
    document.getElementById("pdfBtn").style.display = "inline-flex";
    document.getElementById("shareBtn").style.display = "inline-flex";
}
}