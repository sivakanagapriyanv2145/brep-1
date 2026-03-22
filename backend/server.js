// // const express = require("express");
// // require("dotenv").config();
// // const cors = require("cors");
// // const connectDB = require("./config/db");
// // const mainRouter = require("./routes");
// // const teamRoutes = require('./routes/teamRoutes');
// // const nodemailer = require("nodemailer");
// // const app = express();

// // // Middleware

// // // Make sure you don't have TWO app.use(cors(...)) statements.
// // // Only use this one:
// // app.use(cors({
// //   origin: [
// //     "http://localhost:5173",
// //     "https://brep.co.in",
// //     "https://www.brep.co.in",
// //     "https://brep-nu.vercel.app"
// //   ],
// //   credentials: true
// // }));
// // /*app.use(
// //   cors({
// //     origin: "*", // Replace with your frontend URL
// //     credentials: true,
// //   })
// // );*/
// // // cors({
// // //   // origin: ["http://localhost:5173", "https://res.cloudinary.com","https://brep-arch.netlify.app/"], // Allow frontend dev server
// // //   origin:["*"],
// // //   credentials: true,
// // // })
// // app.use((req, res, next) => {
// //   console.log(`📢 Request received: ${req.method} ${req.url}`);
// //   next();
// // });
// // app.use(express.json());
// // app.use(express.urlencoded({ extended: true }));

// // // Connect to MongoDB
// // connectDB();

// // // API Routes
// // app.use("/api", mainRouter);
// // const setupSuperAdminRoute = require("./routes/setupSuperAdmin");
// // app.use("/api", setupSuperAdminRoute);
// // app.use('/api/team', teamRoutes);
// // app.post("/api/contact", async (req, res) => {
// //   const { name, email, message } = req.body;

// //   if (!name || !email || !message) {
// //     return res.status(400).json({ message: "All fields are required." });
// //   }

// //   try {
// //     // create transporter
// //     const transporter = nodemailer.createTransport({
// //       host: process.env.SMTP_HOST,
// //       port: Number(process.env.SMTP_PORT),
// //       secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
// //       auth: {
// //         user: process.env.SMTP_USER,
// //         pass: process.env.SMTP_PASS,
// //       },
// //     });

// //     // email options
// //     const mailOptions = {
// //       from: `"${name}" <${email}>`,
// //       to: process.env.CONTACT_RECEIVER_EMAIL, // your email
// //       subject: `New Contact Form Message from ${name}`,
// //       text: message,
// //       html: `<p><strong>Name:</strong> ${name}</p>
// //              <p><strong>Email:</strong> ${email}</p>
// //              <p><strong>Message:</strong> ${message}</p>`,
// //     };

// //     await transporter.sendMail(mailOptions);

// //     res.status(200).json({ message: "Message sent successfully!" });
// //   } catch (error) {
// //     console.error("Error sending mail:", error);
// //     res.status(500).json({ message: "Server error", error: error.message });
// //   }
// // });
// // app.get("",(req,res)=>{
// //   return res.json("Hello World");
// // });// Error Handling Middleware
// // app.use((err, req, res, next) => {
// //   console.error(err.stack);
// //   res.status(500).send('Something broke!');
// // });


// // const PORT = process.env.PORT || 5000;
// // app.listen(PORT, () => {
// //   console.log(`✅ Server running on port ${PORT}`);
// // });
// const express = require("express");
// require("dotenv").config();
// const cors = require("cors");
// const connectDB = require("./config/db");
// const mainRouter = require("./routes");
// const teamRoutes = require("./routes/teamRoutes");
// const nodemailer = require("nodemailer");
// const serverless = require("serverless-http"); // ✅ added

// const app = express();

// // Middleware
// app.use(
//   cors({
//     origin: "http://localhost:5173/", // Replace with your frontend URL
//     credentials: true,
//   })
// );
// // app.use(cors({
// //   origin: [
// //     "http://localhost:5173",
// //     "https://brep.co.in",
// //     "https://www.brep.co.in",
// //     "https://brep-nu.vercel.app"
// //   ],
// //   credentials: true
// // }));

// app.use((req, res, next) => {
//   console.log(`📢 Request received: ${req.method} ${req.url}`);
//   next();
// });

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Connect to MongoDB
// connectDB();

// // Routes
// app.use("/api", mainRouter);

// const setupSuperAdminRoute = require("./routes/setupSuperAdmin");
// app.use("/api", setupSuperAdminRoute);

// app.use("/api/team", teamRoutes);

// // Contact route
// app.post("/api/contact", async (req, res) => {
//   const { name, email, message } = req.body;

//   if (!name || !email || !message) {
//     return res.status(400).json({ message: "All fields are required." });
//   }

//   try {
//     const transporter = nodemailer.createTransport({
//       host: process.env.SMTP_HOST,
//       port: Number(process.env.SMTP_PORT),
//       secure: process.env.SMTP_SECURE === "true",
//       auth: {
//         user: process.env.SMTP_USER,
//         pass: process.env.SMTP_PASS,
//       },
//     });

//     const mailOptions = {
//       from: `"${name}" <${email}>`,
//       to: process.env.CONTACT_RECEIVER_EMAIL,
//       subject: `New Contact Form Message from ${name}`,
//       text: message,
//       html: `<p><strong>Name:</strong> ${name}</p>
//              <p><strong>Email:</strong> ${email}</p>
//              <p><strong>Message:</strong> ${message}</p>`,
//     };

//     await transporter.sendMail(mailOptions);

//     res.status(200).json({ message: "Message sent successfully!" });
//   } catch (error) {
//     console.error("Error sending mail:", error);
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// });

// // ✅ FIXED root route (was "" before)
// app.get("/", (req, res) => {
//   return res.json("Hello World 🚀");
// });

// // Error handler
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send("Something broke!");
// });

// // ❌ REMOVE app.listen()
// // ✅ EXPORT for Vercel
// module.exports = app;
// module.exports.handler = serverless(app);
const express = require("express");
require("dotenv").config();
const cors = require("cors");
const connectDB = require("./config/db");
const mainRouter = require("./routes");
const teamRoutes = require("./routes/teamRoutes");
const nodemailer = require("nodemailer");
const serverless = require("serverless-http");

const app = express();

// CORS
const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://brep.co.in",
    "https://www.brep.co.in",
    "https://brep-nu.vercel.app"
  ],
  credentials: true
};

app.options("*", cors(corsOptions)); // handle preflight
app.use(cors(corsOptions));

app.use((req, res, next) => {
  console.log(`📢 Request received: ${req.method} ${req.url}`);
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB();

// Routes
app.use("/api", mainRouter);

const setupSuperAdminRoute = require("./routes/setupSuperAdmin");
app.use("/api", setupSuperAdminRoute);

app.use("/api/team", teamRoutes);

// Contact route
app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: `"${name}" <${email}>`,
      to: process.env.CONTACT_RECEIVER_EMAIL,
      subject: `New Contact Form Message from ${name}`,
      text: message,
      html: `<p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Message:</strong> ${message}</p>`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Message sent successfully!" });
  } catch (error) {
    console.error("Error sending mail:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Root route
app.get("/", (req, res) => {
  return res.json("Hello World 🚀");
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Export for Vercel
module.exports = app;
module.exports.handler = serverless(app);