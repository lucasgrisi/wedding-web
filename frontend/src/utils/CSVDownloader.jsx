import React from 'react';
import DownloadIcon from '@mui/icons-material/Download';
import { Button } from '@mui/material';

class CSVDownloader extends React.Component {
    downloadCSV = () => {
      const { data, filename } = this.props;
      const csv = this.convertToCSV(data);
      const csvData = new Blob([csv], { type: 'text/csv' });
      const csvUrl = URL.createObjectURL(csvData);
  
      const link = document.createElement('a');
      link.href = csvUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };
  
    convertToCSV = (data) => {
      const wrapWithQuotes = (value) => `"${value}"`;
      const header = Object.keys(data[0]).map(wrapWithQuotes).join(',') + '\n';
      const rows = data.map((obj) =>
        Object.values(obj).map(wrapWithQuotes).join(',') + '\n'
      );
      return header + rows.join('');
    };
  
    render() {
      return (
        <Button onClick={this.downloadCSV}  style={{ marginTop: '25px' }} variant='contained'>
            <DownloadIcon /> .csv
        </Button>
      );
    }
  }

  export default CSVDownloader;