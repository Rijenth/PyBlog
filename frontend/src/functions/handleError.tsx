const handleError = (errorMessages: Array<string>) => {
  return errorMessages.map((message, index) => {
    return (
      <div key={index} style={{marginBottom: 10}} className="alertBox">
        <span className="errorMessage">{message}</span>
      </div>
    );
  });
};

export default handleError;