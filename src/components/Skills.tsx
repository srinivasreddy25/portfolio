import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import { motion } from 'framer-motion';

const skillGroups = [
  { icon: '☁️', name: 'Cloud', color: '#2196f3', items: ['AWS', 'Azure'] },
  { icon: '🐳', name: 'Containers & Orchestration', color: '#21CBF3', items: ['Docker', 'Kubernetes', 'Openshift', 'Helm'] },
  { icon: '🔁', name: 'CI/CD', color: '#7c4dff', items: ['GitHub Actions', 'Azure DevOps'] },
  { icon: '🏗️', name: 'IaC', color: '#e040fb', items: ['Terraform', 'Crossplane'] },
  { icon: '📊', name: 'Monitoring & Observability', color: '#00e676', items: ['Prometheus', 'Grafana', 'Loki', 'Splunk', 'Fluentd', 'Pyroscope'] },
  { icon: '🗄️', name: 'Database', color: '#ffea00', items: ['SQL', 'MongoDB'] },
  { icon: '🖥️', name: 'Infrastructure', color: '#ff6d00', items: ['On-Prem DC', 'VMs', 'NFS Storage'] },
  { icon: '🌐', name: 'Web & Scripting', color: '#ff4081', items: ['HTML', 'CSS', 'React', 'Shell Scripting'] },
  { icon: '💻', name: 'Operating Systems', color: '#69f0ae', items: ['Linux', 'Windows', 'MacOS'] },
];

const Skills = () => {
  return (
    <Box id="skills" sx={{ py: 12, position: 'relative', zIndex: 1 }}>
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
            Technical Skills
          </Typography>
          <Box sx={{ width: 60, height: 4, background: 'linear-gradient(90deg,#2196f3,#7c4dff)', borderRadius: 2, mx: 'auto', mb: 8 }} />
        </motion.div>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' }, gap: 3 }}>
          {skillGroups.map((group, gi) => (
            <motion.div
              key={group.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: gi * 0.08 }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <Box sx={{
                p: 3, borderRadius: 3, height: '100%',
                background: 'rgba(255,255,255,0.03)',
                border: `1px solid ${group.color}33`,
                backdropFilter: 'blur(12px)',
                transition: 'box-shadow 0.3s',
                '&:hover': { boxShadow: `0 0 30px ${group.color}33` },
              }}>
                <Typography sx={{ fontSize: '1.5rem', mb: 1 }}>{group.icon}</Typography>
                <Typography sx={{ fontWeight: 700, color: group.color, mb: 2, fontSize: '0.9rem', letterSpacing: 0.5 }}>
                  {group.name}
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.8 }}>
                  {group.items.map((item, ii) => (
                    <motion.span
                      key={item}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: gi * 0.08 + ii * 0.05 }}
                      whileHover={{ scale: 1.1 }}
                      style={{
                        display: 'inline-block',
                        padding: '4px 12px',
                        borderRadius: 20,
                        background: `${group.color}18`,
                        border: `1px solid ${group.color}44`,
                        color: group.color,
                        fontSize: '0.78rem',
                        fontWeight: 600,
                        cursor: 'default',
                      }}
                    >
                      {item}
                    </motion.span>
                  ))}
                </Box>
              </Box>
            </motion.div>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Skills;