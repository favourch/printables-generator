import React, { Component } from 'react'
import axios from 'axios'
import ProjectPreview from './infrastracture/ProjectPreview'
import { Link, browserHistory } from 'react-router'
import cloudinary from 'cloudinary'
import Navigation from './infrastracture/Navigation'

class Landing extends Component {

  constructor(props) {
    super(props)

    this.state = {
      users: [],
      topDesigns: [],
      firstName: '',
      email: ''
    }

    this.changeValue = this.changeValue.bind(this)
    this.redirectToLogin = this.redirectToLogin.bind(this)
  }    

		componentDidMount() {

      // Get top users list from the api
      axios.get('/api/top-users')
        .then(response => {
          this.setState({
              users: response.data
          })
        })
        .catch(console.error);        

      // Get designs list from the api
      axios.get('/api/top-designs')
        .then(response => {
          this.setState({
              topDesigns: response.data
          })
        })
        .catch(console.error);
		}

    changeValue(event) {
      this.setState({
        [event.target.name]: event.target.value
      })
    }

    redirectToLogin() {
      browserHistory.push({
        pathname: '/register',
        state: { 
          firstName: this.state.firstName, 
          email: this.state.email
        }
      })
    }

		render() {
			return (
        <div>
        <Navigation />

        <div className="website">
         <section className="hero-section">
            <div className="overlay"></div>
            <div className="wrapper">
              <div className="row">
                <div className="col-md-12">
                  <div className="row">
                    <div className="col-md-6 text-left hero-block">
                      <h1 className="main-heading">Design custom printable labels</h1>
                      <p>Create your own printables. Choose from multiple projects created by other users. Share your own designs and gain points and build your reputation in the community.</p>
                      <div className="horizontal-form">
                        <input type="text" className="form-input" name="firstName" placeholder="Your name" value={this.state.firstName} onChange={this.changeValue}/>
                        <input type="email" className="form-input" name="email" value={this.state.email} onChange={this.changeValue} placeholder="Your email" />
                        <button type="button" className="primary-submit" onClick={this.redirectToLogin}>Sign up</button>
                      </div>
                      <div className="more-link">or <a href="#"><strong>find out more</strong></a></div>
                    </div>
                  </div>  
                </div>
              </div>
            </div>

            <div className="shaped-block bottom"></div>
          </section>


          <section>
            <div className="wrapper">
              <div className="features">
                <div className="feature">
                  <div className="icon"><span className="lnr lnr-magic-wand"></span></div>
                  <h4>Design your projects</h4>
                  <p>Create your own printables. Choose from various different projects designed by other users for spice labels, gift labels and much more.</p>
                </div>
                <div className="feature">
                  <div className="icon"><span className="lnr lnr-users"></span></div>
                  <h4>Share your designs</h4>
                  <p>Create your own printables. Choose from various different projects designed by other users for spice labels, gift labels and much more.</p>
                </div>
                <div className="feature">
                  <div className="icon"><span className="lnr lnr-picture"></span></div>
                  <h4>Browse other projects</h4>
                  <p>Create your own printables. Choose from various different projects designed by other users for spice labels, gift labels and much more.</p>
                </div>
                <div className="feature">
                  <div className="icon"><span className="lnr lnr-printer"></span></div>
                  <h4>Print or save as pdf</h4>
                  <p>Create your own printables. Choose from various different projects designed by other users for spice labels, gift labels and much more.</p>
                </div>
              </div>
            </div>
          </section>

          <section style={{paddingTop: '20px'}}>
            <div className="wrapper">
              <div className="row">
                <div className="col-md-6">
                  <img className="framed-image" role="presentation" src="/img/generator.png" />
                </div>
                <div className="col-md-5 col-md-offset-1">
                  <h2 className="main-heading">Intuitive label generator</h2>
                  <p>Create your own printables. Choose from various different projects designed by other users for spice labels, gift labels and much more. Create your own printables. Choose from various different projects designed by other users for spice labels, gift labels and much more.</p>
                </div>
              </div>
            </div>
          </section>


          {/*
          <section className="call-to-action">
            <div className="wrapper">
              <div className="row">
                <div className="col-md-8 col-md-offset-2 text-center">
                  <h1 className="main-heading">Zaprojektuj własne etykiety na przyprawy</h1>
                  <p>Twórz własne projekty do druku. Wybieraj spośród gotowych zestawów etykiety na przyprawy, planów zajęć, kalendarzy i wielu innych zaprojektowanych przez użytkowników. Udostępniaj i dziel się swoimi projektami zdobywając reputację.</p>
                  <div className="horizontal-form">
                    <input type="text" className="form-input" placeholder="Twoje imię" />
                    <input type="email" className="form-input" placeholder="Twój email" />
                    <input type="submit" className="primary-submit" value="Utwórz konto" />
                  </div>
                </div>
              </div>
            </div>
          </section>
        */}

          <section id="topUsers" className="grey-bg">
            <div className="shaped-block light top"></div>
            <div className="wrapper">
              <div className="row">
                <div className="col-md-12">

                  <h2 className="page-title main-heading text-center">Top users</h2> 

                  <div className="top-users">
                    {this.state.users.map((user, index) => 
                      <div className="design-author" key={user._id}>
                        <div className="rating-position"><span className="hash">#</span>{index+1}</div>
                        <Link to={`/users/${user.username}`}>
                          <div className="profile-picture" style={{backgroundImage: 'url('+cloudinary.url('users/'+user._id+'.jpg', {width: 100, height: 100, crop: "fill"})+')'}}></div>
                        </Link>
                        <div className="author">
                          <Link to={`/users/${user.username}`}>
                            <div className="name">{user.firstName} {user.lastName}</div>
                          </Link>
                          <Link to={`/users/${user.username}`}>
                            <div className="username">@{user.username}</div>
                          </Link>
                          <div className="rating"><i className="lnr lnr-diamond"></i> {user.points}</div>
                        </div>
                      </div>
                    )}
                  </div>

                </div>
              </div>
            </div>
          </section>

          <section className="small-cta">
            <div className="overlay"></div>
            <div className="wrapper">
              <div className="row">
                <div className="col-md-6 col-md-offset-3 text-center">
                  <h2>Create your own printable labels</h2>
                  <button className="primary-submit" onClick={this.redirectToLogin}>Start designing now</button>
                </div>
              </div>
            </div>
            <div className="shaped-block bottom"></div>
          </section>


          <section>
            <div className="wrapper">
              <div className="row">
                <div className="col-md-12">

                  <h2 className="page-title main-heading text-center">Most popular projects</h2> 

                  <div className="design-grid">
                    {this.state.topDesigns.map(design => 
                      <ProjectPreview 
                        key={design._id}
                        title={design.title}
                        description={design.description}
                        author={design.author}
                        id={design._id}
                        index={this.state.topDesigns.indexOf(design)}
                        designsArray={this.state.topDesigns}
                        {...design} />
                    )}
                  </div>

                  <div className="text-center">
                    <Link to="/browse">Browse more projects...</Link>
                  </div>
                
                </div>
              </div>
            </div>
          </section>


          <section className="call-to-action reversed">
            <div className="shaped-block top primary-color"></div>
            <div className="wrapper">
              <div className="row">
                <div className="col-md-8 col-md-offset-2 text-center">
                  <h1 className="main-heading">Zaprojektuj własne etykiety na przyprawy</h1>
                  <p>Twórz własne projekty do druku. Wybieraj spośród gotowych zestawów etykiety na przyprawy, planów zajęć, kalendarzy i wielu innych zaprojektowanych przez użytkowników. Udostępniaj i dziel się swoimi projektami zdobywając reputację.</p>
                  <div className="horizontal-form">
                    <input type="text" className="form-input" name="firstName" placeholder="Your name" value={this.state.firstName} onChange={this.changeValue}/>
                    <input type="email" className="form-input" name="email" value={this.state.email} onChange={this.changeValue} placeholder="Your email" />
                    <button type="button" className="primary-submit" onClick={this.redirectToLogin}>Sign up</button>
                  </div>
                </div>
              </div>
            </div>
          </section>


          <footer>
            <div className="wrapper">
              <div className="row">
                <div className="col-md-3">
                  <h4>Aplikacja</h4>
                  <ul>
                    <li><a href="#">O co chodzi?</a></li>
                    <li><a href="#">Regulamin</a></li>
                    <li><a href="#">Polityka prywatności</a></li>
                    <li><a href="#">Kontakt</a></li>
                  </ul>
                </div>
                <div className="col-md-3">
                  <h4>Autor</h4>
                  <p>Aplikacja powstała na potrzeby bloga MissBerry.pl</p>
                </div>
                <div className="col-md-3">
                  <h4>Aplikacja</h4>
                  <ul>
                    <li><a href="#">Rejestracja</a></li>
                    <li><a href="#">Logowanie</a></li>
                  </ul>
                </div>
                <div className="col-md-3">
                  <h4>Kontakt</h4>
                  <p>Blue Creative sp. z o.o</p>
                  <p>ul. Mielczarskiego 49/20</p>
                  <p>51-663 Wrocław</p>
                  <p>Polska</p>
                </div>
              </div> 
            </div> 
          </footer>
        </div>
        </div>
			)
		}
}

export default Landing;
