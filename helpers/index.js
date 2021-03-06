export const handleError = (res, error) => {
  if (process.env.NODE_ENV === "production") {
    return res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again",
    });
  }
  res.status(500).json({
    success: false,
    error: `${error.name}: ${error.message}`,
  });
};
