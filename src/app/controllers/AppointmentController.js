const { User, Appointment } = require('../models')

class AppointmentController {
  async index (req, res) {
    const appointments = await Appointment.findAll({
      where: {
        provider_id: req.params.provider
      },
      attributes: ['date'],
      include: [
        {
          model: User,
          as: 'UserId',
          attributes: ['name', 'avatar'],
          required: false
        }
      ]
    })

    console.log(appointments)

    res.render('appointments/appointmentsBook', { appointments })
  }

  async create (req, res) {
    const provider = await User.findByPk(req.params.provider)

    return res.render('appointments/create', { provider })
  }

  async store (req, res) {
    const { id } = req.session.user
    const { provider } = req.params
    const { date } = req.body

    console.log(req.body.date)

    await Appointment.create({
      user_id: id,
      provider_id: provider,
      date
    })

    return res.redirect('/app/dashboard')
  }
}

module.exports = new AppointmentController()
