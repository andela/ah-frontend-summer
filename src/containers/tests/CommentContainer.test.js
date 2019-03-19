import {render, shallow} from "enzyme";
import React from "react";
import {applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import data from '../../components/__tests__/Comments.test';
import CommentBodyContainer from "../Comments/CommentBodyContainer";
import {SUCCEEDED} from "../../store/actions/async";
import CommentContainer from "../Comments/CommentContainer";
import CommentListContainer from "../Comments/CommentListContainer";
import ReplyContainer from "../Comments/ReplyContainer";
import CommentReplyListContainer from "../Comments/CommentReplyListContainer";
import {NewCommentContainer} from "../Comments/NewCommentContainer";
import NewReplyContainer from "../Comments/NewReplyContainer";
import reducer from "../../store/reducers";

const mockStore = createStore(reducer, applyMiddleware(thunk));

describe('CommentBodyContainer Tests', () => {
    it('renders without crashing', () => {
        render(<CommentBodyContainer
            body={data.comment.body}
            editComment={() => {
            }}
            editing={false}
            finishEditing={() => {
            }}
            loading={false}
            pk={data.comment.id}
            status={SUCCEEDED} />);
    });

    describe('instance tests', () => {
        let props, instance;
        beforeEach(() => {
            props = {
                body: "body",
                editComment: jest.fn(),
                editing: false,
                finishEditing: jest.fn(),
                loading: false,
                pk: 2,
                status: SUCCEEDED
            };
            const wrapper = shallow(<CommentBodyContainer {...props} />);
            instance = wrapper.instance();
        });

        it('componentDidUpdate calls finishEditing properly', () => {
            instance.state.loading = false;
            instance.state.status = SUCCEEDED;
            instance.componentDidUpdate({loading: true});
            expect(props.finishEditing).toHaveBeenCalled();
        });

        it('render returns expected content', () => {
            expect(instance.render()).toBeTruthy();
            instance.editing = true;
            expect(instance.render()).toBeTruthy();
        });

        it('updateComment correctly calls editComment', () => {
            instance.state.body = "updatedBody";
            instance.updateComment();
            expect(props.editComment).toHaveBeenCalledWith(props.pk, "updatedBody");
        });

        it('reset body resets the body in the state', () => {
            expect(instance.state.body).toEqual(props.body);
            instance.state.body = "updatedBody";
            expect(instance.state.body).toEqual("updatedBody");
            instance.resetBody();
            expect(instance.state.body).toEqual(props.body);
        });


    });
});

describe('CommentContainer Tests', () => {
    it('renders without crashing', () => {
        shallow(<CommentContainer
            editComment={() => {
            }} comment={data.comment} deleteLoading={false} doDeleteComment={() => {
            }} />);
    });

    describe('mapStateToProps and mapDispatchToProps', () => {
        it('returns the right props', () => {
            const {mapStateToProps, mapDispatchToProps} = require("../Comments/CommentContainer");
            expect(mapStateToProps({
                comments: {
                    deleteComment: {loading: false},
                    comments: [{id: 2, loading: false, status: SUCCEEDED}]
                }
            }, {comment: {id: 2}})).toEqual({
                loading: false,
                status: SUCCEEDED,
                deleteLoading: false
            });
            let props = mapDispatchToProps();
            expect(props).toHaveProperty('editComment');
            expect(props).toHaveProperty('doDeleteComment');
        });
    });
});

describe('CommentListContainer Tests', () => {
    it('renders without crashing', () => {
        shallow(<CommentListContainer
            loading={false} status={SUCCEEDED}
            comments={[data.comment]}
            fetchComments={() => {
            }} slug="slug" />);
        render(<Provider store={mockStore}>
            <BrowserRouter>
                <CommentListContainer
                    fetchComments={() => {
                    }} slug="slug" />
            </BrowserRouter>
               </Provider>);
    });
});

describe('CommentReplyListContainer Tests', () => {
    it('renders without crashing', () => {
        shallow(<CommentReplyListContainer
            status={SUCCEEDED} loading={false}
            fetchReplies={() => {
            }} pk={data.comment.id}
            replies={[]} />);
    });
});

describe('NewCommentContainer Tests', () => {
    it('renders without crashing', () => {
        shallow(<NewCommentContainer
            loading={false} createComment={() => {
            }} status={SUCCEEDED} slug="slug" />);
    });

    describe('mapStateToProps and mapDispatchToProps', () => {
        it('returns the right props', () => {
            const {mapStateToProps, mapDispatchToProps} = require("../Comments/NewCommentContainer");
            expect(mapStateToProps({
                comments: {
                    newComment: {
                        loading: false,
                        status: SUCCEEDED
                    }
                }
            })).toEqual({
                loading: false,
                status: SUCCEEDED,
            });
            let props = mapDispatchToProps();
            expect(props).toHaveProperty('createComment');
        });
    });

    describe('instance tests', () => {
        let props, instance;

        beforeEach(() => {
            props = {
                createComment: jest.fn(),
                loading: false,
                slug: "slug",
                status: SUCCEEDED,
                placeholder: "placeholder",
            };

            const wrapper = shallow(<NewCommentContainer {...props} />);
            instance = wrapper.instance();
        });

        it('componentDidUpdate calls clearBody properly', () => {
            instance.state.loading = false;
            instance.state.status = SUCCEEDED;
            instance.clearBody = jest.fn();
            instance.componentDidUpdate({loading: true});
            expect(instance.clearBody).toHaveBeenCalled();
        });

        it('createNewComment correctly calls createComment', () => {
            instance.state.body = "updatedBody";
            instance.createNewComment();
            expect(props.createComment).toHaveBeenCalledWith(props.slug, "updatedBody");
        });

        it('clearBody clears the body', () => {
            instance.clearBody();
            expect(instance.state.body).toEqual("");
        });


    });
});

describe('NewReplyContainer Tests', () => {
    it('renders without crashing', () => {
        shallow(<NewReplyContainer />);
    });
});

describe('Reply Container Tests', () => {
    it('renders without crashing', () => {
        shallow(<ReplyContainer
            deleteLoading={false} reply={data.reply}
            doDeleteReply={() => {
            }} doEditReply={() => {
            }} />);
    });
});
