import { sendMail } from "../../lib/mailer";
async function handler(req, res) {
  try {
    const { method } = req;
    switch (method) {
      case "POST": {
        await sendMail(
          req.body.from,
          req.body.subject,
          req.body.body
        );
        res.status(200).send("Success");
        break;
      }
      case "GET": {
        //Do some thing
        res.status(200).send(req.auth_data);
        break;
      }
      default:
        res.setHeader("Allow", ["POST", "GET", "PUT", "DELETE"]);
        res.status(405).end(`Method ${method} Not Allowed`);
        break;
    }
  } catch (err) {
    res.status(400).json({
      error_code: "api_one",
      message: err.message,
    });
  }
};

export default handler;