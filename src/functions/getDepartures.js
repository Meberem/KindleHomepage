const fetch = require("node-fetch");
const { DARK_SKY_API_KEY } = process.env;

exports.handler = async (event, context) => {
  try {
    const uri = `https://1.bvg.transport.rest/stations/900000110017/departures`;
    console.log("Making call with ", uri);
    const response = await fetch(uri).then(res => res.json());

    return {
      statusCode: 200,
      body: JSON.stringify(response)
    };
  } catch (error) {
    return {
      statusCode: error.statusCode || 500,
      body: JSON.stringify(error.message)
    };
  }
};
