'use strict';

class LikeButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = { liked: false };
    }

    render() {
        return (
            <button onClick={() => this.setState({liked: !this.state.liked})}>
                {this.state.liked ? "Liked" : "Like"}
            </button>
        );
    }
}

let domContainer = document.querySelector('#like_button_container');
ReactDOM.render(<LikeButton />, domContainer);