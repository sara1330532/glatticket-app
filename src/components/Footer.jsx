import React from 'react';


import { Box, Typography, Container, Grid, Link, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';

// ======================================================
// Footer Component
// This component displays the site's footer, including branding,
// contact information, social media links, and legal/policy notices.
// ======================================================

const Footer = () => {
    return (
        <Box sx={{ backgroundColor: 'white', py: 6, direction: 'rtl' }}>
            <Box sx={{ borderTop: '1px solid black', width: '100%', mb: 4 }} />
            <Container>
                <Grid container spacing={4} justifyContent="space-between" alignItems="center">
                    {/* לוגו */}
                    <Grid item xs={12} md={3} display="flex" justifyContent={{ xs: 'center', md: 'flex-end' }}>
                        <img
                            src="https://home.glatticket.co.il/_next/image?url=https%3A%2F%2Fstatic.tickchak.co.il%2Fall%2FHubImage_follow_1738150710A90zZMBnaVZ0UKd2L5UVQvNnaE5UYZpGa_IjWK3v5u8NzibU6vgouWR.webp&w=3840&q=75"
                            alt="לוגו גלאַטיקט"
                            style={{ maxWidth: 180 }}
                        />
                    </Grid>
                    <Grid item xs={12} md={6} textAlign="center">
                        <Typography variant="h6" fontWeight="bold">
                            גלאַטיקט – תרבות כהלכה
                        </Typography>
                        <Typography variant="body1">
                            <Link href="mailto:info@tickchak.co.il" underline="hover" color="inherit">
                                info@tickchak.co.il
                            </Link>
                        </Typography>
                        <Typography variant="body1" sx={{ mt: 1 }}>
                            <b>*6565</b>
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={3} display="flex" justifyContent={{ xs: 'center', md: 'flex-start' }}>
                        <img
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAA21BMVEVHcEw9c4QdEQ9xo7BWk6cdKDArSVQYCAgZAAAPAABHiJ8rg6YgVW0xWmkgO00eRVclAABGc4EAAAAuU2BTiJdonKgnfaNYgYsca48Wc5Nlzewfd5XS7/3W8/9gxuQmruVJkqnT8f8bp952zOLa9/971OwCoNQhlcIdos4roNEPeJ2KpLA9k7EiW3JRp8IpiLFNv+YInMmbr7ixxc/A2ONov9g3tedEuOcksu0+stp3i5JokJ9cnrKI1eZFq89Vweozf5tRtNd0gog3Z3xoy+wNk74eRVXJ5PFYeYUpCZ3qAAAAHHRSTlMAplH9/mhyMiQR+vurkI+qQcMK6Mza2NjL5p3pyw9KngAAAVlJREFUKJF10tl2gjAQAFAQEIS6252EsAmybwqoddf2/7+oUXtOoaHzmJtJJpOhqJ/ghwL1b0xMC0nvE5rrNCBrxlCxTVsL2iQOzX0ZTaNSMxGJwhcjMm7iOnOWI5B2DXCLpflAIgvka6ip3iWwvQYykFW8Y90isLUC2SFLD59gxRPYSXCSqsoySMhqO+79ThksG/Bo3NHwG9DJDKCqwEid6jJ3LYDnY2/lplmy9DTht6LRI4N7LfgSQpEVLgLkHatvaV8/oh8WhRLutKKw+tVzaQqf82oj6cKGa1a0nqr4zLy0KUeD5eWkQFOfhrVKR8OecFagJ24VqOtTq/bfHKQGsQIRm99wVhuY7g23iF0s4Mf8D/LBG75zhlCO0VakentaIs3tfB9tcx0nDoj2jXfn2NvnOJEcBN6HirYJorlGGq7YhlGwOc16DYb7Z23G5b7ZcO95qlsf6G+9FCuIJE4LsAAAAABJRU5ErkJggg=="
                            alt="דמות טיפוסית"
                            style={{ maxHeight: 100 }}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={2} justifyContent="center" sx={{ mt: 3 }}>
                    <Grid item>
                        <IconButton
                            component="a"
                            href="https://www.facebook.com/"
                            target="_blank"
                            aria-label="Facebook"
                        >
                            <FacebookIcon />
                        </IconButton>
                    </Grid>
                    <Grid item>
                        <IconButton
                            component="a"
                            href="https://www.instagram.com/"
                            target="_blank"
                            aria-label="Instagram"
                        >
                            <InstagramIcon />
                        </IconButton>
                    </Grid>
                    <Grid item>
                        <IconButton
                            component="a"
                            href="https://twitter.com/"
                            target="_blank"
                            aria-label="Twitter"
                        >
                            <TwitterIcon />
                        </IconButton>
                    </Grid>
                </Grid>

                <Box mt={4} textAlign="center">
                    <Typography variant="body2" color="textSecondary">
                        מופעל ע"י טיקצ'אק 2025 © כל הזכויות שמורות לטיקצ'אק
                    </Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                        השימוש באתר מהווה הסכמה
                        {' '}
                        <Link href="#" color="primary" underline="always">
                            למדיניות הפרטיות
                        </Link>
                        {' '} באתר מוצגים הופעות ואירועים הנערכים באחריות המארגנים בלבד.
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;
