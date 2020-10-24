import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

export default function SignInButton() {
  return (

    <Button variant="contained" href="/api/auth/signin">
        Sign In
      </Button>   
  );
};