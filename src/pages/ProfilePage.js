import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

function TabPanel({ value, index, children }) {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box sx={{ py: 2 }}>{children}</Box>}
    </div>
  );
}

function ProfilePage() {
  const [tab, setTab] = React.useState(0);

  return (
    <Box sx={{ py: 3 }}>
      <Tabs value={tab} onChange={(_, v) => setTab(v)}>
        <Tab label="Orders" />
        <Tab label="Wishlist" />
        <Tab label="Addresses" />
        <Tab label="Settings" />
      </Tabs>
      <TabPanel value={tab} index={0}>Orders content</TabPanel>
      <TabPanel value={tab} index={1}>Wishlist content</TabPanel>
      <TabPanel value={tab} index={2}>Addresses content</TabPanel>
      <TabPanel value={tab} index={3}>Settings content</TabPanel>
    </Box>
  );
}

export default ProfilePage;
