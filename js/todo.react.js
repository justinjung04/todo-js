var Row = ReactBootstrap.Row;
var Col = ReactBootstrap.Col;
var ListGroup = ReactBootstrap.ListGroup;
var ListGroupItem = ReactBootstrap.ListGroupItem;

var TODOITEMS = [
	{id: 0, text: 'Example 1', done: false},
	{id: 1, text: 'Example 2', done: false},
	{id: 2, text: 'Example 3', done: false}
];

var UserInput = React.createClass({
	getInitialState: function() {
		return {
			text: ''
		};
	},
	handleKeyDown: function(e) {
		if (!e) e = window.event;
	    var keyCode = e.keyCode || e.which;
	    if (keyCode == '13') {
	    	this.props.addTodo(React.findDOMNode(this.refs.text).value);
	    	this.setState({
		    	text: ''
		    });
	    }
	},
	handleChange: function() {
		var text = React.findDOMNode(this.refs.text).value;
		this.setState({
			text: text
		});
	},
	render: function() {
		return (
			<input type="text" ref="text" className="form-control" id="user-input" placeholder="What needs to be done?" style={{height:'42px'}} onKeyDown={this.handleKeyDown} onChange={this.handleChange} value={this.state.text}/>
		);
	}
});

var Todo = React.createClass({
	handleKeyDown: function(e) {
		if (!e) e = window.event;
	    var keyCode = e.keyCode || e.which;
	    if (keyCode == '13') {
	    	var id = React.findDOMNode(this.refs.row).id;
	    	var text = React.findDOMNode(this.refs.text).innerHTML;
	    	if(text.length < 1) {
	    		this.props.deleteTodo(id);
	    	} else {
	    		this.props.editTodo(id, text);
	    		React.findDOMNode(this.refs.text).blur();
	    	}
	    	e.preventDefault();
	    }
	},
	handleBlur: function() {
		var text = React.findDOMNode(this.refs.text).innerHTML;
		text.length < 1 ? this.handleDeleteTodo() : React.findDOMNode(this.refs.text).setAttribute('contenteditable', false);
	},
	handleEditTodo: function() {
		var text = React.findDOMNode(this.refs.text);
		text.setAttribute('contenteditable', true);
		text.focus();
	},
	handleDoneTodo: function() {
		this.props.doneTodo(React.findDOMNode(this.refs.row).id);
	},
	handleDeleteTodo: function() {
		this.props.deleteTodo(React.findDOMNode(this.refs.row).id);
	},
	render: function() {
		var done = this.props.done ? 'done' : '';
		return (
			<ListGroupItem className={done}>
				<Row ref='row' id={this.props.id}>
					<Col id="text" md={9} xs={9} ref='text' onKeyDown={this.handleKeyDown} onBlur={this.handleBlur}>
						{this.props.text}
					</Col>
					<Col md={1} xs={1}>
						<a id="edit" onClick={this.handleEditTodo}><span className="glyphicon glyphicon-pencil" aria-hidden="true"/></a>
					</Col>
					<Col md={1} xs={1}>
						<a id="done" onClick={this.handleDoneTodo}><span className="glyphicon glyphicon-ok" aria-hidden="true"/></a>
					</Col>
					<Col md={1} xs={1}>
						<a id="delete" onClick={this.handleDeleteTodo}><span className="glyphicon glyphicon-remove" aria-hidden="true"/></a>
					</Col>
				</Row>
			</ListGroupItem>
		);
	}
});

var TodoList = React.createClass({
	getInitialState: function() {
		return {
			todoItems: TODOITEMS,
			nextId: 3
		};
	},
	handleAddTodo: function(text) {
		var todoItems = this.state.todoItems;
		todoItems.push({id: this.state.nextId, text: text, done: false});
		this.setState({
			todoItems: todoItems,
			nextId: this.state.nextId + 1
		});
	},
	handleEditTodo: function(id, text) {
		var todoItems = this.state.todoItems;
		todoItems.forEach(function(todo) {
			if(todo.id == id) {
				todo.text = text;
			}
		});
		this.setTodoItems(todoItems);
	},
	handleDoneTodo: function(id) {
		var todoItems = this.state.todoItems;
		todoItems.forEach(function(todo) {
			if(todo.id == id) {
				todo.done = !todo.done;
			}
		});
		this.setTodoItems(todoItems);
	},
	handleDeleteTodo: function(id) {
		var todoItems = [];
		this.state.todoItems.forEach(function(todo) {
			if(todo.id != id) {
				todoItems.push(todo);
			}
		});
		this.setTodoItems(todoItems);
	},
	setTodoItems: function(todoItems) {
		this.setState({
			todoItems: todoItems
		});
	},
	render: function() {
		var todos = [];
		this.state.todoItems.forEach(function(todoItem) {
			todos.push(<Todo editTodo={this.handleEditTodo} doneTodo={this.handleDoneTodo} deleteTodo={this.handleDeleteTodo} text={todoItem.text} id={todoItem.id} done={todoItem.done}/>);
		}.bind(this));
		return (
			<div>
				<ListGroup>
					<UserInput addTodo={this.handleAddTodo}/>
					<br />
					{todos}
				</ListGroup>
			</div>
		);
	}
});

React.render(<TodoList />, document.getElementById('list-body'));