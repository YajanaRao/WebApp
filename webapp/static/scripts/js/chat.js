"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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


var LikeButton = function (_React$Component) {
  _inherits(LikeButton, _React$Component);

  function LikeButton(props) {
    _classCallCheck(this, LikeButton);

    var _this = _possibleConstructorReturn(this, (LikeButton.__proto__ || Object.getPrototypeOf(LikeButton)).call(this, props));

    _this.state = {
      liked: false
    };
    return _this;
  }

  _createClass(LikeButton, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      if (this.state.liked) {
        return React.createElement(
          "div",
          {
            className: "level-item", onClick: function onClick() {
              return _this2.setState({ liked: false });
            }
          },
          React.createElement(
            "span",
            { className: "icon is-small has-text-danger" },
            React.createElement("i", { className: "fas fa-heart" })
          )
        );
      }

      return React.createElement(
        "div",
        {
          className: "level-item", onClick: function onClick() {
            return _this2.setState({ liked: true });
          }
        },
        React.createElement(
          "span",
          { className: "icon is-small" },
          React.createElement("i", { className: "fas fa-heart" })
        )
      );
    }
  }]);

  return LikeButton;
}(React.Component);

var Chat = function (_React$Component2) {
  _inherits(Chat, _React$Component2);

  function Chat() {
    _classCallCheck(this, Chat);

    return _possibleConstructorReturn(this, (Chat.__proto__ || Object.getPrototypeOf(Chat)).apply(this, arguments));
  }

  _createClass(Chat, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { className: "box" },
        React.createElement(
          "article",
          { className: "media" },
          React.createElement(
            "figure",
            { className: "media-left" },
            React.createElement("img", { src: this.props.image, className: "img-circle", alt: "Cinque Terre", width: "40", height: "50" })
          ),
          React.createElement(
            "div",
            { className: "media-content" },
            React.createElement(
              "div",
              { className: "content" },
              React.createElement(
                "p",
                null,
                this.props.text
              )
            ),
            React.createElement(
              "nav",
              { className: "level is-mobile" },
              React.createElement(
                "div",
                { className: "level-left" },
                React.createElement(
                  "a",
                  { className: "level-item" },
                  React.createElement(LikeButton, null)
                ),
                React.createElement(
                  "a",
                  { className: "level-item" },
                  React.createElement(
                    "span",
                    { className: "icon is-small " + this.props.status, onClick: this.props.onClickDone },
                    React.createElement("i", { className: "fa fa-thumbs-up", "aria-hidden": "true" })
                  )
                )
              )
            )
          ),
          React.createElement(
            "div",
            { className: "media-right" },
            React.createElement("button", { className: "delete", onClick: this.props.onClickClose })
          )
        )
      );
    }
  }]);

  return Chat;
}(React.Component);

var ChatList = function (_React$Component3) {
  _inherits(ChatList, _React$Component3);

  function ChatList() {
    _classCallCheck(this, ChatList);

    return _possibleConstructorReturn(this, (ChatList.__proto__ || Object.getPrototypeOf(ChatList)).apply(this, arguments));
  }

  _createClass(ChatList, [{
    key: "render",
    value: function render() {
      var _this5 = this;

      var items = this.props.items.map(function (item, index) {
        return React.createElement(ChatListItem, { key: index, item: item, index: index, removeItem: _this5.props.removeItem, markTodoDone: _this5.props.markTodoDone });
      });
      return React.createElement(
        "div",
        { className: "message-body messageframe" },
        " ",
        items,
        " "
      );
    }
  }]);

  return ChatList;
}(React.Component);

var ChatListItem = function (_React$Component4) {
  _inherits(ChatListItem, _React$Component4);

  function ChatListItem(props) {
    _classCallCheck(this, ChatListItem);

    var _this6 = _possibleConstructorReturn(this, (ChatListItem.__proto__ || Object.getPrototypeOf(ChatListItem)).call(this, props));

    _this6.onClickClose = _this6.onClickClose.bind(_this6);
    _this6.onClickDone = _this6.onClickDone.bind(_this6);
    _this6.state = {
      error: null,
      isLoaded: false,
      items: []
    };
    return _this6;
  }

  _createClass(ChatListItem, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this7 = this;

      console.log(this.props.item.input);
      fetch("http://localhost:5000/project/gethint.php?q=" + this.props.item.input).then(function (res) {
        return res.json();
      }).then(function (result) {
        _this7.setState({
          isLoaded: true,
          items: result,
          output: result
        });
      },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        function (error) {
          _this7.setState({
            isLoaded: true,
            error: error
          });
        });
    }
  }, {
    key: "onClickClose",
    value: function onClickClose() {
      console.log("closing pop up");
      var index = parseInt(this.props.index);
      this.props.removeItem(index);
    }
  }, {
    key: "onClickDone",
    value: function onClickDone() {
      console.log("done");
      var index = parseInt(this.props.index);
      this.props.markTodoDone(index);
    }
  }, {
    key: "render",
    value: function render() {
      var todoClass = this.props.item.done ? "has-text-success" : "has-text-dark";
      var _state = this.state,
        error = _state.error,
        isLoaded = _state.isLoaded,
        items = _state.items;

      if (error) {
        return React.createElement(
          "div",
          { className: "content" },
          React.createElement(Chat, { text: this.props.item.input, image: "http://localhost:5000/static/image/avatar.png" }),
          React.createElement(Chat, { text: error, image: "http://localhost:5000/static/image/user.png" })
        );
      } else if (!isLoaded) {
        console.log("loading");
        return React.createElement(
          "div",
          { className: "content" },
          React.createElement(Chat, { text: this.props.item.input, image: "http://localhost:5000/static/image/avatar.png" }),
          React.createElement(Chat, { text: "Loading..", image: "http://localhost:5000/static/image/user.png" })
        );
      } else {
        console.log(items);
        return React.createElement(
          "div",
          { className: "content" },
          React.createElement(Chat, { text: this.props.item.input, image: "http://localhost:5000/static/image/avatar.png", onClickClose: this.onClickClose, onClickDone: this.onClickDone, status: todoClass }),
          React.createElement(Chat, { text: items, image: "http://localhost:5000/static/image/user.png", onClickClose: this.onClickClose, status: todoClass })
        );
      }
    }
  }]);

  return ChatListItem;
}(React.Component);

