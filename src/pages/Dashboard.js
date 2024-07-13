import { Box, Card, CardContent, Grid, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';

const DashboardContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.default,
  minHeight: '100vh',
}));

const StatCard = styled(Card)(({ theme }) => ({
  minWidth: 275,
  marginBottom: theme.spacing(3),
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
}));

const ActivityPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginTop: theme.spacing(4),
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.secondary.contrastText,
}));

const Dashboard = () => {
  return (
    <DashboardContainer>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Typography variant="body1" gutterBottom>
        Welcome to the MealMap Admin Panel!
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Users
              </Typography>
              <Typography variant="h5">
                7
              </Typography>
            </CardContent>
          </StatCard>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Restaurants
              </Typography>
              <Typography variant="h5">
                20
              </Typography>
            </CardContent>
          </StatCard>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Reviews
              </Typography>
              <Typography variant="h5">
                30
              </Typography>
            </CardContent>
          </StatCard>
        </Grid>
      </Grid>
      <ActivityPaper>
        <Typography variant="h6" gutterBottom>
          Latest Activity
        </Typography>
        <Typography variant="body2" color="inherit">
          User JohnDoe added a review for Restaurant XYZ.
        </Typography>
        <Typography variant="body2" color="inherit">
          Restaurant ABC was added by Admin.
        </Typography>
        <Typography variant="body2" color="inherit">
          User JaneDoe rated Restaurant PQR with 5 stars.
        </Typography>
      </ActivityPaper>
    </DashboardContainer>
  );
};

export default Dashboard;
