import React from "react";
import "./SearchBar.css";

export class SearchBar extends React.Component {
    constructor(props) {
        super(props);

        this.search = this.search.bind(this);
        this.handleTermChange = this.handleTermChange.bind(this);
    }

    search() {
        this.props.onSearch(this.state.term);
    }

    handleTermChange(event) {
        this.setState({
            term : event.target.value
        })
    }


    render() {
        return (
            <div className="SearchBar">
                {console.log("Inside SearchBar Component")}
                <input
                    placeholder="Enter A Song, Album, or Artist"
                    onChange={this.handleTermChange} />

                <button
                    className="SearchButton"
                    onClick={this.search}
                    onKeyPress={event => {
                        console.log("Inside key press");
                        if (event.key === 'Enter') {
                            this.search()
                        }
                    }} >SEARCH</button>
            </div>
        )
    }
}