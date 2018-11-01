!function(e){var t={};function n(a){if(t[a])return t[a].exports;var o=t[a]={i:a,l:!1,exports:{}};return e[a].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,a){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(n.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(a,o,function(t){return e[t]}.bind(null,o));return a},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}();function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var c=[],s=function(e){function t(e){o(this,t);var n=r(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.state={liked:!1},n}return i(t,React.Component),a(t,[{key:"render",value:function(){var e=this;return this.state.liked?React.createElement("div",{className:"level-item",onClick:function(){return e.setState({liked:!1})}},React.createElement("span",{className:"icon is-small has-text-danger"},React.createElement("i",{className:"fas fa-heart"}))):React.createElement("div",{className:"level-item",onClick:function(){return e.setState({liked:!0})}},React.createElement("span",{className:"icon is-small"},React.createElement("i",{className:"fas fa-heart"})))}}]),t}(),l=function(e){function t(){return o(this,t),r(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return i(t,React.Component),a(t,[{key:"render",value:function(){return React.createElement("div",{className:"box"},React.createElement("article",{className:"media"},React.createElement("figure",{className:"media-left"},React.createElement("img",{src:this.props.image,className:"img-circle",alt:"Cinque Terre",width:"40",height:"50"})),React.createElement("div",{className:"media-content"},React.createElement("div",{className:"content"},React.createElement("p",null,this.props.text)),React.createElement("nav",{className:"level is-mobile"},React.createElement("div",{className:"level-left"},React.createElement("a",{className:"level-item"},React.createElement(s,null)),React.createElement("a",{className:"level-item"},React.createElement("span",{className:"icon is-small "+this.props.status,onClick:this.props.onClickDone},React.createElement("i",{className:"fa fa-thumbs-up","aria-hidden":"true"})))))),React.createElement("div",{className:"media-right"},React.createElement("button",{className:"delete",onClick:this.props.onClickClose}))))}}]),t}(),m=function(e){function t(){return o(this,t),r(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return i(t,React.Component),a(t,[{key:"render",value:function(){var e=this,t=this.props.items.map(function(t,n){return React.createElement(u,{key:n,item:t,index:n,removeItem:e.props.removeItem,markTodoDone:e.props.markTodoDone})});return React.createElement("div",{className:"message-body messageframe"}," ",t," ")}}]),t}(),u=function(e){function t(e){o(this,t);var n=r(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.onClickClose=n.onClickClose.bind(n),n.onClickDone=n.onClickDone.bind(n),n.state={error:null,isLoaded:!1,items:[]},n}return i(t,React.Component),a(t,[{key:"componentDidMount",value:function(){var e=this;console.log(this.props.item.input),fetch("/project/gethint.php?q="+this.props.item.input).then(function(e){return e.json()}).then(function(t){e.setState({isLoaded:!0,items:t,output:t})},function(t){e.setState({isLoaded:!0,error:t})})}},{key:"onClickClose",value:function(){console.log("closing pop up");var e=parseInt(this.props.index);this.props.removeItem(e)}},{key:"onClickDone",value:function(){console.log("done");var e=parseInt(this.props.index);this.props.markTodoDone(e)}},{key:"render",value:function(){var e=this.props.item.done?"has-text-success":"has-text-dark",t=this.state,n=t.error,a=t.isLoaded,o=t.items;return n?React.createElement("div",{className:"content"},React.createElement(l,{text:this.props.item.input,image:"/static/image/avatar.png"}),React.createElement(l,{text:n,image:"/static/image/user.png"})):a?(console.log(o),React.createElement("div",{className:"content"},React.createElement(l,{text:this.props.item.input,image:"/static/image/avatar.png",onClickClose:this.onClickClose,onClickDone:this.onClickDone,status:e}),React.createElement(l,{text:o,image:"/static/image/user.png",onClickClose:this.onClickClose,status:e}))):(console.log("loading"),React.createElement("div",{className:"content"},React.createElement(l,{text:this.props.item.input,image:"/static/image/avatar.png"}),React.createElement(l,{text:"Loading..",image:"/static/image/user.png"})))}}]),t}(),p=function(e){function t(e){o(this,t);var n=r(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.onSubmit=n.onSubmit.bind(n),n}return i(t,React.Component),a(t,[{key:"componentDidMount",value:function(){this.refs.itemName.focus()}},{key:"onSubmit",value:function(e){e.preventDefault();var t=this.refs.itemName.value;t&&(this.props.addItem({newItemValue:t}),this.refs.form.reset())}},{key:"render",value:function(){return React.createElement("form",{ref:"form",onSubmit:this.onSubmit},React.createElement("div",{className:"message-body"},React.createElement("div",{className:"field is-grouped"},React.createElement("p",{className:"control is-expanded"},React.createElement("input",{type:"text",ref:"itemName",className:"input",placeholder:"Send a message..."})),React.createElement("p",{className:"control"},React.createElement("button",{type:"submit",className:"button is-dark"},"Send")))))}}]),t}(),d=function(e){function t(){return o(this,t),r(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return i(t,React.Component),a(t,[{key:"render",value:function(){return React.createElement("div",{className:"message-header"},React.createElement("p",null," Dumb Chatbot"),React.createElement("button",{className:"delete",onClick:this.props.closePopup,"aria-label":"delete"}))}}]),t}(),f=function(e){function t(e){o(this,t);var n=r(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.addItem=n.addItem.bind(n),n.removeItem=n.removeItem.bind(n),n.markTodoDone=n.markTodoDone.bind(n),n.state={todoItems:c},n}return i(t,React.Component),a(t,[{key:"addItem",value:function(e){c.push({index:c.length+1,input:e.newItemValue,done:!1}),this.setState({todoItems:c})}},{key:"removeItem",value:function(e){c.splice(e,1),this.setState({todoItems:c})}},{key:"markTodoDone",value:function(e){var t=c[e];c.splice(e,1),t.done=!t.done,t.done?c.push(t):c.unshift(t),this.setState({todoItems:c})}},{key:"render",value:function(){return React.createElement("article",{id:"chatbot",className:"message chatbot"},React.createElement(d,{closePopup:this.props.closePopup,text:"hello"}),React.createElement(m,{items:this.props.initItems,removeItem:this.removeItem,markTodoDone:this.markTodoDone}),React.createElement(p,{addItem:this.addItem}))}}]),t}(),h=function(e){function t(){o(this,t);var e=r(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return e.state={showPopup:!1},e}return i(t,React.Component),a(t,[{key:"togglePopup",value:function(){this.setState({showPopup:!this.state.showPopup})}},{key:"render",value:function(){return React.createElement("div",{className:"container"},this.state.showPopup?React.createElement(f,{initItems:c,closePopup:this.togglePopup.bind(this)}):React.createElement("button",{className:"is-light chat",onClick:this.togglePopup.bind(this)},React.createElement("span",{className:"icon is-large has-text-info"},React.createElement("i",{className:"fa fa-comment","aria-hidden":"true"}))))}}]),t}();ReactDOM.render(React.createElement(h,null),document.getElementById("app"))}]);