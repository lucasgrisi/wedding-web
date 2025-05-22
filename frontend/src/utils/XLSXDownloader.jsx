import React from 'react';
import DownloadIcon from '@mui/icons-material/Download';
import { Button } from '@mui/material';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

class XLSXDownloader extends React.Component {

    downloadXlsx = () => {
        const { data, filename } = this.props;
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], {type: 'application/octet-stream'});
        saveAs(blob, `${filename}.xlsx`);
    };
  
  
    render() {
      return (
        <Button onClick={this.downloadXlsx}  style={{ marginTop: '25px' }} variant='contained'>
            <DownloadIcon />
        </Button>
      );
    }
  }

  export default XLSXDownloader;