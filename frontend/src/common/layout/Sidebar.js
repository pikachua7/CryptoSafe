import React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { Button } from "@mui/material";
import { AppBar, Toolbar, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MenuIcon from '@mui/icons-material/Menu';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import InventoryIcon from '@mui/icons-material/Inventory';
import logo from "./top-logo.png";
import UAuth from '@uauth/js';

const uauth = new UAuth({
    clientID: "b17d069a-150a-4c64-b2e1-5babb87c5bd7",
    redirectUri: "http://localhost:3000",
});



const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }),
);

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

const drawerWidth = 240;
export default function Sidebar({ setCurrentSection, currentSection, safeAddress, ethAddress, domainData }) {
    const navigate = useNavigate();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const disconnect = async () => {
        if (domainData) {
            await uauth.logout();
        }

        navigate('/');
    }
    const handleDrawerClose = () => {
        setOpen(false);
    };
    return (
        <>
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" >
                        CryptoSafe
                    </Typography>
                    <div style={{ display: 'flex', alignItems: "center" }}>
                        <p style={{ marginRight: '10px', marginLeft: "950px" }}>{domainData?.sub}</p>
                        <Button variant="contained" color="secondary" onClick={disconnect}>
                            Disconnect
                        </Button>
                    </div>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >

                <DrawerHeader>
                    <img src={logo} onClick={() => navigate("/")} style={{ height: "80px", width: "300px", cursor: "pointer", marginLeft: "20px" }} />
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {['Wallet', 'Safe', 'Recover', 'Backup'].map((text, index) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton className={text === currentSection && "gray"} onClick={() => setCurrentSection(text)}>
                                <ListItemIcon>
                                    {index % 2 === 0 ? <AccountBalanceWalletIcon /> : <InventoryIcon />}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    <div>
                        <ListItem>
                            <ListItemText primary="ETH Address" />
                            <a href={`https://zksync2-testnet.zkscan.io/address/${ethAddress}`} target="_blank" rel="noopener noreferrer">
                                {ethAddress && ethAddress.substring(0, 6) + "..." + ethAddress.substring(36, 42)}
                            </a>
                            {/* <a href={`https://explorer.public.zkevm-test.net/address/${ethAddress}`} target="_blank" rel="noopener noreferrer">
                                {ethAddress && ethAddress.substring(0, 6) + "..." + ethAddress.substring(36, 42)}
                            </a> */}
                        </ListItem>

                    </div>
                    <div>
                        <ListItem>
                            <ListItemText primary="Safe Address" />
                            <a href={`https://zksync2-testnet.zkscan.io/address/${safeAddress}`} target="_blank" rel="noopener noreferrer">
                                {safeAddress && safeAddress.substring(0, 6) + "..." + safeAddress.substring(36, 42)}
                            </a>
                            {/* <a href={`https://explorer.public.zkevm-test.net/address/${safeAddress}`} target="_blank" rel="noopener noreferrer">
                                {safeAddress && safeAddress.substring(0, 6) + "..." + safeAddress.substring(36, 42)}
                            </a> */}
                        </ListItem>
                    </div>
                </List>
                <Main open={open}> <DrawerHeader /></Main>
            </Drawer>
        </>
    )
}
