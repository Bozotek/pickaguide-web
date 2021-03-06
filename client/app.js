import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import { MainLayout } from 'main/MainLayout.jsx';
import { Home } from 'views/Home.jsx';
import { Signup } from 'views/Signup.jsx';
import { Login } from 'views/Login.jsx';
import { Profile } from 'views/Profile.jsx';
import { OwnerProfile } from 'views/OwnerProfile.jsx';
import { EditAccount } from 'views/EditAccount.jsx';
import { EditProfile } from 'views/EditProfile.jsx';
import { Contact } from 'views/Contact.jsx';
import { Search } from 'views/Search.jsx';
import { Become } from 'views/guide/Become.jsx';
import { Adverts } from 'views/guide/Adverts.jsx';
import { Notifications } from 'views/Notifications.jsx';
import { Transactions } from 'views/Transactions.jsx';
import { OwnerVisits } from 'views/OwnerVisits.jsx';
import { VisitsToReview } from 'views/VisitsToReview.jsx';
import { ReviewVisit } from 'views/ReviewVisit.jsx';
import { OwnerVisit } from 'views/OwnerVisit.jsx';
import { OwnerAdvert } from 'views/guide/OwnerAdvert.jsx';
import { Advert } from 'views/guide/Advert.jsx';
import { CreateAdvert } from 'views/guide/CreateAdvert.jsx';
import { AllAdverts } from 'views/AllAdverts.jsx';
import { Travelbook } from 'views/Travelbook.jsx';
import { Chapter } from 'views/Book/Chapter.jsx';
import { EditChapter } from 'views/Book/EditChapter.jsx';
import About from 'views/About.jsx';

import RoutesMiddleware from 'services/Routing.js';
import 'services/Utils.js';

import 'scss/global.scss';


document.addEventListener('click', (event) => {
  if (event.target && event.target.className) {
    if ((typeof event.target.className === 'string' && event.target.className.indexOf('Modal ') !== -1) || event.target.className === 'Modal') {
      const footer = event.target.querySelector('.ModalFooter');
      const modalActions = footer.querySelectorAll('.ShadowedButton');
      modalActions.forEach((action) => {
        if (action.textContent === 'Dismiss') {
          action.click();
        }
      });
    }
  }
});

document.fonts.ready.then(() => {
  document.body.style.filter = 'blur(0px)';
});

browserHistory.listen(RoutesMiddleware);

ReactDOM.render(

  <Router history={browserHistory}>
    <Route path="/" component={MainLayout}>
      <IndexRoute component={Home} />
      <Route path="signup" component={Signup} />
      <Route path="login" component={Login} />
      <Route path="profiles/mine" component={OwnerProfile} />
      <Route path="profiles/:id" component={Profile} />
      <Route path="profiles/mine/edit" component={EditProfile} />
      <Route path="accounts/mine" component={EditAccount} />
      <Route path="contact-us" component={Contact} />
      <Route path="about" component={About} />
      <Route path="view-all-adverts" component={AllAdverts} />
      <Route path="search/:terms" component={Search} />
      <Route path="notifications" component={Notifications} />
      <Route path="transactions" component={Transactions} />
      <Route path="visits" component={OwnerVisits} />
      <Route path="visits/review" component={VisitsToReview} />
      <Route path="visits/:id/review" component={ReviewVisit} />
      <Route path="visits/mine/:type/:id" component={OwnerVisit} />
      <Route path="travelbook" component={Travelbook} />
      <Route path="travelbook/:id/edit" component={EditChapter} />
      <Route path="travelbook/:id" component={Chapter} />
      <Route path="guide/become" component={Become} />
      <Route path="guide/adverts" component={Adverts} />
      <Route path="guide/adverts/:id" component={Advert} />
      <Route path="guide/adverts/mine/new" component={CreateAdvert} />
      <Route path="guide/adverts/mine/:id" component={OwnerAdvert} />
    </Route>
  </Router>

  , document.getElementById('app')
);
