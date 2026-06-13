import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// ─── Middleware ────────────────────────────────────────────────────────────────
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  methods: ['GET', 'POST'],
  credentials: true,
}))
app.use(express.json())

// ─── MongoDB ───────────────────────────────────────────────────────────────────
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB error:', err))

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  replied: { type: Boolean, default: false },
})

const Contact = mongoose.model('Contact', contactSchema)

// ─── Nodemailer ────────────────────────────────────────────────────────────────
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // Use Gmail App Password
  },
})

const sendNotificationEmail = async ({ name, email, phone, message }) => {
  const html = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body { background: #050508; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; }
      .wrapper { max-width: 600px; margin: 0 auto; background: #0a0a0f; }
      .header { background: linear-gradient(135deg, #1a0510, #0a0a0f); padding: 40px 40px 30px; border-bottom: 1px solid #1a0010; }
      .logo { font-size: 11px; letter-spacing: 0.3em; color: #e11d48; text-transform: uppercase; margin-bottom: 20px; }
      .title { font-size: 28px; font-weight: 700; color: #ffffff; line-height: 1.2; }
      .title span { color: #e11d48; }
      .body { padding: 40px; }
      .field { margin-bottom: 24px; }
      .label { font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: #666; margin-bottom: 6px; }
      .value { font-size: 14px; color: #ccc; line-height: 1.6; padding: 12px 16px; background: #111118; border-left: 2px solid #e11d48; }
      .footer { padding: 24px 40px; border-top: 1px solid #111; }
      .footer p { font-size: 11px; color: #444; letter-spacing: 0.1em; }
    </style>
  </head>
  <body>
    <div class="wrapper">
      <div class="header">
        <div class="logo">Portfolio Contact System</div>
        <div class="title">New Message<br/><span>from ${name}</span></div>
      </div>
      <div class="body">
        <div class="field">
          <div class="label">Name</div>
          <div class="value">${name}</div>
        </div>
        <div class="field">
          <div class="label">Email</div>
          <div class="value">${email}</div>
        </div>
        <div class="field">
          <div class="label">Phone</div>
          <div class="value">${phone || '—'}</div>
        </div>
        <div class="field">
          <div class="label">Message</div>
          <div class="value">${message.replace(/\n/g, '<br>')}</div>
        </div>
      </div>
      <div class="footer">
        <p>Sent via jigneshramawat.dev • ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST</p>
      </div>
    </div>
  </body>
  </html>`

  return transporter.sendMail({
    from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
    to: 'jigneshramawat21@gmail.com',
    subject: `📬 New message from ${name} via Portfolio`,
    html,
    replyTo: email,
  })
}

const sendAutoReply = async ({ name, email }) => {
  const html = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body { background: #050508; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; }
      .wrapper { max-width: 600px; margin: 0 auto; background: #0a0a0f; }
      .header { background: linear-gradient(135deg, #1a0510, #0a0a0f); padding: 50px 40px; border-bottom: 1px solid #1a0010; text-align: center; }
      .monogram { width: 60px; height: 60px; background: rgba(225,29,72,0.1); border: 1px solid rgba(225,29,72,0.3); display: inline-flex; align-items: center; justify-content: center; font-size: 20px; font-weight: 700; color: #e11d48; margin-bottom: 20px; clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%); }
      .title { font-size: 24px; font-weight: 700; color: #fff; }
      .body { padding: 40px; }
      .greeting { font-size: 15px; color: #aaa; line-height: 1.7; margin-bottom: 24px; }
      .highlight { color: #e11d48; }
      .divider { height: 1px; background: linear-gradient(to right, transparent, rgba(225,29,72,0.3), transparent); margin: 30px 0; }
      .signature { font-size: 13px; color: #666; }
      .name { font-size: 16px; font-weight: 700; color: #fff; margin-top: 8px; }
      .role { font-size: 11px; letter-spacing: 0.2em; color: #e11d48; text-transform: uppercase; margin-top: 4px; }
    </style>
  </head>
  <body>
    <div class="wrapper">
      <div class="header">
        <div class="monogram">JR</div>
        <div class="title">Message received!</div>
      </div>
      <div class="body">
        <div class="greeting">
          Hi <span class="highlight">${name}</span>,<br><br>
          Thank you for reaching out! I've received your message and will get back to you as soon as possible —
          usually within <strong style="color: #fff">24 hours</strong>.<br><br>
          I'm excited to connect and hear more about what you have in mind.
          Whether it's a project, an opportunity, or just a conversation about tech — I'm all in.
        </div>
        <div class="divider"></div>
        <div class="signature">
          With code & coffee,<br>
          <div class="name">Jignesh Ramawat</div>
          <div class="role">MERN Stack Developer</div>
        </div>
      </div>
    </div>
  </body>
  </html>`

  return transporter.sendMail({
    from: `"Jignesh Ramawat" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: `Thanks for reaching out, ${name}!`,
    html,
  })
}

// ─── Routes ────────────────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body

    // Validate
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return res.status(400).json({ error: 'Name, email, and message are required.' })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email address.' })
    }

    // Save to MongoDB
    const contact = await Contact.create({ name, email, phone, message })

    // Send emails concurrently
    await Promise.allSettled([
      sendNotificationEmail({ name, email, phone, message }),
      sendAutoReply({ name, email }),
    ])

    console.log(`📨 Contact from ${name} <${email}> saved [${contact._id}]`)
    res.json({ success: true, message: 'Message received! I\'ll get back to you shortly.' })

  } catch (err) {
    console.error('Contact error:', err)
    res.status(500).json({ error: 'Server error. Please try emailing directly.' })
  }
})

// Get all contacts (protected in production — add auth!)
app.get('/api/contacts', async (req, res) => {
  try {
    const contacts = await Contact.find().sort('-createdAt').limit(50)
    res.json(contacts)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch contacts.' })
  }
})

// ─── Start ──────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
  console.log(`📧 Email: ${process.env.EMAIL_USER || '(not configured)'}`)
  console.log(`🍃 MongoDB: ${process.env.MONGODB_URI ? 'configured' : '(not configured)'}`)
})
