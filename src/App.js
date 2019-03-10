import React, { Component } from "react";

// Components
import Sidebar from "./Sidebar";
import AuthorsList from "./AuthorsList";
import AuthorDetail from "./AuthorDetail";
import axios from "axios";

class App extends Component {
  state = {
    currentAuthor: null,
    filteredAuthors: [],
    authors: [],
    loading: true
  };

  selectAuthor = async author => {
    this.setState({ loading: true });
    try {
      const response = await axios.get(
        "https://the-index-api.herokuapp.com/api/authors/" + author.id
      );
      this.setState({ currentAuthor: response.data, loading: false });
    } catch (errors) {
      console.error("Somthing went wrong..");
      console.error(errors);
    }
  };

  unselectAuthor = () => this.setState({ currentAuthor: null });

  filterAuthors = query => {
    let authors = this.state.authors;
    query = query.toLowerCase();
    let filteredAuthors = authors.filter(author => {
      return `${author.first_name} ${author.last_name}`
        .toLowerCase()
        .includes(query);
    });
    this.setState({ filteredAuthors: filteredAuthors });
  };

  getContentView = () => {
    if (this.state.loading) {
      return <h2 className="text-center">loading...</h2>;
    } else {
      if (this.state.currentAuthor) {
        return <AuthorDetail author={this.state.currentAuthor} />;
      } else {
        return (
          <AuthorsList
            authors={this.state.filteredAuthors}
            selectAuthor={this.selectAuthor}
            filterAuthors={this.filterAuthors}
            // authors={this.state.authors}
          />
        );
      }
    }
  };

  async componentDidMount() {
    try {
      const response = await axios.get(
        "https://the-index-api.herokuapp.com/api/authors/"
      );
      this.setState({
        authors: response.data,
        filteredAuthors: response.data,
        loading: false
      });
    } catch (errors) {
      console.error("Somthing went wrong..");
      console.error(errors);
    }
  }

  render() {
    return (
      <div id="app" className="container-fluid">
        <div className="row">
          <div className="col-2">
            <Sidebar unselectAuthor={this.unselectAuthor} />
          </div>
          <div className="content col-10">{this.getContentView()}</div>
        </div>
      </div>
    );
  }
}

export default App;
