import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Drawer, List, ListItem, ListItemButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { motion } from 'framer-motion';

const navItems = ['Home', 'About', 'Skills', 'Projects', 'Education', 'Contact'];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('Home');
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          background: scrolled ? 'rgba(13,17,23,0.9)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(33,150,243,0.15)' : 'none',
          transition: 'all 0.4s ease',
          zIndex: 100,
        }}
      >
        <Toolbar sx={{ px: { xs: 2, md: 4 } }}>
          {/* Logo */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <Typography
              variant="h6"
              sx={{
                flexGrow: 1,
                fontWeight: 800,
                fontSize: '1.2rem',
                background: 'linear-gradient(135deg, #2196f3, #7c4dff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '-0.5px',
                mr: 4,
              }}
            >
              {'< SR />'}
            </Typography>
          </motion.div>

          <Box sx={{ flexGrow: 1 }} />

          {/* Desktop Nav */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 0.5 }}>
            {navItems.map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <Button
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setActive(item)}
                  sx={{
                    color: active === item ? '#21CBF3' : 'rgba(255,255,255,0.6)',
                    fontWeight: active === item ? 700 : 500,
                    fontSize: '0.85rem',
                    borderRadius: 2,
                    px: 1.8,
                    position: 'relative',
                    transition: 'color 0.3s',
                    '&:hover': { color: '#fff', background: 'rgba(255,255,255,0.06)' },
                    '&::after': active === item ? {
                      content: '""',
                      position: 'absolute',
                      bottom: 4,
                      left: '20%',
                      width: '60%',
                      height: 2,
                      background: 'linear-gradient(90deg,#2196f3,#7c4dff)',
                      borderRadius: 1,
                    } : {},
                  }}
                >
                  {item}
                </Button>
              </motion.div>
            ))}
          </Box>

          {/* Mobile menu icon */}
          <IconButton
            sx={{ display: { xs: 'flex', md: 'none' }, color: '#21CBF3' }}
            onClick={() => setDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}
        PaperProps={{ sx: { background: 'rgba(13,17,23,0.98)', backdropFilter: 'blur(20px)', width: 220, borderLeft: '1px solid rgba(33,150,243,0.2)' } }}
      >
        <List sx={{ mt: 4 }}>
          {navItems.map(item => (
            <ListItem key={item} disablePadding>
              <ListItemButton
                href={`#${item.toLowerCase()}`}
                onClick={() => { setActive(item); setDrawerOpen(false); }}
                sx={{ color: active === item ? '#21CBF3' : 'rgba(255,255,255,0.7)', fontWeight: active === item ? 700 : 400, py: 1.5 }}
              >
                {item}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default Navbar;