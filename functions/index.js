const functions = require("firebase-functions");
const admin = require("firebase-admin");
const twilio = require("twilio");

admin.initializeApp();
const db = admin.firestore();

const accountSid = "YOUR_TWILIO_SID";
const authToken = "YOUR_TWILIO_AUTH";
const client = twilio(accountSid, authToken);

exports.sendNotification = functions.https.onRequest(async (req, res) => {
  const { title, date } = req.body;
  const studentsRef = db.collection("students");
  const studentsSnap = await studentsRef.get();

  studentsSnap.forEach(async (doc) => {
    const student = doc.data();
    const parentRef = db.collection("users").doc(student.parentId);
    const parentSnap = await parentRef.get();

    if (parentSnap.exists) {
      const parent = parentSnap.data();
      const message = `New Event: ${title} on ${date}`;

      // Send Twilio SMS
      client.messages.create({
        body: message,
        from: "+YourTwilioNumber",
        to: parent.phone
      });

      // Send Email (use SendGrid, Firebase Email, etc.)
    }
  });

  res.send("Notifications sent!");
});
