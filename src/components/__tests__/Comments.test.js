import {render, shallow} from "enzyme";
import React from "react";
import SingleComment from "../comments/Comment";
import CommentList from "../comments/CommentList";
import CommentError from "../comments/CommentError";
import CommentLoading from "../comments/CommentLoading";
import ConfirmationPopup from "../comments/ConfirmationPopup";
import ReplyList from "../comments/ReplyList";
import {SUCCEEDED} from "../../store/actions/async";
import LikeDislikeComment from "../comments/LikeDislikeComment";
const data = {
    comment: {
        "created_at": "2019-03-21T19:31:36.360506+03:00",
        "updated_at": "2019-03-21T20:02:50.586039+03:00",
        "body": "<p>ssssssdcflsks</p>",
        "author": {
            "username": "karuhanga475",
            "first_name": null,
            "last_name": null,
            "bio": null,
            "image": "https://res.cloudinary.com/dr2bl3izo/image/upload/v1/media/author.jpg",
            "following": false,
            "date_of_birth": null,
            "followers": [
                "lincoln.karuhanga"
            ],
            "followings": [
                "lincoln.karuhanga"
            ],
            "number_of_followers": 1,
            "number_of_following": 1
        },
        "article": 23,
        "id": 82,
        "commenting_on": null,
        "like_count": 0,
        "dislike_count": 0
    },
    reply: {
        "comment": 3,
        "created_at": "2019-02-15T13:08:07.524232+03:00",
        "updated_at": "2019-02-15T13:09:54.800837+03:00",
        "body": "sososososo true",
        "author": {
            "username": "fahdjamy",
            "first_name": "",
            "last_name": "",
            "bio": "I love this game",
            "image": "https://res.cloudinary.com/dr2bl3izo/image/upload/v1/media/profile/author-blog-businesswoman-267569_r6dxa4",
            "following": false,
            "date_of_birth": null,
            "followers": [
                "oma0256"
            ],
            "followings": [
                "ronnie"
            ],
            "number_of_followers": 1,
            "number_of_following": 1
        },
        "id": 3
    },
};

describe('Comment tests', () => {
    it('renders correctly and without crashing', () => {
        const wrapper = shallow(<SingleComment
            loading={false} loggedInUser=""
            status={SUCCEEDED}
            comment={data.comment}
            deleteComment={() => {
            }} deleteLoading={false}
            editComment={() => {
            }} type="comment" />);
        expect(wrapper.exists('.toggle-reply-visibility-action')).toBeTruthy();
    });

    it('displays edit and delete buttons when owner is logged in', () => {
        const wrapper = shallow(<SingleComment
            loading={false}
            loggedInUser={data.comment.author.username}
            status={SUCCEEDED}
            comment={data.comment}
            deleteComment={() => {
            }} deleteLoading={false}
            editComment={() => {
            }} type="comment" />);
        expect(wrapper.exists('.edit-action')).toBeTruthy();
        expect(wrapper.exists('.delete-action')).toBeTruthy();
    });

    it('hides edit and delete buttons when logged in user is not owner', () => {
        const wrapper = shallow(<SingleComment
            loading={false}
            loggedInUser="notOwnser"
            status={SUCCEEDED}
            comment={data.comment}
            deleteComment={() => {
            }} deleteLoading={false}
            editComment={() => {
            }} type="comment" />);
        expect(wrapper.exists('.edit-action')).toBeFalsy();
        expect(wrapper.exists('.delete-action')).toBeFalsy();
    });
});

describe('CommentList tests', () => {
    it('renders without crashing', () => {
        shallow(<CommentList comments={[data.comment]} />);
    });
});

describe('CommentError tests', () => {
    it('renders without crashing', () => {
        render(<CommentError
            message="" retry={() => {
            }} />);
    });
});

describe('CommentLoading tests', () => {
    it('renders without crashing', () => {
        render(<CommentLoading />);
    });
});

describe('CommentPopup tests', () => {
    it('renders without crashing', () => {
        render(<ConfirmationPopup
            action={() => {
            }} text="" loading={false} />);
    });
});

describe('ReplyList tests', () => {
    it('renders without crashing', () => {
        shallow(<ReplyList commentReplies={[data.reply]} />);
    });
});

describe('LikeDislikeComments tests', () => {
    const props = {
        id: 1,
        likeCount: 3,
        dislikeCount:1
    };
    const wrapper = shallow(< LikeDislikeComment {...props}/>);

    it('renders consistently', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('renders correctly', () => {
        expect(wrapper.find("Icon")).toBeTruthy();
    });

});


export default data;
