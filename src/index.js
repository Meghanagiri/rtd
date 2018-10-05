import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();


//todoapp code//
class TodoApp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            text: ""
        };

        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleAddItem = this.handleAddItem.bind(this);
        this.markItemCompleted = this.markItemCompleted.bind(this);
        this.handleDeleteItem = this.handleDeleteItem.bind(this);
    }
    handleTextChange(event) {
        this.setState({
            text: event.target.value
        });
    }
    handleAddItem(event) {
        event.preventDefault();
        var newItem = {
            id: Date.now(),
            text: this.state.text,
            done: false
        };
        this.setState((prevState) => ({
            items: prevState.items.concat(newItem),
            text: ""
        }));
    }
    markItemCompleted(itemId) {
        var updatedItems = this.state.items.map(item => {
            if (itemId === item.id)
                item.done = !item.done;

            return item;
        });
        this.setState({
            items: [].concat(updatedItems)
        });
    }
    handleDeleteItem(itemId) {
        var updatedItems = this.state.items.filter(item => {
            return item.id !== itemId;
        });

        this.setState({
            items: [].concat(updatedItems)
        });
    }
    render() {
        return (
            <div>
                <h3 className="apptitle"></h3>
                <input type="text" className="form-control" placeholder="enter here..."
                    onChange={this.handleTextChange} />
                <button className="btn btn-primary" onClick={this.handleAddItem}
                    disabled={!this.state.text}>Add</button>
                <TodoList items={this.state.items} onItemCompleted={this.markItemCompleted}
                    onDeleteItem={this.handleDeleteItem} />
            </div>
        );
    }
}

class TodoItem extends React.Component {
    constructor(props) {
        super(props);
        this.markCompleted = this.markCompleted.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
    }
    markCompleted(event) {
        this.props.onItemCompleted(this.props.id);
    }
    deleteItem(event) {
        this.props.onDeleteItem(this.props.id);
    }

    render() {
        var itemClass = "form-check todoitem " + (this.props.completed ? "done" : "undone");
        return (
            <li className={itemClass} ref={li => this._listItem = li}>

                <label className="form-check-label">
                    <input type="checkbox" className="form-check-input"
                        onChange={this.markCompleted} /> {this.props.text}
                </label>

            </li>
        );
    }
}

class TodoList extends React.Component {
    render() {
        return (
            <ul className="todolist">
                {this.props.items.map(item => (
                    <TodoItem key={item.id} id={item.id} text={item.text}
                        completed={item.done} onItemCompleted={this.props.onItemCompleted}
                        onDeleteItem={this.props.onDeleteItem} />
                ))}
            </ul>
        );
    }
}

ReactDOM.render(<TodoApp />, document.getElementById("app"));