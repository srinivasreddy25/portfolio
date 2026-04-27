import React, { useState, useEffect, useRef } from 'react';
import { Box, Container, Typography, Button, TextField, Alert } from '@mui/material';
import { motion } from 'framer-motion';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import emailjs from '@emailjs/browser';

// Custom Snapchat icon component
const SnapchatIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    fill="currentColor"
  >
    <path d="M12 2.5c-5.5 0-10 4.5-10 10 0 5.5 4.5 10 10 10 5.5 0 10-4.5 10-10 0-5.5-4.5-10-10-10zm0 18.5c-4.7 0-8.5-3.8-8.5-8.5S7.3 3.5 12 3.5s8.5 3.8 8.5 8.5-3.8 8.5-8.5 8.5zm-2.5-6.5c-.3 0-.5-.2-.5-.5v-1.5c0-.3.2-.5.5-.5s.5.2.5.5v1.5c0 .3-.2.5-.5.5zm5 0c-.3 0-.5-.2-.5-.5v-1.5c0-.3.2-.5.5-.5s.5.2.5.5v1.5c0 .3-.2.5-.5.5zm-2.5-2.5c-.3 0-.5-.2-.5-.5v-1.5c0-.3.2-.5.5-.5s.5.2.5.5v1.5c0 .3-.2.5-.5.5z" />
  </svg>
);

