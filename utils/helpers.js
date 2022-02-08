module.exports = {
    format_date: date => {
        return date.toLocaleDateString();
    },
    format_time: date => {
        return date.toLocaleTimeString();
    },
    post_preview: post => {
        return post.substring(0, 400);
    },
};
