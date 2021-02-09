import './HomeScreen.css'
import Nav from '../Nav'
import Banner from '../Banner'
import Row from '../Row'
import requests from '../Request'
import { useSelector } from 'react-redux'
import { selectSubscription } from '../features/subscriptionSlice'
import { useHistory } from 'react-router-dom'

function HomeScreen() {
  const subscription = useSelector(selectSubscription);
  const history = useHistory();
  if (!subscription || (subscription.constructor === Object && !Object.entries(subscription).length)) {
    // Direct user to profile screen is no active subscription
    history.push('/profile')
  }

  return (
    <div className="homeScreen">
      <Nav />
      <Banner />
      <Row title="NETFLIX ORIGINALS" fetchUrl={requests.fetchNetflixOriginal} isLargeRow />
      <Row title="Trending Now" fetchUrl={requests.fetchTrending} />
      <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
      <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
      <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
      <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
      <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />
      <Row title="Documentaries" fetchUrl={requests.fetchDocumetaries} />
    </div>
  )
}

export default HomeScreen
