import React from 'react';
import { browserHistory } from 'react-router'

import { HomeMenu } from './HomeMenu.jsx';
import Signin from '../../actions/Signin.js';
import User from '../../stores/User.js';

import 'scss/components/_home.scss';

export class SignIn extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.router = context.router;
        this.state = {
            pseudo: '',
            prenom: '',
            nom: '',
            email: '',
            password: '',
            passwordConfirmation: '',
            isSuccess: null,
            message: '',
            User: {},
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentWillMount() {
        User.listen(this.onChange);
    }

    onChange() {
        var toto = Object.assign({}, this.state);
        toto.User = User.getState();
        this.setState(toto);
    }

    handleSubmit(e) {
      e.preventDefault();
      Signin.requestSignin(this.state);
    }

    handleChange(e) {
       e.preventDefault();
       var toto = Object.assign({}, this.state);
       toto[e.target.name] = e.target.value;
       this.setState(toto);
    }


    render() {

    console.log(JSON.stringify(this.state.User));
    if (this.state.User.code !== undefined) {
      var goodClass = this.state.User.code === 200 ? 'alertMessageSucc' : 'alertMessageErr';

      var alertMessage = <div className={goodClass}>{this.state.User.message}</div>;
      if (this.state.User.code === 200) {
        setTimeout(function(){
          browserHistory.push('/profile');
        }, 2000);
      }
    }

        return (
          <div className="center_div">
            <HomeMenu user={this.state.userConnected} />
            <form onSubmit={this.handleSubmit}>
              <label>Votre pseudo</label> : <input type='text' name='pseudo' value={this.state.pseudo} placeholder='Entrez votre pseudo' onChange={this.handleChange} />
              <br />
              <label>Votre prénom</label> : <input type='text' name='prenom' value={this.state.prenom} placeholder='Entrez votre prénom' onChange={this.handleChange} />
              <br />
               <label>Votre nom</label> : <input type='text' name='nom' value={this.state.nom} placeholder='Entrez votre nom' onChange={this.handleChange} />
               <br />
               <label>Votre mail</label> : <input type='text' name='email' value={this.state.email} placeholder='Entrez votre mail' onChange={this.handleChange} />
               <br />
               <label>Votre mot de passe</label> : <input type='password' name='password' value={this.state.password} placeholder='Entrez votre mot de passe' onChange={this.handleChange} />
               <br />
               <label>Confirmation</label> : <input type='password' name='passwordConfirmation' value={this.state.passwordConfirmation} placeholder='Confirmation' onChange={this.handleChange} />
               <br />
               <input type='submit' value='Submit'/>
            </form>
              {alertMessage}
          </div>
        );
    }
}

SignIn.propTypes = {
    user: React.PropTypes.shape({
        id: React.PropTypes.number.isRequired,
        name: React.PropTypes.string,
    }),
};
// SignIn.contextTypes = {
//     router: React.PropTypes.object.isRequired
// };
