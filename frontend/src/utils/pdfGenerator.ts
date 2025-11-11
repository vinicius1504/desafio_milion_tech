import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Customer } from '../types';

export const generateCustomersPDF = (customers: Customer[]): void => {
  const doc = new jsPDF();

  // Título
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('Lista de Clientes', 14, 20);

  // Data de geração
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  const currentDate = new Date().toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
  doc.text(`Gerado em: ${currentDate}`, 14, 28);

  // Linha separadora
  doc.setLineWidth(0.5);
  doc.line(14, 32, 196, 32);

  // Preparar dados da tabela
  const tableData = customers.map((customer) => [
    customer.name,
    customer.email,
    customer.phone,
    customer.address,
    new Date(customer.createdAt).toLocaleDateString('pt-BR'),
  ]);

  // Gerar tabela
  autoTable(doc, {
    head: [['Nome', 'E-mail', 'Telefone', 'Endereço', 'Data de Cadastro']],
    body: tableData,
    startY: 36,
    theme: 'grid',
    styles: {
      fontSize: 9,
      cellPadding: 3,
    },
    headStyles: {
      fillColor: [25, 118, 210], // Cor primária do Material UI
      textColor: [255, 255, 255],
      fontStyle: 'bold',
    },
    alternateRowStyles: {
      fillColor: [245, 245, 245],
    },
    columnStyles: {
      0: { cellWidth: 35 }, // Nome
      1: { cellWidth: 45 }, // E-mail
      2: { cellWidth: 30 }, // Telefone
      3: { cellWidth: 50 }, // Endereço
      4: { cellWidth: 26 }, // Data
    },
    margin: { top: 36, right: 14, bottom: 20, left: 14 },
  });

  // Rodapé
  const pageCount = doc.internal.pages.length - 1;
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');

  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.text(
      `Página ${i} de ${pageCount}`,
      doc.internal.pageSize.getWidth() / 2,
      doc.internal.pageSize.getHeight() - 10,
      { align: 'center' }
    );
    doc.text(
      'Sistema de Gestão de Clientes',
      14,
      doc.internal.pageSize.getHeight() - 10
    );
  }

  // Salvar PDF
  const fileName = `clientes_${new Date().getTime()}.pdf`;
  doc.save(fileName);
};
