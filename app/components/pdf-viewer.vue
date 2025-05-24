<script setup lang="ts">
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas'

const invoiceContainer = useTemplateRef<HTMLDivElement>('invoiceContainer')

const id = 12345
const date = '2023-05-15'
const company = 'Your Company'

const generatePdf = async () => {
  // try {
  //   const canvas = await html2canvas(invoiceContainer.value!, { scale: 1 })
  //   const imgData = canvas.toDataURL('image/png')
  //
  //   const pdf = new jsPDF()
  //   const imgProps = pdf.getImageProperties(imgData)
  //   const pdfWidth = pdf.internal.pageSize.getWidth()
  //   const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width
  //
  //   pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
  //   pdf.save('generated.pdf')
  //   console.log('PDF generated')
  // } catch (err) {
  //   console.error('[PDF ERROR]:', err)
  // }

  const pdf = new jsPDF({
    unit: 'pt',
    format: 'a4',
    orientation: 'portrait'
  });

  try {
    await pdf.html(invoiceContainer.value!, {
      callback: function (doc) {
        doc.save('invoice.pdf')
        console.log('PDF generated')
      },
      x: 0,
      y: 0,
      html2canvas: {
        scale: 0.45,
      }
    });
  } catch (err) {
    console.error('[PDF ERROR]:', err)
  }
}

</script>

<template>
  <div class="size-full">
     <div ref="invoiceContainer" class="invoice-container">
      <h2 class="invoice-title">Invoice</h2>
      <div class="invoice-content">
        <div class="invoice-header">
          <div class="invoice-info">
            <p><strong>Invoice #:</strong> {{ id || 'N/A' }}</p>
            <p><strong>Date:</strong> {{ date || new Date().toLocaleDateString() }}</p>
          </div>
          <div class="company-info">
            <p><strong>Company:</strong> {{ company || 'Your Company' }}</p>
          </div>
        </div>

        <table class="invoice-table">
          <thead>
          <tr>
            <th>Item</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
          </thead>
          <tfoot>
          <tr>
            <td colspan="3" class="total-label">Total:</td>
            <td class="total-amount">$0.00</td>
          </tr>
          </tfoot>
        </table>

        <button
            class="download-button"
            @click="generatePdf"
        >
          Download PDF
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
*{
  color: #000000;
  background-color: #ffffff;
}

.invoice-container {
  padding: 1rem;
  background-color: #ffffff;
  color: #000000;
  font-size: 14pt;
  width: 100%;
  box-sizing: border-box;
  /* Remove height or overflow */
}


.invoice-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.invoice-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.invoice-header {
  display: flex;
  justify-content: space-between;
}

.invoice-table {
  width: 100%;
  border-collapse: collapse;
}

.invoice-table th,
.invoice-table td {
  border: 1px solid #ddd;
  padding: 0.5rem;
}

.invoice-table th {
  text-align: left;
  background-color: #f3f4f6;
}

.invoice-table th:nth-child(2),
.invoice-table th:nth-child(3),
.invoice-table th:nth-child(4),
.invoice-table td:nth-child(2),
.invoice-table td:nth-child(3),
.invoice-table td:nth-child(4) {
  text-align: right;
}

.total-label {
  text-align: right;
  font-weight: bold;
}

.total-amount {
  font-weight: bold;
}

.download-button {
  padding: 0.5rem 1rem;
  background-color: #3b82f6;
  color: #ffffff;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
}

.download-button:hover {
  background-color: #2563eb;
}
</style>