const Contact = () => {
  const form = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    emailjs.init('AYnvBenPlxPLMITTW');
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    // Map the form field names to our state keys
    const stateKey = name === 'from_name' ? 'name' : 
                    name === 'from_email' ? 'email' : 
                    'message';
    setFormData(prev => ({
      ...prev,
      [stateKey]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: null, message: '' });

    try {
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_email: 'srinivas.yeruva01@gmail.com'
      };

      console.log('Attempting to send email with:', {
        serviceId: 'service_u4mt98r',
        templateId: 'template_kf5bbnr',
        templateParams
      });

      const response = await emailjs.send(
        'service_u4mt98r',
        'template_kf5bbnr',
        templateParams,
        'AYnvBenPlxPLMITTW'
      );

      console.log('EmailJS response:', response);

      if (response.status === 200) {
        setStatus({
          type: 'success',
          message: 'Message sent successfully! I will get back to you soon.'
        });
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error(`Failed to send message. Status: ${response.status}`);
      }
    } catch (error) {
      console.error('Email sending error:', error);
      let errorMessage = 'Failed to send message. ';
      
      if (error instanceof Error) {
        if (error.message.includes('Invalid template ID')) {
          errorMessage += 'Template ID is invalid. Please check the template ID in your EmailJS dashboard.';
        } else if (error.message.includes('Invalid service ID')) {
          errorMessage += 'Service ID is invalid. Please check the service ID in your EmailJS dashboard.';
        } else if (error.message.includes('Invalid public key')) {
          errorMessage += 'Public key is invalid. Please check your public key.';
        } else {
          errorMessage += error.message;
        }
      }
      
      errorMessage += ' Please try again later or contact me directly at srinivas.yeruva01@gmail.com';
      
      setStatus({
        type: 'error',
        message: errorMessage
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box
      id="contact"
      sx={{
        py: 8,
        backgroundColor: 'background.paper',
      }}
    >
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Typography
            variant="h2"
            component="h2"
            sx={{
              mb: 4,
              textAlign: 'center',
              color: 'text.primary',
            }}
          >
            Get in Touch
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
            <Box
              ref={form}
              component="form"
              onSubmit={handleSubmit}
              sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                p: 3,
                borderRadius: 2,
                backgroundColor: 'background.default',
              }}
            >
              <Typography variant="h5" sx={{ mb: 2 }}>
                Send Me a Message
              </Typography>
              <Typography variant="body1" sx={{ mb: 2, color: 'text.secondary' }}>
                Have an opportunity or just want to say hello? I'd love to hear from you! Messages will be sent to srinivas.yeruva01@gmail.com
              </Typography>
              
              {status.type && (
                <Alert severity={status.type} sx={{ mb: 2 }}>
                  {status.message}
                </Alert>
              )}

              <TextField
                label="Name"
                name="from_name"
                value={formData.name}
                onChange={handleChange}
                required
                fullWidth
                disabled={isSubmitting}
              />
              <TextField
                label="Email"
                name="from_email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                fullWidth
                disabled={isSubmitting}
              />
              <TextField
                label="Message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                multiline
                rows={4}
                fullWidth
                disabled={isSubmitting}
              />
              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={isSubmitting}
                sx={{
                  background: 'linear-gradient(45deg, #2196f3 30%, #21CBF3 90%)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #1976d2 30%, #1E88E5 90%)',
                  },
                }}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </Box>
            <Box
              sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 3,
              }}
            >
              <Typography variant="h5" sx={{ mb: 2 }}>
                Connect With Me
              </Typography>
              <Typography variant="body1" sx={{ mb: 2, color: 'text.secondary' }}>
                Feel free to connect with me or just say hello!
              </Typography>
              <Button
                variant="contained"
                size="large"
                startIcon={<LinkedInIcon />}
                href="https://www.linkedin.com/in/srinivas-reddy-yeruva-aa2b7718b/"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  width: '100%',
                  maxWidth: '300px',
                  background: 'linear-gradient(45deg, #2196f3 30%, #21CBF3 90%)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #1976d2 30%, #1E88E5 90%)',
                  },
                }}
              >
                LinkedIn
              </Button>
              <Button
                variant="contained"
                size="large"
                startIcon={<GitHubIcon />}
                href="https://github.com/srinu-1"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  width: '100%',
                  maxWidth: '300px',
                  background: 'linear-gradient(45deg, #2196f3 30%, #21CBF3 90%)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #1976d2 30%, #1E88E5 90%)',
                  },
                }}
              >
                GitHub
              </Button>
              <Button
                variant="contained"
                size="large"
                startIcon={<TwitterIcon />}
                href="https://x.com/sri__nivasreddy"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  width: '100%',
                  maxWidth: '300px',
                  background: 'linear-gradient(45deg, #2196f3 30%, #21CBF3 90%)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #1976d2 30%, #1E88E5 90%)',
                  },
                }}
              >
                Twitter
              </Button>
              <Button
                variant="contained"
                size="large"
                startIcon={<EmailIcon />}
                href="mailto:srinivas.yeruva01@gmail.com"
                sx={{
                  width: '100%',
                  maxWidth: '300px',
                  background: 'linear-gradient(45deg, #2196f3 30%, #21CBF3 90%)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #1976d2 30%, #1E88E5 90%)',
                  },
                }}
              >
                Email
              </Button>
              <Button
                variant="contained"
                size="large"
                startIcon={<SnapchatIcon />}
                href="https://www.snapchat.com/add/srinusr_25?share_id=oca6xPPbXYY&locale=en-IN"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  width: '100%',
                  maxWidth: '300px',
                  background: 'linear-gradient(45deg, #2196f3 30%, #21CBF3 90%)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #1976d2 30%, #1E88E5 90%)',
                  },
                }}
              >
                Snapchat
              </Button>
              <Button
                variant="contained"
                size="large"
                startIcon={<PhoneIcon />}
                href="tel:+918978383041"
                sx={{
                  width: '100%',
                  maxWidth: '300px',
                  background: 'linear-gradient(45deg, #2196f3 30%, #21CBF3 90%)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #1976d2 30%, #1E88E5 90%)',
                  },
                }}
              >
                +91 8978383041
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              mt: 6,
              textAlign: 'center',
              color: 'text.secondary',
            }}
          >
            <Typography variant="body1">
              Made with ❤️ Srinivas Reddy
            </Typography>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Contact; 