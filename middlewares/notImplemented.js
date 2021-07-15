export default function notImplemented(request, response, next) {
  return response.status(200).json({
    success: false,
    errors: [
      {
        path: ["server"],
        message: "This API is not implmented.",
      },
    ],
  });
}
