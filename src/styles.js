import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  footer: {
    textAlign: 'center',
    position: 'fixed',
    left: 0,
    bottom: 0,
    color: 'black',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '120px',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  link: {
    textDecoration: 'none',
    color: 'rgba(21, 101, 192)',
  },
  image: {
    marginLeft: 20,
  },
  card: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    padding: '3%',
    borderRadius: 5,
    color: 'white',
    backgroundColor: 'rgba(21, 101, 192)',
    margin: '0 12px',
    textAlign: 'center',
    height: '25vmin',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column-reverse',
      textAlign: 'center',
      width: '100%',
      height: 'initial',
      '&:nth-of-type(1)': {
        marginBottom: '12px',
      },
    },
  },
  infoContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  outerContainer: {
    background: 'linear-gradient(to bottom, #0a192f, #112240)',
    minHeight: '100vh',
    width: '100%',
    padding: '20px 6%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    
  },
  topHeading: {
    width: '70%',
    fontSize: '5rem',
    [theme.breakpoints.down('sm')]: {
      textAlign: 'left',
      width: '100%',
      fontSize: '3.5rem'
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '2.5rem'
    },
  },
  desc: {
    color: '#64ffda',
    marginTop: '20px',
    fontWeight: '300',
    [theme.breakpoints.down('xs')]: {
      fontSize: '0.8rem'
    },
  },
  exploreButton: {
    transition: 'all 0.2s ease-in',
    outline: 'none',
    border: '2px solid #64ffda',
    padding: '10px 15px',
    fontSize: '1.2rem',
    marginTop: '40px',
    background: 'none',
    borderRadius: 5,
    color: '#e6f1ff',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.1rem',
    },
    '&:hover': {
      background: '#64ffda',
      color: '#0a192f',
    }
  },
  backButton: {
    transition: 'all 0.2s ease-in',
    outline: 'none',
    border: '2px solid #64ffda',
    padding: '10px 15px',
    fontSize: '1.2rem',
    marginTop: '20px',
    marginLeft: '20px',
    marginRight: '20px',
    background: 'none',
    borderRadius: 5,
    color: '#e6f1ff',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.1rem',
    },
    '&:hover': {
      background: '#64ffda',
      color: '#0a192f',
    }
  }
}));