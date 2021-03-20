import { Route, Switch } from "react-router";
import { LandingPage, DocumentationPage, ProfilePage, AboutPage } from "./pages";

function App() {
  return (
    <Switch>
      <Route path="/" exact={true} component={LandingPage} />
      <Route path="/profile" exact={true} component={ProfilePage} />
      <Route path="/about" exact={true} component={AboutPage} />
    </Switch>
  );
}

export default App;
