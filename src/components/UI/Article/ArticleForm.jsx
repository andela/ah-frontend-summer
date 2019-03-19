import React from 'react';
import {
    Container,
    Header,
    Segment,
    Form,
    Button,
    Label
} from 'semantic-ui-react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import '../../../assets/styles/CreateArticleForm.scss';
import '../../../assets/styles/SignupForm.scss';

const articleForm = (props) => {
    const {
        formTitle,
        title,
        description,
        inputChanged,
        onImageUpload,
        submitData,
        loading,
        disabled,
        buttonAction
     } = props
    return (
        <div className="CreateArticleForm">
            <Container>
                <Segment padded="very">
                    <Header as="h2" textAlign="center" color="teal">
                        {formTitle}
                    </Header>
                    <Form padded="very">
                        <div className="spaceComponents">
                            <Label as='a' color='teal' ribbon>
                                Title
                            </Label>
                            <Form.Input
                                size='large'
                                name='title'
                                fluid
                                required
                                onChange={inputChanged}
                                value={title}
                                />
                            <Label as='a' color='teal' ribbon>
                                Description
                            </Label>
                            <Form.Input
                                size='large'
                                name='description'
                                fluid
                                required
                                onChange={inputChanged}
                                value={description}
                                />
                                <Label as='a' color='teal' ribbon>
                                    Body
                                </Label>
                                <CKEditor
                                    editor={ ClassicEditor }
                                    data={props.body}
                                    onChange={props.bodyChanged}
                                    name="boddyEditor"
                                    />
                                <Label as='a' color='teal' ribbon>
                                    Image
                                </Label>
                                <div className='ImageInputField'>
                                    <input
                                        type='file'
                                        id='single'
                                        onChange={onImageUpload}
                                        />
                                </div>
                            <Button
                                fluid
                                basic
                                color='teal'
                                onClick={submitData}
                                loading={loading}
                                disabled={disabled}
                                size='huge'>
                                {buttonAction}
                            </Button>
                        </div>
                    </Form>
                        
                </Segment>
            </Container>
        </div>
    )
};

export default articleForm;
