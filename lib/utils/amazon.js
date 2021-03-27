// Load the AWS SDK for Node.js
// const { LexModelBuildingService } = require('aws-sdk');
const SES = require('aws-sdk/clients/ses');
require('dotenv').config();
// Set the region 
// AWS.config.update({region: 'REGION'});
const sendEmail = (nameOfTea, category, origin) => {

  // Create sendEmail params 
  const params = {
    Destination: { 
    ToAddresses: [
      process.env.SEND_TO_EMAIL,
    ]
  },
  Message: { 
    Body: { 
      Html: {
        Charset: "UTF-8",
       Data: `This is a ${category} type of tea from ${origin}`
      },
    },
    Subject: {
      Charset: 'UTF-8',
      Data: `${nameOfTea}`
    }
  },
  Source: process.env.SEND_TO_EMAIL,
  ReplyToAddresses: [
    'SEStest@mailinator.com',
  ],
};

// Create the promise and SES service object
const SESConfig = {
  apiVersion: '2010-12-01',
  accessKeyId: process.env.AWS_SES_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SES_SECRET_ACCESS_KEY,
  region: process.env.AWS_SES_REGION
}

  const response = new SES(SESConfig).sendEmail(params)
    .promise()
    console.log(response)

}

const sendEmailRevised = (nameOfTea, category, origin, qty) => {

  // Create sendEmail params 
  const params = {
    Destination: { 
    ToAddresses: [
      process.env.SEND_TO_EMAIL,
    ]
  },
  Message: { 
    Body: { 
      Html: {
        Charset: "UTF-8",
       Data: `The ${qty} of the ${category} tea from ${origin} has been updated`
      },
    },
    Subject: {
      Charset: 'UTF-8',
      Data: `${nameOfTea} updated!`
    }
  },
  Source: process.env.SEND_TO_EMAIL,
  ReplyToAddresses: [
    'SEStest@mailinator.com',
  ],
};

// Create the promise and SES service object
const SESConfig = {
  apiVersion: '2010-12-01',
  accessKeyId: process.env.AWS_SES_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SES_SECRET_ACCESS_KEY,
  region: process.env.AWS_SES_REGION
}

const response = new SES(SESConfig).sendEmail(params)
.promise()
console.log(response)

}
module.exports = {
  sendEmail,
  sendEmailRevised
}
