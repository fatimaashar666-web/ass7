export const Loading = ({ text = "Loading..." }) => (
  <div className="state" role="status"><span className="spinner" />{text}</div>
);
export const ErrorMessage = ({ text = "Something went wrong. Please try again." }) => (
  <div className="state error" role="alert">{text}</div>
);
export const Empty = ({ text }) => <div className="state">{text}</div>;
