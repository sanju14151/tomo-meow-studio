import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { toast } from "sonner";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export function ExportButton() {
  const handleExport = async () => {
    const previewElement = document.getElementById('preview-content');
    
    if (!previewElement) {
      toast.error("Nothing to export");
      return;
    }

    try {
      toast.info("Generating PDF...");
      
      const canvas = await html2canvas(previewElement, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save('tomo-meow-export.pdf');
      toast.success("PDF exported successfully!");
    } catch (error) {
      console.error('Export error:', error);
      toast.error("Failed to export PDF");
    }
  };

  return (
    <Button 
      onClick={handleExport}
      className="bg-primary hover:bg-primary/90 text-primary-foreground"
    >
      <Download className="mr-2 h-4 w-4" />
      Export PDF
    </Button>
  );
}
