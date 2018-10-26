/*
Todo app structure

TodoApp
	- ChatHeader
	- TodoList
    - ChatListItem #1
		- ChatListItem #2
		  ...
		- ChatListItem #N
	- ChatForm
*/
var todoItems = [];
todoItems.push({ index: 1, output: 'hello', input: "hi", done: false });
todoItems.push({ index: 2, output: 'hello', input: "hello", done: true });

class TodoList extends React.Component {
  render() {
    var items = this.props.items.map((item, index) => {
      return (
        <ChatListItem key={index} item={item} index={index} removeItem={this.props.removeItem} markTodoDone={this.props.markTodoDone} />
      );
    });
    return (
      <ul className="list-group"> {items} </ul>
    );
  }
}

class ChatListItem extends React.Component {
  constructor(props) {
    super(props);
    this.onClickClose = this.onClickClose.bind(this);
    this.onClickDone = this.onClickDone.bind(this);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    console.log(this.props.item.input);
    fetch("http://localhost:5000/project/gethint.php?q=" + this.props.item.input)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result,
            output: result
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }


  onClickClose() {
    var index = parseInt(this.props.index);
    this.props.removeItem(index);
  }
  onClickDone() {
    var index = parseInt(this.props.index);
    this.props.markTodoDone(index);
  }
  render() {
    var todoClass = this.props.item.done ?
      "done" : "undone";
    const { error, isLoaded, items } = this.state;
    if (error) {
      return (
        <ul className="list-group">
          <li className="list-group-item ">
            <div className={todoClass}>
              <span className="glyphicon glyphicon-ok icon" aria-hidden="true" onClick={this.onClickDone}></span>
              {this.props.item.input}
              <button type="button" className="close" onClick={this.onClickClose}>&times;</button>
            </div>
          </li>
          <li className="list-group-item ">
            <div className={todoClass}>
              {error}
              <button type="button" className="close" onClick={this.onClickClose}>&times;</button>
              <span className="glyphicon glyphicon-ok icon" aria-hidden="true" onClick={this.onClickDone}></span>
            </div>
          </li>
        </ul>
      );
    } else if (!isLoaded) {
      console.log("loading");
      return (
        <ul className="list-group">
          <li className="list-group-item ">
            <div className={todoClass}>
              <span className="glyphicon glyphicon-ok icon" aria-hidden="true" onClick={this.onClickDone}></span>
              {this.props.item.input}
              <button type="button" className="close" onClick={this.onClickClose}>&times;</button>
            </div>
          </li>
          <li className="list-group-item ">
            <div className={todoClass}>
              <span className="glyphicon glyphicon-ok icon" aria-hidden="true" onClick={this.onClickDone}></span>
              loading...
              <button type="button" className="close" onClick={this.onClickClose}>&times;</button>
            </div>
          </li>
        </ul>
      );
    } else {
      console.log(items);
      return (
        <ul className="list-group">
          <li className="list-group-item ">
            <div className={todoClass}>
              {this.props.item.input}
              <button type="button" className="close" onClick={this.onClickClose}>&times;</button>
            </div>
          </li>
          <li className="list-group-item ">
            <div className={todoClass}>
              {items}
              <button type="button" className="close" onClick={this.onClickClose}>&times;</button>
              <span className="glyphicon glyphicon-ok icon" aria-hidden="true" onClick={this.onClickDone}></span>
            </div>
          </li>
        </ul>
      );
    }
  }
}

class TodoForm extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    this.refs.itemName.focus();
  }


  onSubmit(event) {
    event.preventDefault();
    var newItemValue = this.refs.itemName.value;

    if (newItemValue) {
      this.props.addItem({ newItemValue });
      this.refs.form.reset();
    }
  }
  render() {
    return (
      <form ref="form" onSubmit={this.onSubmit} className="form-inline">
        <input type="text" ref="itemName" className="form-control" placeholder="Send a message..." />
        <button type="submit" className="btn btn-default">Add</button>
      </form>
    );
  }
}

class ChatHeader extends React.Component {
  render() {
    return (
      <div class="w3-card-4 row">
        <div class="col-5">
          <img src="http://localhost:5000/static/image/avatar.png" class="img-circle center" alt="Cinque Terre" width="40" height="50" />
        </div>
        <div class="col-7">
          <h3> Dumb Chatbot</h3>
        </div>
      </div>
    );
  }
}

class ChatBot extends React.Component {
  constructor(props) {
    super(props);
    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.markTodoDone = this.markTodoDone.bind(this);
    this.state = { todoItems: todoItems };
  }

  addItem(todoItem) {
    todoItems.push({
      index: todoItems.length + 1,
      output: 'loading..',
      input: todoItem.newItemValue,
      done: false
    });
    this.setState({ todoItems: todoItems });
  }
  removeItem(itemIndex) {
    todoItems.splice(itemIndex, 1);
    this.setState({ todoItems: todoItems });
  }
  markTodoDone(itemIndex) {
    var todo = todoItems[itemIndex];
    todoItems.splice(itemIndex, 1);
    todo.done = !todo.done;
    todo.done ? todoItems.push(todo) : todoItems.unshift(todo);
    this.setState({ todoItems: todoItems });
  }

  render() {
    return (
      <div id="main">
        <ChatHeader />
        <TodoList items={this.props.initItems} removeItem={this.removeItem} markTodoDone={this.markTodoDone} />
        <TodoForm addItem={this.addItem} />
      </div>
    );
  }
}


ReactDOM.render(<ChatBot initItems={todoItems} />, document.getElementById('app'));
