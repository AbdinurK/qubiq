export const employeeTransform = arr => {
    if (!arr) {
        return []
    }
    let n = []
    arr.map((e, index) => n.push({
        id: index + 1,
        link: e.idemployees,
        name: e.name,
        grade: e.grade,
        percent: Math.abs(100 - e.idemployees),
        plan_profit: e.plan_profit,
        current_profit: e.current_profit,
        number_cust: e.number_cust,
        number_obj: e.number_obj,
        activity: `${e.number_obj} / ${e.number_cust}`,
        prediction: e.expected_profit,
        active: e.active,
        fact2: e.current_profit + e.expected_profit,
        current_fails: e.current_fails,
    }))
    return n
}
