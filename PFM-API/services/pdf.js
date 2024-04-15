const pdf = require("html-pdf");
const path = require("path");
const fs = require("fs");
const User = require("../models/userModel");
const moment = require("moment");

exports.getPdf = async (req, res) => {
  try {
    const userId = req.params.id;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    console.log(req.body);

    const user = await User.findById(userId).populate("references.costs");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const costsInRange = user.references.costs.filter((cost) => {
      return moment(cost.date).isBetween(startDate, endDate, null, "[]");
    });

    console.log(costsInRange);

    const pdfContent = `
    <h1>Costs Report</h1>
    <table border="1" cellspacing="0" cellpadding="5">
        <thead>
        <tr>
            <th>Amount</th>
            <th>Category</th>
            <th>Date</th>
            <th>Description</th>
        </tr>
        </thead>
        <tbody>
        ${costsInRange
          .map(
            (cost) => `
            <tr>
            <td>${cost.amount}</td>
            <td>${cost.category}</td>
            <td>${new Date(cost.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })}</td>
            <td>${cost.description}</td>
            </tr>
        `
          )
          .join("")}
        </tbody>
    </table>
    `;

    const fileName = `costs_report_${Date.now()}.pdf`; // Constructing the filename
    const pdfPath = path.join(__dirname, fileName);

    pdf.create(pdfContent).toFile(pdfPath, async function (err, _) {
      if (err) {
        console.error("Error creating PDF:", err);
        return res
          .status(500)
          .json({ success: false, message: "Failed to create PDF" });
      }

      // Send the PDF file to the frontend
      res.sendFile(
        pdfPath,
        {
          headers: {
            "Content-Disposition": `attachment; filename="${fileName}"`,
          },
        },
        function (err) {
          if (err) {
            console.error("Error sending PDF:", err);
            return res
              .status(500)
              .json({ success: false, message: "Failed to send PDF" });
          } else {
            console.log("PDF sent successfully");
            // Delete the PDF file after sending
            fs.unlinkSync(pdfPath);
          }
        }
      );
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
