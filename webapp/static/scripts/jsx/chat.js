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
// todoItems.push({ index: 1, output: 'hello', input: "hi", done: false });
// todoItems.push({ index: 2, output: 'hello', input: "hello", done: true });

class InputBox extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col-1">
          <img src="http://localhost:5000/static/image/user.png" style={floatRight} className="img-circle" alt="Cinque Terre" width="40" height="50" />
        </div>
        <div className="col-8 w3-card-4 question">
          <p>{this.props.text}</p>
        </div>
        <div className="col-1"></div>
      </div>
    );
  }
}

class OutputBox extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col-1"></div>
        <div className="col-8 w3-card-4 response" >
          <p><b>{this.props.text}</b></p>
        </div>
        <div className="col-1">
          <img src="http://localhost:5000/static/image/avatar.png" className="img-circle" alt="Cinque Terre" width="40" height="50" />
        </div>
      </div>
    )
  }
}

class ChatList extends React.Component {
  render() {
    var items = this.props.items.map((item, index) => {
      return (
        <ChatListItem key={index} item={item} index={index} removeItem={this.props.removeItem} markTodoDone={this.props.markTodoDone} />

      );
    });
    return (
      <div className="messageframe"> {items} </div>
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
        <div >
          <InputBox text={this.props.item.input} />
          <OutputBox text={error} />
        </div>
      );
    } else if (!isLoaded) {
      console.log("loading");
      return (
        <div>
          <InputBox text={this.props.item.input} />
          <OutputBox text="Loading.." />
        </div>
      );
    } else {
      console.log(items);
      return (
        <div>
          <div>
            <InputBox text={this.props.item.input} />
            <OutputBox text={items} />
          </div>
        </div>
      );
    }
  }
}

const floatRight = {
  float: 'right'
}

const styleWidth = {
  width: '100%'
}

class ChatForm extends React.Component {


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
      <form ref="form" onSubmit={this.onSubmit} >
        <div className="input-group" style={styleWidth}>
          <input type="text" ref="itemName" className="form-control" placeholder="Send a message..." />
          <div className="input-group-btn">
            <button type="submit" className="btn btn-success enter" style={floatRight} >Send</button>
          </div>
        </div>
      </form>
    );
  }
}

class ChatHeader extends React.Component {


  render() {
    return (
      <div className="w3-card-4 row head">
        <div className="col-5">
          <img src="http://localhost:5000/static/image/avatar.png" className="img-circle center" alt="Cinque Terre" width="40" height="50" />
        </div>
        <div className="col-6">
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
      <div id="chatbot" className="chatbot">
        <ChatHeader onClick={this.props.closePopup} />
        <div className="w3-display-topright icon"><img src="http://localhost:5000/static/image/minimize.png" onClick={this.props.closePopup} alt="Cinque Terre" width="30" height="30" /></div>
        <ChatList items={this.props.initItems} removeItem={this.removeItem} markTodoDone={this.markTodoDone} />
        <ChatForm addItem={this.addItem} />
      </div>
    );
  }
}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      showPopup: false
    };
  }
  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }
  render() {
    return (
      <div className="chatframe">
        {this.state.showPopup ?
          <ChatBot
            initItems={todoItems}
            closePopup={this.togglePopup.bind(this)}
          />
          : <button
            className="btn btn-success chat"
            onClick={this.togglePopup.bind(this)}>
            <img src="http://localhost:5000/static/image/love.png" alt="Cinque Terre" width="40" height="40" />
          </button>
        }
      </div>
    );
  }
};


// ReactDOM.render(<ChatBot initItems={todoItems} />, document.getElementById('app'));
ReactDOM.render(<App />, document.getElementById('app'));