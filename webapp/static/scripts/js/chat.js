

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      input: props.input,
      items: []
    };
  }

  componentDidMount() {
    // code to execute in component did mount
  }

  apicall(){
    fetch("http://localhost:5000/project/gethint.php?q=hi")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result
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

  render() {
    this.apicall(this.state.input)
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (<div>{items}</div>);
    }
  }
}

export default Chat;
