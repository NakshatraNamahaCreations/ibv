const axios = require("axios");
const { encrypt } = require("crypto");

const Paymentgetwaymodel = require("../../Model/Paymnetgetway/Payment");

class Paymentgetway {
  // async addPayment(req, res) {
  //   try {
  //     const { orderId, amount } = req.body;
  //     const newPayment = new Paymentgetwaymodel({ orderId, amount });
  //     await newPayment.save();

  //     const merchantId = "2603333";
  //     const accessCode = "AVQE82KF22BY94EQYB";
  //     const workingKey = "3302F4AA5930283FC3940CD9260C3EDE";
  //     const redirectUrl = "http://localhost:8000/response";

  //     const postData = {
  //       merchant_id: merchantId,
  //       order_id: orderId,
  //       amount: amount,
  //       redirect_url: redirectUrl,
  //       cancel_url: redirectUrl,
  //       currency: "INR",
  //       billing_name: "John Doe",
  //       billing_email: "john.doe@example.com",
  //       billing_tel: "1234567890",
  //       // Add other required parameters according to your needs
  //     };

  //     const { encryptedData, iv } = encrypt(
  //       JSON.stringify(postData),
  //       workingKey
  //     );
  //     const ccavenueUrl =
  //       "https://secure.ccavenue.com/transaction/transaction.do?command=initiateTransaction";

  //     const response = await axios.post(
  //       ccavenueUrl,
  //       `encRequest=${encodeURIComponent(
  //         encryptedData
  //       )}&access_code=${accessCode}&iv_parameter=${encodeURIComponent(iv)}`,
  //       {
  //         headers: {
  //           "Content-Type": "application/x-www-form-urlencoded",
  //         },
  //       }
  //     );

  //     res.send(response.data);
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).send("An error occurred");
  //   }
  // }

  async addPayment(req, res) {
    try {
      const { orderId, amount } = req.body;
      const newPayment = new Paymentgetwaymodel({ orderId, amount });
      await newPayment.save();

      const merchantId = "2603333";
      const accessCode = "AVQE82KF22BY94EQYB";
      const workingKey = "3302F4AA5930283FC3940CD9260C3EDE";
      // const redirectUrl = "http://localhost:8000/response";

      const postData = {
        merchant_id: merchantId,
        order_id: orderId,
        amount: amount,
        // redirect_url: redirectUrl,
        // cancel_url: redirectUrl,
        currency: "INR",
        billing_name: "John Doe",
        billing_email: "john.doe@example.com",
        billing_tel: "1234567890",
        // Add other required parameters according to your needs
      };

      const { encryptedData, iv } = encrypt(
        JSON.stringify(postData),
        workingKey
      );

      const ccavenueUrl =
        "https://secure.ccavenue.com/transaction/transaction.do?command=initiateTransaction";

      const response = await axios.post(
        ccavenueUrl,
        `encRequest=${encodeURIComponent(
          encryptedData
        )}&access_code=${accessCode}&iv_parameter=${encodeURIComponent(iv)}`,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      res.send(response.data);
    } catch (error) {
      console.error(error);
      res.status(500).send("An error occurred");
    }
  }

  async newpayment(req, res) {
    let { orderId, amount, customerName, customerEmail } = req.body;
    try {
      const ccavenueResponse = await axios.post(
        "https://secure.ccavenue.com/transaction/initiateTransaction",
        {
          orderId,
          amount,
          customerName,
          customerEmail,
          // Include any additional required parameters for the CCAvenue API
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Handle the CCAvenue response and extract the necessary data
      const { status, data } = ccavenueResponse;
      if (status === 200 && data && data.success) {
        // Extract the transaction ID from the response
        const { transactionId } = data;

        // Save payment details to the database
        const payment = new Paymentgetwaymodel({
          orderId,
          transactionId,
          amount,
          status: "Initiated",
        });
        await payment.save();

        res.json({ success: true });
      } else {
        res.json({ success: false, message: "Failed to initiate payment" });
      }
    } catch (error) {
      console.error("Error initiating payment:", error);
      res.json({ success: false, message: "Failed to initiate payment" });
    }
  }
  async callback(req, res) {
    const { transactionId, status } = req.body;

    // Update payment status in the database
    const payment = await Paymentgetwaymodel.findOneAndUpdate(
      { transactionId },
      { status },
      { new: true }
    );

    res.json({ success: true });
  }

  async paymentstatus(req, res) {
    const { orderId } = req.params;

    // Retrieve payment details from the database
    const payment = await Paymentgetwaymodel.findOne({ orderId });

    res.json(payment);
  }
}
const paymentgetwaycontroller = new Paymentgetway();
module.exports = paymentgetwaycontroller;
