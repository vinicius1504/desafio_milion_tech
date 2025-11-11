import 'reflect-metadata';
import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import swaggerUi from 'swagger-ui-express';
import { env } from './config/env';
import { initializeDatabase } from './config/database';
import routes from './routes';
import { errorMiddleware } from './middlewares/error.middleware';
import { swaggerSpec } from './config/swagger';

class Server {
  private app: Application;

  constructor() {
    this.app = express();
    this.configureMiddlewares();
    this.configureRoutes();
    this.configureErrorHandling();
  }

  private configureMiddlewares(): void {
    // Security middleware
    this.app.use(helmet());

    // CORS configuration
    this.app.use(
      cors({
        origin: env.cors.origin,
        credentials: true,
      })
    );

    // Compression
    this.app.use(compression());

    // Body parsing
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    // Logging
    if (env.nodeEnv === 'development') {
      this.app.use(morgan('dev'));
    }

    // Rate limiting
    const limiter = rateLimit({
      windowMs: env.rateLimit.windowMs,
      max: env.rateLimit.maxRequests,
      message: 'Too many requests from this IP, please try again later',
    });
    this.app.use('/api', limiter);
  }

  private configureRoutes(): void {
    // Swagger Documentation
    this.app.use(
      '/api-docs',
      swaggerUi.serve,
      swaggerUi.setup(swaggerSpec, {
        customCss: '.swagger-ui .topbar { display: none }',
        customSiteTitle: 'MillionTec API Docs',
        customfavIcon: '/favicon.ico',
      })
    );

    // Swagger JSON
    this.app.get('/api-docs.json', (req, res) => {
      res.setHeader('Content-Type', 'application/json');
      res.send(swaggerSpec);
    });

    // API routes
    this.app.use(env.apiPrefix, routes);

    // Root endpoint
    this.app.get('/', (req, res) => {
      res.json({
        success: true,
        message: 'MillionTec API - Customer Management System',
        version: '1.0.0',
        documentation: `http://localhost:${env.port}/api-docs`,
        health: `http://localhost:${env.port}${env.apiPrefix}/health`,
        endpoints: {
          authentication: `${env.apiPrefix}/auth`,
          customers: `${env.apiPrefix}/customers`,
        },
      });
    });
  }

  private configureErrorHandling(): void {
    // 404 handler
    this.app.use((req, res) => {
      res.status(404).json({
        success: false,
        message: 'Route not found',
      });
    });

    // Global error handler
    this.app.use(errorMiddleware);
  }

  public async start(): Promise<void> {
    try {
      // Initialize database
      await initializeDatabase();

      // Start server
      this.app.listen(env.port, () => {
        console.log(`
╔════════════════════════════════════════════════╗
║       MillionTec API Server Started           ║
╠════════════════════════════════════════════════╣
║   Environment: ${env.nodeEnv.padEnd(31)} ║
║   Port: ${String(env.port).padEnd(38)} ║
║   API Prefix: ${env.apiPrefix.padEnd(32)} ║
╠════════════════════════════════════════════════╣
║   📚 Documentation: http://localhost:${env.port}/api-docs
║   🏥 Health Check:  http://localhost:${env.port}${env.apiPrefix}/health
╚════════════════════════════════════════════════╝
        `);
      });
    } catch (error) {
      console.error('Failed to start server:', error);
      process.exit(1);
    }
  }
}

// Start the server
const server = new Server();
server.start();

export default server;
