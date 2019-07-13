const fetch = require("node-fetch");

exports.handler = async (event, context) => {
  try {
    const response = await fetch(
      `https://api.darksky.net/forecast/${
        process.env.DARK_SKY_API_KEY
      }/52.5200,13.4049?units=uk2`
    ).then(res => res.buffer());

    return {
      statusCode: 200,
      body: response
    };
  } catch (error) {
    return {
      statusCode: error.statusCode || 500,
      body: JSON.stringify(error.message)
    };
  }
};
