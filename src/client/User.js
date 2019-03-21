import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

// Component to represent a single User 'Card'
// note that the edit button navigates to a new URL (which will load a new Component via React Router)
// whereas the delete button invokes a function in the parent Component
class User extends React.Component {

  // define what happens when this componet gets drawn on the UI
  render() {
    return (
      <div>
        <div>
          <div>
            <figure>
              <img alt="Profile" src={this.props.image} />
            </figure>
          </div>
          <div>
            <div>
              <div>
                <p>{this.props.name}</p>
                <button type="button" onClick={() => {this.props.handleDelete(this.props.id);}}>
                  Delete
                </button>
                <Link to={`/edit-user/${this.props.id}`}>
                  <button type="button">
                  Edit
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default User;
