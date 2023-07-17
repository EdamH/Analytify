import "primereact/resources/themes/lara-light-indigo/theme.css";     
import "primereact/resources/primereact.min.css"; 
import 'primeicons/primeicons.css';  
import '../../App.css';
import Facebook from '../../components/connect/Facebook'
import { Link } from 'react-router-dom';

function Connect() {
  
    
  return (
    
  
    <div className="App">
        <Link to="/">
              <Facebook />
        </Link>
          
    </div>
    
  );
}

export default Connect;