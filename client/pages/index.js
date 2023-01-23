import axios from 'axios';

const LandingPage = ({ currentUser }) => {
   
    return <h1>Landing Page</h1>;
  };

    LandingPage.getInitialProps = async () => {
        if (typeof window === 'undefined') {
            // we are on the server
            // requests should be made to http://ingress-nginx.ingress-nginx.svc.cluster.local
            const { data } = await axios.get(
                'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser',
                {
                    headers: req.headers,
                }
            );
            return data;
        } else {
            // we are on the browser
            // requests can be made with a base url of ''
            const { data } = await axios.get('/api/users/currentuser');
            return data;
        }
    };

export default LandingPage 