import "./index.css";

const showSnackbar = (payload) => {
  console.log("checking payload", payload);
  return (
    <div class="snackbar" id={`${payload.type}`}>
      <p>{payload.text}</p>
    </div>
  );
};

const hideSnackbar = (setSnackbar) => {
  setTimeout(
    () =>
      setSnackbar({
        status: false,
      }),
    2000
  );
};

export { showSnackbar, hideSnackbar };
