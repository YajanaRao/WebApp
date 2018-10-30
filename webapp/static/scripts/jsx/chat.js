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


class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      liked: false
     };
  }

  render() {
    if (this.state.liked) {
      return (
        <div className="level-item" onClick={() => this.setState({ liked: false })}>
          <span className="icon is-small has-text-danger"><i className="fas fa-heart"></i></span>
        </div>
      );
    }

    return (
      <div className="level-item" onClick={() => this.setState({ liked: true })}>
        <span className="icon is-small"><i className="fas fa-heart"></i></span>
      </div>
    );
  }
}

class Chat extends React.Component {
  render() {
    return (
      <div className="box">
        <article className="media">
          <figure className="media-left">
            <img src={this.props.image} className="img-circle" alt="Cinque Terre" width="40" height="50" />
          </figure>
          <div className="media-content">
            <div className="content">
              <p>{this.props.text}</p>
            </div>
            <nav className="level is-mobile">
              <div className="level-left">
                <a className="level-item">
                  <LikeButton/>
                  </a>
                <a className="level-item" >
                  <span className={"icon is-small "+this.props.status} onClick={this.props.onClickDone}>
                  <i className="fa fa-thumbs-up" aria-hidden="true"></i>
                  </span>
                </a>
              </div>
            </nav>
          </div>
          <div className="media-right">
            <button className="delete" onClick={this.props.onClickClose}></button>
          </div>
        </article>
      </div>
    );
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
      <div className="message-body messageframe"> {items} </div>
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
    console.log("closing pop up");
    var index = parseInt(this.props.index);
    this.props.removeItem(index);
  }
  onClickDone() {
    console.log("done");
    var index = parseInt(this.props.index);
    this.props.markTodoDone(index);
  }
  render() {
    var todoClass = this.props.item.done ?
      "has-text-success" : "has-text-dark";
    const { error, isLoaded, items } = this.state;
    if (error) {
      return (
        <div className="content">
          <Chat text={this.props.item.input} image="http://localhost:5000/static/image/avatar.png" />
          <Chat text={error} image="http://localhost:5000/static/image/user.png"/>
        </div>
      );
    } else if (!isLoaded) {
      console.log("loading");
      return (
        <div className="content">
          <Chat text={this.props.item.input} image="http://localhost:5000/static/image/avatar.png"/>
          <Chat text="Loading.." image="http://localhost:5000/static/image/user.png" />
        </div>
      );
    } else {
      console.log(items);
      return (
          <div className="content">
          <Chat text={this.props.item.input} image="http://localhost:5000/static/image/avatar.png" onClickClose={this.onClickClose} onClickDone={this.onClickDone} status={todoClass} />
          <Chat text={items} image="http://localhost:5000/static/image/user.png" onClickClose={this.onClickClose} status={todoClass}/>
          </div>
      );
    }
  }
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
        <div className="message-body">
          <div className="field is-grouped">
          <p className="control is-expanded">
          <input type="text" ref="itemName" className="input" placeholder="Send a message..." />
            </p>
          <p className="control">
              <button type="submit" className="button is-dark" >Send</button>
          </p>
            
          </div>
        </div>
      </form>
    );
  }
}

class ChatHeader extends React.Component {

  render() {
    return (
      <div className="message-header">
          <p> Dumb Chatbot</p>
        <button className="delete" onClick={this.props.closePopup} aria-label="delete"></button>
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
      // output: 'loading..',
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
      <article id="chatbot" className="message chatbot">
        <ChatHeader closePopup={this.props.closePopup} text="hello" />
        <ChatList items={this.props.initItems} removeItem={this.removeItem} markTodoDone={this.markTodoDone} />
        <ChatForm addItem={this.addItem} />
      </article>
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
      <div className="container">
        {this.state.showPopup ?
          <ChatBot
            initItems={todoItems}
            closePopup={this.togglePopup.bind(this)}
          />
          : <button
            className="is-light chat"
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