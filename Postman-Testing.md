## Testing with Postman
1) Registering
- POST: http://localhost:8080/api/users/register
- Body - x-www-form-urlencoded
| Key | Value
--- | ---
name | Bob
email | bob@gmail.com
password | bob1234

2) Login
- POST: http://localhost:8080/api/users/login
- Body - x-www-form-urlencoded
| Key | Value
--- | ---
email | bob@gmail.com
password | bob1234

- Result: success, JWT token: 'Bearer { JWT }'

3) Current User
- GET: http://localhost:8080/api/users/current
- Headers: Authorization - Bearer JWT

4) Current Profile
- GET http://localhost:8080/api/profile