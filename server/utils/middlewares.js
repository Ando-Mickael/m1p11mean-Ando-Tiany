module.exports.sendResponse = (input) => async (req, res) => {
    try {
        if (!req[input]) {
            return res.status(404).json({ message: 'Resource not found' });
        }

        res.json(req[input]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
