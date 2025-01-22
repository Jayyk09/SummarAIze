import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Snackbar,
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { useChromeStorage } from './hooks/useChromeStorage';
import { ValidModel, VALID_MODELS } from './constant/valid_models';
import { useNavigate } from 'react-router-dom';
// import ChatBox from './content/content';


const Popup: React.FC = () => {
  const [apikey, setApikey] = useState<string | null>(null);
  const [model, setModel] = useState<ValidModel | null>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [submitMessage, setSubmitMessage] = useState<{
    state: 'error' | 'success';
    message: string;
  } | null>(null);

  const navigate = useNavigate(); // Hook to handle navigation

  // Load Chrome Storage Data
  useEffect(() => {
    const loadChromeStorage = async () => {
      if (!chrome) return;

      const { selectModel, getKeyModel } = useChromeStorage();
      const storedModel = await selectModel();
      setModel(storedModel);

      const key = (await getKeyModel(storedModel))?.apiKey || '';
      setApikey(key);

      setIsLoaded(true);
    };

    loadChromeStorage();
  }, []);

  // Handle Model Selection Change
  const handleModelChange = async (selectedModel: ValidModel) => {
    const { setSelectModel, getKeyModel } = useChromeStorage();
    setSelectModel(selectedModel);
    setModel(selectedModel);

    const key = (await getKeyModel(selectedModel))?.apiKey || '';
    setApikey(key);
  };

  // Save API Key and Model to Storage
  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const { setKeyModel } = useChromeStorage();
      if (apikey && model) {
        await setKeyModel(apikey, model);
      }
      setSubmitMessage({ state: 'success', message: 'API Key saved successfully!' });

      // Redirect to the content page after saving
      setTimeout(() => {
        navigate('/content/content'); // This will take the user to /content page
      }, 1500); // Wait for a short delay before navigating
      
    } catch (error: any) {
      setSubmitMessage({ state: 'error', message: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
      style={{ padding: 16, maxWidth: 400, background: '#fff', borderRadius: 12 }}
    >
      {isLoaded ? (
        <Box>
          <Typography variant="h4" align="center" gutterBottom>
            SummerAIze
          </Typography>
          <Typography variant="subtitle1" align="center" color="textSecondary">
            Your personal web ai!
          </Typography>

          <motion.form
            onSubmit={handleSave}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <Box display="flex" flexDirection="column" gap={2} mt={4}>
              {/* Model Selection */}
              <FormControl fullWidth>
                <InputLabel id="model-select-label">Select Model</InputLabel>
                <Select
                  labelId="model-select-label"
                  value={model || ''}
                  onChange={(e) => handleModelChange(e.target.value as ValidModel)}
                >
                  {VALID_MODELS.map((modelOption) => (
                    <MenuItem key={modelOption.name} value={modelOption.name}>
                      {modelOption.display}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* API Key Input */}
              <TextField
                type="password"
                label={`API Key ${model ? `for ${model}` : ''}`}
                value={apikey || ''}
                onChange={(e) => setApikey(e.target.value)}
                fullWidth
                required
                disabled={!model}
              />

              {/* Save Button */}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isLoading || !model || !apikey}
                fullWidth
              >
                {isLoading ? <CircularProgress size={24} /> : 'Save API Key'}
              </Button>
            </Box>
          </motion.form>

          {/* Snackbar Feedback */}
          {submitMessage && (
            <Snackbar
              open={!!submitMessage}
              autoHideDuration={4000}
              onClose={() => setSubmitMessage(null)}
            >
              <MuiAlert
                elevation={6}
                variant="filled"
                severity={submitMessage.state}
                onClose={() => setSubmitMessage(null)}
              >
                {submitMessage.message}
              </MuiAlert>
            </Snackbar>
          )}
        </Box>
      ) : (
        <Box display="flex" justifyContent="center" alignItems="center" height={200}>
          <CircularProgress />
        </Box>
      )}
    </motion.div>
  );
};

export default Popup;