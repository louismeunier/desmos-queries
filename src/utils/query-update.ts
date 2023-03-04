
export function updateQueryParams() {
    var searchParams = new URLSearchParams(window.location.search);
        for (var [key, value] of searchParams) {
            // key doesn't really matter as long as they're distinct
            // value must be valid latex
            calculator.setExpression({ id: key, latex: value });
        }

    // update query parameters when graph changes
    calculator.observeEvent("change",  () => {
        var expressions = calculator.getExpressions();
        var params = new URLSearchParams();
        expressions.forEach(expression => {
            params.append(expression.id, expression.latex);
        })
        window.history.replaceState({}, "", "?" + params.toString());
    })
}