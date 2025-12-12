import React from 'react';
import {
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  LinearProgress,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Chip,
} from '@mui/material';
import {
  TrendingUpOutlined,
  PeopleOutlined,
  ShoppingCartOutlined,
  AttachMoneyOutlined,
  NotificationsOutlined,
} from '@mui/icons-material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const Dashboard = () => {
  // Mock data
  const stats = [
    {
      title: 'Total Revenue',
      value: '$45,231',
      change: '+20.1%',
      icon: <AttachMoneyOutlined />,
      color: '#4caf50',
    },
    {
      title: 'Total Users',
      value: '2,345',
      change: '+15.3%',
      icon: <PeopleOutlined />,
      color: '#2196f3',
    },
    {
      title: 'Total Orders',
      value: '1,234',
      change: '+8.2%',
      icon: <ShoppingCartOutlined />,
      color: '#ff9800',
    },
    {
      title: 'Growth Rate',
      value: '12.5%',
      change: '+2.1%',
      icon: <TrendingUpOutlined />,
      color: '#9c27b0',
    },
  ];

  const chartData = [
    { name: 'Jan', value: 4000, orders: 240 },
    { name: 'Feb', value: 3000, orders: 139 },
    { name: 'Mar', value: 2000, orders: 980 },
    { name: 'Apr', value: 2780, orders: 390 },
    { name: 'May', value: 1890, orders: 480 },
    { name: 'Jun', value: 2390, orders: 380 },
  ];

  const recentActivities = [
    {
      id: 1,
      user: 'John Doe',
      action: 'Created new order',
      time: '2 minutes ago',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    },
    {
      id: 2,
      user: 'Jane Smith',
      action: 'Updated profile',
      time: '5 minutes ago',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    },
    {
      id: 3,
      user: 'Mike Johnson',
      action: 'Completed payment',
      time: '10 minutes ago',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    },
  ];

  return (
    <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', py: 2 }}>
      <Typography variant="title" gutterBottom fontWeight="bold" sx={{ display: 'block' }}>
        Dashboard Overview
      </Typography>
      
      <Typography variant="body" color="text.secondary" mb={4} sx={{ display: 'block' }}>
        Welcome back! Here's what's happening with your business today.
      </Typography>

      {/* Stats Cards */}
      <Grid container spacing={3} mb={4}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card elevation={2}>
              <CardContent>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Box>
                    <Typography color="text.secondary" gutterBottom variant="text" sx={{ display: 'block' }}>
                      {stat.title}
                    </Typography>
                    <Typography variant="subtitle" fontWeight="bold" sx={{ display: 'block' }}>
                      {stat.value}
                    </Typography>
                    <Chip
                      label={stat.change}
                      size="small"
                      sx={{
                        backgroundColor: '#e8f5e8',
                        color: '#2e7d32',
                        fontWeight: 'bold',
                        mt: 1,
                      }}
                    />
                  </Box>
                  <Avatar
                    sx={{
                      backgroundColor: stat.color,
                      width: 56,
                      height: 56,
                    }}
                  >
                    {stat.icon}
                  </Avatar>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        {/* Revenue Chart */}
        <Grid item xs={12} lg={8}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="subtitle" gutterBottom fontWeight="bold" sx={{ display: 'block' }}>
              Revenue Overview
            </Typography>
            <Box height={300}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#2196f3"
                    strokeWidth={3}
                    dot={{ fill: '#2196f3', strokeWidth: 2, r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>

        {/* Recent Activities */}
        <Grid item xs={12} lg={4}>
          <Paper elevation={2} sx={{ p: 3, height: 'fit-content' }}>
            <Box display="flex" alignItems="center" mb={2}>
              <NotificationsOutlined sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="subtitle" fontWeight="bold" sx={{ display: 'block' }}>
                Recent Activities
              </Typography>
            </Box>
            <List>
              {recentActivities.map((activity) => (
                <ListItem key={activity.id} sx={{ px: 0 }}>
                  <ListItemAvatar>
                    <Avatar src={activity.avatar} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={activity.user}
                    secondary={
                      <Box>
                        <Typography variant="text" color="text.secondary" sx={{ display: 'block' }}>
                          {activity.action}
                        </Typography>
                        <Typography variant="text" color="text.secondary" sx={{ display: 'block' }}>
                          {activity.time}
                        </Typography>
                      </Box>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Orders Chart */}
        <Grid item xs={12} lg={6}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="subtitle" gutterBottom fontWeight="bold" sx={{ display: 'block' }}>
              Monthly Orders
            </Typography>
            <Box height={250}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="orders" fill="#ff9800" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>

        {/* Quick Stats */}
        <Grid item xs={12} lg={6}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="subtitle" gutterBottom fontWeight="bold" sx={{ display: 'block' }}>
              Performance Metrics
            </Typography>
            <Box mt={2}>
              <Box mb={3}>
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography variant="text" sx={{ display: 'block' }}>Conversion Rate</Typography>
                  <Typography variant="text" fontWeight="bold" sx={{ display: 'block' }}>75%</Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={75}
                  sx={{ height: 8, borderRadius: 4 }}
                />
              </Box>
              
              <Box mb={3}>
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography variant="text" sx={{ display: 'block' }}>Customer Satisfaction</Typography>
                  <Typography variant="text" fontWeight="bold" sx={{ display: 'block' }}>92%</Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={92}
                  sx={{ height: 8, borderRadius: 4 }}
                  color="success"
                />
              </Box>
              
              <Box>
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography variant="text" sx={{ display: 'block' }}>Server Uptime</Typography>
                  <Typography variant="text" fontWeight="bold" sx={{ display: 'block' }}>99.9%</Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={99.9}
                  sx={{ height: 8, borderRadius: 4 }}
                  color="info"
                />
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;