var ChatForm = function (_React$Component5) {
  _inherits(ChatForm, _React$Component5);

  function ChatForm(props) {
    _classCallCheck(this, ChatForm);

    var _this8 = _possibleConstructorReturn(this, (ChatForm.__proto__ || Object.getPrototypeOf(ChatForm)).call(this, props));

    _this8.onSubmit = _this8.onSubmit.bind(_this8);
    return _this8;
  }

  _createClass(ChatForm, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.refs.itemName.focus();
    }
  }, {
    key: "onSubmit",
    value: function onSubmit(event) {
      event.preventDefault();
      var newItemValue = this.refs.itemName.value;

      if (newItemValue) {
        this.props.addItem({ newItemValue: newItemValue });
        this.refs.form.reset();
      }
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "form",
        { ref: "form", onSubmit: this.onSubmit },
        React.createElement(
          "div",
          { className: "message-body" },
          React.createElement(
            "div",
            { className: "field is-grouped" },
            React.createElement(
              "p",
              { className: "control is-expanded" },
              React.createElement("input", { type: "text", ref: "itemName", className: "input", placeholder: "Send a message..." })
            ),
            React.createElement(
              "p",
              { className: "control" },
              React.createElement(
                "button",
                { type: "submit", className: "button is-dark" },
                "Send"
              )
            )
          )
        )
      );
    }
  }]);

  return ChatForm;
}(React.Component);

var ChatHeader = function (_React$Component6) {
  _inherits(ChatHeader, _React$Component6);

  function ChatHeader() {
    _classCallCheck(this, ChatHeader);

    return _possibleConstructorReturn(this, (ChatHeader.__proto__ || Object.getPrototypeOf(ChatHeader)).apply(this, arguments));
  }

  _createClass(ChatHeader, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { className: "message-header" },
        React.createElement(
          "p",
          null,
          " Dumb Chatbot"
        ),
        React.createElement("button", { className: "delete", onClick: this.props.closePopup, "aria-label": "delete" })
      );
    }
  }]);

  return ChatHeader;
}(React.Component);

var ChatBot = function (_React$Component7) {
  _inherits(ChatBot, _React$Component7);

  function ChatBot(props) {
    _classCallCheck(this, ChatBot);

    var _this10 = _possibleConstructorReturn(this, (ChatBot.__proto__ || Object.getPrototypeOf(ChatBot)).call(this, props));

    _this10.addItem = _this10.addItem.bind(_this10);
    _this10.removeItem = _this10.removeItem.bind(_this10);
    _this10.markTodoDone = _this10.markTodoDone.bind(_this10);
    _this10.state = { todoItems: todoItems };
    return _this10;
  }

  _createClass(ChatBot, [{
    key: "addItem",
    value: function addItem(todoItem) {
      todoItems.push({
        index: todoItems.length + 1,
        // output: 'loading..',
        input: todoItem.newItemValue,
        done: false
      });
      this.setState({ todoItems: todoItems });
    }
  }, {
    key: "removeItem",
    value: function removeItem(itemIndex) {
      todoItems.splice(itemIndex, 1);
      this.setState({ todoItems: todoItems });
    }
  }, {
    key: "markTodoDone",
    value: function markTodoDone(itemIndex) {
      var todo = todoItems[itemIndex];
      todoItems.splice(itemIndex, 1);
      todo.done = !todo.done;
      todo.done ? todoItems.push(todo) : todoItems.unshift(todo);
      this.setState({ todoItems: todoItems });
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "article",
        { id: "chatbot", className: "message chatbot" },
        React.createElement(ChatHeader, { closePopup: this.props.closePopup, text: "hello" }),
        React.createElement(ChatList, { items: this.props.initItems, removeItem: this.removeItem, markTodoDone: this.markTodoDone }),
        React.createElement(ChatForm, { addItem: this.addItem })
      );
    }
  }]);

  return ChatBot;
}(React.Component);

var App = function (_React$Component8) {
  _inherits(App, _React$Component8);

  function App() {
    _classCallCheck(this, App);

    var _this11 = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this));

    _this11.state = {
      showPopup: false
    };
    return _this11;
  }

  _createClass(App, [{
    key: "togglePopup",
    value: function togglePopup() {
      this.setState({
        showPopup: !this.state.showPopup
      });
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { className: "container" },
        this.state.showPopup ? React.createElement(ChatBot, {
          initItems: todoItems,
          closePopup: this.togglePopup.bind(this)
        }) : React.createElement(
          "button",
          {
            className: "is-light chat",
            onClick: this.togglePopup.bind(this)
          },
          React.createElement(
            "span",
            { className: "icon is-large" },
            React.createElement("i", { className: "fa fa-comment", "aria-hidden": "true" })
          )
        )
      );
    }
  }]);

  return App;
}(React.Component);

;

// ReactDOM.render(<ChatBot initItems={todoItems} />, document.getElementById('app'));
ReactDOM.render(React.createElement(App, null), document.getElementById('app'));