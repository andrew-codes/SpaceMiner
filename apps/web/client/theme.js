import blue from '@material-ui/core/colors/blue';
import pink from '@material-ui/core/colors/pink';
import { createMuiTheme } from '@material-ui/core/styles';

export default createMuiTheme({
	palette: {
	  primary: {
		light: '#fa5788',
		main: pink['700'],
		dark: '#8c0032',
		contrastText: '#fff',
	  },
	  secondary: {
		light: '#63a4ff',
		main: blue['700'],
		dark: '#004ba0',
		contrastText: '#000',
	  },
	},
});