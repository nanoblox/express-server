import Messages from "../utilities/messages";

export default function notImplemented(request, response, next) {
  return response.status(501).json({
    success: false,
    errors: new Messages().add(["error"], "Not Implemented"),
  });
}
