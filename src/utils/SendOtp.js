import nodeMailer from "nodemailer"
import 'dotenv/config'

const transporter = nodeMailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: process.env.MAIL_SECURE,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
})

async function SendOtp(request) {
    const AppName = process.env.APP_NAME
    const info = await transporter.sendMail({
        from: `${AppName} ${process.env.MAIL_USER}`,
        to: request.email,
        subject: `Code OTP - ${AppName}`,
        text: `Verification OTP - ${AppName}`,
        html: `
<!DOCTYPE HTML
    PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
    xmlns:o="urn:schemas-microsoft-com:office:office">

<head>
    <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="x-apple-disable-message-reformatting" />
    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

    <title></title>

    <style type="text/css">
        @media only screen and (min-width: 620px) {
            .u-row {
                width: 600px !important;
            }

            .u-row .u-col {
                vertical-align: top;
            }

            .u-row .u-col-100 {
                width: 600px !important;
            }
        }

        @media (max-width: 620px) {
            .u-row-container {
                max-width: 100% !important;
                padding-left: 0px !important;
                padding-right: 0px !important;
            }

            .u-row .u-col {
                min-width: 320px !important;
                max-width: 100% !important;
                display: block !important;
            }

            .u-row {
                width: 100% !important;
            }

            .u-col {
                width: 100% !important;
            }

            .u-col>div {
                margin: 0 auto;
            }
        }

        body {
            margin: 0;
            padding: 0;
        }

        table,
        tr,
        td {
            vertical-align: top;
            border-collapse: collapse;
        }

        p {
            margin: 0;
        }

        .ie-container table,
        .mso-container table {
            table-layout: fixed;
        }

        * {
            line-height: inherit;
        }

        a[x-apple-data-detectors='true'] {
            color: inherit !important;
            text-decoration: none !important;
        }

        table,
        td {
            color: #000000;
        }

        #u_body a {
            color: #0000ee;
            text-decoration: underline;
        }

        @media (max-width: 480px) {
            #u_content_image_4 .v-src-width {
                width: auto !important;
            }

            #u_content_image_4 .v-src-max-width {
                max-width: 43% !important;
            }

            #u_content_heading_1 .v-container-padding-padding {
                padding: 8px 20px 0px !important;
            }

            #u_content_heading_1 .v-font-size {
                font-size: 21px !important;
            }

            #u_content_heading_1 .v-text-align {
                text-align: center !important;
            }

            #u_content_text_2 .v-container-padding-padding {
                padding: 35px 15px 10px !important;
            }

            #u_content_text_3 .v-container-padding-padding {
                padding: 10px 15px 40px !important;
            }
        }
    </style>

    <link href="https://fonts.googleapis.com/css?family=Lato:400,700&display=swap" rel="stylesheet" type="text/css" />
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,700&display=swap" rel="stylesheet"
        type="text/css" />
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,700&display=swap" rel="stylesheet"
        type="text/css" />
    <llink href="https://fonts.googleapis.com/css?family=Lato:400,700&display=swap" rel="stylesheet" type="text/css" />
</head>

<body class="clean-body u_body"
    style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #c2e0f4;color: #000000">
    <table id="u_body"
        style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #c2e0f4;width:100%"
        cellpadding="0" cellspacing="0">
        <tbody>
            <tr style="vertical-align: top">
                <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                    <div class="u-row-container" style="padding: 0px;background-color: transparent">
                        <div class="u-row"
                            style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
                            <div
                                style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                                <div class="u-col u-col-100"
                                    style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                                    <div style="height: 100%;width: 100% !important;">
                                        <div
                                            style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                                            <table style="font-family:arial,helvetica,sans-serif;" role="presentation"
                                                cellpadding="0" cellspacing="0" width="100%" border="0">
                                                <tbody>
                                                    <tr>
                                                        <td class="v-container-padding-padding"
                                                            style="overflow-wrap:break-word;word-break:break-word;padding:0px 0px 10px;font-family:arial,helvetica,sans-serif;"
                                                            align="left">
                                                            <table height="0px" align="center" border="0"
                                                                cellpadding="0" cellspacing="0" width="100%"
                                                                style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 6px solid #6f9de1;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                                                <tbody>
                                                                    <tr style="vertical-align: top">
                                                                        <td
                                                                            style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                                                            <span>&#160;</span>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                            <table id="u_content_image_4"
                                                style="font-family:arial,helvetica,sans-serif;" role="presentation"
                                                cellpadding="0" cellspacing="0" width="100%" border="0">
                                                <tbody>
                                                    <tr>
                                                        <td class="v-container-padding-padding"
                                                            style="overflow-wrap:break-word;word-break:break-word;padding:20px 10px;font-family:arial,helvetica,sans-serif;"
                                                            align="left">

                                                            <table width="100%" cellpadding="0" cellspacing="0"
                                                                border="0">
                                                                <tr>
                                                                    <td class="v-text-align"
                                                                        style="padding-right: 0px;padding-left: 0px;"
                                                                        align="center">

                                                                        <img align="center" border="0"
                                                                            src="https://i.ibb.co/FmxHZyK/logo.png"
                                                                            alt="Logo" title="Logo"
                                                                            style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 10%;max-width: 58px;"
                                                                            width="58"
                                                                            class="v-src-width v-src-max-width" />
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="u-row-container" style="padding: 0px;background-color: transparent">
                        <div class="u-row"
                            style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
                            <div
                                style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                                <div class="u-col u-col-100"
                                    style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                                    <div
                                        style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                                        <div
                                            style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                                            <table style="font-family:arial,helvetica,sans-serif;" role="presentation"
                                                cellpadding="0" cellspacing="0" width="100%" border="0">
                                                <tbody>
                                                    <tr>
                                                        <td class="v-container-padding-padding"
                                                            style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;"
                                                            align="left">
                                                            <table width="100%" cellpadding="0" cellspacing="0"
                                                                border="0">
                                                                <tr>
                                                                    <td class="v-text-align"
                                                                        style="padding-right: 0px;padding-left: 0px;"
                                                                        align="center">

                                                                        <img align="center" border="0"
                                                                            src="https://i.ibb.co/yp5D4Fm/1639409113540-2.jpg"
                                                                            alt="Banner" title="Banner"
                                                                            style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 94%;max-width: 545.2px;"
                                                                            width="545.2"
                                                                            class="v-src-width v-src-max-width" />

                                                                    </td>
                                                                </tr>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <table id="u_content_heading_1"
                                                style="font-family:arial,helvetica,sans-serif;" role="presentation"
                                                cellpadding="0" cellspacing="0" width="100%" border="0">
                                                <tbody>
                                                    <tr>
                                                        <td class="v-container-padding-padding"
                                                            style="overflow-wrap:break-word;word-break:break-word;padding:9px 30px 9px 31px;font-family:arial,helvetica,sans-serif;"
                                                            align="left">

                                                            <h1 class="v-text-align v-font-size"
                                                                style="margin: 0px; color: #023047; line-height: 170%; text-align: center; word-wrap: break-word; font-family: 'Open Sans',sans-serif; font-size: 26px; font-weight: 400;">
                                                                <strong>Verification Account ${AppName}<br /></strong>
                                                            </h1>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="u-row-container" style="padding: 0px;background-color: transparent">
                        <div class="u-row"
                            style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
                            <div
                                style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                                <div class="u-col u-col-100"
                                    style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                                    <div
                                        style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                                        <div
                                            style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                                            <table id="u_content_text_2" style="font-family:arial,helvetica,sans-serif;"
                                                role="presentation" cellpadding="0" cellspacing="0" width="100%"
                                                border="0">
                                                <tbody>
                                                    <tr>
                                                        <td class="v-container-padding-padding"
                                                            style="overflow-wrap:break-word;word-break:break-word;padding:0px 55px 10px;font-family:arial,helvetica,sans-serif;"
                                                            align="left">

                                                            <div class="v-text-align v-font-size"
                                                                style="font-size: 14px; color: #333333; line-height: 180%; text-align: left; word-wrap: break-word;">
                                                                <p style="font-size: 14px; line-height: 180%;"><span
                                                                        style="font-size: 18px; line-height: 32.4px; font-family: Lato, sans-serif;"><strong><span
                                                                                style="line-height: 32.4px; font-size: 18px;">Hi
                                                                                ${request.name}, </span></strong></span>
                                                                </p>
                                                                <p style="font-size: 14px; line-height: 180%;"> </p>
                                                                <p style="font-size: 14px; line-height: 180%;"><span
                                                                        style="font-family: Lato, sans-serif; font-size: 16px; line-height: 28.8px;">Welcome
                                                                        to the club!<br />Thank you for using Jovi Drive
                                                                        services!<br />Before starting,
                                                                        please verify your account first.</span></p>
                                                                <p style="font-size: 14px; line-height: 180%;"> </p>
                                                                <p style="font-size: 14px; line-height: 180%;"><span
                                                                        style="font-size: 16px; line-height: 28.8px; font-family: Lato, sans-serif;"><strong><span
                                                                                style="line-height: 28.8px; font-size: 16px;">Below
                                                                                are your account details,
                                                                                make sure they are correct and always
                                                                                note them down:</span></strong></span>
                                                                </p>
                                                                <ul style="list-style-type: square;">
                                                                    <li style="font-size: 14px; line-height: 25.2px;">
                                                                        Full Name : ${request.name}</li>
                                                                    <li style="font-size: 14px; line-height: 25.2px;">
                                                                        Email : ${request.email}</li>
                                                                    <li style="font-size: 14px; line-height: 25.2px;">
                                                                        Public ID : ${request.username}</li>
                                                                    <li style="font-size: 14px; line-height: 25.2px;">
                                                                        Phone Number : ${request.phone}</li>
                                                                    <li style="font-size: 14px; line-height: 25.2px;">
                                                                        Type : ${request.type}</li>
                                                                    <li style="font-size: 14px; line-height: 25.2px;">
                                                                        registered since : ${request.created_at}</li>
                                                                </ul>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                            <table style="font-family:arial,helvetica,sans-serif;" role="presentation"
                                                cellpadding="0" cellspacing="0" width="100%" border="0">
                                                <tbody>
                                                    <tr>
                                                        <td class="v-container-padding-padding"
                                                            style="overflow-wrap:break-word;word-break:break-word;padding:20px 10px 30px;font-family:arial,helvetica,sans-serif;"
                                                            align="left">
                                                            <div class="v-text-align" align="center">
                                                                <div class="v-button v-font-size"
                                                                    style="box-sizing: border-box;display: inline-block;text-decoration: none;-webkit-text-size-adjust: none;text-align: center;color: #FFFFFF; background-color: #33428d; border-radius: 44px;-webkit-border-radius: 44px; -moz-border-radius: 44px; width:34%; max-width:100%; overflow-wrap: break-word; word-break: break-word; word-wrap:break-word; mso-border-alt: none;font-size: 14px;">
                                                                    <span
                                                                        style="display:block;padding:26px;line-height:10%;">
                                                                        <strong>
                                                                            <span
                                                                                style="font-family: 'Open Sans', sans-serif; font-size: 14px; line-height: 1.4px;">
                                                                                <span
                                                                                    style="font-size: 26px; line-height: 2.6px;">
                                                                                    ${request.code}
                                                                                </span>
                                                                                <br />
                                                                            </span>
                                                                        </strong>
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                            <table id="u_content_text_3" style="font-family:arial,helvetica,sans-serif;"
                                                role="presentation" cellpadding="0" cellspacing="0" width="100%"
                                                border="0">
                                                <tbody>
                                                    <tr>
                                                        <td class="v-container-padding-padding"
                                                            style="overflow-wrap:break-word;word-break:break-word;padding:10px 55px 40px;font-family:arial,helvetica,sans-serif;"
                                                            align="left">

                                                            <div class="v-text-align v-font-size"
                                                                style="font-size: 14px; line-height: 170%; text-align: left; word-wrap: break-word;">
                                                                <p style="font-size: 14px; line-height: 170%;"><span
                                                                        style="font-family: Lato, sans-serif; font-size: 16px; line-height: 27.2px;">Keep
                                                                        your OTP code confidential, never give your OTP
                                                                        code to anyone else!</span></p>
                                                                <p style="font-size: 14px; line-height: 170%;"> </p>
                                                                <p style="font-size: 14px; line-height: 170%;"><span
                                                                        style="font-family: Lato, sans-serif; font-size: 16px; line-height: 27.2px;">If
                                                                        you
                                                                        need help or questions about ${AppName}, please
                                                                        contact admin</span></p>
                                                                <p style="font-size: 14px; line-height: 170%;"> </p>
                                                                <p style="font-size: 14px; line-height: 170%;"><span
                                                                        style="font-family: Lato, sans-serif; font-size: 16px; line-height: 27.2px;">With
                                                                        Regards,</span></p>
                                                                <p style="font-size: 14px; line-height: 170%;"><span
                                                                        style="font-family: Lato, sans-serif; font-size: 14px; line-height: 23.8px;"><strong><span
                                                                                style="font-size: 16px; line-height: 27.2px;">JEVI
                                                                                DRIVE<br /></span></strong></span></p>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                                                                        <img src="https://i.ibb.co/BnCDGsS/image-2.png"
                                                                                            alt="LinkedIn"
                                                                                            title="LinkedIn" width="32"
                                                                                            style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
                                                                                    </a>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                    <table align="left" border="0" cellspacing="0"
                                                                        cellpadding="0" width="32" height="32"
                                                                        style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 13px">
                                                                        <tbody>
                                                                            <tr style="vertical-align: top">
                                                                                <td align="left" valign="middle"
                                                                                    style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                                                                                    <a href="https://instagram.com/"
                                                                                        title="Instagram"
                                                                                        target="_blank">
                                                                                        <img src="https://i.ibb.co/FJhVB6k/image-1.png"
                                                                                            alt="Instagram"
                                                                                            title="Instagram" width="32"
                                                                                            style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
                                                                                    </a>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                    <table align="left" border="0" cellspacing="0"
                                                                        cellpadding="0" width="32" height="32"
                                                                        style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 13px">
                                                                        <tbody>
                                                                            <tr style="vertical-align: top">
                                                                                <td align="left" valign="middle"
                                                                                    style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                                                                                    <a href="https://twitter.com/"
                                                                                        title="Twitter" target="_blank">
                                                                                        <img src="https://i.ibb.co/2jVsYwj/image-3.png"
                                                                                            alt="Twitter"
                                                                                            title="Twitter" width="32"
                                                                                            style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
                                                                                    </a>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                    <table align="left" border="0" cellspacing="0"
                                                                        cellpadding="0" width="32" height="32"
                                                                        style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 0px">
                                                                        <tbody>
                                                                            <tr style="vertical-align: top">
                                                                                <td align="left" valign="middle"
                                                                                    style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                                                                                    <a href="https://pinterest.com/"
                                                                                        title="Pinterest"
                                                                                        target="_blank">
                                                                                        <img src="https://i.ibb.co/vcGcNL5/image-4.png"
                                                                                            alt="Pinterest"
                                                                                            title="Pinterest" width="32"
                                                                                            style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
                                                                                    </a>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                            <table style="font-family:arial,helvetica,sans-serif;" role="presentation"
                                                cellpadding="0" cellspacing="0" width="100%" border="0">
                                                <tbody>
                                                    <tr>
                                                        <td class="v-container-padding-padding"
                                                            style="overflow-wrap:break-word;word-break:break-word;padding:10px 10px 35px;font-family:arial,helvetica,sans-serif;"
                                                            align="left">
                                                            <div class="v-text-align v-font-size"
                                                                style="font-size: 14px; color: #ffffff; line-height: 210%; text-align: center; word-wrap: break-word;">
                                                                <p style="font-size: 14px; line-height: 210%;"><span
                                                                        style="font-family: Lato, sans-serif; font-size: 14px; line-height: 29.4px;">You
                                                                        received this email because you
                                                                        registered</span></p>
                                                                <p style="font-size: 14px; line-height: 210%;"><span
                                                                        style="font-family: Lato, sans-serif; font-size: 14px; line-height: 29.4px;">©2023
                                                                        ${AppName} | Jalan Jend. Sudirman Gg. Melati 2,
                                                                        Purwakarta, Jawa Barat,
                                                                        41111<br /></span></p>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</body>

</html>
`
    })

    console.log("Email Has Ben Sent To: %s", info.accepted)
}

export default SendOtp
