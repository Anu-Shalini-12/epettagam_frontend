import React from 'react';
import * as XLSX from 'xlsx';

function base64ToArrayBuffer(base64) {
  const binaryString = window.atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);

  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  return bytes.buffer;
}

function displayExcelSheet(base64) {
  const data = base64ToArrayBuffer(base64);
  const workbook = XLSX.read(data, { type: 'array' });
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

  return jsonData;
}

function ExcelSheetDisplay({ base64 }) {
  const [excelData, setExcelData] = React.useState([]);

  React.useEffect(() => {
    const parsedData = displayExcelSheet(base64);
    setExcelData(parsedData);
  }, [base64]);


  function base64ToBlob(base64) {
    const binaryString = window.atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
  
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
  
    return new Blob([bytes], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  }

  

  function handleDownload(base64, fileName) {
    const blob = base64ToBlob(base64);
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.click();
    window.URL.revokeObjectURL(url);
  }
  return (
    <div className='p-3'>
      <h2 className='fw-bold'>Excel Sheet Data:</h2>
      <center>
        {excelData.length ? (
            <table>
            <thead>
                <tr>
                {excelData[0].map((header, index) => (
                    <th className='p-2 border ' key={index}>{header}</th>
                ))}
                </tr>
            </thead>
            <tbody>
                {excelData.slice(1).map((row, index) => (
                <tr key={index}>
                    {row.map((cell, index) => (
                    <td className='p-2 border ' key={index}>{cell}</td>
                    ))}
                </tr>
                ))}
            </tbody>
            </table>
        ) : (
            <p>No data to display.</p>
        )}
      </center>
      <center>
        <button className='p-2 mt-2 mb-2 border rounded' onClick={() => handleDownload(base64,"Excel_Sheet")} style={{background:'#154272',color:'white',fontWeight:'bold'}}>Download Excel sheet</button>
    </center>
    </div>
  );
}

export default ExcelSheetDisplay;
