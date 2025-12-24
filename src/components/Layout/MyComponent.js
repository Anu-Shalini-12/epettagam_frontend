import {useEffect, useRef, useState } from 'react';
import WebViewer from '@pdftron/webviewer'
import { Buffer } from 'buffer'
import { Document, Page, pdfjs } from 'react-pdf'
import axios from 'axios';

//pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.mjs`
const MyComponent = (pdfData) => {
  const viewer = useRef(null);

  const [pageNumber, setPageNumber] = useState(1)
  const [numPages, setNumPages] = useState(null)
  
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages)
    setPageNumber(1)
  }

  const datapdf = pdfData?.pdfData?.data?.certificate?.data

  return (
    <div className="MyComponent" style={{width:'40%'}}>
      <embed
      
      src={`data:application/pdf;base64,${datapdf}`}
    height={800}
    width={700}
  />

    </div>
  );
};
export default MyComponent