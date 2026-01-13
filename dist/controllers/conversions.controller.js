import { getConversions } from "../services/conversion.service.js";
export async function getConversionsController(req, res, next) {
    try {
        const conversions = await getConversions();
        res.json(conversions);
    }
    catch (error) {
        next(error);
    }
}
//# sourceMappingURL=conversions.controller.js.map