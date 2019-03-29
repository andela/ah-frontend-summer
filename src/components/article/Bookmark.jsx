import {Icon} from "semantic-ui-react";
import React from "react";
import PropTypes from "prop-types";

const Bookmark = ({loading, bookmark, isBookmarked}) => {
    const bookmarkName = isBookmarked ? "bookmark" : "bookmark outline";
    return (
        <Icon.Group className="article-bookmark" size="big">
            <Icon
                color="teal"
                title="Bookmark"
                onClick={bookmark}
                disabled={loading}
                name={bookmarkName} />
            {loading ? <Icon color="teal" loading corner name="asterisk" /> : ""}
        </Icon.Group>
    );
};

export default Bookmark;

Bookmark.propTypes = {
    bookmark: PropTypes.func.isRequired,
    isBookmarked: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired
};
