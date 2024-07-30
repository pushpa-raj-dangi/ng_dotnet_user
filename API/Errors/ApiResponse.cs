namespace API.Errors
{
    public class ApiResponse<T>
    {
        public ApiResponse(int statusCode, string message = null, T data = default(T))
        {
            StatusCode = statusCode;
            Message = message ?? GetMessage(statusCode);
            Data = data;
        }

        public int StatusCode { get; set; }
        public string Message { get; set; }
        public T Data { get; set; }

        private string GetMessage(int statusCode)
        {
            return statusCode switch
            {
                400 => "Bad request",
                401 => "Unauthorized",
                404 => "Resource not found",
                500 => "Internal server error",
                _ => null
            };
        }
    }
}