import React from "react";
import {Button} from "react-bootstrap";
import {useLocation, useNavigate} from "react-router-dom";

export default function NavButton ({to, children} : {to: string, children: React.ReactNode}) {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <Button
      variant={location.pathname === to ? 'outline-primary' : 'primary'}
      onClick={() => navigate(to)}
    >
      {children}
    </Button>
  )
}
