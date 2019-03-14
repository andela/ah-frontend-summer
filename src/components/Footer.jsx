import React from 'react';
import { Menu, Container, Icon, List, Segment } from "semantic-ui-react";
import '../styles/footer.css';

const Footer = () => (
    <div>
        <Menu borderless className="footerMenu">
            <Segment vertical>
                <Container textAlign="center">
                    <Icon size="large" name="facebook f" />
                    <Icon size="large" name="instagram" />
                    <Icon size="large" name="twitter" />
                </Container>
                <Container textAlign="center">
                    <List horizontal size="small">
                        <List.Item>
                            <List.Content>
                            © 2019 by Author&apos;s Haven. Proudly created with Andela
                            </List.Content>
                        </List.Item>
                    </List>
                </Container>
            </Segment>
        </Menu>
    </div>
);

export default Footer;
