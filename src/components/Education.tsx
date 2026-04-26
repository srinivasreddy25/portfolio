import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import { motion } from 'framer-motion';

const education = [
  {
    institution: 'MLR Institute of Technology',
    degree: 'B.Tech — Mechanical Engineering',
    year: 'Jun 2019 — May 2023',
    gpa: 'GPA: 7.4',
    icon: '🎓',
  },
  {
    institution: 'Narayana Junior College',
    degree: 'PCM — Physics, Chemistry, Mathematics',
    year: 'Jun 2017 — May 2019',
    gpa: '',
    icon: '📚',
  },
  {
    institution: 'Matrusri High School',
    degree: 'SSC — Secondary School Certificate',
    year: 'Jun 2016 — Apr 2017',
    gpa: '',
    icon: '🏫',
  },
];

const certifications = [
  { name: 'AWS Cloud Solutions Architect', icon: '☁️', color: '#ff9900' },
  { name: 'Microsoft Azure Administrator', icon: '🔷', color: '#0078d4' },
  { name: 'SQL Course Completion', icon: '🗄️', color: '#00e676' },
  { name: 'Docker Containerization', icon: '🐳', color: '#21CBF3' },
  { name: 'Demystifying Networking (NPTEL)', icon: '🌐', color: '#7c4dff' },
  { name: 'Kubernetes Administration (CKA-Aligned)', icon: '⚙️', color: '#2196f3' },
];

const Education = () => {
  return (
    <Box id="education" sx={{ py: 12, position: 'relative', zIndex: 1 }}>
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <Typography variant="h2" sx={{
            mb: 1, textAlign: 'center', fontWeight: 800,
            background: 'linear-gradient(135deg, #2196f3 0%, #21CBF3 50%, #7c4dff 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>
            Education & Certifications
          </Typography>
          <Box sx={{ width: 60, height: 4, background: 'linear-gradient(90deg,#2196f3,#7c4dff)', borderRadius: 2, mx: 'auto', mb: 8 }} />
        </motion.div>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 6 }}>
          {/* Education Timeline */}
          <Box>
            <Typography sx={{ color: '#21CBF3', fontWeight: 700, letterSpacing: 2, fontSize: '0.8rem', mb: 4 }}>
              🎓 EDUCATION
            </Typography>
            {education.map((edu, i) => (
              <motion.div
                key={edu.institution}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
              >
                <Box sx={{ display: 'flex', gap: 2, mb: 4, position: 'relative' }}>
                  {/* Timeline line */}
                  {i < education.length - 1 && (
                    <Box sx={{
                      position: 'absolute', left: 19, top: 44, width: 2, height: 'calc(100% - 8px)',
                      background: 'linear-gradient(180deg,rgba(33,150,243,0.4),transparent)',
                    }} />
                  )}
                  {/* Icon */}
                  <Box sx={{
                    width: 40, height: 40, borderRadius: '50%', flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'rgba(33,150,243,0.15)',
                    border: '2px solid rgba(33,150,243,0.4)',
                    fontSize: '1.1rem',
                  }}>
                    {edu.icon}
                  </Box>
                  <Box sx={{
                    p: 2.5, borderRadius: 3, flex: 1,
                    background: 'rgba(33,150,243,0.05)',
                    border: '1px solid rgba(33,150,243,0.15)',
                    backdropFilter: 'blur(10px)',
                    transition: 'box-shadow 0.3s',
                    '&:hover': { boxShadow: '0 0 20px rgba(33,150,243,0.2)' },
                  }}>
                    <Typography sx={{ color: '#21CBF3', fontWeight: 700, fontSize: '0.95rem' }}>
                      {edu.institution}
                    </Typography>
                    <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', mt: 0.5 }}>
                      {edu.degree}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                      <Typography sx={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.75rem' }}>
                        📅 {edu.year}
                      </Typography>
                      {edu.gpa && (
                        <Typography sx={{ color: '#7c4dff', fontSize: '0.75rem', fontWeight: 600 }}>
                          {edu.gpa}
                        </Typography>
                      )}
                    </Box>
                  </Box>
                </Box>
              </motion.div>
            ))}
          </Box>

          {/* Certifications */}
          <Box>
            <Typography sx={{ color: '#7c4dff', fontWeight: 700, letterSpacing: 2, fontSize: '0.8rem', mb: 4 }}>
              🏆 CERTIFICATIONS
            </Typography>
            {certifications.map((cert, i) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ x: 6, scale: 1.02 }}
              >
                <Box sx={{
                  display: 'flex', alignItems: 'center', gap: 2, mb: 2, p: 2, borderRadius: 3,
                  background: `${cert.color}0d`,
                  border: `1px solid ${cert.color}33`,
                  backdropFilter: 'blur(10px)',
                  cursor: 'default',
                  transition: 'box-shadow 0.3s',
                  '&:hover': { boxShadow: `0 0 20px ${cert.color}33` },
                }}>
                  <Box sx={{
                    width: 36, height: 36, borderRadius: 2, flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: `${cert.color}22`,
                    border: `1px solid ${cert.color}44`,
                    fontSize: '1rem',
                  }}>
                    {cert.icon}
                  </Box>
                  <Typography sx={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem', fontWeight: 500 }}>
                    {cert.name}
                  </Typography>
                  <Box sx={{ ml: 'auto', width: 8, height: 8, borderRadius: '50%', background: cert.color, flexShrink: 0 }} />
                </Box>
              </motion.div>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Education;