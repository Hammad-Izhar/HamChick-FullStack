import { Route, Switch } from "react-router";
import { LandingPage, DocumentaionPage, ProfilePage, AboutPage } from "./pages";

function App() {
  return (
    <Switch>
      <Route path="/" exact={true} component={LandingPage} />
      <Route path="/docs" exact={true} component={DocumentaionPage} />
      <Route path="/profile" exact={true} component={ProfilePage} />
      <Route path="/about" exact={true} component={AboutPage} />
    </Switch>
  );
}

export default App;
