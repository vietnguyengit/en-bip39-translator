import React, { useState, useEffect, useCallback } from 'react';
import {
  Container,
  TextField,
  Typography,
  Box,
  Paper,
  IconButton,
  CssBaseline,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import GitHubIcon from '@mui/icons-material/GitHub';
import './App.css';

interface WordMap {
  [key: string]: number;
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#00796b',
    },
    secondary: {
      main: '#004d40',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [wordMap, setWordMap] = useState<WordMap>({});
  const [wordsList, setWordsList] = useState<string[]>([]);
  const [result, setResult] = useState<string>('');
  const [resultLabel, setResultLabel] = useState<string>('');
  const sourceURL =
    'https://raw.githubusercontent.com/bitcoin/bips/master/bip-0039/english.txt';
  const repoURL = 'https://github.com/vietnguyengit/en-bip39-translator';

  useEffect(() => {
    fetch(sourceURL)
      .then((response) => response.text())
      .then((data) => {
        const lines = data.split('\n').map((line) => line.trim().toLowerCase()); // Convert every string to lowercase
        const map: WordMap = {};
        lines.forEach((word, index) => {
          map[word] = index + 1;
        });
        setWordMap(map);
        setWordsList(lines);
      })
      .catch((error) => {
        console.error('Error fetching the file:', error);
      });
  }, []);

  const padWithZeros = (number: number, length: number): string => {
    return String(number).padStart(length, '0');
  };

  const debounce = (func: Function, wait: number) => {
    let timeout: NodeJS.Timeout;
    return (...args: any) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  const handleChange = useCallback(
    debounce((value: string) => {
      if (value === '') {
        setResult('');
        setResultLabel('');
        return;
      }
      if (/^[a-zA-Z]+$/.test(value)) {
        const lineNumber = wordMap[value.toLowerCase()]; // Convert input to lowercase
        setResult(
          lineNumber !== undefined ? padWithZeros(lineNumber, 4) : 'Not found',
        );
        setResultLabel('BIP39 digits:');
      } else if (/^\d+$/.test(value)) {
        const index = parseInt(value, 10) - 1;
        const word = wordsList[index];
        setResult(word !== undefined ? word : 'Not found');
        setResultLabel('Recovery seed word:');
      } else {
        setResult('Invalid input');
        setResultLabel('');
      }
    }, 300),
    [wordMap, wordsList],
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    handleChange(value);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="sm">
        <Paper
          elevation={3}
          style={{ padding: '2em', marginTop: '2em', textAlign: 'center' }}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            BIP39/English recovery seed words translator
          </Typography>
          <TextField
            fullWidth
            label="Type a word or a number"
            variant="outlined"
            value={searchTerm}
            onChange={handleInputChange}
            margin="normal"
          />
          {result && (
            <Box marginTop={2}>
              <Typography variant="h6" component="p">
                {resultLabel} <span className="highlight">{result}</span>
              </Typography>
            </Box>
          )}
          <Box marginTop={4}>
            <Typography variant="body2" color="textSecondary">
              Data source:{' '}
              <a href={sourceURL} target="_blank" rel="noopener noreferrer">
                {sourceURL}
              </a>
            </Typography>
          </Box>
          <Box marginTop={2} textAlign="center">
            <IconButton
              href={repoURL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Repository"
            >
              <GitHubIcon fontSize="large" />
              <Typography
                variant="body2"
                color="textSecondary"
                style={{ display: 'inline', marginLeft: '0.5rem' }}
              >
                Source Code
              </Typography>
            </IconButton>
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default App;
