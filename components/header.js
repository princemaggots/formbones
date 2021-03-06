import Link from 'next/link'
import { signIn, signOut, useSession } from '../node_modules/next-auth/client'
import styles from './header.module.css'
 import Profile from '../components/profile/menu' 
 import { withStyles } from '@material-ui/core/styles'
 import Button from '@material-ui/core/Button';



// The approach used in this component shows how to built a sign in and sign out
// component that works on pages which support both client and server side
// rendering, and avoids any flash incorrect content on initial page load.

const GlobalCss = withStyles({
  // @global is handled by jss-plugin-global.
  '@global': {
    // You should target [class*="MuiButton-root"] instead if you nest themes.
    '.MuiButton-label':{
      textTransform: 'lowercase',
    },
    '.MuiButton-root': {
      boxShadow:'none',
        fontSize: 17,
        zIndex: 1500,
        background: '#111114',
        borderRadius: 2,
        border: 0,
        color: 'white',
        height: 48,
        width: 140,
        padding: '0 30px',
        fontFamily: [
            '"Exo 2"',
            '"Lucida Sans Unicode"',
            'Arial',
            'sans-serif',
          ].join(','),
    '&:hover': {
      backgroundColor: 'black',
      color: '#6afff8',
      border: 0,
      fontWeight: 500,
      fontSize: 17,
      borderRadius: 2,
      width: 140,
      height: 48,
      boxShadow: 'none',
      letterSpacing: 0.5,
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: 'black',
    },
    },
  },
})(() => null);

export default function Header () {
  const [ session, loading ] = useSession()
  
  return (
    <header>

      <div className="header">

<div className="logo">
<h1>  <Link href="/">Bare Bones</Link></h1>
</div>





    {!session && 
           <div className="navalone"> 
           <div className="gallalone">
            <Link href="/directory/gallery/index">gallery</Link>
             </div>
        <React.Fragment>
        <GlobalCss />
          <Button variant="contained" href="/api/auth/signin">
          Sign In
        </Button>
        </React.Fragment></div>
          }
      {session && <div className="nav">
        <div>
        <Link href="/directory/gallery/index">gallery</Link>
         </div>
         <div className="post">
            <Link href="/directory/allcharacters">characters</Link>
        </div> 
        <React.Fragment>
        <GlobalCss />
        <Profile /> 
        </React.Fragment>
          </div>}

{/*      <div className="profile">
        <div className="proimg">
        <img src="https://via.placeholder.com/30" alt="profile"></img>
        </div>  
        <div className="txt">
        <p> Profile </p>
      </div>
    </div>  */}
</div> 


{/*       <div className={styles.signedInStatus}>
        <p className={`nojs-show ${(!session && loading) ? styles.loading : styles.loaded}`}>
          {!session && <>
            <span className={styles.notSignedInText}>You are not signed in</span>
            <a
                href={`/api/auth/signin`}
                className={styles.buttonPrimary}
                onClick={(e) => {
                  e.preventDefault()
                  signIn()
                }}
              >
                Sign in
              </a>
          </>}
          {session && <>
            {session.user.image && <span style={{backgroundImage: `url(${session.user.image})` }} className={styles.avatar}/>}
            <span className={styles.signedInText}>
              <small>Signed in as</small><br/>
              <strong>{session.user.email || session.user.name}</strong>
              </span>
            <a
                href={`/api/auth/signout`}
                className={styles.button}
                onClick={(e) => {
                  e.preventDefault()
                  signOut()
                }}
              >
                Sign out
              </a>
          </>}
        </p>
      </div> */}

    </header>
  )
}
