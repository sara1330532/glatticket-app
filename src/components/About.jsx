import React from 'react';
import {
  Box, Typography, Button, Container, Grid, Link
} from '@mui/material';
import { useState } from 'react';

// ======================================================
// About Page Component
// This page provides detailed information about the ticket booking site.
// It includes a description of the platform, its benefits, and contact details.
// ======================================================

const About = () => {

  const [showMore, setShowMore] = useState(false);

  // ---------------- Function to toggle additional information display ----------------
    const handleToggle = () => {
    setShowMore(!showMore);
  };

  return (
    <Box id="about" sx={{ backgroundColor: 'white', py: 6, direction: 'rtl' }}>
      <Box sx={{ borderTop: '1px solid black', width: '100%', mb: 4 }} />
      <Container>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box sx={{ textAlign: 'right' }}>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                גלאַטיקט תרבות ברוח ההלכה
              </Typography>

              <Typography variant="body1" gutterBottom>
                <Link
                  href="https://glatticket.co.il"
                  target="_blank"
                  underline="always"
                  color="primary"
                  sx={{ fontWeight: 'bold' }}
                >
                  <b>glatticket.co.il</b>
                </Link>{' '}
                <b>–פלטפורמת הכרטיסים המושלמת לציבור החרדי</b>
              </Typography>

              <Typography variant="body1" gutterBottom>
                <br />
                האתר המקצועי והמהימן להזמנת כרטיסים לאירועים חרדיים מכל הסוגים:
                מבית מדרש ועד הופעה, מכנס חורף ועד מופע מוזיקה – <b>glattticket</b> מספק לכם את
                הכרטיסים בקלות, בנוחות ובאמינות המלאה.
              </Typography>

              <Typography variant="body1" fontWeight="bold" gutterBottom>
                <br /><b>למה דווקא אנחנו?</b>
              </Typography>
              <Typography variant="body1" gutterBottom>
                הזמנה פשוטה וברורה בכמה קליקים – עם מגוון <b>רחב</b> של אירועים: שמחות, הילולות, כנסים, הופעות וועידות וכו'.
                <br />
                מחירים אטרקטיביים וללא עמלות מיותרות,
                <br />
                תמיכה בכל אמצעי התשלום: מזומן, כרטיסי אשראי מאושרים, שירות לקוחות חם ומסור.
              </Typography>

              <Typography variant="body1" gutterBottom mt={2}>
                <br />
                זמינים בימים א׳-ה׳, בשעות 09:00–17:00
                <br />
                ליצירת קשר עם המוקד שלנו: בטלפון 6565* שלוחה 2
              </Typography>
              {showMore && (
                <Typography variant="h6" fontWeight="bold" color="black" sx={{ mt: 3 }}>
                  !glatticket - הכרטיס שלכם לחוויה מושלמת
                </Typography>
              )}

              <Box mt={3}>
                <Button
                  variant="body1"
                  onClick={handleToggle}
                  sx={{
                    backgroundColor: '#FFD600',
                    color: 'black',
                    fontWeight: 'bold',
                    borderRadius: 99,
                    px: 4,
                    '&:hover': {
                      backgroundColor: '#FFC400',
                    },
                  }}
                >
                  {showMore ? 'לסגירה' : 'קרא עוד'}
                </Button>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6} display="flex" justifyContent="center" md-justifyContent="flex-start">
            <img
              src="https://static.tickchak.co.il/all/HubImage_about_1738150754l90TUlZDU0syQmdWd0NkMiNzUTB3as9Cc_ypCmJlPKB4dGHr1HhZAT-.webp"
              alt="לוגו גלאַטיקט"
              style={{ maxWidth: 250 }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default About;
