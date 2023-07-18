import "./LoadingIf.css";
    
    
const LoadingIf = (bool) => {
  return (
    <div className={`loader ${bool ? '' : 'disppear'}`}>
    </div>
  );
};

export default LoadingIf;
