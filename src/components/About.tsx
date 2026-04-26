import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import { motion } from 'framer-motion';

const stats = [
  { value: '2.4+', label: 'Years Experience' },
  { value: '3+', label: 'Cloud Platforms' },
  { value: '10+', label: 'Tools Mastered' },
  { value: '100%', label: 'SLA Focus' },
];

const About = () => {
  return (
    <Box id="about" sx={{ py: 12, position: 'relative', zIndex: 1 }}>
      <Container maxWidth="lg">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <Typography
            variant="h2"
            sx={{
              mb: 1, textAlign: 'center', fontWeight: 800,
              background: 'linear-gradient(135deg, #2196f3 0%, #21CBF3 50%, #7c4dff 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}
          >
            About Me
          </Typography>
          <Box sx={{ width: 60, height: 4, background: 'linear-gradient(90deg,#2196f3,#7c4dff)', borderRadius: 2, mx: 'auto', mb: 8 }} />
        </motion.div>

        {/* Stats Row */}
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 3, mb: 10, '@media(max-width:600px)': { gridTemplateColumns: 'repeat(2,1fr)' } }}>
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, scale: 0.7 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6, scale: 1.05 }}
            >
              <Box sx={{
                p: 3, borderRadius: 3, textAlign: 'center',
                background: 'rgba(33,150,243,0.07)',
                border: '1px solid rgba(33,150,243,0.2)',
                backdropFilter: 'blur(12px)',
                transition: 'box-shadow 0.3s',
                '&:hover': { boxShadow: '0 0 30px rgba(33,150,243,0.3)' },
              }}>
                <Typography sx={{ fontSize: '2.2rem', fontWeight: 900, background: 'linear-gradient(135deg,#2196f3,#7c4dff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  {s.value}
                </Typography>
                <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', fontWeight: 500, mt: 0.5 }}>
                  {s.label}
                </Typography>
              </Box>
            </motion.div>
          ))}
        </Box>

        {/* Content */}
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 6 }}>
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <Typography sx={{ fontSize: '1.1rem', lineHeight: 1.9, color: 'rgba(255,255,255,0.65)', mb: 3 }}>
              I'm <strong style={{ color: '#21CBF3' }}>Srinivas Reddy Yeruva</strong>, a DevOps Engineer with 2.4+ years of hands-on experience operating production Kubernetes, AWS, and Azure environments.
            </Typography>
            <Typography sx={{ fontSize: '1.1rem', lineHeight: 1.9, color: 'rgba(255,255,255,0.65)' }}>
              Despite holding a B.Tech in Mechanical Engineering from MLR Institute of Technology, I pivoted fully into cloud-native DevOps — building CI/CD pipelines, managing EKS clusters, and driving SRE practices that reduced incident detection time by <strong style={{ color: '#7c4dff' }}>70%</strong>.
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <Box sx={{
              p: 3, borderRadius: 3,
              background: 'rgba(124,77,255,0.07)',
              border: '1px solid rgba(124,77,255,0.2)',
              backdropFilter: 'blur(12px)',
            }}>
              <Typography sx={{ color: '#7c4dff', fontWeight: 700, mb: 2, fontSize: '1rem', letterSpacing: 1 }}>
                ⚡ CORE COMPETENCIES
              </Typography>
              {[
                '☁️ Multi-Cloud (AWS & Azure) Infrastructure',
                '🐳 Docker & Kubernetes Orchestration',
                '🔁 CI/CD with Azure DevOps & GitHub Actions',
                '📊 Observability: Prometheus, Grafana, Loki',
                '🏗️ Infrastructure as Code with Terraform',
                '🛡️ SRE, Incident Management & RCA',
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Typography sx={{ color: 'rgba(255,255,255,0.7)', py: 0.8, fontSize: '0.95rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    {item}
                  </Typography>
                </motion.div>
              ))}
            </Box>
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
};

export default About;