import { useNavigate } from "react-router-dom";
import classes from "./ErrorPage.module.css";
import { PrimaryBttn } from "../../components/ui/button";

const ErrorPage: React.FC = () => {
  const navigate = useNavigate();

  const goBackHandler = () => {
    navigate(-1);
  };

  return (
    <div className={classes.error_page}>
      <h1 className={classes.title}>404 Page was not found!</h1>
      <p>The page you're looking for doesn't exist.</p>
      <PrimaryBttn
        onClick={goBackHandler}
        // style={{ background: "var(--red)", color: "black" }}
        status="danger"
        // status="warning"
      >
        Go Back
      </PrimaryBttn>
    </div>
  );
};

export default ErrorPage;
