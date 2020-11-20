import React from 'react';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { withStyles } from '@material-ui/core/styles';
import { useSession } from 'next-auth/client'


import Link from 'next/link';



const StyledMenuItem = withStyles({
    root: {
        background:'#111114',
        fontWeight: 400,
        fontSize: 16,
        fontFamily: [
            '"Exo 2"',
            '"Lucida Sans Unicode"',
            'Arial',
            'sans-serif',
          ].join(','),
      '&:hover': {
          background:'#3e870d',
      },
      '&:focus': {
        backgroundColor: '#006600',
        '& .MuiListItemText-primary': {
          color: 'white'
        },
      },
    },
  })(MenuItem);

  const StyledPaper = withStyles({
    root: {
        background:'#111114',
        color:'white',
        width: 130,
    },
  })(Paper);

  

export default function Profile() {
/*   const classes = useStyles(); */
  const [session, loading] = useSession()
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div>

        <Button
          ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
          startIcon={session && <img className="proimg" src={session.user.image} alt=""></img>}
        >
          Profile
        </Button>
        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'center bottom' }}
            >
              <StyledPaper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>

                    <Link href="/profile/profile"><StyledMenuItem onClick={handleClose}>View Profile</StyledMenuItem></Link>
                    <Link href="/directory/allcharacters"><StyledMenuItem onClick={handleClose}>Characters</StyledMenuItem></Link>
                    <Link href="/profile/settings"><StyledMenuItem onClick={handleClose}>Setting</StyledMenuItem></Link>
                    <Link href="/api/auth/signout"><StyledMenuItem onClick={handleClose}>Logout</StyledMenuItem></Link>

                  </MenuList>
                </ClickAwayListener>
              </StyledPaper>
            </Grow>
          )}
        </Popper>
      </div>
  );
}
