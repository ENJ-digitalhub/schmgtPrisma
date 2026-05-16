import { apiResponse } from "../../utils/apiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { listPayments, recordPayment } from "./payments.service.js";

export const listPaymentsController = asyncHandler(async (req, res) => {
  const payments = await listPayments();

  res.json(
    apiResponse({
      message: "Payments fetched successfully",
      data: payments,
    })
  );
});

export const recordPaymentController = asyncHandler(async (req, res) => {
  const payment = await recordPayment(req.body);

  res.status(201).json(
    apiResponse({
      message: "Payment scaffold recorded successfully",
      data: payment,
    })
  );
});
