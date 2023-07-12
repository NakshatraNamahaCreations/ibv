const axios = require("axios");
const { encrypt } = require("crypto");
const sha256 = require("sha256");
const Paymentgetwaymodel = require("../../Model/Paymnetgetway/Payment");
const generateUniqueTransactionId = require("../../Config/tractionid");

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
    const newVendor = new Paymentgetwaymodel({
      transactionId,
      status,
    });
    newVendor.save().then((data) => {
      console.log(data);
      return res.status(200).json({ Success: "payemnt succesfully" });
    });

    res.json({ success: true });
  }

  async paymentstatus(req, res) {
    const { orderId } = req.params;

    // Retrieve payment details from the database
    const payment = await Paymentgetwaymodel.findOne({ orderId });

    res.json(payment);
  }

  // async initiatePayment(req, res) {
  //   try {
  //     let data = JSON.stringify({
  //       request:
  //         "ewoJIm1lcmNoYW50SWQiOiAiUEdURVNUUEFZVUFUNzYiLAoJIm1lcmNoYW50VHJhbnNhY3Rpb25JZCI6ICJNVDc4NTA1c2U5MDA2ODc3NDg5NzQiLAoJIm1lcmNoYW50VXNlcklkIjogIk1VSUQxMjM3NDVldzYiLAoJImFtb3VudCI6IDEwMDAwLAoJInJlZGlyZWN0VXJsIjogImh0dHBzOi8vd2ViaG9vay5zaXRlL3JlZGlyZWN0LXVybCIsCgkicmVkaXJlY3RNb2RlIjogIlBPU1QiLAoJImNhbGxiYWNrVXJsIjogImh0dHBzOi8vd2ViaG9vay5zaXRlL2NhbGxiYWNrLXVybCIsCgkibW9iaWxlTnVtYmVyIjogIjk5OTk5OTk5OTkiLAoJInBheW1lbnRJbnN0cnVtZW50IjogewoJCSJ0eXBlIjogIlBBWV9QQUdFIgoJfQp9",
  //     });

  //     let config = {
  //       method: "post",
  //       maxBodyLength: Infinity,
  //       url: "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay",
  //       headers: {
  //         "Content-Type": "application/json",
  //         "X-VERIFY":
  //           "57996644cde4ca37bfe0ae8812b3d8324befad01b18694b0e24d5bce6a88996e###1",
  //       },
  //       data: data,
  //     };

  //     axios
  //       .request(config)
  //       .then((response) => {
  //         console.log(JSON.stringify(response.data));
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   } catch (error) {
  //     console.error("Error logging in:", error);
  //     res.status(500).json({ message: "Login failed. Please try again." });
  //   }
  // }

  // function generateUniqueTransactionId() {
  //   // Implement your logic to generate a unique transaction ID
  //   // You can use a library like uuid to generate a unique ID

  //   // Example using uuid:
  //   const { v4: uuidv4 } = require('uuid');
  //   const transactionId = uuidv4();

  //   return transactionId;
  // }
  async initiatePayment(req, res) {
    const { v4: uuidv4 } = require("uuid");
    const transactionId = uuidv4();
    console.log("id", transactionId);

    // const { navigation } = req;
    try {
      let base64 = Buffer.from(
        JSON.stringify({
          merchantId: "INFINITYBVONLINE",
          merchantTransactionId: transactionId,
          merchantUserId: "MUIDSX123",
          amount: 100,
          redirectUrl: "/bottomtab",
          redirectMode: "POST",
          callbackUrl: "http://192.168.1.67:8000/api/payment/callback",
          mobileNumber: "8951592630",
          paymentInstrument: {
            type: "PAY_PAGE",
          },
        })
      ).toString("base64");
      console.log("base64===", base64);
      let sha256encode =
        sha256(base64 + "/pg/v1/payc3fc2cbb-e95e-490a-97ed-05533e9f73e3") +
        "###1";
      console.log("sha256encode===", sha256encode);
      res.status(200).json({ base64, sha256encode });
    } catch (error) {
      console.error("Error logging in:", error);
      res.status(500).json({ message: "Login failed. Please try again." });
    }
  }
}

const paymentgetwaycontroller = new Paymentgetway();
module.exports = paymentgetwaycontroller;
