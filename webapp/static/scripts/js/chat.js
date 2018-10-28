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

var InputBox = function (_React$Component) {
  _inherits(InputBox, _React$Component);

  function InputBox() {
    _classCallCheck(this, InputBox);

    return _possibleConstructorReturn(this, (InputBox.__proto__ || Object.getPrototypeOf(InputBox)).apply(this, arguments));
  }

  _createClass(InputBox, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { className: "row" },
        React.createElement(
          "div",
          { className: "col-1" },
          React.createElement("img", { src: "http://localhost:5000/static/image/user.png", style: floatRight, className: "img-circle", alt: "Cinque Terre", width: "40", height: "50" })
        ),
        React.createElement(
          "div",
          { className: "col-8 w3-card-4 question" },
          React.createElement(
            "p",
            null,
            this.props.text
          )
        ),
        React.createElement("div", { className: "col-1" })
      );
    }
  }]);

  return InputBox;
}(React.Component);

var OutputBox = function (_React$Component2) {
  _inherits(OutputBox, _React$Component2);

  function OutputBox() {
    _classCallCheck(this, OutputBox);

    return _possibleConstructorReturn(this, (OutputBox.__proto__ || Object.getPrototypeOf(OutputBox)).apply(this, arguments));
  }

  _createClass(OutputBox, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { className: "row" },
        React.createElement("div", { className: "col-1" }),
        React.createElement(
          "div",
          { className: "col-8 w3-card-4 response" },
          React.createElement(
            "p",
            null,
            React.createElement(
              "b",
              null,
              this.props.text
            )
          )
        ),
        React.createElement(
          "div",
          { className: "col-1" },
          React.createElement("img", { src: "http://localhost:5000/static/image/avatar.png", className: "img-circle", alt: "Cinque Terre", width: "40", height: "50" })
        )
      );
    }
  }]);

  return OutputBox;
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
      var _this4 = this;

      var items = this.props.items.map(function (item, index) {
        return React.createElement(ChatListItem, { key: index, item: item, index: index, removeItem: _this4.props.removeItem, markTodoDone: _this4.props.markTodoDone });
      });
      return React.createElement(
        "div",
        { className: "messageframe" },
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

    var _this5 = _possibleConstructorReturn(this, (ChatListItem.__proto__ || Object.getPrototypeOf(ChatListItem)).call(this, props));

    _this5.onClickClose = _this5.onClickClose.bind(_this5);
    _this5.onClickDone = _this5.onClickDone.bind(_this5);
    _this5.state = {
      error: null,
      isLoaded: false,
      items: []
    };
    return _this5;
  }

  _createClass(ChatListItem, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this6 = this;

      console.log(this.props.item.input);
      fetch("http://localhost:5000/project/gethint.php?q=" + this.props.item.input).then(function (res) {
        return res.json();
      }).then(function (result) {
        _this6.setState({
          isLoaded: true,
          items: result,
          output: result
        });
      },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        function (error) {
          _this6.setState({
            isLoaded: true,
            error: error
          });
        });
    }
  }, {
    key: "onClickClose",
    value: function onClickClose() {
      var index = parseInt(this.props.index);
      this.props.removeItem(index);
    }
  }, {
    key: "onClickDone",
    value: function onClickDone() {
      var index = parseInt(this.props.index);
      this.props.markTodoDone(index);
    }
  }, {
    key: "render",
    value: function render() {
      var todoClass = this.props.item.done ? "done" : "undone";
      var _state = this.state,
        error = _state.error,
        isLoaded = _state.isLoaded,
        items = _state.items;

      if (error) {
        return React.createElement(
          "div",
          null,
          React.createElement(InputBox, { text: this.props.item.input }),
          React.createElement(OutputBox, { text: error })
        );
      } else if (!isLoaded) {
        console.log("loading");
        return React.createElement(
          "div",
          null,
          React.createElement(InputBox, { text: this.props.item.input }),
          React.createElement(OutputBox, { text: "Loading.." })
        );
      } else {
        console.log(items);
        return React.createElement(
          "div",
          null,
          React.createElement(
            "div",
            null,
            React.createElement(InputBox, { text: this.props.item.input }),
            React.createElement(OutputBox, { text: items })
          )
        );
      }
    }
  }]);

  return ChatListItem;
}(React.Component);

var floatRight = {
  float: 'right'
};

var styleWidth = {
  width: '100%'
};

var ChatForm = function (_React$Component5) {
  _inherits(ChatForm, _React$Component5);

  function ChatForm(props) {
    _classCallCheck(this, ChatForm);

    var _this7 = _possibleConstructorReturn(this, (ChatForm.__proto__ || Object.getPrototypeOf(ChatForm)).call(this, props));

    _this7.onSubmit = _this7.onSubmit.bind(_this7);
    return _this7;
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
          { className: "input-group", style: styleWidth },
          React.createElement("input", { type: "text", ref: "itemName", className: "form-control", placeholder: "Send a message..." }),
          React.createElement(
            "div",
            { className: "input-group-btn" },
            React.createElement(
              "button",
              { type: "submit", className: "btn btn-success enter", style: floatRight },
              "Send"
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
        { className: "w3-card-4 row head" },
        React.createElement(
          "div",
          { className: "col-5" },
          React.createElement("img", { src: "http://localhost:5000/static/image/avatar.png", className: "img-circle center", alt: "Cinque Terre", width: "40", height: "50" })
        ),
        React.createElement(
          "div",
          { className: "col-6" },
          React.createElement(
            "h3",
            null,
            " Dumb Chatbot"
          )
        )
      );
    }
  }]);

  return ChatHeader;
}(React.Component);

var ChatBot = function (_React$Component7) {
  _inherits(ChatBot, _React$Component7);

  function ChatBot(props) {
    _classCallCheck(this, ChatBot);

    var _this9 = _possibleConstructorReturn(this, (ChatBot.__proto__ || Object.getPrototypeOf(ChatBot)).call(this, props));

    _this9.addItem = _this9.addItem.bind(_this9);
    _this9.removeItem = _this9.removeItem.bind(_this9);
    _this9.markTodoDone = _this9.markTodoDone.bind(_this9);
    _this9.state = { todoItems: todoItems };
    return _this9;
  }

  _createClass(ChatBot, [{
    key: "addItem",
    value: function addItem(todoItem) {
      todoItems.push({
        index: todoItems.length + 1,
        output: 'loading..',
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
        "div",
        { id: "chatbot", className: "chatbot" },
        React.createElement(ChatHeader, { onClick: this.props.closePopup }),
        React.createElement(
          "div",
          { className: "w3-display-topright icon" },
          React.createElement("img", { src: "http://localhost:5000/static/image/minimize.png", onClick: this.props.closePopup, alt: "Cinque Terre", width: "30", height: "30" })
        ),
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

    var _this10 = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this));

    _this10.state = {
      showPopup: false
    };
    return _this10;
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
        { className: "chatframe" },
        this.state.showPopup ? React.createElement(ChatBot, {
          initItems: todoItems,
          closePopup: this.togglePopup.bind(this)
        }) : React.createElement(
          "button",
          {
            className: "btn btn-success chat",
            onClick: this.togglePopup.bind(this)
          },
          React.createElement("img", { src: "http://localhost:5000/static/image/love.png", alt: "Cinque Terre", width: "40", height: "40" })
        )
      );
    }
  }]);

  return App;
}(React.Component);

;

// ReactDOM.render(<ChatBot initItems={todoItems} />, document.getElementById('app'));
ReactDOM.render(React.createElement(App, null), document.getElementById('app'));