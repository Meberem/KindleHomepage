const fetch = require("node-fetch");
const { DARK_SKY_API_KEY } = process.env;

exports.handler = async (event, context) => {
  try {
    const uri = `https://api.darksky.net/forecast/${DARK_SKY_API_KEY}/52.5200,13.4049?units=uk2`;
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
