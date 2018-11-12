import zxcvbn from '../../js/zxcvbn'
class Password extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: 'password',
            score: 'null',
            class: 'progress is-small'
        }
        this.showHide = this.showHide.bind(this);
        this.passwordStrength = this.passwordStrength.bind(this);
    }

    showHide(e) {
        e.preventDefault();
        e.stopPropagation();
        this.setState({
            type: this.state.type === 'input' ? 'password' : 'input'
        })
    }

    passwordStrength(e) {
        if (e.target.value === '') {
            this.setState({
                score: 'null',
                class: 'progress is-small'
            })
        }
        else {
            var pw = zxcvbn(e.target.value);
            if (pw.score == 'null'){
                this.setState({
                    score: 0,
                    class: 'progress is-small is-danger'
                });
            }
            else if(pw.score == '0'){
                this.setState({
                    score: 5,
                    class: 'progress is-small is-danger'
                })
            }
            else if(pw.score == '1'){
                this.setState({
                    score: 25,
                    class: 'progress is-small is-warning'
                })
            }
            else if(pw.score == 2){
                this.setState({
                    score: 50,
                    class: 'progress is-small is-info'
                });
            }
            else{
                this.setState({
                    score: 100,
                    class: 'progress is-small is-success'
                });
            }
            
        }

    }

    render() {
        return (
            <div>
            <div className="field">
                <div className="control has-icons-right has-icons-left">
                        <input type={this.state.type} className="input is-large" onChange={this.passwordStrength} placeholder="Password" />
                        <span class="icon is-small is-left">
                            <i class="fas fa-lock"></i>
                        </span>
                        <span className="icon is-small is-right"  onClick={this.showHide}>
                            {this.state.type === 'input' ? <i class="fa fa-eye-slash" aria-hidden="true"></i> : <i class="fa fa-eye" aria-hidden="true"></i>}
                        </span>
            </div>
            </div>
            <progress className={this.state.class} value={this.state.score} max="100">{this.state.score}</progress>
            </div>
        )
    }
}

ReactDOM.render(<Password />, document.getElementById('password'));