<script lang="ts">
  import "./calculator";
  import { onMount } from "svelte";
  
  onMount(() => {
    var elt = document.getElementById('calculator');
    var calculator = Desmos.GraphingCalculator(elt);

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


    function displayCopyButton() {
      document.querySelectorAll(".dcg-icon-remove").forEach((container) => {
        
        // newElt.innerText = "test"
        const i = container.parentNode.parentNode.getAttribute("expr-id");
        const existing = document.querySelector(".expr-id-" + i + ".cst-icon-copy-latex")
        if (document.querySelector(".expr-id-" + i + ".cst-icon-copy-latex")) {
          // remove existing
          existing.parentNode.removeChild(existing)
        }

        const newElt = document.createElement("i")
        // 
        newElt.innerText = 'LaTeX'
        newElt.classList.add("cst-icon-copy-latex")
        newElt.classList.add("expr-id-" + i)

        newElt.setAttribute("title", "Copy LaTeX")
        container.parentNode.insertBefore(newElt, container)
        newElt.onclick = () => {
          // copy to clipboard
          console.log(i);
          const exp = calculator.getExpressions().filter(exp => exp.id == i)[0]
          navigator.clipboard.writeText(exp.latex)
          newElt.innerText = "Copied!"
          setTimeout(() => {
            newElt.innerText = "LaTeX"
          }, 1000)
        }
      })
    }

    displayCopyButton();
    calculator.observeEvent("change", displayCopyButton)
  })
</script>

<div id="calculator"></div>

<style>
  #calculator {
   height: 100%;
  }

  
</style>
