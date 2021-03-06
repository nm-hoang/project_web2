const express = require("express");
const router = express.Router();
const User = require("../services/user");
const asyncHandler = require("express-async-handler");
const Bank = require("../services/bank");
const { body, validationResult } = require("express-validator");
const randomstring = require("randomstring");
const Email = require("../services/email");
const Transaction = require("../services/transaction");
var user;

router.get(
    "/",
    asyncHandler(async function (req, res, next) {
        res.render("transferring_money");
    })
);

router.post(
    "/",
    [
        body("destinationAccountId")
            .trim()
            .notEmpty()
            .custom(async function (destinationAccountId, { req }) {
                user = await User.findUserByAccountNumber(destinationAccountId);

                if (!user) {
                    throw Error("Destination account not Exist");
                } else {
                    return true;
                }
            }),
        body("amount").trim().notEmpty(),
        body("note").trim().notEmpty(),
    ],
    asyncHandler(async function (req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).render("transferring_money", { errors: errors.array() });
        }

        req.session.destinationBankId = req.body.destinationBankId;
        req.session.destinationAccountId = req.body.destinationAccountId;
        req.session.amount = req.body.amount;
        req.session.note = req.body.note;

        const OTP = randomstring.generate({
            length: 4,
            charset: "numeric",
        });

        req.session.OTP = OTP;

        //send password qua email
        await Email.SendEmail(user.email, "Your OTP code la: ", `${OTP}`,null);
        //send password bằng sđt
        //await Phone.sendSMS('ACB bank',user.phoneNumber,'Your OTP code la: ${OTP}`);

        return res.redirect("confirm_transferring_money");
    })
);
module.exports = router;
