import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TagsList from '../../components/tags/TagsList';
import fetchTagsAction from '../../store/actions/async/TagsActions';
import TagError from "../../components/tags/TagsError";
import {FAILED, SUCCEEDED} from "../../store/actions/async";

export class TagsListContainer extends Component {

    componentDidMount(){
        this.fetchTags();
    }

    fetchTags = () => {
        const { fetchTagsDispatcher } = this.props;
        fetchTagsDispatcher();
    };

    render() {
        const { status, tags } = this.props;
        this.toRender = null;
        if(status === FAILED){
            this.toRender = <TagError retry={this.fetchTags} />;
        } else if(status === SUCCEEDED){
            this.toRender = (
                <TagsList
                    tags={tags}
                />
            );
        }

        return (
            <div>
                {this.toRender}
            </div>
        );
    }
}

export const mapStateToProps = (state) => {
    return {
        tags: state.tags.tags,
        status: state.tags.status
    };
};

export const mapDispatchToProps = dispatch => {
    return {
        fetchTagsDispatcher : () => dispatch(fetchTagsAction()),
    };
};

TagsListContainer.propTypes = {
    status: PropTypes.string.isRequired,
    fetchTagsDispatcher: PropTypes.func.isRequired,
    tags: PropTypes.array.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(TagsListContainer);
