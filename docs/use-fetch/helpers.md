# Helper Functions

## Preparing Init

The following functions will initialize the `RequestInit` object for specific use-cases.
All of them will set`credentials` to `"include"` and a header `Accept` with value of `"application/json"`

- `prepareGet` prepares a GET request
- `preparePost` prepares a form-data POST request.
- `preparePostUrlEncoded` prepares a form url-encoded POST request
- `prepareFormDataPost` prepares a POST request with a `FormData` object and detects if it contains files.
  - if it contains files, it will call `preparePost` and set the body to the formData object.
  - otherwise `preparePostUrlEncoded` will be called and the properties of the formData will be set accordingly.

You don't need to use them. You can write your own code to initialize the `RequestInit` object. These are just here for convenience.
