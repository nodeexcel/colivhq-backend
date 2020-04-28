
module.exports = {
    addUser: async (req, res, next) => {
        try {
            res.send({
                status: 1,
                data: "user added"
            })
        } catch (error) {

            res.send({
                status: 0,
                error: error
            })
        }
    },

}