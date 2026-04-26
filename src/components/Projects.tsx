import React, { useState } from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';

const allProjects = [
  {
    title: 'K8s Pod Restart Monitoring + Teams Alerts',
    description: 'Proactive cluster monitoring with Helm, RBAC service accounts, and Microsoft Teams webhook for CrashLoopBackoff alerts.',
    icon: '🔔',
    color: '#2196f3',
    technologies: ['Kubernetes', 'Helm', 'RBAC', 'Microsoft Teams', 'Prometheus'],
    github: 'https://github.com/srinu-1',
    tag: 'SRE',
  },
  {
    title: 'Continuous Profiling with Pyroscope (Node.js)',
    description: 'CPU profiling PoC for Node.js using Pyroscope flamegraphs — the 4th pillar of observability.',
    icon: '🔥',
    color: '#ff6d00',
    technologies: ['Pyroscope', 'Node.js', 'Flamegraph', 'Observability'],
    github: 'https://github.com/srinu-1',
    tag: 'Observability',
  },
  {
    title: 'CI/CD to Azure Web App via Azure DevOps',
    description: 'Full CI/CD automation with separate build/release pipelines, Azure Artifacts, and multi-env deployments.',
    icon: '⚙️',
    color: '#7c4dff',
    technologies: ['Azure DevOps', 'Azure Web Apps', 'React', 'Flask', 'Artifacts'],
    github: 'https://github.com/srinu-1',
    tag: 'CI/CD',
  },
  {
    title: 'Prometheus + Grafana + Loki Stack (PoC)',
    description: 'Full observability stack on Minikube with kube-prometheus-stack, Loki, Promtail and unified Grafana dashboards.',
    icon: '📊',
    color: '#00e676',
    technologies: ['Prometheus', 'Grafana', 'Loki', 'Promtail', 'Minikube', 'Helm'],
    github: 'https://github.com/srinu-1',
    tag: 'Monitoring',
  },
  {
    title: 'Dockerized FastAPI Application',
    description: 'FastAPI application containerized with Docker Compose, persistent volume storage and user data management.',
    icon: '🐳',
    color: '#21CBF3',
    technologies: ['FastAPI', 'Docker', 'Docker Compose', 'Python'],
    github: 'https://github.com/srinu-1/docker-fastapi-test',
    tag: 'Docker',
  },
  {
    title: 'Automated AWS Resources Monitoring',
    description: 'Shell script for AWS resource monitoring with automated alerts and utilization reports.',
    icon: '☁️',
    color: '#ffea00',
    technologies: ['AWS', 'Shell Scripting', 'Linux'],
    github: 'https://github.com/srinu-1/aws-resources-monitoring',
    tag: 'AWS',
  },
];

const tags = ['All', 'SRE', 'Observability', 'CI/CD', 'Monitoring', 'Docker', 'AWS'];

const Projects = () => {
  const [activeTag, setActiveTag] = useState('All');
  const filtered = activeTag === 'All' ? allProjects : allProjects.filter(p => p.tag === activeTag);

  return (
    <Box id="projects" sx={{ py: 12, position: 'relative', zIndex: 1 }}>
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
            Projects
          </Typography>
          <Box sx={{ width: 60, height: 4, background: 'linear-gradient(90deg,#2196f3,#7c4dff)', borderRadius: 2, mx: 'auto', mb: 5 }} />
        </motion.div>

        {/* Filter Tags */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 1.5, mb: 6 }}>
          {tags.map(tag => (
            <motion.div key={tag} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Box
                onClick={() => setActiveTag(tag)}
                sx={{
                  px: 2.5, py: 0.8, borderRadius: 3, cursor: 'pointer',
                  fontSize: '0.8rem', fontWeight: 600,
                  border: '1px solid',
                  borderColor: activeTag === tag ? '#2196f3' : 'rgba(255,255,255,0.15)',
                  background: activeTag === tag ? 'rgba(33,150,243,0.2)' : 'rgba(255,255,255,0.03)',
                  color: activeTag === tag ? '#21CBF3' : 'rgba(255,255,255,0.5)',
                  transition: 'all 0.3s',
                }}
              >
                {tag}
              </Box>
            </motion.div>
          ))}
        </Box>

        {/* Project Cards */}
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr', lg: '1fr 1fr 1fr' }, gap: 3 }}>
          {filtered.map((project, i) => (
            <motion.div
              key={project.title}
              layout
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
            >
              <Box sx={{
                p: 3, borderRadius: 3, height: '100%', display: 'flex', flexDirection: 'column',
                background: 'rgba(255,255,255,0.03)',
                border: `1px solid ${project.color}33`,
                backdropFilter: 'blur(12px)',
                transition: 'box-shadow 0.3s',
                '&:hover': { boxShadow: `0 0 40px ${project.color}33` },
              }}>
                <Typography sx={{ fontSize: '2rem', mb: 1.5 }}>{project.icon}</Typography>
                <Box sx={{
                  display: 'inline-block', px: 1.5, py: 0.3, borderRadius: 2, mb: 1.5,
                  background: `${project.color}22`, border: `1px solid ${project.color}44`,
                  color: project.color, fontSize: '0.7rem', fontWeight: 700, width: 'fit-content',
                }}>
                  {project.tag}
                </Box>
                <Typography sx={{ fontWeight: 700, fontSize: '1rem', color: '#fff', mb: 1.5, lineHeight: 1.4 }}>
                  {project.title}
                </Typography>
                <Typography sx={{ fontSize: '0.87rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, mb: 2, flexGrow: 1 }}>
                  {project.description}
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.7, mb: 2 }}>
                  {project.technologies.map(t => (
                    <Box key={t} sx={{
                      px: 1.2, py: 0.3, borderRadius: 2,
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      color: 'rgba(255,255,255,0.6)', fontSize: '0.7rem', fontWeight: 500,
                    }}>{t}</Box>
                  ))}
                </Box>
                <Button
                  href={project.github} target="_blank" rel="noopener noreferrer"
                  size="small"
                  sx={{
                    alignSelf: 'flex-start', borderRadius: 2, px: 2,
                    color: project.color, border: `1px solid ${project.color}55`,
                    '&:hover': { background: `${project.color}18`, boxShadow: `0 0 15px ${project.color}44` },
                  }}
                >
                  GitHub →
                </Button>
              </Box>
            </motion.div>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Projects;