const validator = (dataField = 'body', schema, handler) => async (req, res) => {
  const data = req[dataField];
  const isValid = await schema.isValid(data);
  
  if (isValid) {
    return handler(req, res);
  }
  else {
    return res.status(422).json({ message: "Invalid data passed" });
  }
};

export default validator;