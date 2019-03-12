import React from 'react';
import {Button, Container, Grid, Header} from "semantic-ui-react";

const Banner = () => {
    return (
        <div id="banner-container">
            <Container>
                <Grid stackable>
                    <Grid.Row>
                        <Grid.Column width={6}>
                            <Header id="banner-heading" as="h1" inverted>
                                Welcome to
                                <br />
                                Author&apos;s Haven
                            </Header>
                            <Header as="h3" inverted id="banner-sub-heading">
                                A Home for the Creative at Heart!
                            </Header>
                            <br />
                            <span id="banner-intro-text">
                            We are all told, &quot;Live your life to the fullest&quot;. I am here to do just that. Author&apos;s Haven serves as a vessel to project my passions, and clue in my loyal readers to what inspires me in this crazy world. So, sit back, relax, and read on
                            </span>
                            <br />
                            <br />
                            <Button size="big" color="teal">
                                Get Started
                            </Button>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        </div>
    );
};

export default Banner;
