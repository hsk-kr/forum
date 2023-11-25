import express, { NextFunction, Response, Request, Application } from 'express'
import helmet from 'helmet'
import config from '../config'
import compression from 'compression'
import { session_config } from '../config/session'
import session from 'express-session'
import cors from 'cors'
import { logRequest } from '../common/middleware/logRequest'
import errorHandler from '../common/middleware/errorHandler'
import NotFound from '../common/errors/custom/NotFound'
import { corsOptions, helmetOptions } from '../config/cors-helmet'
import { UserRoutes } from '../routes/user'
import { StatusRoute } from '../routes/status'
export default async function ExpressInit(): Promise<Application> {
  const app: Application = express()
  app.use(session(session_config))
  app.use(express.json({ limit: '50kb' })) //  used for handling encoded json data
  app.use(express.urlencoded({ extended: false, limit: '50kb' })) // used for handling url encoded form data like name=Example+Test&age=20
  app.use(express.raw({ limit: '50kb' }))
  if (config.NODE_ENV === 'production')
    app.set('trust proxy', 1), app.use(compression)
  // used to reduce the size of the files
  else app.use(compression({ level: 3 }))
  app.use(helmet(helmetOptions))
  app.use(cors(corsOptions))
  app.use(logRequest)
  // i will try using _variable-name  for unused variables
  //ROUTES
  app.use(StatusRoute)
  app.use(UserRoutes)
  app.all('*', (_req: Request, _res: Response, _next: NextFunction) => {
    throw new NotFound('Route does not exist')
  })
  app.use(errorHandler)
  return app
}
