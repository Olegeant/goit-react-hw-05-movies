import { useState, lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import AppBar from './components/AppBar/AppBar';
import Container from './components/Container/Container';
import ScrollArrow from './components/ScrollArrow/ScrollArrow';
import Loader from './components/Loader/Loader';

const HomePage = lazy(() =>
  import('./views/HomePage.js' /* webpackChunkName: "homepage" */),
);
const MoviesPage = lazy(() =>
  import('./views/MoviesPage.js' /* webpackChunkName: "movies-page" */),
);
const MovieDetailsPage = lazy(() =>
  import(
    './views/MovieDetailsPage.js' /* webpackChunkName: "movie-details-page" */
  ),
);

const NotFoundPage = lazy(() =>
  import('./views/NotFoundPage.js' /* webpackChunkName: "not-found-page" */),
);

export default function App() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Container>
      <AppBar />

      <Suspense fallback={<Loader />}>
        <Switch>
          <Route path="/" exact>
            <HomePage isLoading={isLoading} showLoader={setIsLoading} />
          </Route>

          <Route path="/movies/:movieId">
            <MovieDetailsPage showLoader={setIsLoading} />
          </Route>

          <Route path="/movies">
            <MoviesPage isLoading={isLoading} showLoader={setIsLoading} />
          </Route>

          <Route>
            <NotFoundPage />
          </Route>
        </Switch>
      </Suspense>

      {isLoading && <Loader />}

      <ScrollArrow type="up" />
    </Container>
  );
}
