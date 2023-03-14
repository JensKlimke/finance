import React from "react";
import "../assets/styles/App.scss"
import {useAuth} from "../hooks/auth";
import LoadingScreen from "../components/auth/LoadingScreen";
import App from "./App";
import {Button, Card, Col, Row} from "react-bootstrap";
import {BsGithub} from "react-icons/bs";
import {useApiData} from "../hooks/api";

export default function Auth({children}: { children: React.ReactNode }) {
  // hooks
  const {pending, session, login} = useAuth();
  const {data} = useApiData<string>('whois');
  // don't render if not logged in
  if (pending && !session)
    return <LoadingScreen>Loading session&hellip;</LoadingScreen>
  else if (!pending && session)
    return <>{children}</>;
  // render login screen
  return (
    <LoadingScreen>
      <Row className='justify-content-md-center'>
        <Col lg={4}>
          <Card>
            <Card.Header>Unauthorized</Card.Header>
            <Card.Body className='text-center'>
              <p>You are not authorized to access this app. Please verify your identity with GitHub.com.</p>
              <Button onClick={login}>
                <BsGithub />&nbsp;
                Log in with GitHub
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      { data &&
        <Row>
          <Col className='text-center mt-4'>
            <span className='text-muted'>API {data}</span>
          </Col>
        </Row>
      }
    </LoadingScreen>
  );
}


export const withAuth = (element : React.ReactNode) => {
  return (
    <Auth>
      <App>
        {element}
      </App>
    </Auth>
  );
}
