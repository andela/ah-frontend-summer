import {Comment, Icon, Label} from "semantic-ui-react";
import React, {Component} from "react";
import axios from "axios";
import PropTypes from 'prop-types';
import {
    get_axios_config,
    URL
} from "../../store/actions/async/CommentActions";
import { infoToast } from '../UI/Toast/toast';


class LikeDislikeComment extends Component {
    constructor(props) {
        super(props);

        this.state = {
            commentId: null,
            likeStatus: false,
            dislikeStatus: false,
            likes: 0,
            dislikes: 0
        };
    }

    componentDidMount(){
        const {
            id,
            liked,
            disliked,
            likeCount,
            dislikeCount
        } = this.props;

        this.setState({
            commentId: id,
            likeStatus: liked,
            dislikeStatus: disliked,
            likes: likeCount,
            dislikes: dislikeCount
        })
    }

    likeComment = () => {
        const { commentId, likeStatus } = this.state;
        const { isOwner } = this.props;
        if (!localStorage.getItem("token")){
            infoToast("Please log in to like a comment")
        }else if(isOwner){
            infoToast("You cannot like your own comment!")
        }else if(!likeStatus){
            try{
                axios.post(`${URL}/articles/comments/${commentId}/like`,
                {}, get_axios_config())
                .then(() => {
                    this.setState(prevState => {
                        return {
                            dislikeStatus: false,
                            likeStatus: ! prevState.likeStatus,
                            dislikes: prevState.dislikeStatus?
                            prevState.dislikes - 1 : prevState.dislikes,
                            likes: prevState.likes + 1
                        }
                    });
                });
            }catch(error){
                infoToast(error.response.data.message);
            }
        }else{
            axios.delete(`${URL}/articles/comments/${commentId}/like`,
            get_axios_config())
            .then(() => {
                this.setState(prevState => {
                    return {
                        likeStatus: ! prevState.likeStatus,
                        likes: prevState.likes - 1
                    }
                });
            });
        }
    }



    dislikeComment = () => {
        const { commentId, dislikeStatus } = this.state;
        const { isOwner } = this.props
        if (!localStorage.getItem("token")){
            infoToast("Please log in to dislike a comment")
        }else if (isOwner){
            infoToast("You cannot dislike your own comment!")
        }else if (!dislikeStatus){
            try{
                axios.post(`${URL}/articles/comments/${commentId}/dislike`,
                {}, get_axios_config())
                .then(() => {
                    this.setState(prevState => {
                        return {
                            likeStatus: false,
                            dislikeStatus: ! prevState.dislikeStatus,
                            likes: prevState.likeStatus?
                            prevState.likes - 1 : prevState.likes,
                            dislikes: prevState.dislikes + 1
                        }
                    });
                });
            }catch(error){
                infoToast(error.response.data.message);
            }
        }else{
            axios.delete(`${URL}/articles/comments/${commentId}/dislike`,
            get_axios_config())
            .then(() => {
                this.setState(prevState => {
                    return {
                        dislikeStatus: ! prevState.dislikeStatus,
                        dislikes: prevState.dislikes - 1
                    }
                });
            });
        }

    };

    render() {
        const {
            likeStatus,
            dislikeStatus,
            likes,
            dislikes
        } = this.state

        return (
            <>
            <Comment.Action>
                <Icon
                onClick={this.likeComment}
                size="large"
                color={likeStatus ? "green": null}
                name='thumbs up' />
            </Comment.Action>
            <Label basic color='green' pointing='left'>
                {likes}
            </Label>
            <Comment.Action></Comment.Action>
            <Comment.Action></Comment.Action>
            <Comment.Action></Comment.Action>
            <Comment.Action>
                <Icon
                onClick={this.dislikeComment}
                name='thumbs down'
                color={dislikeStatus ? "red": null}
                size="large" />
            </Comment.Action>
            <Label basic color='red' pointing='left'>
                {dislikes}
            </Label>
            <Comment.Action></Comment.Action>
        </>
        );
    }
}

LikeDislikeComment.propTypes = {
    id: PropTypes.number.isRequired,
    liked: PropTypes.bool,
    disliked: PropTypes.bool,
    likeCount: PropTypes.number.isRequired,
    dislikeCount: PropTypes.number.isRequired
};

LikeDislikeComment.defaultProps = {
    liked: false,
    disliked: false,
};

export default LikeDislikeComment;
