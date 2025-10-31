<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>EIE Backend README</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f6f8fa; margin: 0; padding: 2rem; }
        .container { max-width: 800px; margin: 0 auto; background-color: #fff; border: 1px solid #ddd; border-radius: 6px; padding: 2rem; }
        h1, h2, h3 { border-bottom: 1px solid #eee; padding-bottom: 0.5em; margin-top: 1.5em; }
        h1 { font-size: 2em; }
        h2 { font-size: 1.5em; }
        h3 { font-size: 1.2em; border-bottom: none; }
        code { font-family: "SFMono-Regular", Consolas, Menlo, Courier, monospace; background-color: #f3f3f3; padding: 0.2em 0.4em; border-radius: 3px; }
        pre { background-color: #24292e; color: #f6f8fa; padding: 1em; border-radius: 6px; overflow-x: auto; }
        pre code { background-color: transparent; padding: 0; }
        a { color: #0366d6; text-decoration: none; }
        a:hover { text-decoration: underline; }
        ul, ol { padding-left: 2em; }
        li { margin-bottom: 0.5em; }
        table { border-collapse: collapse; width: 100%; margin-top: 1em; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f6f8fa; font-weight: bold; }
    </style>
</head>
<body>
    <div class="container">
        <h1>EIE Backend</h1>
        <p>This project is the REST API server for the website of the School of Electrical Engineering at UCV. It's built with NestJS and provides all the dynamic data for the <a href="https://github.com/LideEieUcv/eie-frontend">frontend application</a>.</p>
        <h2>Technologies Used</h2>
        <ul>
            <li><a href="https://nestjs.com/">NestJS</a> - A progressive Node.js framework for building efficient, reliable and scalable server-side applications.</li>
            <li><a href="https://www.typescriptlang.org/">TypeScript</a></li>
            <li><a href="https://typeorm.io/">TypeORM</a> - An ORM for TypeScript and JavaScript that simplifies database interactions.</li>
            <li><a href="https://www.sqlite.org/">SQLite</a> - A self-contained, serverless SQL database engine used for development.</li>
            <li><a href="https://swagger.io/">Swagger (OpenAPI)</a> - For API documentation and testing.</li>
        </ul>
        <h2>Architectural Overview</h2>
        <p>The backend follows a modular architecture, where each resource (e.g., News, Events, People) is encapsulated in its own module. This promotes separation of concerns and scalability.</p>
        <ul>
            <li><strong>Noticias Module:</strong> Manages all CRUD operations and logic for news articles.</li>
            <li><strong>Eventos Module:</strong> Manages all CRUD operations and logic for events.</li>
            <li><strong>Personas Module:</strong> Manages all CRUD operations and advanced filtering for the staff directory.</li>
        </ul>
        <h2>Getting Started</h2>
        <p>To get a local copy of this server up and running, follow these steps:</p>
        <ol>
            <li>
                <p><strong>Clone the repository:</strong></p>
                <pre><code>git clone https://github.com/your-username/eie-backend.git</code></pre>
                <p><em>(Remember to replace <code>your-username</code> with the correct repository URL)</em></p>
            </li>
            <li>
                <p><strong>Install dependencies:</strong></p>
                <pre><code>npm install</code></pre>
            </li>
            <li>
                <p><strong>Start the development server:</strong></p>
                <pre><code>npm run start:dev</code></pre>
            </li>
        </ol>
        <p>The server will start on <a href="http://localhost:3000">http://localhost:3000</a> by default. A SQLite database file named <code>escuela.sqlite</code> will be automatically created in the root directory upon the first run.</p>
        <h2>API Endpoints & Usage</h2>
        <p>Once the server is running, you can access the interactive API documentation (powered by Swagger) at:</p>
        <p><a href="http://localhost:3000/api"><strong>http://localhost:3000/api</strong></a></p>
        <p>This interface allows you to test all endpoints and see the expected request bodies and responses. Use the <code>POST</code> endpoints to populate the database.</p>
        <h3>Main Endpoints</h3>
        <table>
            <thead>
                <tr>
                    <th>Method</th>
                    <th>Endpoint</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><code>GET</code></td>
                    <td><code>/noticias</code></td>
                    <td>Retrieves a list of all news articles.</td>
                </tr>
                 <tr>
                    <td><code>GET</code></td>
                    <td><code>/noticias/latest</code></td>
                    <td>Retrieves the 3 most recent news articles for the home page.</td>
                </tr>
                <tr>
                    <td><code>GET</code></td>
                    <td><code>/noticias/:id</code></td>
                    <td>Retrieves a single news article by its ID.</td>
                </tr>
                <tr>
                    <td><code>GET</code></td>
                    <td><code>/eventos</code></td>
                    <td>Retrieves a list of all events.</td>
                </tr>
                <tr>
                    <td><code>GET</code></td>
                    <td><code>/eventos/latest</code></td>
                    <td>Retrieves the 3 next upcoming events.</td>
                </tr>
                <tr>
                    <td><code>GET</code></td>
                    <td><code>/eventos/:id</code></td>
                    <td>Retrieves a single event by its ID.</td>
                </tr>
                <tr>
                    <td><code>GET</code></td>
                    <td><code>/personas</code></td>
                    <td>Retrieves a list of people, with filtering options.</td>
                </tr>
            </tbody>
        </table>
        <h3>Filtering for <code>/personas</code></h3>
        <p>The <code>GET /personas</code> endpoint accepts the following query parameters for filtering and sorting:</p>
        <ul>
            <li><code>categoria</code>: Filters by category (<code>Profesores</code>, <code>Administrativos</code>, <code>Egresados</code>).</li>
            <li><code>search</code>: Filters by name (partial match).</li>
            <li><code>sort</code>: Sorts by name (<code>ASC</code> or <code>DESC</code>).</li>
        </ul>
        <p>Example: <code>/personas?categoria=Profesores&sort=DESC</code></p>
    </div>
</body>
</html>