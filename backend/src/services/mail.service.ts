import { logger } from '../common/utils/logger'
import config from '../config'
import transporter from '../config/nodemailer'
import { tokenServ } from './tokens.service'

type TEmailServ = {
  NewLocation: (email: string, uid: string) => Promise<void>
}
export const EmailServ: TEmailServ = {
  NewLocation: undefined,
}

EmailServ.NewLocation = async (email: string, uid: string) => {
  const token = await tokenServ.genTokenForNewLocation(uid)

  const mailOptions = {
    from: config.app.email_user,
    to: email,
    subject: 'New location',
    text: `Seems like you moved to a new location. Please click the next link to confirm it: ${config.client}/new-location?=${uid}+${token}`,
  }

  // Send email
  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      logger.error(error)
    } else {
      logger.debug('Email sent:', info.response)
    }
  })
}
