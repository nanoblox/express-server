import Messages from "./messages";

export default function serverErrorResponse(error, response) {
  console.log(error);
  return response.status(500).json({
    success: false,
    errors: new Messages().add(["server"], error.message),
  });
}
