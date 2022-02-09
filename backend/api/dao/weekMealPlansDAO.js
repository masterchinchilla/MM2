let weekMealPlans

export default class weekMealPlansDAO {
    static async injectDB(conn) {
        if (weekMealPlans) {
            return
        }
        try {
            weekMealPlans = await conn.db(process.env.MacroMenu_NS).collection("weekMealPlans")
        } catch (e) {
            console.error(
                `unable to establish a collection handle in weekMealPlansDAO: ${e}`,
            )
        }
    }

    static async getWeekMealPlans({
        filters = null,
        page = 0,
        weekMealPlansPerPage = 20,
    } = {}){
        let query
        if (filters) {
            if ("name" in filters) {
                query = { $text { $search: filters["name"]}}
            }
        }
    }
}