import Activity from "../models/ActivityModel.js"

export const GetAllActivityService = async (userId) => {
    return Activity.findAll({
        where: {
            userId: userId
        }
    })
}