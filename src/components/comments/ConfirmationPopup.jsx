import React, {Component} from 'react';
import {Button, Comment, Grid, Popup} from 'semantic-ui-react';
import * as PropTypes from "prop-types";

class ConfirmationPopup extends Component {
    state = {
        open: false
    };

    handleOpen() {
        this.setState({open: true});
    }

    handleClose() {
        this.setState({open: false});
    }

    render() {
        const {open} = this.state;
        const {action, text, loading} = this.props;
        return (
            <Popup
                open={open} onOpen={() => {
                    this.handleOpen();
                }} onClose={() => {
                    this.handleClose();
                }} basic trigger={(
                    <Comment.Action
                        className="danger">
                        {text}
                    </Comment.Action>
                )} on="click">
                <Grid divided columns="equal">
                    <Grid.Row className="center">
                        <Grid.Column>
                            Are you sure?
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <Button
                                disabled={loading} loading={loading}
                                onClick={action} color="red"
                                content="Delete" fluid />
                        </Grid.Column>
                        <Grid.Column>
                            <Button
                                onClick={() => {
                                    this.handleClose();
                                }} color="teal" content="Cancel" fluid />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Popup>
        );
    }
}

ConfirmationPopup.propTypes = {
    action: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired
};

export default ConfirmationPopup;
