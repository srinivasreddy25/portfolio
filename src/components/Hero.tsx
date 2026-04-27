import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Button, Chip } from '@mui/material';
import { motion } from 'framer-motion';

const roles = [
  'DevOps Engineer',
  'Kubernetes Expert',
  'Cloud Architect',
  'SRE Practitioner',
  'CI/CD Specialist',
];

const Hero = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const role = roles[roleIndex];
    if (!deleting && displayed.length < role.length) {
      const t = setTimeout(() => setDisplayed(role.slice(0, displayed.length + 1)), 80);
      return () => clearTimeout(t);
    } else if (!deleting && displayed.length === role.length) {
      const t = setTimeout(() => setDeleting(true), 1800);
      return () => clearTimeout(t);
    } else if (deleting && displayed.length > 0) {
      const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
      return () => clearTimeout(t);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setRoleIndex((i) => (i + 1) % roles.length);
    }
  }, [displayed, deleting, roleIndex]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
  };

  const badges = ['AWS', 'Azure', 'Kubernetes', 'Terraform', 'Docker', 'Prometheus'];

  return (
    <Box
      id="home"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        zIndex: 1,
      }}
    >
      <Container maxWidth="lg">
        <motion.div variants={containerVariants} initial="hidden" animate="visible">
          {/* Name */}
          <motion.div variants={itemVariants}>
            <Typography
              variant="h1"
              sx={{
                textAlign: 'center',
                fontSize: { xs: '2.5rem', sm: '3.5rem', md: '5rem' },
                fontWeight: 800,
                background: 'linear-gradient(135deg, #2196f3 0%, #21CBF3 40%, #7c4dff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '-1px',
                mb: 1,
              }}
            >
              Srinivas Reddy
            </Typography>
          </motion.div>

          {/* Typewriter */}
          <motion.div variants={itemVariants}>
            <Typography
              variant="h3"
              sx={{
                textAlign: 'center',
                fontSize: { xs: '1.4rem', sm: '2rem', md: '2.4rem' },
                fontWeight: 600,
                color: '#e0e0e0',
                mb: 3,
                minHeight: '3rem',
              }}
            >
              <span style={{ color: '#21CBF3' }}>{displayed}</span>
              <span
                style={{
                  display: 'inline-block',
                  width: 3,
                  height: '1.2em',
                  background: '#2196f3',
                  marginLeft: 4,
                  verticalAlign: 'middle',
                  animation: 'blink 1s step-end infinite',
                }}
              />
            </Typography>
          </motion.div>

          {/* Summary */}
          <motion.div variants={itemVariants}>
            <Typography
              sx={{
                textAlign: 'center',
                color: 'rgba(255,255,255,0.6)',
                fontSize: { xs: '0.95rem', md: '1.1rem' },
                maxWidth: 640,
                mx: 'auto',
                mb: 4,
                lineHeight: 1.8,
              }}
            >
              2.4+ years delivering robust cloud infrastructure, Kubernetes orchestration,
              and CI/CD automation across AWS &amp; Azure production environments.
            </Typography>
          </motion.div>

          {/* Badges */}
          <motion.div variants={itemVariants}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 1, mb: 5 }}>
              {badges.map((b, i) => (
                <motion.div
                  key={b}
                  whileHover={{ scale: 1.15, y: -4 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + i * 0.1 }}
                >
                  <Chip
                    label={b}
                    sx={{
                      background: 'rgba(33,150,243,0.15)',
                      border: '1px solid rgba(33,150,243,0.4)',
                      color: '#21CBF3',
                      fontWeight: 600,
                      fontSize: '0.8rem',
                      backdropFilter: 'blur(10px)',
                      cursor: 'default',
                      '&:hover': { background: 'rgba(33,150,243,0.3)' },
                    }}
                  />
                </motion.div>
              ))}
            </Box>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants}>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
              <motion.div whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.96 }}>
                <Button
                  variant="contained"
                  size="large"
                  href="#contact"
                  sx={{
                    background: 'linear-gradient(135deg, #2196f3 0%, #7c4dff 100%)',
                    px: 4, py: 1.5, borderRadius: 3,
                    fontWeight: 700, fontSize: '1rem',
                    boxShadow: '0 0 30px rgba(33,150,243,0.4)',
                    '&:hover': { boxShadow: '0 0 50px rgba(33,150,243,0.7)' },
                  }}
                >
                  Contact Me
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.96 }}>
                <Button
                  variant="outlined"
                  size="large"
                  href="#projects"
                  sx={{
                    borderColor: 'rgba(33,203,243,0.6)',
                    color: '#21CBF3',
                    px: 4, py: 1.5, borderRadius: 3,
                    fontWeight: 700, fontSize: '1rem',
                    backdropFilter: 'blur(10px)',
                    background: 'rgba(33,203,243,0.05)',
                    '&:hover': {
                      borderColor: '#21CBF3',
                      background: 'rgba(33,203,243,0.12)',
                      boxShadow: '0 0 30px rgba(33,203,243,0.3)',
                    },
                  }}
                >
                  View Work
                </Button>
              </motion.div>
            </Box>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            variants={itemVariants}
            style={{ textAlign: 'center', marginTop: 64 }}
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              style={{ display: 'inline-block' }}
            >
              <Typography sx={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.8rem', letterSpacing: 3 }}>
                SCROLL DOWN ↓
              </Typography>
            </motion.div>
          </motion.div>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Hero;