In this project I used this tech stack:

- Node.js (with Express.js)
- TypeScript
- MySQL (hosted on Aiven)

Getting Started
To start the app you need to, first, create a file named .env in the root of the project with the following structure (can use the emailed file):
DB_HOST=provided-db-host
DB_PORT=18003
DB_USER=provided-db-username
DB_PASSWORD=provided-db-password
DB_NAME=defaultdb
PORT=5000
ABC_FASHION_API=provided-API-Link
ABC_FASHION_USER=provided-API-User
ABC_FASHION_PASS=provided-API-Password

After the dependencies are installed, start the application by running:
npm run dev

Future Improvements
Here are some future improvements for the backend:
Implement authentication to secure endpoints, ensuring that only authorized users can access certain data.
Enhance the metrics calculation by adding more granular data and improving the metrics that are sent to Grafana for more meaningful visualizations.
Add functionality to send automatic emails to customers regarding shipment statuses (delays, expected delivery) and promotions based on defined business rules. Also, email managers when delays exceed a certain threshold.
Logging and Monitoring: Implement proper logging (using AWS CloudWatch) for better debugging and real-time error tracking. Set up error monitoring tool Sentry.
Add unit and integration tests to ensure the application is working as expected
