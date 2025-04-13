import { ProjectModel } from "../ProjectSchema.js";


// Get all ProjectModel
const getProjects = async (req, res) => {

    try {
        const projectDetails = await ProjectModel.find({});
        if (!projectDetails || projectDetails.length === 0) {
            return res.status(404).json({
                message: 'No projects found',
                success: false
            })
        }
        res.status(200).json({
            data: projectDetails,
            message: 'All products are fetched successfully',
            success: true
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
            success: false
        })
    }
};



export { getProjects }