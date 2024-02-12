const express = require("express")
const {getGoals, setGoal, updateGoal, deleteGoal} = require("../controllers/goalControllers")
const router = express.Router()

// router.get("/",getGoals)
// router.post("/",setGoal)
// router.put("/:id",updateGoal)
// router.delete("/:id",deleteGoal)

//  methods can be chained to the route

router.route("/").get(getGoals).post(setGoal)
router.route("/:id").put(updateGoal).delete(deleteGoal)

module.exports = router