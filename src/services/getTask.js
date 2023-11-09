
exports.main = async (event, context) => {
    return {
        statusCode: 200,
        body: JSON.stringify({ message: `test ${process.env.TABLE_NAME}` })
      };    
}